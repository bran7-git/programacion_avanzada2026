<<<<<<< HEAD
# programacion_avanzada2026
=======
# Microservicio de Pagos (NestJS + Stripe)

Microservicio de pagos que genera sesiones de pago con Stripe Checkout y procesa eventos de cobro exitoso mediante Webhooks.

## Requisitos
- Node.js (v18 o superior)
- Stripe CLI (para la interceptación de eventos en entorno local)

## Configuración del Entorno
1. Duplicar el archivo `.env.template` y renombrarlo a `.env`.
2. Completar las credenciales correspondientes de Stripe Test.

## Instalación y Ejecución
```bash
# Instalar dependencias
npm install

# Iniciar aplicación en modo desarrollo
npm run start:dev

Rutas / Endpoints
POST /payments/create-payment-session -> Genera la sesión de pago en Stripe.

GET /payments/success -> Redirección al completar el pago.

GET /payments/cancel -> Redirección al cancelar el pago.

POST /payments/webhook -> Recepción y validación de la firma criptográfica de Stripe.

Simulación de Webhooks
Bash
.\stripe.exe listen --forward-to localhost:3003/payments/webhook
>>>>>>> ecf4463 (TP4 completado: Servicio de pagos con Stripe)
