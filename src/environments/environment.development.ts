export const environment = {

    SERVIDOR: "http://localhost:8080"
    // o environments é para quando for necessário ter mais de um ambiente, como desenvolvimento, produção, etc. Assim, podemos configurar as variáveis de ambiente para cada um desses ambientes e o Angular irá usar a configuração correta dependendo do ambiente em que a aplicação estiver rodando. Tipo, rodar na AWS e rodar localmente, aí tem variáveis de ambiente diferentes para cada um desses ambientes.
    //Essa classe development é para quando a gente estiver rodando a aplicação localmente, aí a variável de ambiente SERVIDOR vai apontar para o localhost. 
};
