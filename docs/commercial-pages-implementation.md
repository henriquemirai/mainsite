# Commercial Pages | Especificação de implementação

**Projeto:** Site pessoal e portfólio profissional Henrique Mirai  
**Data:** 27/11/2026  
**Marco:** Fase 2, expansão das páginas comerciais  
**Status:** decisões de arquitetura e requisitos aprovados; implementação e validação pendentes.

## 1. Finalidade e relação com a documentação

Este documento consolida as decisões tomadas durante a exploração de Landing Pages, Pitches e Proposals e a entrevista de especificação. Em conjunto com a exploração de design da Fase 2, servirá de insumo para elaborar as instruções de desenvolvimento dessa fase.

Não representa código implementado, nem substitui a documentação vigente. Durante a implementação, atualizar progressivamente `design-system.md`, `technical-documentation.md` e `naming-conventions.md` para refletir as alterações efetivamente realizadas, conforme aprovação e validação. As instruções do projeto serão elaboradas separadamente.

### Referências

- `design-system.md`: fundamentos visuais, componentes, estados, acessibilidade e regras responsivas vigentes.
- `technical-documentation.md`: arquitetura atual, contratos dos componentes existentes, estrutura e histórico de validação.
- `naming-conventions.md`: nomes de arquivos, identificadores, rotas e convenções CSS.
- `instrucoes_projeto_site_pessoal.md`: metodologia de trabalho colaborativo.
- Exploração de design comercial e entrevista de 22 perguntas realizadas em 27/11/2026.
- Referências de exploração: proposta JP Works em HTML, exemplo textual de Proposta Técnica, `Modelo Proposta Comercial.pdf` e `manifesto-apresentacao-institucional-jun-2023.pdf`.

As decisões deste documento prevalecem, para a expansão comercial, sobre as regras anteriores que forem explicitamente revisadas aqui. Os demais requisitos do site permanecem vigentes. As referências comerciais são exemplos de estrutura e composição, não modelos de conteúdo, preços ou condições a reproduzir.

## 2. Objetivos e escopo 80/20

Criar três famílias de páginas comerciais com linguagem visual compartilhada, composição modular e baixa complexidade de manutenção.

| Família | Finalidade | Contexto de uso | Ação esperada |
|---|---|---|---|
| Landing Page (LP) | Apresentar uma oferta específica e gerar contatos | Divulgação direta em comunidades, públicos ou segmentos | Iniciar conversa pelo WhatsApp |
| Pitch | Apresentar posicionamento, competências, experiência e possibilidades de colaboração | Prospecção de clientes ou parceiros | Avançar para uma conversa comercial |
| Proposal (Proposta) | Apresentar solução, escopo, entregáveis, prazos, investimento e condições de contratação | Negociação com destinatário identificado | Discutir a proposta e avançar para formalização |

A Proposal pode ser sintética ou detalhada, de acordo com o projeto e o destinatário. Não criar variantes técnicas distintas para proposta comercial e proposta técnica no escopo inicial. A proposta não substitui o contrato.

### Entregas previstas

- Um layout compartilhado: `CommercialLayout`.
- Cinco novos componentes: `Hero`, `SplitContent`, `ContentGrid`, `ContentSteps` e `CallToAction`.
- Quatro componentes existentes revisados: `ProjectHeader` (renomeado para `PageHeader`), `ProjectGallery`, `SiteHeader` e `SiteFooter`.
- Três famílias de páginas Astro, compostas manualmente com os componentes disponíveis.

Não introduzir abstrações especializadas para cada assunto comercial. Serviços, objetivos, benefícios, competências, entregáveis e condições podem utilizar as mesmas estruturas de composição.

## 3. Arquitetura técnica

### 3.1. Composição manual

As três famílias serão páginas `.astro` estáticas compostas manualmente. Cada página poderá selecionar, repetir, omitir e reordenar módulos, conforme o objetivo comercial.

- Reutilizar Astro, CSS nativo, infraestrutura de build e Design System existentes.
- Não criar novas Content Collections, schemas de blocos, renderizadores de módulos, page builder ou CMS para as páginas comerciais.
- Não adicionar dependências sem necessidade concreta e aprovação.
- Manter projetos e artigos em suas Content Collections existentes.
- Não alterar o Hero específico da Home.

### 3.2. Layout comercial

`CommercialLayout` será compartilhado pelas três famílias, sem layouts separados para LP, Pitch e Proposal.

Responsabilidades:

- Integrar os fundamentos de layout do site, incluindo grid, CSS global, fontes e idioma do documento.
- Utilizar as apresentações comerciais de `SiteHeader` e `SiteFooter`.
- Receber e encaminhar as configurações necessárias de idioma, links de tradução e CTA do header.
- Receber o conteúdo da página por slot.
- Controlar o espaçamento vertical entre módulos.
- Garantir a política de não indexação das páginas comerciais, em coordenação com a futura definição transversal de metadados.

A página individual controla a sequência de módulos e insere divisores manualmente. Não aplicar divisores automáticos entre todos os módulos. Os componentes controlam seus espaçamentos internos; o layout controla o ritmo entre eles. Usar `border` para separação visual e `<hr>` para separação semântica, conforme o DS; não criar um componente `Divider`.

A composição exata de `CommercialLayout` com `BaseLayout` será definida durante a implementação, preservando a infraestrutura compartilhada e evitando duplicação desnecessária. A arquitetura não exige uma refatoração geral de `BaseLayout`.

### 3.3. Rotas

| Família | Inglês | Português |
|---|---|---|
| LP | `/lp/{slug}/` | `/lp/{slug}/` |
| Pitch | `/pitch/{slug}/` | `/pitch/{slug}/` |
| Proposal | `/proposal/{slug}/` | `/proposta/{slug}/` |

- Utilizar slugs descritivos, definidos manualmente por página, em `kebab-case`.
- Não utilizar prefixo `/br/` nas páginas comerciais.
- Não criar páginas públicas de listagem para essas famílias.
- Preservar integralmente as rotas existentes do site institucional, projetos e artigos.

### 3.4. Idiomas

| Família | Política | Seletor de idioma |
|---|---|---|
| LP | Pode ser monolíngue ou bilíngue | Exibido quando houver versão equivalente configurada |
| Pitch | Monolíngue, no idioma do destinatário | Ausente |
| Proposal | Pode ser monolíngue ou bilíngue, inclusive para compartilhamento em equipes internacionais | Exibido quando houver versão equivalente configurada |

Cada página declara explicitamente `lang: 'en' | 'pt-BR'`. O idioma da página não deve ser deduzido do caminho nem de `Astro.currentLocale`, pois as rotas comerciais em português não possuem prefixo de locale.

Reutilizar o conceito de `languageLinks` para URLs equivalentes explícitas, sem presumir tradução automática ou utilizar os links padrão da Home quando não houver tradução. LPs bilíngues podem possuir slugs específicos por idioma sob `/lp/`; Proposals utilizam `/proposal/` e `/proposta/`. Manter links recíprocos entre traduções existentes e sincronizar manualmente o conteúdo comercial das versões.

O atributo HTML `lang`, os textos localizados do header/footer e as URLs e conteúdos de projetos selecionados devem corresponder ao idioma declarado. Validar no build e no preview a convivência dessas rotas com o i18n nativo do Astro existente; a configuração global não deve ser alterada sem necessidade demonstrada.

### 3.5. Estrutura de arquivos prevista

A árvore abaixo mostra apenas adições e alterações relevantes. É uma referência de organização, não uma inspeção do repositório atual.

```text
src/
├── components/
│   ├── call-to-action.astro    # novo
│   ├── content-grid.astro      # novo
│   ├── content-steps.astro     # novo
│   ├── hero.astro              # novo, exclusivamente comercial no início
│   ├── page-header.astro       # renomeia project-header.astro
│   ├── project-gallery.astro  # revisar
│   ├── site-footer.astro      # revisar
│   ├── site-header.astro      # revisar
│   └── split-content.astro    # novo
├── layouts/
│   └── commercial.astro       # novo (CommercialLayout)
└── pages/
    ├── lp/
    │   └── {slug}.astro
    ├── pitch/
    │   └── {slug}.astro
    ├── proposal/
    │   └── {slug}.astro
    └── proposta/
        └── {slug}.astro
```

`{slug}.astro` representa um arquivo com nome descritivo real, não um segmento dinâmico do Astro. Preservar `kebab-case` em arquivos, `PascalCase` nos identificadores de componentes/layouts, `camelCase` para funções e variáveis e BEM no CSS. Não usar sufixo `-layout` no arquivo de layout.

## 4. Fundamentos visuais e responsivos

Aplicar o DS vigente, sem introduzir nova identidade visual ou tokens globais por antecipação. A exploração de design da Fase 2 detalhará as composições; medidas não especificadas serão refinadas e validadas durante a implementação.

| Fundamento | Referência |
|---|---|
| Fundo | Olive `#50594B`, com textura seamless existente |
| Paleta | Olive, Cream `#F2EDE4`, Brown `#5A3426`, Ochre `#B89A58`, Charcoal `#262720`, Light Ochre `#E2C88E` |
| Tipografia display | Familjen Grotesk |
| Corpo | Commissioner |
| Eyebrows/metadados | Recursive Mono |
| Largura máxima do container | 1440px |
| Imagens | Raio global de 18px, preservando a exceção editorial de 0px |
| Interações | Hover, foco, contraste e movimento reduzido conforme o DS |

| Grid | Mobile (<768px) | Tablet (768 a <1200px) | Desktop (≥1200px) |
|---|---:|---:|---:|
| Colunas | 3 | 4 | 6 |
| Margem interna lateral | 8px | 12px | 16px |
| Gutter | 16px | 24px | 32px |

Manter os tokens e a escala tipográfica responsiva do DS. Utilizar o grid compartilhado e subgrid quando apropriado, sem criar grids conflitantes. Testar reflow, textos longos e ausência de conteúdo opcional. Não confundir a adoção dos padrões existentes com aprovação de medidas ainda não definidas no DS.

### Regras comuns aos componentes

- Headings semânticos com nível padrão e possibilidade de configuração quando necessária, independentemente do estilo visual.
- Descrições de `Hero`, `ContentGrid`, `ContentSteps` e `CallToAction` em texto simples. Usar `EditorialContent` para conteúdo rico.
- CTAs reutilizam `Button`, recebendo texto e URL configuráveis. Não acoplar componentes ao WhatsApp, embora ele seja o mecanismo principal de contato das LPs.
- Preservar HTML semântico, acessibilidade por teclado, foco visível, contraste e comportamento com movimento reduzido.
- Não criar uma API de `id` configurável para os módulos nesta fase. Índice de conteúdo e infraestrutura própria de âncoras ficam fora do escopo inicial.

## 5. Novos componentes

### 5.1. Hero (`hero.astro`)

**Responsabilidade:** abertura comercial que apresenta a mensagem principal e a ação de conversão.

**Aplicação:** LP e Pitch; opcional em Proposal quando adequado à composição. Não substituir o Hero da Home.

| Elemento | Presença |
|---|---|
| Eyebrow | Opcional |
| Heading | Obrigatório; H1 por padrão |
| Descrição | Opcional; texto simples |
| CTA | Obrigatório; `Button`, texto e URL configuráveis |
| Imagem | Opcional |

**Variantes definitivas:**

1. Textual: alinhada à esquerda, com protagonismo da mensagem.
2. Com mídia: conteúdo textual e imagem lado a lado no desktop e tablet, permitindo inverter a posição dos blocos nesses breakpoints. No mobile, empilhamento com texto e CTA sempre antes da imagem.

A variante centralizada foi eliminada para simplificar a biblioteca e manter consistência com o `CallToAction` e a linguagem do site.

Não introduzir outras variantes. A distribuição exata de colunas e o comportamento da variante com mídia quando a imagem não for fornecida devem ser resolvidos na especificação visual/implementação, respeitando a decisão de que somente heading e CTA são obrigatórios. Quando houver imagem, contemplar texto alternativo apropriado, dimensões e proporção de acordo com seu uso.

### 5.2. SplitContent (`split-content.astro`)

**Responsabilidade:** compor dois blocos de conteúdo livre, sem responsabilidade tipográfica ou editorial própria.

- Dois slots nomeados de conteúdo livre.
- Desktop: 3+3 colunas.
- Tablet: 2+2 colunas.
- Mobile: blocos empilhados, cada um ocupando as três colunas, na ordem de declaração.
- Alinhamento vertical pelo topo.
- Sem variantes, proporções configuráveis ou opções de alinhamento.

Os slots podem receber headings, imagens, texto, `EditorialContent` ou outros componentes compatíveis. O nível semântico dos headings pertence ao conteúdo inserido. Não criar componentes separados como `TitledBlock`, `MediaBlock` ou `Section` para as mesmas composições.

### 5.3. ContentGrid (`content-grid.astro`)

**Responsabilidade:** organizar múltiplos itens estruturados em uma grade.

| Elemento | Presença |
|---|---|
| Heading geral | Opcional; H2 por padrão |
| Eyebrow por item | Opcional |
| Heading por item | Obrigatório; H3 por padrão |
| Descrição por item | Obrigatória; texto simples |

| Breakpoint | Itens por linha | Colunas por item |
|---|---:|---:|
| Desktop | 3 | 2 de 6 |
| Tablet | 2 | 2 de 4 |
| Mobile | 1 | 3 de 3 |

Sem quantidade mínima ou máxima de itens. Distribuição fixa por breakpoint, sem variantes nem configuração de quantidade de itens por linha. Itens adicionais fluem para linhas subsequentes. Quando não houver heading geral, permitir adequar os níveis semânticos dos itens ao contexto de inserção.

Aplicações: serviços, competências, benefícios, diferenciais, objetivos e entregáveis resumidos.

### 5.4. ContentSteps (`content-steps.astro`)

**Responsabilidade:** apresentar uma sequência ordenada de etapas, atividades ou períodos.

| Elemento | Presença |
|---|---|
| Heading geral | Opcional; H2 por padrão |
| Eyebrow por etapa | Opcional; texto livre |
| Heading por etapa | Obrigatório; H3 por padrão |
| Descrição por etapa | Obrigatória; texto simples |

- Uma única composição, com linha e marcadores de sequência conforme a exploração aprovada.
- Desktop: sequência horizontal e itens distribuídos uniformemente quando houver espaço suficiente; composição vertical quando a quantidade de etapas ou o espaço disponível comprometerem a legibilidade.
- Tablet e mobile: sequência vertical.
- Sem limite de quantidade de etapas.
- O eyebrow pode conter, por exemplo, `Fase 01`, `Semana 1` ou `Semanas 2–3`. A ordem dos itens determina a sequência.
- Não implementar escala temporal proporcional, Gantt, datas calculadas, duração, dependências ou variantes distintas para processo e cronograma.

Aplicações: processo de trabalho, fases de projeto, cronograma simplificado e próximos passos.

A estratégia de detecção de espaço disponível e os limites de largura para mudar a orientação serão definidos durante a implementação. Validar a legibilidade de sequências curtas e longas sem criar restrição artificial de quantidade.

### 5.5. CallToAction (`call-to-action.astro`)

**Responsabilidade:** apresentar ou reforçar uma ação comercial, especialmente no encerramento da página.

| Elemento | Presença |
|---|---|
| Heading | Obrigatório; H2 por padrão |
| Descrição | Opcional; texto simples |
| Button | Obrigatório; texto e URL configuráveis |

- Desktop e tablet: heading e descrição agrupados de um lado, Button do outro, em composição horizontal.
- Mobile: empilhamento de conteúdo e Button.
- Uma única composição; sem variante centralizada.
- Utiliza o `Button` existente, sem redefinir seu comportamento visual ou de interação.

## 6. Componentes existentes a revisar

### 6.1. PageHeader (`page-header.astro`)

Generalizar e renomear `ProjectHeader` para `PageHeader`, atualizando todos os imports, referências e documentação durante a implementação.

Preservar a composição atual, com uma alteração de contrato: **heading e metadados passam a ser obrigatórios**. A possibilidade anterior de omitir os metadados e expandir o título é substituída por esta decisão. O conjunto de metadados deve existir; seus campos, valores, quantidade e ordem continuam flexíveis, sem lista fixa de campos obrigatórios.

- Desktop: título em quatro colunas, metadados em duas.
- Tablet/mobile: título e metadados empilhados em largura integral.
- Preservar `dl`, `dt`, `dd`, grid interno 1:1, tipografia, divisores, tratamento de valores longos e uso de `TextLink` para valores HTTP(S) válidos.
- H1 por padrão; manter a identidade visual do heading existente.
- Não criar componente global `MetadataList`.
- Manter `PageIntro` independente, destinado a título e descrição introdutória.

Verificar antes da alteração todos os usos reais de `ProjectHeader` e a disponibilidade de metadados nas páginas de projeto. Caso existam entradas sem metadados, sinalizar a divergência para resolução, sem inventar valores ou tornar os metadados opcionais novamente.

### 6.2. ProjectGallery (`project-gallery.astro`)

Generalizar o componente existente para uso na Home e em páginas comerciais. A seleção continua externa ao componente; a galeria recebe os projetos a apresentar.

| Contexto | Seleção | Ordem | Máximo |
|---|---|---|---:|
| Home | Projetos publicados com `showOnHome` | `order` crescente | 3 |
| LP, Pitch e Proposal | Projetos publicados selecionados individualmente pela página | Ordem definida pela página | 3 |

- Utilizar projetos da coleção existente, no idioma da página. Não duplicar dados ou criar uma nova coleção de portfólio comercial.
- Permitir heading geral opcional (H2 por padrão).
- Preservar comportamento de zero a três itens: zero omite a galeria; menos de três, exibir apenas os existentes alinhados ao início, sem placeholders ou duplicações.
- Preservar distribuição: três itens por linha no desktop, dois no tablet e um no mobile.
- Preservar proporção intrínseca, rótulo sobreposto, raio, estados e demais características de `ProjectThumbnail`.
- Todos os projetos permanecem clicáveis. Adicionar opção de abertura dos links em nova aba; padrão continua na mesma aba. Aplicar proteção adequada ao abrir nova aba e informar o comportamento de forma acessível.
- Não criar variante visual para diferenciar a Home das páginas comerciais. `ProjectThumbnail` continua sendo padrão interno da galeria, sem componente independente.
- Preservar a seleção da Home e o posicionamento da galeria, que pertence ao `HomeLayout`.

A interface concreta para receber projetos selecionados e o tratamento de uma seleção inválida ou acima do limite devem ser definidos durante a implementação. Não presumir que a tipagem atual vinculada a `getHomeProjects` já atende a todos os usos.

### 6.3. SiteHeader (`site-header.astro`)

Adicionar apresentação comercial reduzida, preservando a apresentação institucional existente como padrão.

| Elemento comercial | Presença |
|---|---|
| Logo | Obrigatória; sem link |
| Seletor de idioma | Opcional; somente com versão equivalente configurada |
| CTA | Opcional; `Button` com texto e URL definidos na página |
| Navegação principal | Ausente |
| Menu hambúrguer | Ausente |

Logo exclusivamente como identificação visual. As quatro combinações entre seletor de idioma e CTA são válidas. No mobile, manter todos os elementos habilitados diretamente visíveis e permitir quebra de linha quando necessário. Preservar o comportamento estático do header, sem sticky ou novas interações.

A variante institucional mantém logo clicável, navegação, menu mobile, seletor de idioma e estados atuais. A redução vale apenas para o contexto comercial.

### 6.4. SiteFooter (`site-footer.astro`)

Adicionar apresentação comercial reduzida, contendo apenas copyright e link de retorno ao topo, com divisor e estilo conforme o DS. Não incluir navegação, Email, LinkedIn, redes sociais ou informações adicionais de contato.

- Localizar o conteúdo conforme o idioma explícito da página.
- Preservar retorno ao topo, rolagem suave e respeito a `prefers-reduced-motion`.
- Preservar a apresentação institucional existente como padrão.

### 6.5. Elementos preservados

`PageIntro`, `EditorialContent`, `ProjectCard`, `ArticlePreview`, `Button`, `TextLink` e Hero específico da Home permanecem com suas responsabilidades atuais. A expansão comercial não autoriza alterar sua aparência, contratos ou interações sem nova necessidade discutida.

## 7. Estruturas de referência das páginas

Os quadros abaixo são referências 80/20 para a composição inicial, não schemas obrigatórios. A escolha e a ordem de módulos são determinadas individualmente. Todas as páginas utilizam `CommercialLayout`.

### 7.1. Landing Page

| Ordem de referência | Conteúdo | Componente |
|---|---|---|
| 1 | Oferta e CTA | Hero |
| 2 | Serviços e benefícios | ContentGrid |
| 3 | Projetos relevantes | ProjectGallery |
| 4 | Apresentação profissional | SplitContent |
| 5 | Contato | CallToAction |

Módulos complementares: processo, diferenciais, condições da oferta, prova social e FAQ, utilizando o repertório existente. A LP começa e termina com CTA, direcionado ao WhatsApp. Não introduzir formulário ou agendamento obrigatório.

Práticas de comunicação: mensagem coerente com a divulgação e o público, proposta de valor explícita, benefícios claros, provas relevantes, leitura rápida e prioridade para mobile. O texto do CTA deve comunicar a ação; mensagens pré-preenchidas no WhatsApp podem identificar a oferta, sem depender de tracking. Não implementar analytics nesta fase.

### 7.2. Pitch

| Ordem de referência | Conteúdo | Componente |
|---|---|---|
| 1 | Posicionamento e CTA | Hero (textual ou com mídia) |
| 2 | Apresentação profissional | SplitContent |
| 3 | Serviços e competências | ContentGrid |
| 4 | Processo de trabalho | ContentSteps |
| 5 | Portfólio curado | ProjectGallery |
| 6 | Possibilidades de colaboração | SplitContent |
| 7 | Contato | CallToAction |

Pode incluir projetos contextualizados via `ProjectCard` ou `SplitContent`, depoimentos, diferenciais e referências de investimento. Não criar componentes especializados apenas para essas seções.

### 7.3. Proposal

| Ordem de referência | Conteúdo | Componente |
|---|---|---|
| 1 | Identificação do projeto e cliente | PageHeader |
| 2 | Briefing e objetivos | SplitContent + EditorialContent |
| 3 | Solução proposta | SplitContent |
| 4 | Escopo e entregáveis | EditorialContent |
| 5 | Processo e cronograma simplificado | ContentSteps |
| 6 | Investimento e pagamento | SplitContent |
| 7 | Condições comerciais | SplitContent e/ou EditorialContent |
| 8 | Próximos passos e contato | CallToAction |

Pode incluir apresentação profissional, projetos relevantes, evidências, opções de contratação ou outros módulos. A identificação poderá conter cliente, projeto, data e versão, sem impor um conjunto fixo de metadados no `PageHeader`. O índice de conteúdo foi retirado do escopo inicial.

Distinguir metodologia (lógica de trabalho), processo (atividades), entregáveis (o que será entregue) e cronograma (quando). Explicitar escopo, revisões, dependências, responsabilidades, pagamentos e condições conforme o projeto real. Os textos, valores e prazos serão definidos caso a caso, não pelo Design System.

## 8. Publicação, indexação e limites

### Decisões aprovadas

- Todas as páginas comerciais serão não indexáveis (`noindex`) e excluídas do sitemap.
- Permanecem acessíveis por URL direta, sem autenticação ou controle de acesso.
- Não bloquear a leitura do `noindex` pelo crawler via `robots.txt`.
- Slugs descritivos são aceitáveis; não utilizar identificadores opacos como mecanismo de proteção.

A não indexação não torna o conteúdo privado. Uma pessoa com a URL poderá acessar e compartilhar a página. O requisito atual é evitar indexação por buscadores, não implementar confidencialidade técnica.

A definição do mecanismo concreto de metadados deve respeitar a discussão transversal da Fase 3, mantendo a decisão de não indexação como requisito já aprovado. Não pressupor que a configuração de sitemap ou de `noindex` esteja implementada atualmente.

### Adiados para a Fase 3 do projeto

- Política geral de metadados e compartilhamento (title, description, Open Graph, imagens padrão, canonical e demais itens pertinentes).
- Security headers e demais configurações transversais de segurança.
- Tracking e analytics, condicionados à definição de cookies e consentimento.

### Fora do escopo inicial da expansão

- Controle de acesso, autenticação ou área privada de propostas.
- Índice de conteúdo e API específica de IDs de módulos.
- Componentes especializados de tabela de preços, depoimento, FAQ, lista de conteúdo e cronograma Gantt; utilizar composições e HTML existentes quando necessário.
- Formulários e integrações de contato adicionais não aprovados.
- Refatoração da Home para utilizar o Hero comercial.

## 9. Encaminhamento para a implementação

A implementação deverá utilizar este documento em conjunto com a exploração de design da Fase 2 e as instruções do projeto que ainda serão elaboradas. Não iniciar alterações no código ou nos documentos normativos apenas com a criação deste arquivo.

### Questões delegadas à implementação

Não são novas decisões conceituais pendentes. São detalhes a resolver com o código e as referências visuais reais:

- Nomes exatos e tipagem de props, slots, variantes e opções dos componentes. Preservar as responsabilidades e obrigatoriedades aprovadas.
- Integração do `CommercialLayout` com `BaseLayout` e componentes globais, incluindo a passagem explícita de idioma e links.
- Medidas de composição e espaçamentos não definidos no DS; proporções do Hero com mídia; comportamento sem imagem; orientação responsiva do `ContentSteps`.
- Seleção de projetos comerciais a partir dos dados existentes e adaptação do contrato de `ProjectGallery`.
- Conciliação do requisito de metadados obrigatórios do `PageHeader` com as entradas de projetos existentes.

Se a implementação revelar conflito entre uma especificação aprovada e o código existente, registrar o conflito e discutir a solução. Não modificar silenciosamente a decisão. Evitar fixar interfaces ou medidas sem necessidade antes dessa etapa.

### Critérios de aceitação

- [ ] As três famílias utilizam um único `CommercialLayout` e páginas Astro manuais, sem nova infraestrutura de conteúdo.
- [ ] Rotas descritivas funcionam no build e preview, sem prefixo `/br/`, com `lang` e traduções corretos.
- [ ] Header comercial funciona nas quatro combinações de elementos opcionais, logo sem link, sem menu; CTA e idioma permanecem visíveis no mobile.
- [ ] Footer comercial contém somente copyright e retorno ao topo, respeitando movimento reduzido.
- [ ] Hero textual e com mídia respeitam a obrigatoriedade de heading e CTA; testar inversão desktop/tablet e ordem textual primeiro no mobile.
- [ ] SplitContent mantém grid 3+3/2+2, empilhamento mobile, alinhamento pelo topo e conteúdo livre.
- [ ] ContentGrid mantém 3/2/1 itens por linha e suporta quantidades variadas, inclusive ausência de itens.
- [ ] ContentSteps mantém sequência legível em diferentes quantidades e larguras, sem limite de etapas, sem Gantt.
- [ ] CallToAction mantém composição horizontal desktop/tablet e empilhamento mobile.
- [ ] Heading geral opcional e níveis semânticos configuráveis não alteram os estilos visuais aprovados.
- [ ] PageHeader substitui ProjectHeader em todos os usos; heading e metadados são obrigatórios e comportamento visual anterior é preservado.
- [ ] ProjectGallery mantém seleção e comportamento da Home, admite seleção comercial de até três projetos, abertura configurável em outra aba e estados de zero a três itens.
- [ ] Espaçamento entre módulos é consistente; divisores permanecem manuais.
- [ ] Links, CTAs, traduções, navegação por teclado, foco, contraste e reflow são validados em desktop, tablet e mobile.
- [ ] Páginas comerciais atendem à política de não indexação e exclusão do sitemap quando a infraestrutura correspondente for implementada e validada.
- [ ] Páginas institucionais, projetos, artigos e Hero da Home não sofrem regressões.
- [ ] Executar verificações disponíveis, `npm run build` e `npm run preview`, sem considerar build local equivalente a deploy.
- [ ] Atualizar os documentos técnicos, DS e convenções de nomes conforme as alterações efetivamente implementadas e validadas.

### Fluxo de trabalho

Seguir a execução guiada já estabelecida no projeto: uma atividade por vez, discussão dos requisitos, aprovação de decisões relevantes, código e instruções de implementação, testes locais pelo usuário, correções e confirmação de validação. Não avançar automaticamente nem presumir que código fornecido foi aplicado.

## 10. Registro de status

Este documento registra requisitos aprovados e direções de implementação. Nenhuma alteração em código, Design System, documentação técnica ou convenções de nomenclatura é efetuada por sua criação. As referências ao estado atual do código baseiam-se na documentação de 26/11/2026, não em uma nova auditoria do repositório. O refinamento visual e a validação das páginas existentes, assim como suas pendências anteriormente registradas, continuam pertencendo ao planejamento da Fase 2.
