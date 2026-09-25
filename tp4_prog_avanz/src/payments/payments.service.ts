import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly configService: ConfigService) {
    const stripeSecret = this.configService.get<string>('STRIPE_SECRET');
    if (!stripeSecret) {
      throw new Error('STRIPE_SECRET no está configurado en las variables de entorno.');
    }
    this.stripe = new Stripe(stripeSecret);
  }

  async createPaymentSession(createPaymentSessionDto: CreatePaymentSessionDto) {
    const { orderId, currency, items } = createPaymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: this.configService.get<string>('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL'),
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

  async handleWebhook(rawBody: any, signature: string) {
    const endpointSecret = this.configService.get<string>('STRIPE_ENDPOINT_SECRET');
    if (!endpointSecret) {
      throw new Error('STRIPE_ENDPOINT_SECRET no está configurado en las variables de entorno.');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    } catch (err: any) {
      this.logger.error(`Error de verificación de webhook signature: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        const orderId = charge.metadata?.orderId;
        this.logger.log(`Pago recibido exitosamente. OrderId: ${orderId}`);
        break;
      }
      default:
        this.logger.log(`Evento no manejado: ${event.type}`);
    }

    return { received: true };
  }
}