/** * A classe Singleton define um getter `instance`, que permite aos clientes acessar * a instância singleton exclusiva. */

class Singleton {
    static instance: Singleton;

    /** * O construtor do Singleton deve ser sempre privado para evitar * chamadas de construção com o operador `new`. */
    private constructor() {}

    /** * O getter estático que controla o acesso à instância singleton. * * Esta implementação permite estender a classe Singleton enquanto * mantendo apenas uma instância de cada subclasse. */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }


    /** * Finalmente, qualquer singleton pode definir alguma lógica de negócio, que pode ser * executado em sua instância. */
    public someBusinessLogic() {}
}



/**
 * The client code.
 */
function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log(
            'Singleton works, both variables contain the same instance.'
        );
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();