/*Problema
    implementação de um sistema de monitoramento de estoque. Quando a quantidade de um produto no estoque é alterada,
    diferentes serviços precisam ser notificados, como o serviço de envio de notificações por e-mail, o sistema de reordenação automática, 
    e o serviço de relatório de inventário.
*/

// Interface Observer
interface Observer {
  update(product: Product): void;
}

// Interface Subject
interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

// Produto (Subject)
class Product implements Subject {
  private observers: Observer[] = [];
  private _quantity: number;

  constructor(public name: string, initialQuantity: number) {
    this._quantity = initialQuantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
    this.notifyObservers();
  }

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

// Serviço de Email (Observer)
class EmailService implements Observer {
  update(product: Product): void {
    console.log(`EmailService: O produto ${product.name} teve sua quantidade atualizada para ${product.quantity}.`);
  }
}

// Serviço de Reabastecimento Automático (Observer)
class AutoRestockService implements Observer {
  update(product: Product): void {
    if (product.quantity < 5) {
      console.log(`AutoRestockService: O produto ${product.name} está abaixo do limite, acionando reabastecimento.`);
    }
  }
}

// Serviço de Relatório de Inventário (Observer)
class InventoryReportService implements Observer {
  update(product: Product): void {
    console.log(`InventoryReportService: Atualizando o relatório de estoque para o produto ${product.name}.`);
  }
}

// Uso do sistema
const produto1 = new Product('Notebook', 10);

const emailService = new EmailService();
const autoRestockService = new AutoRestockService();
const inventoryReportService = new InventoryReportService();

produto1.addObserver(emailService);
produto1.addObserver(autoRestockService);
produto1.addObserver(inventoryReportService);

produto1.quantity = 4; // Atualiza a quantidade e notifica todos os observadores

produto1.removeObserver(emailService);

produto1.quantity = 12; // Notifica os observadores restantes


//Product: Mantem uma lista de observadores e notifica-os quando seu estado muda.
//Observer: Define uma interface para objetos que devem ser notificados sobre mudanças em um Subject.
// Notificações: Qaundo produtc1 tem sua quantidade alterada, ele notifica todos os observadores. Entretanto o AutoRestockService só
// é notificado quando a quantidade do produto é inferior a 5.