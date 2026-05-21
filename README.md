# 🛒 E-PDV - Frontend (Ponto de Venda)

Este é o repositório do frontend do **E-PDV**, um sistema de Ponto de Venda moderno, ágil e intuitivo desenvolvido como Projeto Integrador para o Senac. A aplicação foi construída em **React** para oferecer uma experiência de usuário fluida, com atualizações em tempo real no carrinho e fechamento de caixa.

---

### 📌 Links do Projeto
- Repositório Backend: https://github.com/eczdevjs/pdv-backend-projeto-integrador-senac
- ▶️ Demonstração em Vídeo (YouTube): https://www.youtube.com/watch?v=k_fSXlfXJnE

## 🚀 Tecnologias Utilizadas

* **React.js** (Biblioteca principal para construção da interface)
* **React Router Dom V5** (Gerenciamento de rotas e navegação da SPA)
* **Axios** (Cliente HTTP para consumo da API integrada)
* **Context API / Hooks / Redux Saga** (Gerenciamento de estado global para o carrinho, autenticação e efeitos colaterais)
* **Styled Components** (Biblioteca de CSS-in-JS para estilização dinâmica, escopo isolado de componentes e utilização de temas)

---

## 💻 Telas e Funcionalidades Implementadas

* **🔑 Tela de Login (Autenticação):** Integração com o Bearer Token obtido do backend, salvando o estado de sessão do usuário de forma segura.
* **📊 Tela de Dashboard de Vendas:** Integração com os dados analíticos do backend, exibindo gráficos e métricas de desempenho de vendas em tempo real.
* **📦 Gestão de Produtos:** Listagem, visualização de detalhes e controle visual de estoque.
* **🛒 Frente de Caixa (PDV):** Interface dinâmica para bipar/selecionar produtos, atualizar quantidades no carrinho, calcular o total automaticamente e simular o pagamento.
* **👥 Cadastro de Clientes:** Interface para vincular um cliente à venda atual.
* **📊 Histórico de Caixa:** Visualização do status do caixa (Aberto/Fechado) e últimas transações filtradas.
---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) e um gerenciador de pacotes (npm ou yarn) instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone githttps://github.com/eczdevjs/pdv-frontend-projeto-integrador-senac.git
cd pdv-frontend-projeto-integrador-senac
```

### 2. Instalar as Dependências

```bash
npm install
# ou yarn install

```



### 3. Configuração da API (Backend)
Como este projeto está em ambiente de desenvolvimento acadêmico, a conexão com o backend está configurada diretamente no arquivo de serviços, apontando por padrão para: http://localhost:3001

💡 **Nota sobre Arquitetura**: Por se tratar de um MVP (Mínimo Produto Viável) para fins didáticos e rodar estritamente em ambiente local (localhost), optamos por centralizar a URL base no arquivo de serviço para acelerar o desenvolvimento. No entanto, estamos cientes de que para um ambiente de produção real (deploy), a melhor prática de segurança e escalabilidade seria isolar essa URL em um arquivo .env.

Se precisar alterar a URL da API, abra o projeto e navegue até:

- src/services/axios.js

- Altere a propriedade baseURL: "sua_url_desejada"



### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm start
```


### 🔗 Integração com o Backend & Segurança
O frontend consome as rotas protegidas da API utilizando a estratégia de Bearer Token.

1 -  Ao efetuar o login, o token JWT retornado pela API é armazenado localmente, sendo gerenciado com o auxílio do Saga para fluxos assíncronos.

2  - Todas as requisições subsequentes para rotas protegidas (como salvar uma venda ou cadastrar produto) incluem automaticamente esse token no cabeçalho (Header) das requisições:

    Authorization: Bearer <seu_token_jwt>


### 🎨 Arquitetura de Estilização (Styled Components)
A opção pelo Styled Components garante os seguintes benefícios de engenharia de software no frontend:

- Escopo Isolado: Evita conflitos de classes CSS (CSS Leaking) entre diferentes telas do PDV.

- Estilização Dinâmica: Facilidade para alterar cores e estados de elementos (como alertas de estoque baixo) diretamente através das props do React.

- Estilo Global: Centralização de fontes, resets e variáveis de cores padrões do sistema.




