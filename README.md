# Teste Técnico para Desenvolvedores Ruby on Rails


Bem-vindo ao teste técnico para a posição de desenvolvedor Ruby on Rails no Espresso. Este teste foi elaborado para avaliar suas habilidades de programação, conhecimento do framework Ruby on Rails, ReactJS, e sua capacidade de desenvolvimento de código de qualidade.

## Instruções Gerais
Faça um fork desse repositório e desenvolva sua solução a partir dessa base.
Certifique-se de incluir testes automatizados e garantir a cobertura total para sua aplicação (back-end e front-end). Existe um pipeline de integração contínua já configurado com Github Actions para avaliar o código final entregue.

Você irá criar uma aplicação web para gerenciamento de despesas de cartões corporativos integrados a um BaaS (_Banking as a Service_), onde os funcionários poderão comprovar e classificar suas despesas.

## Requisitos
1. **Cadastro da conta**

    Usuário deve ser capaz de criar uma nova conta, informando os seus dados pessoais (nome, email e senha) e os dados da empresa (nome e cnpj). O usuário que criar a conta será definido como administrador dessa conta para a empresa;

2. **Perfis de acesso**

    Deverá existir dois perfis de acesso: **Administrador** e **Funcionário**.

3. **Funções do perfil Administrador**

    O usuário de perfil administrador deve ser capaz de:

    * Acessar sua conta informado email e senha;
    * Visualizar a lista de despesas de todos os cartões de sua empresa;
    * Visualizar de forma segmentada as despesas comprovadas, não comprovadas e arquivadas;
    * Arquivar despesas ainda não comprovadas;
    * Cadastrar, editar e excluir os funcionários dessa empresa. No cadastro deve ser possível informar os dados de nome e email do funcionário. Ao efetuar o cadastro, o funcionário deve receber um email com sua senha de acesso;
    * Cadastrar, editar e excluir os cartões corporativos. No cadastro deve ser possível informar os últimos 4 dígitos do cartão. Deve ser possível também associar um cartão a um funcionário;
    * Cadastrar, editar e excluir as categorias para classificação das despesas;

4. **Funções do perfil Funcionário**

    O usuário de perfil funcionário deve ser capaz de:

    * Acessar sua conta informado email e senha. Senha será recebida no email de cadastro;
    * Visualizar a lista de despesas dos seus cartões;
    * Visualizar de forma segmentada as suas despesas comprovadas e não comprovadas;
    * Anexar um comprovante em despesas do seu cartão. Formatos suportados: jpeg, png ou pdf;
    * Atualizar comprovante da despesa;
    * Associar uma categoria em despesas do seu cartão;
    * Atualizar categoria da despesa;

5. **Gerenciamento de Despesas**

    As despesas devem ser listadas pela ordem das mais recentes primeiro. A despesa é definida como comprovada, ou de prestação de contas concluída, quando estiver associada um arquivo de comprovação e classificada com uma categoria. Deve haver uma segmentação das despesas comprovadas, não comprovadas, e arquivadas. Nenhuma despesa de cartão poderá ser excluída, porém o administrador terá a possibilidade de arquivar alguma despesa que não necessite de prestação de contas.

    A criação das despesas se dará por meio de um webhook integrado ao BaaS. A aplicação deve receber a notificação de uma nova compra no cartão no seguinte formato:

    ```json
    // POST /api/baas/webhooks
    {
      "merchant": "Uber *UBER *TRIP",
      "cost": 1790,
      "created_at": "2024-07-04 12:15:52",
      "last4": "1234",
      "transaction_id": "3e85a730-bb1f-451b-9a39-47c55aa054db"
    }
    ```
    Observações:

    * O valor da transação de compra no cartão é recebida como um inteiro. O valor em Reais (R$) é obtido após divisão por 100.
    * A data e hora da compra no cartão é recebida em UTC. Deve-se ter um cuidado ao apresentar a data e hora de forma correta no timezone da aplicação (preferencialmente no horário de brasília).

## Informações Adicionais

1. **Framework e Ferramentas**

    Utilize Ruby on Rails na versão 5.2 e MySQL 8.x como banco de dados. Utilize o ReactJS juntamente com MUI (https://mui.com/) como meio principal de desenvolvimento do front-end. RSpec e Jest devem ser as ferramentas utilizadas para o desenvolvimento de testes automatizados.

2. **Boas Práticas de Código**

    Siga as melhores práticas de Ruby on Rails para estruturação e organização do código.
    Garanta que o código seja limpo, e fácil de entender. Procure seguir os princípios SOLID.
    Mantenha uma organização dos commits bem descritiva de forma que conte uma história da evolução da aplicação.

3. **Testes**

    Implemente testes para o back-end e front-end. Mantenha a cobertura de testes em 100% da aplicação.
    Procure desenvolver testes que abranjam bem os cenários possíveis de cada funcionalidade, com uma boa qualidade.

4. **Diagrama ER**

    Para apoiar no entendimento da estrutura proposta para aplicação, segue o diagrama de Entidade-Relacionamento. Esse diagrama deve ser apenas um guia e não um requisito de desenvolvimento.

    ```mermaid
    ---
    title: Diagrama Entidade-Relacionamento
    ---
    erDiagram
        Company ||--|{ User : "company has_many users"
        Company ||--o{ Card : "company has_many cards"
        Company ||--o{ Category : "company has_many categories"
        User ||--o| Card : "user has_one card"
        Card ||--o{ Statement : "card has_many statements"
        Statement ||--o| Attachment : "statement has_one attachments"
        Statement }o--o| Category : "statement belongs_to category"
        Company {
          string name
          string cnpj
          datetime created_at
          datetime updated_at
        }
        User {
          string name
          string email
          string password
          int role
          reference Company
          datetime created_at
          datetime updated_at
        }
        Card {
          string last4
          reference User
          datetime created_at
          datetime updated_at
        }
        Category {
          string name
          reference Company
          datetime created_at
          datetime updated_at
        }
        Statement {
          datetime performed_at
          int cost
          string merchant
          int transaction_id
          reference Category
          datetime created_at
          datetime updated_at
        }
        Attachment {
          attachment file
          reference Statement
          datetime created_at
          datetime updated_at
        }
    ```

5. **Interface do Usuário**

    Segue abaixo o link com os desenhos das telas que deverão ser implementadas nessa aplicação web. É importante desenvolver o front-end seguindo os detalhes determinados nesses desenhos, será parte importante na avaliação.

    https://www.figma.com/design/Bsghtem8nzyfUBxYhRScjH/Teste-T%C3%A9cnico-para-Desenvolvedores-Ruby-on-Rails

6. **Github Actions**

    Após o fork do projeto, acesse a aba "Actions", e habilite a execução de workflows. Fazer esse passo nós ajuda na avaliação inicial de qualidade do seu projeto.

## Avaliação

Seu teste será avaliado com base nos seguintes critérios:

* **Funcionalidades:** Se as funcionalidades requeridas foram implementadas e se funcionam corretamente;
* **Qualidade do Código:** Se o código está claro, organizado e bem aderente às melhores práticas. Também será avaliado o correto uso do Rubocop, e a organização dos commits;
* **Testes:** Se a cobertura de testes da está em 100% da aplicação. Como também, será avaliada a qualidade de escrita desses testes;
* **Usabilidade:** Se a interface de usuário segue o desenho determinado nesse descritivo, e se está funcionando da forma esperada;
* **Integração de Tecnologias:** Uso eficaz de ReactJS com MUI (https://mui.com/).

Bônus:

* **Segurança:** Implementação de mecanismos de segurança;
* **Disponibilidade:** Realizar o deploy da aplicação em algum PaaS (ex.: Heroku);

> #### Muito Importante!
> Entregas realizadas sem o desenvolvimento de testes de back-end e front-end, sem estar com 100% da cobertura de testes da aplicação, sem desenvolvimento de front-end, ou sem atender o fluxo de integração contínua do Github Actions, não serão avaliados e já serão automaticamente eliminados do processo seletivo.

## Entrega

Ao concluir o desenvolvimento, envie o link do seu repositório na resposta do email que recebeu sobre o teste técnico. Lembre-se de manter todos em cópia.

O prazo de entrega estimado para esse teste é de **5 dias** corridos, a partir da confirmação do recebimento. Porém, o candidato pode negociar o prazo de entrega para mais ou menos dias, aproveite esse recurso.

Boa sorte! Se tiver qualquer dúvida durante o desenvolvimento, não hesite em nos contatar.