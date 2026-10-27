# Backlog — login, visão teste e deploy

## Objetivo

Publicar o Pizza Shop com duas entradas: **Entrar** para usuários reais e
**Explorar demonstração** para visitantes. Após entrar em qualquer modo, usar
as mesmas telas de dashboard, pedidos e perfil, com a mesma navegação e ações.
A diferença estará na sessão e na origem dos dados. Na demonstração, exibir
um aviso persistente de dados fictícios e uma opção de reiniciar os dados.

Premissa inicial: manter o login por link enviado por e-mail, já sugerido pelo
formulário atual. Confirmar provedor, hospedagem e domínio antes da implementação.
Nenhum deploy ou contratação de serviço é realizado por este backlog.

## Entrega atual

- [x] Criar branch `dev-demo-backlog`.
- [x] Rodar sem backend usando `npm run dev` e manter `npm run dev:api`.
- [x] Ampliar para 240 pedidos, com itens, clientes, datas e totais variados.
- [x] Compartilhar dados entre lista, detalhes e ações, com estado em memória.
- [x] Separar descoberta dos testes unitários e alinhar porta/comando dos E2E.

## P0 — Base para lançamento

### 01. Definir infraestrutura e contrato da API

- [ ] Escolher hospedagem do frontend, backend, banco, serviço de e-mail e domínio.
- [ ] Documentar endpoints, formatos, paginação, filtros, erros e transições válidas.
- [ ] Definir modelo de usuário, restaurante, produto, pedido e item do pedido.
- [ ] Definir fuso horário e regras de receita, cancelamentos e comparação de períodos.

**Aceite:** decisões registradas, custos estimados e contrato cobrindo todas as
chamadas existentes em `src/api`. Dependência para os itens 02 e 03.

### 02. Backend e persistência

- [ ] Implementar API, banco, migrações e seed de homologação.
- [ ] Calcular valores e validar transições de status no servidor.
- [ ] Autorizar acesso por usuário/restaurante em todas as operações.
- [ ] Implementar filtros e paginação consistentes com a interface.

**Aceite:** dados persistem após reinício; um usuário não acessa nem modifica
pedidos de outro restaurante; totais correspondem aos itens.

### 03. Login e sessão reais

- [ ] Enviar link de acesso com token de uso único e expiração curta.
- [ ] Criar callback, tratamento de link expirado/inválido e opção de reenvio.
- [ ] Usar sessão em cookie HttpOnly, Secure em produção e política SameSite adequada.
- [ ] Proteger endpoints, configurar CORS/CSRF conforme a arquitetura e limitar tentativas.
- [ ] Implementar carregamento da sessão, proteção de rotas, logout e expiração.
- [ ] Definir cadastro e associação do primeiro usuário ao restaurante.

**Aceite:** login funciona com e-mail real; atualização da página mantém a sessão;
logout a invalida no servidor; acessar rota protegida sem sessão leva ao login.
Depende de 01 e 02.

### 04. Visão teste com as mesmas telas

- [ ] Criar entrada pública com botões “Entrar” e “Explorar demonstração”.
- [ ] Separar acesso aos dados reais e simulados atrás de um contrato comum.
- [ ] Compartilhar componentes e fluxos entre sessão autenticada e demonstração.
- [ ] Adicionar aviso “Demonstração — dados fictícios”, saída e reset.
- [ ] Isolar estado por visitante; nunca enviar mutações de demonstração à API real.
- [ ] Limpar cache e estado ao alternar entre demonstração e sessão real.
- [ ] Permitir dados simulados em produção por seleção explícita do visitante,
      sem depender de publicar todo o projeto com `--mode test`.
- [ ] Ajustar login, cadastro, perfil e logout simulados para não enviar e-mails
      nem dar a entender que uma conta real foi criada.

**Aceite:** visitante percorre as mesmas telas e ações de um usuário logado;
reset restaura os dados; dois visitantes não compartilham alterações; sair da
visão teste e entrar numa conta não reaproveita dados ou cache da demonstração.
Depende do contrato em 01; pode avançar em paralelo ao backend.

### 05. Métricas coerentes e estados da interface

- [ ] Calcular indicadores, produtos populares e receita usando os pedidos da demo.
- [ ] Fazer gráfico respeitar o período escolhido e remover datas fixas de 2024.
- [ ] Atualizar detalhes, listas filtradas e métricas após cada ação.
- [ ] Tratar carregamento, listas vazias, falhas de rede e sessão expirada.
- [ ] Validar navegação em celular, teclado e leitores de tela.

**Aceite:** receitas e quantidades reconciliam com os pedidos do período;
mudar o período atualiza o gráfico; falhas apresentam orientação e nova tentativa.
Depende de 01 e 04.

### 06. Homologação e publicação

- [ ] Criar ambientes separados de homologação e produção e documentar variáveis.
- [ ] Configurar CI com instalação pelo lockfile, tipos/build, unitários e E2E.
- [ ] Cobrir login/logout, sessão expirada, isolamento de restaurantes, demonstração,
      filtros, paginação, detalhes e transições de pedidos.
- [ ] Configurar HTTPS, domínio, fallback de SPA, URLs de callback e cookies.
- [ ] Configurar logs, monitoramento de erros, health check, backups e restauração.
- [ ] Preparar procedimento de migração, rollback e verificação após deploy.
- [ ] Validar em homologação e aprovar a versão antes de publicar em produção.

**Aceite:** abrir diretamente `/orders` e recarregar funciona; login e demo passam
em homologação; CI verde; backup e rollback documentados e exercitados.
Depende de 02–05.

## P1 — Após o primeiro deploy

- [ ] Persistência opcional da demo no navegador, com versão e botão de reset.
- [ ] Catálogo e clientes mais completos, com cenários sazonais e de alto volume.
- [ ] Otimizar bundle e carregamento dos gráficos.
- [ ] Renovar dependências com validação de compatibilidade.
- [ ] Instrumentar desempenho e uso sem registrar tokens ou dados pessoais sensíveis.

## Sequência sugerida

01 → 02/03 e 04 → 05 → 06. Cada entrega deve incluir testes do comportamento
alterado e atualização das instruções de execução. O lançamento só está pronto
quando login real e visão teste funcionarem no mesmo build de produção.
