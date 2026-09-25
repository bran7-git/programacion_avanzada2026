import { Controller, Post, Body, Get, Headers, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() createPaymentSessionDto: CreatePaymentSessionDto) {
    return this.paymentsService.createPaymentSession(createPaymentSessionDto);
  }

  @Get('success')
  success() {
    return { ok: true, message: 'Payment successful' };
  }

  @Get('cancel')
  cancel() {
    return { ok: false, message: 'Payment cancelled' };
  }

  @Post('webhook')
  async webhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    if (!signature) {
      throw new BadRequestException('Falta la cabecera stripe-signature');
    }
    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new BadRequestException('No se encontró el cuerpo en formato rawBody');
    }
    return this.paymentsService.handleWebhook(rawBody, signature);
  }
}