public interface DiscountStrategy {
  double calculate(double price);
}


public class PercentageDiscount implements DiscountStrategy {
  private double percentage;

  public PercentageDiscount(double percentage) {
      this.percentage = percentage;
  }

  @Override
  public double calculate(double price) {
      return price - (price * percentage / 100);
  }
}

public class FixedDiscount implements DiscountStrategy {
  private double discountValue;

  public FixedDiscount(double discountValue) {
      this.discountValue = discountValue;
  }

  @Override
  public double calculate(double price) {
      return price - discountValue;
  }
}

public class ThresholdDiscount implements DiscountStrategy {
  private double threshold;
  private double discountValue;

  public ThresholdDiscount(double threshold, double discountValue) {
      this.threshold = threshold;
      this.discountValue = discountValue;
  }

  @Override
  public double calculate(double price) {
      if (price > threshold) {
          return price - discountValue;
      }
      return price;
  }
}


public class ShoppingCart {
  private DiscountStrategy discountStrategy;

  public ShoppingCart(DiscountStrategy discountStrategy) {
      this.discountStrategy = discountStrategy;
  }

  public void setDiscountStrategy(DiscountStrategy discountStrategy) {
      this.discountStrategy = discountStrategy;
  }

  public double calculateTotal(double price) {
      return discountStrategy.calculate(price);
  }
}


public class Main {
  public static void main(String[] args) {
      double price = 100.0;

      // Aplicando desconto percentual de 10%
      ShoppingCart cart = new ShoppingCart(new PercentageDiscount(10));
      System.out.println("Preço com desconto percentual: " + cart.calculateTotal(price)); // Output: 90.0

      // Mudando para desconto fixo de 15
      cart.setDiscountStrategy(new FixedDiscount(15));
      System.out.println("Preço com desconto fixo: " + cart.calculateTotal(price)); // Output: 85.0

      // Mudando para desconto por valor mínimo de 50 com desconto de 20
      cart.setDiscountStrategy(new ThresholdDiscount(50, 20));
      System.out.println("Preço com desconto por valor mínimo: " + cart.calculateTotal(price)); // Output: 80.0
  }
}
