//definição da interface 'DiscountStrategy'

interface DiscountStrategy {
  calculate(price: number): number;
}


//implementação das classes concretas
class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}

  calculate(price: number): number {
    return price - (price * this.percentage) / 100;
  }
}

class FixedDiscount implements DiscountStrategy {
  constructor(private discountValue: number) {}

  calculate(price: number): number {
    return price - this.discountValue;
  }
}

class ThresholdDiscount implements DiscountStrategy {
  constructor(private threshold: number, private discountValue: number) {}

  calculate(price: number): number {
    if (price > this.threshold) {
      return price - this.discountValue;
    }
    return price;
  }
}


//Classe contexto
class ShoppingCart {
  private discountStrategy: DiscountStrategy;

  constructor(discountStrategy: DiscountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  setDiscountStrategy(discountStrategy: DiscountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  calculateTotal(price: number): number {
    return this.discountStrategy.calculate(price);
  }
}

//Uso do Padrõa Strategy
// Produto com preço original de 100
const price = 100;

// Aplicando desconto percentual de 10%
const cart = new ShoppingCart(new PercentageDiscount(10));
console.log(cart.calculateTotal(price)); // Output: 90

// Mudando para desconto fixo de 15
cart.setDiscountStrategy(new FixedDiscount(15));
console.log(cart.calculateTotal(price)); // Output: 85

// Mudando para desconto por valor mínimo de 50 com desconto de 20
cart.setDiscountStrategy(new ThresholdDiscount(50, 20));
console.log(cart.calculateTotal(price)); // Output: 80

