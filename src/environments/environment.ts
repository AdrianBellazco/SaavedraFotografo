export const environment = {
  production: true,
  // Backend base URL (Spring Boot)
  apiBase: 'http://localhost:8080/api',
  // Stripe publishable key (reemplazar por tu clave de Stripe)
  stripePublishableKey: 'pk_test_51SRg8iQv1F6jkrjeKL5PDHnorw8NjXGDTwHZ5SzHyklGhfUtltCi7UBdFl8yjlZ9lKjx8VR0Srtl6j3oaZSqFB7i00LaW00Pp3',
  openrouter: {
    apiBase: '/api/ai',
    defaultModel: 'openai/gpt-4o-mini'
  }
};
