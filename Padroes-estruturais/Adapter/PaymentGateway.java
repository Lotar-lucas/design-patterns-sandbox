public interface PaymentGateway {
  void processPayment(double amount);
}


public class PayPalAdapter implements PaymentGateway {
  private PayPalAPI payPalAPI;

  public PayPalAdapter(PayPalAPI payPalAPI) {
      this.payPalAPI = payPalAPI;
  }

  @Override
  public void processPayment(double amount) {
      // Traduz a chamada para o método da API do PayPal
      payPalAPI.makePayment(amount, "USD");
  }
}


public class StripeAdapter implements PaymentGateway {
  private StripeAPI stripeAPI;

  public StripeAdapter(StripeAPI stripeAPI) {
      this.stripeAPI = stripeAPI;
  }

  @Override
  public void processPayment(double amount) {
      // Traduz a chamada para o método da API do Stripe
      stripeAPI.charge((int) (amount * 100), "USD");
  }
}

public class MercadoPagoAdapter implements PaymentGateway {
  private MercadoPagoAPI mercadoPagoAPI;

  public MercadoPagoAdapter(MercadoPagoAPI mercadoPagoAPI) {
      this.mercadoPagoAPI = mercadoPagoAPI;
  }

  @Override
  public void processPayment(double amount) {
      // Traduz a chamada para o método da API do Mercado Pago
      mercadoPagoAPI.pagar(amount, "BRL");
  }
}

// Simulação da API do PayPal
public class PayPalAPI {
  public void makePayment(double amount, String currency) {
      System.out.println("Processing PayPal payment of " + amount + " " + currency);
  }
}

// Simulação da API do Stripe
public class StripeAPI {
  public void charge(int amountInCents, String currency) {
      System.out.println("Processing Stripe payment of " + (amountInCents / 100.0) + " " + currency);
  }
}

// Simulação da API do Mercado Pago
public class MercadoPagoAPI {
  public void pagar(double valor, String moeda) {
      System.out.println("Processing Mercado Pago payment of " + valor + " " + moeda);
  }
}


public class PaymentService {
  private PaymentGateway gateway;

  public PaymentService(PaymentGateway gateway) {
      this.gateway = gateway;
  }

  public void makePayment(double amount) {
      gateway.processPayment(amount);
  }

  public static void main(String[] args) {
      // Inicialização das APIs simuladas
      PayPalAPI payPalAPI = new PayPalAPI();
      StripeAPI stripeAPI = new StripeAPI();
      MercadoPagoAPI mercadoPagoAPI = new MercadoPagoAPI();

      // Criação dos adaptadores
      PaymentGateway payPalAdapter = new PayPalAdapter(payPalAPI);
      PaymentGateway stripeAdapter = new StripeAdapter(stripeAPI);
      PaymentGateway mercadoPagoAdapter = new MercadoPagoAdapter(mercadoPagoAPI);

      // Uso do serviço de pagamento com diferentes adaptadores
      PaymentService paymentService = new PaymentService(payPalAdapter); // Aqui pode ser qualquer adaptador
      paymentService.makePayment(100); // Processa pagamento de $100 via PayPal

      paymentService = new PaymentService(stripeAdapter); // Alternando para Stripe
      paymentService.makePayment(150); // Processa pagamento de $150 via Stripe

      paymentService = new PaymentService(mercadoPagoAdapter); // Alternando para Mercado Pago
      paymentService.makePayment(200); // Processa pagamento de R$200 via Mercado Pago
  }
}


