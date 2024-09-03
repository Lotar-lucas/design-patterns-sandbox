/*
Exemplo: Integração com APIs de Pagamento Imagine que sua aplicação web precisa se integrar com diferentes gateways 
de pagamento (como PayPal, Stripe e Mercado Pago), mas cada um tem sua própria API com diferentes métodos e parâmetros 
para processar pagamentos. Em vez de modificar seu código a cada nova integração, você pode usar o padrão Adapter para
 criar uma interface unificada.
*/

/*
Estrutura:
Interface comum (PaymentGateway): Define os métodos que todos os adaptadores precisam implementar.

Adaptadores (PayPalAdapter, StripeAdapter, MercadoPagoAdapter): Implementam a interface comum e traduzem as chamadas da 
interface da sua aplicação para a API específica de cada serviço.

Cliente: Usa a interface PaymentGateway para processar pagamentos sem se preocupar com qual serviço está sendo utilizado.
*/

interface PaymentGateway {
  processPayment(amount: number): Promise<void>;
}


class PayPalAdapter implements PaymentGateway {
  private payPalAPI: PayPalAPI;

  constructor(payPalAPI: PayPalAPI) {
    this.payPalAPI = payPalAPI;
  }

  async processPayment(amount: number): Promise<void> {
    // Traduz a chamada para o método da API do PayPal
    await this.payPalAPI.makePayment({ amount, currency: 'USD' });
  }
}


class StripeAdapter implements PaymentGateway {
  private stripeAPI: StripeAPI;

  constructor(stripeAPI: StripeAPI) {
    this.stripeAPI = stripeAPI;
  }

  async processPayment(amount: number): Promise<void> {
    // Traduz a chamada para o método da API do Stripe
    await this.stripeAPI.charge({ amountInCents: amount * 100, currency: 'USD' });
  }
}


class MercadoPagoAdapter implements PaymentGateway {
  private mercadoPagoAPI: MercadoPagoAPI;

  constructor(mercadoPagoAPI: MercadoPagoAPI) {
    this.mercadoPagoAPI = mercadoPagoAPI;
  }

  async processPayment(amount: number): Promise<void> {
    // Traduz a chamada para o método da API do Mercado Pago
    await this.mercadoPagoAPI.pagar({ valor: amount, moeda: 'BRL' });
  }
}


class PaymentService {
  private gateway: PaymentGateway;

  constructor(gateway: PaymentGateway) {
    this.gateway = gateway;
  }

  async makePayment(amount: number) {
    await this.gateway.processPayment(amount);
  }
}

// Exemplo de uso com diferentes gateways
const payPalAPI = new PayPalAPI();
const stripeAPI = new StripeAPI();
const mercadoPagoAPI = new MercadoPagoAPI();

const payPalAdapter = new PayPalAdapter(payPalAPI);
const stripeAdapter = new StripeAdapter(stripeAPI);
const mercadoPagoAdapter = new MercadoPagoAdapter(mercadoPagoAPI);

const paymentService = new PaymentService(payPalAdapter); // Aqui pode ser qualquer adaptador
paymentService.makePayment(100); // Processa pagamento de $100 via PayPal
