# Stripe - Configuración básica

Este proyecto integra pagos con Stripe usando Stripe Checkout (página alojada por Stripe):
- Frontend Angular redirige a Checkout
- Backend Spring Boot crea la sesión de Checkout

## 1) Backend (Spring Boot)

Ubicación: `backend-SaavedraFotografo`

1. Agrega tu clave secreta de Stripe como variable de entorno (recomendado):
   - Windows (CMD):
     setx STRIPE_SECRET_KEY "sk_test_xxx"

   - o edita `src/main/resources/application.properties` y asigna:
     stripe.secret-key=sk_test_xxx

2. Ejecuta el backend en el puerto 8080 (por defecto):
   - Desde tu IDE o:
     mvnw spring-boot:run

3. Endpoints disponibles:
    - POST http://localhost:8080/api/payments/create-checkout-session
       Body JSON:
       {
          "items": [{ "name": "Paquete X", "amount": 300000 }],
          "currency": "usd",
          "successUrl": "http://localhost:4200/carrito?success=true",
          "cancelUrl": "http://localhost:4200/carrito?canceled=true"
       }
       Respuesta: { "id": "cs_test_...", "url": "https://checkout.stripe.com/..." }

## 2) Frontend (Angular)

Ubicación: `SaavedraFotografo`

1. Instala dependencias:
   npm install

2. Agrega tu clave pública de Stripe en `src/environments/environment.ts`:
   stripePublishableKey: 'pk_test_xxx'

3. Inicia Angular:
   npm start

4. Flujo (Checkout):
   - En la página del carrito, al pulsar "Pagar con tarjeta" se llama al backend para crear una sesión de Checkout con los ítems del carrito.
   - La respuesta incluye una URL; el frontend redirige al usuario a Stripe Checkout.
   - Tras pagar o cancelar, Stripe vuelve a las URLs de éxito/cancelación.

## 3) Pruebas con tarjetas de prueba

Usa tarjetas de prueba de Stripe (no cobran dinero real):
- Visa aprobada: 4242 4242 4242 4242, cualquier fecha futura, CVC 123, ZIP 12345
- Más ejemplos: https://stripe.com/docs/testing

## 4) Notas
- Para producción, mueve las claves a variables de entorno/secretos y usa HTTPS.
- Si usas otra moneda, asegúrate de enviar `amount` en la unidad mínima (algunas monedas son de 0 decimales).
- Si protegerás el endpoint con JWT, añade una excepción o envía el token desde Angular.
