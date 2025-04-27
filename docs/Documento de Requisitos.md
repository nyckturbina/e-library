# Análise de Requisitos do Sistema: Biblioteca Virtual

## 1. Introdução

### Descrição Geral do Sistema

A Biblioteca Virtual é uma aplicação web voltada para a administração e uso de uma biblioteca online. O sistema permite que os clientes busquem livros, visualizem detalhes, solicitem empréstimos e recebam lembretes, enquanto administradores podem cadastrar novos exemplares, gerar relatórios de empréstimos e gerenciar o cadastro de clientes. A persistência dos dados será realizada em um banco de dados relacional, garantindo integridade e facilidade de consultas.

### Objetivos Principais

- Facilitar a pesquisa e visualização de livros: permitir a busca por título, autor, gênero ou ISBN.
- Gerenciar empréstimos: registrar empréstimos virtuais com prazos definidos, controlar a disponibilidade dos exemplares e gerenciar multas por atraso.
- Gerenciar clientes e administração: oferecer funcionalidades específicas para administradores, como cadastro de novas obras, controle de clientes e geração de relatórios.
- Personalização e engajamento: implementar recomendações com base no histórico de leitura e avaliações dos livros, incentivando o uso contínuo e proporcionando uma experiência personalizada.

## 2. Atores do Sistema

### 2.1. Cliente

**Perfil:** Leitores cadastrados na biblioteca.

### 2.2. Administrador

**Perfil:** Bibliotecários ou gestores com acesso a funções administrativas.

## 3. Requisitos Funcionais (RF)

### RF 001 – Manter Livros e Exemplares
**Ator:** Administrador  
**Descrição:** Permitir que administradores cadastrem, editem e excluam livros com informações detalhadas.  
**Entradas:** Formulário contendo:
- Título (texto, obrigatório)
- Autor (texto, obrigatório)
- Gênero (caixa de seleção, obrigatório)
- ISBN (texto, formato válido)
- Sinopse (texto longo)
- Quantidade disponível (número inteiro positivo)  
**Saídas:** Registro no banco de dados e atualização do catálogo.  
**Prioridade:** Obrigatório

### RF 002 – Busca e Visualização de Livros
**Atores:** Cliente, Administrador  
**Descrição:** Permitir busca de livros por título, autor, gênero e ISBN.  
**Entradas:** Formulário de busca com:
- Termo de pesquisa (texto)
- Filtros (título, gênero, etc.)  
**Saídas:** Lista paginada de livros contendo:
- Título
- Autor
- Disponibilidade (quantidade disponível/total)
- Imagem da capa (opcional)  
**Prioridade:** Obrigatório

### RF 003 – Registro de Empréstimos
**Ator:** Cliente, Administrador  
**Descrição:** Registrar empréstimos com controle de prazo.  
**Entradas:** 
- Seleção do livro
- Prazo (automaticamente calculado pelo sistema)  
**Saídas:** 
- Comprovação do empréstimo
- Atualização da quantidade disponível  
**Prioridade:** Obrigatório


### RF 004 – Controle de Disponibilidade

**Atores:** Cliente, Administrador  
**Descrição:** Atualizar a disponibilidade dos exemplares.  
**Entradas:** Empréstimo ou devolução.  
**Saídas:** Status atualizado em tempo real.  
**Prioridade:** Obrigatório

### RF 005 – Multas e Lembretes

**Descrição:** Calcular multas por atraso e enviar lembretes.  
**Entradas:** Dados de empréstimos vencidos.  
**Saídas:** Notificações e aplicação de multas.  
**Prioridade:** Necessário

### RF 006 – Autenticação e Acesso

**Descrição:** Login com diferenças de permissão.  
**Entradas:** Usuário e senha.  
**Saídas:** Acesso com permissões ou mensagem de erro.  
**Prioridade:** Obrigatório

### RF 007 – Geração de Relatórios

**Descrição:** Administradores podem gerar relatórios de empréstimos, devoluções, multas e estatísticas.  
**Entradas:** Critérios para filtragem.  
**Saídas:** Relatórios visualizáveis ou exportáveis.  
**Prioridade:** Necessário

### RF 008 – Recomendações Personalizadas

**Descrição:** Sugerir livros com base no histórico do cliente e suas avaliações após a devolução do exemplar.  
**Entradas:** Dados de histórico e avaliações.  
**Saídas:** Lista de recomendações personalizadas.
**Prioridade:** Opcional

### RF 009 – Envio Automático de Notificações

**Descrição:**  
O sistema enviará automaticamente:
- Lembretes de devolução (e-mail/notificação no sistema)
- Alertas de multas aplicadas
- Confirmações de empréstimo/devolução

**Entrada:** Eventos do sistema (prazo de devolução, empréstimo registrado, etc.)
**Prioridade:** Obrigatório

### RF 010 – Manter Clientes

**Ator:** Administrador  
**Descrição:** Permitir que administradores gerenciem o cadastro de clientes, incluindo criação, edição, desativação e exclusão de contas.  
**Entradas:**  
- Dados do cliente (nome, e-mail, perfil, status).
- Ações (cadastrar, editar, desativar, excluir).

**Saídas:**  
- Confirmação de operação (sucesso/erro).
- Atualização no banco de dados.

**Prioridade:** Obrigatório

### RF011 – Gerenciar Devolução de Livros

**Ator:** Cliente (para auto devolução) ou administrador (para devoluções manuais).  
**Descrição:** Permitir que clientes e administradores registrem a devolução de livros emprestados, atualizando o status de disponibilidade e verificando possíveis multas por atraso.  
**Entradas:**  
- Livro/exemplar a ser devolvido.
- Data de devolução (para cálculo de multas, se aplicável).

**Saídas:**  
- Confirmação de devolução.
- Atualização do status do exemplar (disponível/no estoque).
- Cálculo automático de multa (se houver atraso).

**Prioridade:** Obrigatório.

### RF 012 – Definir Prazos de Empréstimo

**Descrição:** O sistema deve determinar automaticamente o prazo de devolução com base nas políticas da biblioteca (Uma semana a cada 100 páginas).  
**Entradas:**  
- Livro (quantidade páginas)
- Data do empréstimo

**Saídas:**
- Data de devolução calculada
- Notificação do prazo ao cliente

**Prioridade:** Obrigatório

### RF 013 – Consultar Disponibilidade em Tempo Real

**Ator:** Cliente, Administrador  
**Descrição:** Verificar a disponibilidade de exemplares antes do empréstimo, considerando exemplares físicos disponíveis  
**Entradas:** Nome ou ISBN do livro  
**Saídas:**  
- Status (Disponível/Indisponível)
- Quantidade disponível

**Prioridade:** Obrigatório

### RF 014 – Avaliar livro

**Ator:** Cliente  
**Descrição:** O cliente pode avaliar o livro com like ou deslike após a devolução do exemplar.  
**Entradas:** Devolução do livro  
**Saídas:** Exibir a avaliação dada  
**Prioridade:** Necessário

## 4. Requisitos Não Funcionais (RNF)

### RNF 001 – Interface Intuitiva
Interface clara e responsiva.

### RNF 002 – Centralização de Dados
- Banco de dados H2DB (Persistência em disco)
- Schema único para toda a aplicação

### RNF 003 – Segurança dos Dados
Autenticação, criptografia e controle de acesso.

### RNF 004 – Compatibilidade Multiplataforma
Compatível com navegadores modernos e OS diversos.

### RNF 005 – Desempenho e Escalabilidade
Boa performance com crescimento de usuários.

## 5. Classificação de Prioridades dos Requisitos

- **Obrigatório:** Cadastro, busca, empréstimos, autenticação.
- **Necessário:** Relatórios, controle de multas e exemplares.
- **Opcional:** Recomendações personalizadas

## 6. Regras de Negócio
- RN001: Cálculo de prazo: 7 dias + 1 dia adicional a cada 100 páginas completas
- RN002: Multa por atraso: R$ 2,00 por dia de atraso por livro
- RN003: Limite de empréstimos: 2 livros simultâneos por cliente