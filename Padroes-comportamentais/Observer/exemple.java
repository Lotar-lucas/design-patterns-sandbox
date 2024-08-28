import java.util.ArrayList;
import java.util.List;

// Interface Observer
interface Observer {
    void update(Product product);
}

// Interface Subject
interface Subject {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// Produto (Subject)
class Product implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String name;
    private int quantity;

    public Product(String name, int initialQuantity) {
        this.name = name;
        this.quantity = initialQuantity;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        notifyObservers();
    }

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(this);
        }
    }
}

// Serviço de Email (Observer)
class EmailService implements Observer {
    @Override
    public void update(Product product) {
        System.out.println("EmailService: O produto " + product.getName() +
                           " teve sua quantidade atualizada para " + product.getQuantity() + ".");
    }
}

// Serviço de Reabastecimento Automático (Observer)
class AutoRestockService implements Observer {
    @Override
    public void update(Product product) {
        if (product.getQuantity() < 5) {
            System.out.println("AutoRestockService: O produto " + product.getName() +
                               " está abaixo do limite, acionando reabastecimento.");
        }
    }
}

// Serviço de Relatório de Inventário (Observer)
class InventoryReportService implements Observer {
    @Override
    public void update(Product product) {
        System.out.println("InventoryReportService: Atualizando o relatório de estoque para o produto " +
                           product.getName() + ".");
    }
}

// Uso do sistema
public class Main {
    public static void main(String[] args) {
        Product produto1 = new Product("Notebook", 10);

        Observer emailService = new EmailService();
        Observer autoRestockService = new AutoRestockService();
        Observer inventoryReportService = new InventoryReportService();

        produto1.addObserver(emailService);
        produto1.addObserver(autoRestockService);
        produto1.addObserver(inventoryReportService);

        produto1.setQuantity(4); // Atualiza a quantidade e notifica todos os observadores

        produto1.removeObserver(emailService);

        produto1.setQuantity(12); // Notifica os observadores restantes
    }
}
