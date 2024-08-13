# Quem for usar o docker-compose, basta colocar assim no .env:
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
# Caso tenha trocado suas credenciais, alterar:
DATABASE_URL="postgresql://<USERNAME>:<PASSWORD>@<IP>:5432/mydb?schema=public"

# criar projeto
npx create-next-app@latest fsw-barber

# instalar prisma
npm install prisma --save-dev

# cria um schema e vc precisa modelar
npx prisma init --datasource-provider postgresql

# formatar o schema
npx prisma format

# cria migration em dev
npx prisma migrate dev --name init_db

# add nos scripts package.json e instalar:
npm install -D ts-node 

# executar o sript
npx prisma db seed

# install prettier prettier-plugin-tailwindcss
npm install -D prettier prettier-plugin-tailwindcss

# install shadcn
https://ui.shadcn.com/
npx shadcn-ui@latest init

# husky para rodar prettier e eslint antes de cada commit
npm install -D husky lint-staged
npx husky init

# Garantir conventional commit mensage
npm install -D git-commit-msg-linter

# conventional commit type:
    feat     Adição de funcionalidade.
    fix      Correção de defeito.
    docs     Mudança em documentação.
    style    Mudança de formatação ou estilo, que não afeta a execução do código (espaço, tabulação, etc).
    refactor Mudança na organização do código, que não afeta o comportamento existente.
    test     Adição ou mudança de um teste.
    chore    Adição ou mudança em script de build, que não afeta o código de produção.
    perf     Mudança de código para melhoria de desempenho.
    ci       Mudança de configuração de integração contínua.
    build    Mudança em arquivos de build ou em dependências externas.
    temp     Commit temporário, que não deve ser incluído no CHANGELOG.

  scope:
    Opcional, pode ser qualquer coisa que especifique o escopo da mudança.
    Exemplos: subpacote, workspace, módulo, componente, página.       

  subject:
    Breve resumo da mudança, escrito no tempo verbal presente. Começa com letra minúscula e não há ponto final.
