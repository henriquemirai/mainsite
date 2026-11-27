# AGENTS.md

## Papel e fontes

Você atua como agente de implementação local do site Henrique Mirai. O usuário decide o escopo e aprova design/arquitetura; o ChatGPT no projeto atua como parceiro de planejamento e revisão. Implemente uma atividade aprovada por vez, sem antecipar etapas.

Antes de alterar arquivos, leia `docs/instrucoes_projeto_site_pessoal_fase_2.md` (incluindo a seção 3, decisões de conciliação) e consulte apenas as seções pertinentes das fontes:

- `docs/refinamento-visual-fase-2.md`: refinamento visual e motion design.
- `docs/commercial-pages-implementation.md`: expansão comercial.
- `docs/design-system.md`: padrões visuais vigentes.
- `docs/technical-documentation.md`: arquitetura, contratos, estado e validações.
- `docs/naming-conventions.md`: convenções e rotas.

As decisões explícitas mais recentes do usuário e as conciliações das instruções prevalecem nos pontos revisados. As especificações da Fase 2 substituem regras anteriores apenas onde indicado. O código informa o estado implementado, não autoriza mudança de requisito. Se uma fonte essencial faltar, estiver desatualizada ou contradizer outra sem solução aprovada, relate e solicite orientação antes de alterar a parte afetada. Não invente conteúdo, resultados ou decisões.

## Antes da implementação

- Inspecione `git status`, branch, diff local, arquivos afetados, consumidores dos componentes e scripts/dependências reais em `package.json`.
- Identifique requisitos, limites, critérios de aceitação, dependências e riscos de regressão. Se o pedido exigir nova decisão relevante de arquitetura ou design, apresente alternativas e aguarde autorização; detalhes já delegados podem ser resolvidos dentro do escopo.
- Preserve alterações locais que não pertençam à atividade. Não sobrescreva arquivos presumindo seu conteúdo; não descarte alterações, faça reset destrutivo ou force push.

## Implementação

- Astro SSG, CSS nativo e JS quando necessário; preservar Content Collections Markdown/MDX, i18n institucional e rotas públicas. Páginas comerciais têm regras de rota e idioma próprias.
- Reutilizar componentes, grid e tokens existentes. Não criar abstrações, variantes, dependências, CMS, coleções comerciais, frameworks ou ferramentas adicionais sem necessidade e aprovação.
- Arquivos/diretórios em `kebab-case`; componentes/layouts em `PascalCase`; variáveis/funções em `camelCase`; CSS BEM. Preservar convenções específicas do Astro e a distinção entre `projects` interno e `/works/` público.
- Preservar semântica HTML, foco, teclado, contraste, responsividade (desktop/tablet/mobile), reduced motion e fallback funcional. Não introduzir regressões em consumidores existentes. O Hero da Home permanece independente.
- Respeitar a sequência da fase: refinamento visual e motion design antes da expansão comercial. As páginas comerciais desta fase são demonstrativas; conteúdo comercial e artigos reais serão produzidos pós-lançamento. Não inventar informações profissionais ou de clientes.
- As page transitions têm prioridade sobre coreografias; não acumular ambas na navegação interna. A escolha tecnológica exige decisão aprovada.
- Metadados transversais, `noindex` comercial, sitemap, segurança, analytics/consentimento, estratégia de ambientes e deploy pertencem à Fase 3. Não publicar conteúdo de demonstração nem dados confidenciais.

## Verificação e relatório

Execute os scripts pertinentes já existentes. Para mudanças que afetem o build, execute `npm run build` quando viável e registre o resultado. Use `npm run dev` ou `npm run preview` quando pertinente à verificação; não deixe processos desnecessários em execução. Não instale ferramentas de teste novas sem autorização. Em Windows, se o problema de CSS descrito na documentação ocorrer, confira a capitalização da unidade do caminho antes de alterar código.

Ao concluir a implementação, relate de forma concisa:

1. Objetivo e alterações efetuadas, com caminhos de arquivos.
2. Decisões técnicas dentro do escopo e eventuais divergências/bloqueios.
3. Comandos executados e resultados reais, incluindo warnings, erros e testes não executados.
4. Checklist de validação manual específico, incluindo regressões e idiomas pertinentes.
5. Estado da documentação e pendências antes de consolidar a atividade.

Não declarar que a interface está visualmente validada sem confirmação explícita do usuário. Build bem-sucedido não comprova acessibilidade, ausência de regressões ou deploy.

## Consolidação e Git

Após confirmação da validação pelo usuário, atualizar os documentos afetados para refletir a implementação real e substituir regras obsoletas. Registrar separadamente resultados técnicos, validações confirmadas e pendências. Não marcar como concluído o que não foi testado/aprovado. Não reescrever especificações históricas sem instrução; registrar decisões novas de forma inequívoca.

Commit e push somente com autorização explícita do usuário. Na Fase 2, a `main` é a referência compartilhada para revisão; antes de enviar, verificar branch, status, escopo do diff e eventuais restrições ou automações de deploy. Não incluir alterações alheias, segredos, credenciais ou dados privados. Não realizar merge/rebase automaticamente, force push ou deploy. Relatar o hash e o resultado do push quando autorizado e realizado. Aguardar a próxima atividade.
