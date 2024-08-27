// exemple complete factory method in Java
// Interface Transport
public interface Transport {
  void deliver();
}


// Classe Car que implementa Transport
public class Car implements Transport {
  @Override
  public void deliver() {
      System.out.println("Delivering by car.");
  }
}

// Classe Bike que implementa Transport
public class Bike implements Transport {
  @Override
  public void deliver() {
      System.out.println("Delivering by bike.");
  }
}


// Classe abstrata Logistics
public abstract class Logistics {
  // Método Factory (Factory Method)
  public abstract Transport createTransport();

  // Método que utiliza o produto criado
  public void planDelivery() {
      Transport transport = createTransport();
      transport.deliver();
  }
}

// Classe RoadLogistics que implementa Logistics
public class RoadLogistics extends Logistics {
  @Override
  public Transport createTransport() {
      return new Car();
  }
}

// Classe BicycleLogistics que implementa Logistics
public class BicycleLogistics extends Logistics {
  @Override
  public Transport createTransport() {
      return new Bike();
  }
}

// Classe principal para testar o Factory Method
public class Main {
  public static void main(String[] args) {
      // Pode ser RoadLogistics ou BicycleLogistics
      Logistics logistics1 = new RoadLogistics();
      logistics1.planDelivery(); // Output: Delivering by car.

      Logistics logistics2 = new BicycleLogistics();
      logistics2.planDelivery(); // Output: Delivering by bike.
  }
}


