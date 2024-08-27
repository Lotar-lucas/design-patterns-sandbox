// exemple Static Factory Method

class Car {
  constructor(public brand: string, public model: string) {}
  
  drive(): void {
    console.log(`Driving a ${this.brand} ${this.model}`);
  }
}

class ElectricCar extends Car {
  constructor(model: string) {
    super('Tesla', model);
  }

  drive(): void {
    console.log(`Silently driving a ${this.brand} ${this.model}`);
  }
}

class CarFactory {
  // Static Factory Method
  static createCar(type: string): Car {
    if (type === 'electric') {
      return new ElectricCar('Model S');
    } else {
      return new Car('Toyota', 'Corolla');
    }
  }
}

// Usage
const car1 = CarFactory.createCar('electric');
car1.drive(); // saida: Silently driving a Tesla Model S

const car2 = CarFactory.createCar('gasoline');
car2.drive(); // saida: Driving a Toyota Corolla


// Complete factory method example
interface Transport {
  deliver(): void;
}


class Car implements Transport {
  deliver(): void {
    console.log('Delivering by car.');
  }
}

class Bike implements Transport {
  deliver(): void {
    console.log('Delivering by bike.');
  }
}

abstract class Logistics {
  // O Factory Method
  abstract createTransport(): Transport;

  // O método que usa o produto criado
  planDelivery(): void {
    const transport = this.createTransport();
    transport.deliver();
  }
}

// classes concretas que implementam o factory method
class RoadLogistics extends Logistics {
  createTransport(): Transport {
    return new Car();
  }
}

class BicycleLogistics extends Logistics {
  createTransport(): Transport {
    return new Bike();
  }
}

// Uso
function clientCode(logistics: Logistics) {
  logistics.planDelivery();
}

// Pode ser RoadLogistics ou BicycleLogistics
const logistics1 = new RoadLogistics();
clientCode(logistics1); // Output: Delivering by car.

const logistics2 = new BicycleLogistics();
clientCode(logistics2); // Output: Delivering by bike.



