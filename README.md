# Pizza Shop

Painel de pizzaria em React, TypeScript e Vite, com dashboard, pedidos, perfil,
login e cadastro. Usa React Query, Axios, Tailwind e MSW.

## Executar localmente

Com o nvm instalado:

```bash
nvm use
npm ci
npm run dev
```

Se necessário, use `nvm install` para instalar o Node 22 indicado em `.nvmrc`.
Abra o endereço exibido no terminal (normalmente http://localhost:5173).
Se a porta estiver ocupada, o Vite escolherá outra.

`npm run dev` usa o modo `test` do Vite e carrega `.env.test`, ativando a API
simulada no navegador. Não precisa de backend nem de `.env` adicional.
`npm run dev:test` oferece o mesmo modo na porta 1985 para os testes E2E.

- Dashboard: `/`.
- Pedidos: `/orders`, com 240 registros fictícios em 24 páginas.
- Login simulado: `/sign-in`, usando `johndoe@example.com`. Não envia e-mail real.

Os pedidos têm datas distribuídas pelos últimos 60 dias, clientes fictícios,
produtos e totais variados. Lista e detalhes compartilham os mesmos registros.
Aprovação, cancelamento, despacho e entrega alteram os dados em memória;
recarregar a página restaura a demonstração. Os indicadores do dashboard ainda
usam suas próprias fixtures; a integração das métricas faz parte do backlog.

## Executar com backend real

O backend não está incluído neste repositório:

```bash
cp .env.example .env.local
```

Configure `VITE_API_URL` em `.env.local` com a URL real da sua API. A porta 3333
do exemplo é ilustrativa; não existe um servidor nessa porta por padrão.

```bash
npm run dev:api
```

Esse comando desativa os mocks. Reinicie o Vite após alterar variáveis de
ambiente. O build padrão também exige uma API real configurada.
Não coloque segredos em variáveis `VITE_*`: elas são expostas no navegador.

## Verificações

```bash
npm test -- --run
npm run build
npx playwright install chromium
npx playwright test
```

O Vitest executa apenas os testes unitários de `src`. O Playwright inicia
`npm run dev:test` na porta 1985, ou reutiliza esse servidor em ambiente local.

## Próximas entregas

Veja [BACKLOG.md](BACKLOG.md) para o plano de login real, visão teste e deploy.
O modo local atual não implementa autenticação real nem a entrada pública de
uma demonstração em produção.
