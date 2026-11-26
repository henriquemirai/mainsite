# Design System | Henrique Mirai

**Projeto:** Site pessoal e portfólio profissional  
**Tecnologia prevista:** Astro  
**Referência consolidada:** novembro de 2026 (atualização de 26/11/2026)  
**Escopo:** cores e textura de fundo, tipografia, responsividade, grid e containers, componentes, layouts, interações, acessibilidade e pendências de implementação.  
**Layouts examinados:** Home (desktop e uma referência mobile), Sobre, índice de Projetos, página individual de Projeto (com e sem capa), índice de Artigos e página individual de Artigo sem capa (desktop).  
**Estado:** todas as páginas possuem implementação inicial; galeria da Home validada isoladamente, artigos validados no ciclo de implementação. Refinamento visual e validação integrada da Home e do site permanecem para o segundo momento.

## 1. Critério de consolidação e status

Este documento reúne os registros de fundamentos visuais e de componentes em uma **única referência vigente**.

**Regra de precedência:** quando os arquivos originais divergem sobre um mesmo ponto, **prevalece `design_system_decisoes_componentes(1).md`**. Decisões do arquivo de tokens que não entram em conflito são preservadas. Comportamentos substituídos não devem ser implementados por engano nem tratados como pendências a resolver. **As decisões de Artigos aprovadas em 19/11/2026 complementam essa base. As decisões da revisão de componentes e estrutura de 21/11/2026 prevalecem nos pontos expressamente alterados**, sem modificar as demais regras. As decisões expressamente aprovadas em 25 e 26/11/2026 prevalecem, em ordem cronológica, nos pontos alterados. Diferenças entre implementação e referência visual não constituem aprovação automática de mudança no design.

**Status:**

- **Definido:** decisão aprovada nos materiais consolidados, considerando a precedência acima.
- **Provisório:** solução aceita como ponto de partida, sujeita a validação na implementação.
- **Pendente:** aspecto não definido ou conscientemente adiado.

Tamanhos desktop foram extraídos dos layouts e complementados pelas decisões de revisão; dimensões intermediárias, entrelinhas e implementação de microinterações continuam provisórias onde indicado. Os exemplos CSS são referência inicial e não substituem validação em componentes reais.

### Histórico da revisão de 21/11/2026

| Escopo | Atualização |
|---|---|
| `SiteHeader`, `SiteFooter`, `Button`, `TextLink`, `ProjectHeader`, `EditorialContent` | Sem mudança |
| `ProjectThumbnail` | Título Familjen Grotesk Regular 18px, Charcoal; rótulo sobreposto na parte inferior esquerda da imagem, Ochre no padrão e Cream no hover; imagem inalterada |
| `ProjectCard` | Título Familjen Grotesk Bold 52px |
| `PageIntro` | Introdução Familjen Grotesk Regular 28px |
| `ArticlePreview` | Título Familjen Grotesk Semibold 36px |
| `BaseLayout` | Referência desktop: container 1440px, seis colunas, margens 16px, gutter 32px |
| Imagens dos layouts | Border-radius 18px |
| Fundo das páginas | Textura repetível sobre a base Olive `#50594B`, sem gradientes ou variações globais de iluminação |
| Demais layouts | Mantidos conforme as decisões anteriores; explorações visuais do `ProjectDetailLayout` não formalizadas |

### Alterações consolidadas em 25/11/2026

| Escopo | Atualização |
|---|---|
| Grid | 6/4/3 colunas em desktop/tablet/mobile, com margens e gutters próprios |
| SiteHeader | Página e seção atuais em negrito, inclusive no menu mobile |
| ProjectHeader | Page title de 72px no desktop, composição 4+2, metadados flexíveis e URLs clicáveis |
| EditorialContent | Commissioner em todo o conteúdo; escala H2–H6 aprovada; imagens sem raio |
| ProjectIndexLayout | Featured primeiro, grade convencional depois, sem agrupamentos vazios |
| ProjectDetailLayout | Texto à esquerda em quatro colunas e imagens até seis no desktop |
| AboutLayout | Composição responsiva implementada; conteúdo e medidas finas provisórios |
| Imagens de projeto | Asset único WebP, proporção intrínseca; adequação do ProjectCard pendente |

Build e preview de produção validados pelo usuário: dez páginas estáticas. A documentação técnica de 25/11/2026 registra o código e as divergências remanescentes. A validação funcional não encerra o refinamento visual.

### Alterações consolidadas em 26/11/2026

| Escopo | Atualização |
|---|---|
| Artigos | Categoria removida do índice, ArticlePreview e artigo individual; agrupamento anual mantido |
| ArticleIndexLayout | Duas entradas por linha no desktop/tablet e uma no mobile |
| ArticleDetailLayout | Cabeçalho local com título e data; coluna editorial de até 900px |
| Home | Composição assimétrica nos três breakpoints, fotografia à direita, nome sobreposto, galeria sobreposta à fotografia somente no desktop |
| ProjectGallery | Componente específico da Home; até três projetos, sem prioridade de featured; ProjectThumbnail permanece como padrão visual interno |
| Rótulo de ProjectThumbnail | Offsets, padding, raio, largura máxima e entrelinha aprovados como ponto de partida; estado visual preservado no mobile |
| Hero | Tokens tipográficos exclusivos encapsulados no HomeLayout; correção do espaço entre nome e sobrenome |

A referência mobile anterior da Home está desatualizada quanto aos thumbnails. Preservar o padrão de rótulo sobreposto aprovado em 21/11. A documentação técnica de 26/11 registra a implementação inicial e as correções. Nenhuma revisão visual final da Home foi aprovada após essas correções.

## 2. Direção visual e princípios

- Olive `#50594B` como cor base do fundo predominante, com **textura repetível** aplicada às páginas; Cream como texto principal. A textura não deve produzir gradientes, vinhetas ou variações globais de luminosidade.
- Brown como fundo do botão primário e do monograma; Ochre em divisores, detalhes decorativos, callout da página Sobre e fundo dos rótulos de `ProjectThumbnail`.
- Charcoal no texto do callout, no título sobreposto de `ProjectThumbnail` e, segundo a definição inicial de tokens, no estado `active` do botão primário.
- **Light Ochre (`#E2C88E`)** como cor adicional para hover de links e títulos sobre Olive, conforme as decisões mais recentes de componentes.
- Interações discretas: hover de links por cor, hover de botão/CTA por inversão de cores e foco visível.
- Familjen Grotesk na voz de marca, títulos de projetos, títulos de `ArticlePreview`, títulos sobrepostos de `ProjectThumbnail` e introduções de `PageIntro`; **Commissioner** no corpo, na interface, nos marcadores de ano da listagem de Artigos e no título do artigo individual; **Recursive Mono** nos metadados.
- Design system enxuto, orientado aos layouts disponíveis, evitando tokens e abstrações sem aplicação concreta.

## 3. Cores

### 3.1. Cores de base e cor adicional de interação

| Nome | HEX | Token de trabalho | Papel |
|---|---|---|---|
| Olive | `#50594B` | `--color-olive` | Superfície principal |
| Ochre | `#B89A58` | `--color-ochre` | Decoração, callout da Sobre e rótulos de `ProjectThumbnail` |
| Brown | `#5A3426` | `--color-brown` | Botão primário e monograma |
| Cream | `#F2EDE4` | `--color-cream` | Texto principal e fundos de hover de botão e `ProjectThumbnail` |
| Charcoal | `#262720` | `--color-charcoal` | Texto do callout e do `ProjectThumbnail`; estado active registrado |
| Light Ochre | `#E2C88E` | `--color-light-ochre` | Hover textual sobre Olive |

A base inicial tinha cinco cores. **A adição de Light Ochre está consolidada pela decisão posterior de componentes.** Não extrapolar seu uso para superfícies claras sem verificar contraste. Os identificadores seguem nomenclatura de trabalho; o nome semântico `--color-text-hover` continua **provisório** e poderá ser conciliado com a nomenclatura dos tokens já existentes, sem reabrir a decisão sobre sua cor ou aplicação.

### 3.2. Tokens semânticos

| Token | Valor / referência | Uso definido |
|---|---|---|
| `--color-background-primary` | Olive | Cor base do fundo das páginas, inclusive sob a textura |
| `--color-text-primary` | Cream 100% | Títulos, corpo e navegação |
| `--color-text-secondary` | Cream a 85% | Texto de menor ênfase **sobre Olive** |
| `--color-text-hover` **(nome provisório)** | Light Ochre | Hover de texto **sobre Olive** |
| `--color-button-primary-bg` | Brown | Fundo padrão do botão primário |
| `--color-button-primary-text` | Cream | Texto padrão do botão primário |
| `--color-brand-bg` | Brown | Fundo do monograma |
| `--color-brand-fg` | Ochre | Desenho do monograma |
| `--color-border-decorative` | Ochre | Divisores e linhas decorativas |
| `--color-callout-background` | Ochre sólido | Fundo do callout sobre fotografia, na página Sobre |
| `--color-callout-text` | Charcoal | Texto do callout |
| `--color-project-thumbnail-label-bg` | Ochre | Fundo do rótulo sobreposto ao projeto na Home |
| `--color-project-thumbnail-label-text` | Charcoal | Cor do título sobreposto |
| `--color-project-thumbnail-label-hover-bg` | Cream | Fundo do rótulo em hover |

A nomenclatura `--color-button-bg` / `--color-button-text` foi mencionada apenas como proposta no documento de componentes. Para não duplicar tokens, os exemplos preservam `--color-button-primary-bg` e `--color-button-primary-text` da base anterior. Essa escolha de nomenclatura pode ser revista na implementação, sem alterar os valores aprovados.

#### Texto secundário

- Opacidade original dos layouts: **70%**.
- Opacidade aceita para o sistema: **85%**.
- Combinação: Cream a 85% sobre Olive.
- Contraste aproximado: **5,07:1**, atendendo WCAG AA para texto normal.
- Não reutilizar o mesmo valor indiscriminadamente sobre outras superfícies.

#### Metadados e Ochre

- Ochre sobre Olive apresenta aproximadamente **2,72:1**, insuficiente para texto normal e grande.
- Metadados (Cliente / Empresa, Período, Meu papel, entre outros) usam **Cream**, não Ochre, quando estão sobre Olive.
- Ochre permanece nos divisores e detalhes decorativos e tem duas aplicações definidas como superfície: callout da página Sobre e rótulos de `ProjectThumbnail`.

#### Callout sobre fotografia da página Sobre

- Fundo: **Ochre sólido `#B89A58`**.
- Texto: **Charcoal `#262720`**.
- Contraste aproximado: **5,60:1** (WCAG AA para texto normal).
- **Sem transparência**: a proposta anterior de Ochre a 60% foi substituída.
- Os tokens do callout pertencem a esse contexto específico. O `ProjectThumbnail` utiliza Ochre e Charcoal com tokens semânticos próprios, sem reutilizar os tokens do callout.

### 3.3. Textura de fundo — definida em 21/11/2026

A textura visível nos layouts integra o tratamento visual do fundo principal do site. **Não é uma cor adicional da paleta**, uma superfície alternativa ou um componente independente.

| Propriedade | Definição | Status |
|---|---|---|
| Cor base | Olive `#50594B` | Definido |
| Aplicação | Fundo principal das páginas | Definido |
| Repetição | Textura **seamless**, repetível horizontal e verticalmente sem emendas visíveis | Definido |
| Luminosidade | Sem gradientes, vinhetas ou variações globais de iluminação; preservar a cor base Olive | Definido |
| Arquivo de imagem | Asset da textura utilizado no projeto | Implementado: `/images/bg_texture.webp` |
| Escala e resolução de aplicação | Validar com o asset real no navegador e nos diferentes tamanhos de tela | Pendente |

A cor Olive permanece como `background-color`, inclusive como fallback caso a imagem não carregue. Aplicar a textura como `background-image` repetida nos dois eixos (`background-repeat: repeat`), preservando a continuidade visual independentemente da resolução da página. Não introduzir gradientes para simular iluminação ou variação do fundo.

**Nota sobre o asset:** o CSS compartilhado utiliza `--bg-texture-image: url('/images/bg_texture.webp')`. A escala e a continuidade visual permanecem sujeitas a refinamento.

### 3.4. Referência de contraste

Critérios WCAG 2.2 AA usados nos documentos: **4,5:1** para texto normal; **3:1** para texto grande; **3:1** para gráficos essenciais e identificação de controles quando aplicável.

| Par de cores | Contraste aproximado | Consequência |
|---|---:|---|
| Cream × Charcoal | 12,92:1 | AA e AAA para texto normal |
| Cream × Brown | 9,22:1 | AA e AAA para texto normal |
| Cream × Olive | 6,27:1 | AA para texto normal |
| Ochre × Charcoal | 5,60:1 | AA para texto normal |
| Ochre × Brown | 3,99:1 | AA para texto grande; não para texto normal |
| Ochre × Olive | 2,72:1 | Insuficiente para texto |
| Brown × Olive | 1,47:1 | Pouca separação entre as superfícies |
| Light Ochre × Olive | **4,49:1** | **Limítrofe, ligeiramente inferior a 4,5:1 para texto normal** |

**Observação de implementação:** Light Ochre em hover sobre Olive é uma decisão vigente. A combinação, contudo, fica ligeiramente abaixo da referência numérica de 4,5:1 quando calculada com os códigos hexadecimais informados. Verificar a acessibilidade do estado na interface real sem substituir silenciosamente a cor aprovada.

O fundo Brown do botão sobre Olive também tem separação baixa (1,47:1). Isso não prova, isoladamente, uma violação: avaliar a identificação do botão na apresentação completa. O monograma Ochre sobre Brown tem cerca de 3,99:1 e é gráfico, não texto normal.

### 3.5. Estados interativos vigentes

#### Botão primário (`Button`)

| Estado | Fundo | Texto | Situação |
|---|---|---|---|
| Default | Brown | Cream | Definido |
| Hover | **Cream** | **Brown** | **Definido pelo documento de componentes**: inversão de cores com transição suave |
| Active | Charcoal | Cream | Valor anterior preservado, sem decisão posterior conflitante; validar no componente |
| Focus-visible | Contorno externo perceptível | Não depende apenas de cor | Definido; espessura de referência de 2px e afastamento de 3px sobre superfícies apropriadas |

A proposta antiga de hover por `color-mix()` (75% Brown + 25% Charcoal) foi **substituída** pela inversão Cream/Brown. Não incluí-la como alternativa ativa do componente.

#### Links, navegação e cards

| Elemento / estado | Comportamento vigente |
|---|---|
| Navegação, normal | Texto Cream sobre Olive, sem decoração extra requerida |
| Navegação, hover | **Cor do texto Cream → Light Ochre**; não adicionar sublinhado de hover como regra do sistema |
| Navegação, página atual | **Peso 700** e `aria-current="page"` para página exata; `aria-current="location"` para seção atual; não usar o sublinhado persistente anterior como identificação padrão |
| Links do rodapé, hover | **Cor do texto Cream → Light Ochre** sobre Olive |
| `TextLink`, normal | Sublinhado **tracejado (`dashed`) permanente** |
| `TextLink`, hover | **Muda a cor do texto**; o sublinhado permanece tracejado |
| `ProjectThumbnail`, hover | Toda a imagem/rótulo permanece um único link; **somente o fundo do rótulo muda de Ochre para Cream**; texto Charcoal permanece; sem zoom/elevação |
| `ProjectCard`, hover | A área do card continua um link único; o CTA visual inverte Cream/Brown; sem zoom/elevação |
| `ArticlePreview`, hover | Toda a área do artigo é um único link; **somente o título muda de Cream para Light Ochre**, mesmo quando o cursor está sobre a descrição; sem sublinhado, zoom, elevação ou mudança de fundo |
| Link no callout | Charcoal com sublinhado; hover em superfície Ochre não especificado |
| Foco de qualquer controle | Indicador externo visível em `:focus-visible` |

O arquivo anterior de tokens descrevia sublinhados de hover e de página ativa, além de aumento de espessura no sublinhado editorial. Esses comportamentos foram **substituídos** pelas decisões mais recentes de componentes. Em fundos claros, a cor de hover requer definição contextual compatível com contraste; não aplicar Light Ochre automaticamente.

#### Indicador de foco

- Sobre Olive ou superfícies escuras: **Cream**.
- Sobre o callout Ochre: **Charcoal**.
- Espessura de referência: **2px**.
- Afastamento de referência: **3px**.
- Aplicar `:focus-visible` em botões, links, navegação, idioma e menu mobile.

### 3.6. Cores e estados não definidos

- Estados `disabled` somente quando houver controles que os exijam semanticamente.
- Estados de validação, erro, sucesso e aviso.
- Cores para formulários ainda não existentes.
- Outras superfícies, temas claro/escuro ou escalas de tonalidades.
- Reutilização de Ochre como fundo além do callout e de `ProjectThumbnail`.
- Regra cromática de hover em superfícies claras, exceto o hover aprovado do rótulo de `ProjectThumbnail` (Ochre → Cream).

## 4. Tipografia

### 4.1. Famílias — definido

| Família | Papel | Usos previstos |
|---|---|---|
| **Familjen Grotesk** | Display, títulos e voz da marca | Nome, títulos de páginas e projetos, `ProjectThumbnail`, introduções de `PageIntro`, títulos de `ArticlePreview`, destaques grandes e labels estruturais |
| **Commissioner** | Leitura, interface e sustentação editorial | Corpo, botões, navegação, descrições de cards, marcadores de ano no índice de Artigos e título de artigo individual |
| **Recursive Mono** | Camada técnica e metadados | Eyebrows, metadados, tags, código, notas pequenas |

**Implementação:** a família Recursive deve ser carregada/configurada na variante monoespaçada, e não apenas referenciada pelo nome sem verificar seus eixos ou arquivos de fonte.

### 4.2. Pesos — definido

| Token | Peso |
|---|---:|
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--font-weight-black` | 900 |

#### Usos de peso por família

**Familjen Grotesk**

- Nome / logo tipográfico: **700**.
- H1: **700**.
- H2 fora do conteúdo editorial: **600**, quando aplicável.
- Grandes destaques: **600 ou 700**.
- `ProjectCard`: títulos em **700**.
- `ArticlePreview`: títulos em **600**.
- `ProjectThumbnail` e texto introdutório de `PageIntro`: **400**.
- Labels estruturais: **500**.

**Commissioner**

- Corpo: **400**.
- Títulos editoriais H2–H6: pesos conforme seção 4.3; todo o conteúdo editorial usa Commissioner.
- Corpo destacado: **500**.
- Subhead: **400 ou 500**.
- Botões: **500 ou 600** (a proposta de estilo de botão usa 600).
- Navegação: **400** no padrão e **700** na página/seção atual, conforme implementação validada.
- Corpo e descrições de cards: **400**.
- Marcadores de ano no índice de Artigos e título do artigo individual: **900 (Black)**.

**Recursive Mono**

- Eyebrow técnico: **400**.
- Metadados: **400**.
- Tags: **400 ou 500**.
- Código: **400**.
- Notas pequenas: **400**.

### 4.3. Inventário dos tamanhos desktop — definido

Todos os valores abaixo foram informados a partir dos layouts, em **pixels**.

#### Home (desktop)

| Elemento | Tamanho |
|---|---:|
| Navegação | 16px |
| Eyebrow “Web Designer / Desenvolvedor WordPress” | 18px |
| Nome “Henrique Mirai” | 216px |
| Frase principal “Eu crio sites...” | 36px |
| Texto “Atualmente na ABC Fitness...” | 16px |
| Texto do botão | 18px |
| Títulos dos projetos destacados (`ProjectThumbnail`, Familjen Grotesk Regular) | 18px |
| Links do rodapé: Email / LinkedIn / Back to top | 14px |
| Copyright / All rights reserved | 12px |

#### Sobre (desktop)

| Elemento | Tamanho |
|---|---:|
| Título “Sobre” | 72px |
| Primeiro parágrafo “Sou Henrique Mirai...” (`PageIntro`, Familjen Grotesk Regular) | 28px |
| Links auxiliares abaixo da introdução | 14px |
| Demais parágrafos | 18px |
| Texto do callout | 16px |

#### Projetos, listagem (desktop)

| Elemento | Tamanho |
|---|---:|
| Título de página e introdução | Mesmo padrão de Sobre: 72px / 28px (introdução em Familjen Grotesk Regular) |
| Metadados “Freelance / Luiza Rocha” | 14px |
| Título do projeto (`ProjectCard`, Familjen Grotesk Bold) | 52px |
| Descrição do projeto | 18px |

#### Projeto individual (desktop)

| Elemento | Tamanho |
|---|---:|
| Título principal (Familjen Grotesk 700, Page title) | 72px |
| Metadados do projeto (Recursive Mono 400) | 14px |

#### Conteúdo editorial compartilhado (projetos e artigos) — aprovado em 25/11/2026

Todos os elementos abaixo utilizam Commissioner. O H1 pertence ao cabeçalho da página, fora do EditorialContent.

| Elemento | Peso | Mobile | Tablet (aprox.) | Desktop |
|---|---:|---:|---:|---:|
| H2 | 600 | 32px | 42px | 52px |
| H3 | 600 | 24px | 30px | 36px |
| H4 | 500 | 22px | 25px | 28px |
| H5 | 700 | 16px | 17px | 18px |
| H6 | 600 | 16px | 17px | 18px |
| Parágrafos e listas | 400 | 16px | 17px | 18px |
| Legendas | 400 | 14px | 14px | 14px |

Entrelinha dos títulos internos: 1.2 (provisória); corpo e legendas reutilizam os tokens body e auxiliary. Os valores intermediários são referências aproximadas, não tamanhos fixos por breakpoint.

#### Artigos, índice (desktop) — atualizado em 26/11/2026

| Elemento | Família | Peso | Tamanho |
|---|---|---:|---:|
| Título da página e introdução | Familjen Grotesk | 700 / 400 | 72px / 28px |
| Marcador de ano (ex.: 2026) | Commissioner | 900 (Black) | **52px** |
| Título do artigo (`ArticlePreview`) | Familjen Grotesk | 600 (Semibold) | **36px** |
| Descrição | Commissioner | 400 (Regular) | **18px** |

Categoria removida por decisão de 26/11/2026.

#### Artigo individual (desktop) — atualizado em 26/11/2026

| Elemento | Família | Peso | Tamanho |
|---|---|---:|---:|
| Título principal | Commissioner | 900 (Black) | **52px** |
| Data de publicação | Recursive Mono | 400 (padrão de metadados; validar) | **14px** |
| Corpo editorial | Commissioner | 400 (Regular) | **18px** |

A data utiliza a família e tamanho dos metadados existentes; seu peso 400 é a referência de implementação. Não há categoria. O título do artigo individual **não** reutiliza a fonte ou o peso do `Page title` global: é um estilo editorial próprio.

#### Escala primitiva desktop

**12, 14, 16, 18, 28, 36, 52, 72px**, além de **216px** para o display especial da Home.

A escala não segue uma razão matemática fixa: ela foi construída a partir dos usos reais nos layouts. Foi decidido **preservar os 52px nos títulos da listagem no desktop**, deixando a possibilidade de testar 36px para cards comuns durante a implementação, sem aplicar essa alteração agora.

### 4.4. Escala responsiva — proposta v1.0, provisória

Referências adotadas:

- **Mobile:** 360px de largura.
- **Tablet:** 768px de largura.
- **Desktop:** 1200px ou mais.

| Estilo | Mobile 360px | Tablet 768px | Desktop ≥1200px |
|---|---:|---:|---:|
| Hero name | 56px | 96px | **216px** |
| Page title | 40px | 56px | **72px** |
| Project title | 32px | 42px | **52px** |
| Hero statement | 24px | 30px | **36px** |
| Page introduction | 22px | 25px | **28px** |
| Body | 16px | 17px | **18px** |
| Project preview | 16px | 17px | **18px** |
| Button | 16px | 17px | **18px** |
| Eyebrow | 14px | 16px | **18px** |
| Navigation | 16px | 16px | **16px** |
| Callout | 16px | 16px | **16px** |
| Auxiliary links | 14px | 14px | **14px** |
| Metadata | 14px | 14px | **14px** |
| Copyright | 12px | 12px | **12px** |

**Status:** os tamanhos desktop da escala original foram mantidos e as famílias/pesos foram ajustados onde expressamente aprovados em 21/11/2026; mobile e tablet são uma **extrapolação proposta e aceita como ponto de partida**, sujeita à validação visual e funcional. O título de ArticlePreview possui escala implementada de 24–36px (tablet aproximadamente 30px). Marcador de ano e título individual de artigo ainda têm somente valores desktop aprovados no Design System; suas medidas responsivas efetivas devem ser conferidas no código local e validadas visualmente.

#### Comportamento responsivo

- **Hero name:** interpolação em duas faixas, de 56px a 96px (360–768px) e de 96px a 216px (768–1200px). Nome em duas linhas no mobile, conforme espaço disponível no tablet e em uma linha no desktop. A implementação aplica um limite provisório de `15vw` a partir do tablet, portanto o tamanho efetivo pode ser menor que a escala nominal (180px a 1200px). Tokens exclusivos do Hero ficam no HomeLayout, sem declaração global.
- **Page title e project title:** escalonamento fluido para reduzir quebras excessivas.
- **Textos longos:** corpo passa de 18px no desktop a 16px no mobile.
- **Textos auxiliares:** 12, 14 e 16px permanecem estáveis quando aplicável, evitando reduções adicionais em telas pequenas.
- **Tamanhos intermediários:** calculados por `clamp()`, sem necessidade de definir um tamanho separado para cada viewport.

### 4.5. Entrelinhas — provisoriamente aceitas

| Estilo | Família | Peso | Line-height (unitless) |
|---|---|---:|---:|
| Hero name | Familjen Grotesk | 700 | 1.00 mobile / 0.95 a partir de tablet |
| Page title | Familjen Grotesk | 700 | 1.05 |
| Project title (`ProjectCard`) | Familjen Grotesk | 700 | 1.10 |
| Hero statement | Commissioner | 400 | 1.25 |
| Page introduction (`PageIntro`) | Familjen Grotesk | 400 | 1.35 |
| Body | Commissioner | 400 | 1.60 |
| Project preview (descrição) | Commissioner | 400 | 1.40 |
| Button | Commissioner | 600 | 1.20 |
| Eyebrow | Recursive Mono | 400 | 1.40 |
| Navigation | Commissioner | 400 / 700 | 1.40 (referência) |
| Callout | Commissioner | 400 | 1.60 |
| Auxiliary links | Commissioner | 400 | 1.40 |
| Metadata | Recursive Mono | 400 | 1.50 |
| Copyright | Commissioner | 400 | 1.50 |

A entrelinha do rótulo de `ProjectThumbnail` é 1.2, aprovada como ponto de partida. As entrelinhas do **marcador de ano** e do **título individual do artigo** ainda requerem validação. Não herdar automaticamente `line-height` de outros estilos apenas por terem o mesmo tamanho.

ArticlePreview utiliza entrelinha 1.15 na implementação; títulos editoriais H2–H6 utilizam 1.2.

**Status:** entrelinhas adotadas provisoriamente. Não foram medidas a partir dos arquivos originais do Figma; precisam ser validadas com as fontes reais e os componentes implementados.

### 4.6. Letter-spacing — definido provisoriamente

- Usar o **espaçamento padrão de cada fonte** (`letter-spacing: normal`) como ponto de partida.
- Não criar uma escala de tracking agora.
- Ajustes ópticos poderão ser feitos em componentes específicos, especialmente no display de 216px.

### 4.7. Separação entre estilo visual e semântica HTML

- Os estilos tipográficos serão reutilizáveis e **não dependerão exclusivamente de `h1`, `h2`, `p` etc.**
- O título de um projeto pode ter um estilo visual semelhante na listagem e na página individual, mas ter níveis semânticos HTML diferentes conforme a estrutura da página.
- A proposta de arquitetura é: **primitivos** (famílias, pesos, tamanhos) → **estilos tipográficos** (combinações) → **componentes** (aplicação).

### 4.8. Validações futuras de tipografia

- Reflow e legibilidade do hero de 216px em telas pequenas.
- Quebras de títulos longos de projetos.
- Legibilidade dos tamanhos de 12px e 14px em contexto real.
- Testes de zoom, redimensionamento de texto e espaçamento personalizado pelo usuário.
- Largura de leitura de parágrafos longos em Sobre, artigos e estudos de caso. A faixa de 60–75 caracteres por linha foi mencionada como **referência para teste**, não como regra fechada.
- Tamanhos de subtítulos internos de artigos e estudos de caso ainda não especificados.
- Entrelinhas e quebras dos títulos próprios de Artigos, incluindo o título individual em duas ou mais linhas, e a validação da entrelinha de 1.2 do rótulo de `ProjectThumbnail` com títulos reais.

## 5. Componentes e padrões visuais

Os arquivos de componentes em `src/components/` usam `kebab-case` e os identificadores importados usam `PascalCase`. O prefixo `site-` identifica componentes globais. A galeria é importada como `ProjectGallery` de `project-gallery.astro` e usa o bloco BEM `.home-project-gallery`. Consulte as [convenções de nomenclatura](naming-conventions.md).

### 5.1. Inventário

| Componente/estrutura | Arquivo | Responsabilidade | Variantes ou observações |
|---| --- |---|---|
| `SiteHeader` | `site-header.astro` | Logo, navegação principal e alternância de idioma | Um componente com apresentação responsiva desktop/mobile |
| `SiteFooter` | `site-footer.astro` | Contatos, retorno ao topo e copyright | Único, igual em todas as páginas |
| `Button` | `button.astro` | Ações e links com aparência de botão | `primary` inicialmente |
| `TextLink` | `text-link.astro` | Links dentro do conteúdo editorial | Sublinhado tracejado; ícone opcional quando necessário |
| `ProjectGallery` | `project-gallery.astro` | Galeria específica da Home com até três projetos | Cada item segue o padrão visual `ProjectThumbnail`, sem componente individual ou variante de ProjectCard |
| `ProjectCard` | `project-card.astro` | Apresentação detalhada de projetos na listagem | `default` e `featured` |
| `PageIntro` | `page-intro.astro` | Título e introdução de páginas internas | Sem variantes inicialmente |
| `ProjectHeader` | `project-header.astro` | Título e metadados de estudos de caso | Metadados flexíveis |
| `EditorialContent` | `editorial-content.astro` | Estilos compartilhados do conteúdo editorial | Estrutura livre para projetos e artigos |
| `ArticlePreview` | `article-preview.astro` | Entrada de artigo no índice | Título e descrição; link único; sem variantes definidas |

**Total:** dez componentes implementados identificados para esta fase, incluindo `ProjectGallery`, específico da Home. `ProjectThumbnail` é um padrão visual interno da galeria, não um arquivo independente.

### 5.2 `SiteHeader`

**Anatomia:** logo com link para a Home, navegação principal e alternância de idioma (PT-BR/EN).

**Decisões:**
- Header **estático**, no início do documento; desaparece naturalmente durante a rolagem. Sem sticky ou comportamento dinâmico.
- **Desktop:** logo, navegação horizontal e seletor de idioma.
- **Mobile:** logo e **menu expansível**; links e seletor de idioma aparecem no menu aberto.
- **Página/seção atual:** peso 700, padrão 400, em desktop e mobile. `aria-current="page"` para URL exata e `aria-current="location"` para descendentes da seção; seletor de idioma mantém `aria-current="true"`. A alternância de idioma preserva a página equivalente.
- **Hover:** muda a **cor do texto**, não o background. Sobre Olive, Cream `#F2EDE4` → Light Ochre `#E2C88E`.
- **Foco:** indicador visível com `:focus-visible`.
- **Acessibilidade do menu:** contemplar `aria-expanded`, `aria-controls`, operação por teclado e gerenciamento apropriado do foco.

**Implementado:** menu mobile nativo `details`/`summary`, ícone animado e painel expansível. Refinamento visual e auditoria de teclado/foco permanecem possíveis; não presumir implementação de atributos ARIA adicionais além da semântica nativa.

A apresentação por sublinhado prevista no arquivo anterior de tokens foi substituída por estas decisões.

### 5.3 `SiteFooter`

**Anatomia:** divisor superior, links de contato (Email e LinkedIn), link "Voltar ao topo" e copyright.

**Decisões:**
- Rodapé **igual em todas as páginas**, sem variantes.
- Aparece ao final do conteúdo.
- Links com o mesmo hover da navegação: mudança da cor do texto para Light Ochre `#E2C88E` sobre Olive.
- Link **"Voltar ao topo" com rolagem suave**.
- Respeitar `prefers-reduced-motion: reduce`, oferecendo retorno imediato sem animação.
- Elementos interativos com foco visível por `:focus-visible`.
- Composição se adapta ao mobile.

### 5.4 `Button`

**Anatomia:** rótulo e destino/ação. Variante identificada: `primary`.

| Estado | Fundo | Texto |
|---|---|---|
| Padrão | Brown `#5A3426` | Cream `#F2EDE4` |
| Hover | Cream `#F2EDE4` | Brown `#5A3426` |

**Decisões:**
- Botões com bordas totalmente arredondadas, conforme layout de referência. **Divergência:** implementação validada usa raio de 18px (`--radius`); decisão final adiada. Button possui modo presentacional para CTA dentro do ProjectCard, sem ação/foco independente.
- Hover com **inversão de cores** e transição suave.
- **Contorno externo visível em `:focus-visible`**.
- O padrão de foco se aplica a **todos os elementos interativos do site**, incluindo links, navegação, seletor de idioma e menu mobile.
- Para navegação, empregar semanticamente um elemento `<a>` com aparência de botão.

**Pendente:** duração, easing e outras especificações de microinteração. Estados como disabled só se aplicam onde forem semanticamente relevantes.

A inversão de cores substitui o hover por `color-mix()` do arquivo anterior. O estado `active` anterior (Charcoal/Cream) e a referência de foco (contorno Cream de 2px com afastamento de 3px sobre Olive) permanecem utilizáveis porque não foram contrariados pelo documento posterior.

### 5.5 `TextLink`

**Escopo:** links dentro de conteúdo editorial, diferenciados dos links de navegação e rodapé.

**Decisões:**
- **Sublinhado tracejado (`dashed`) permanente**.
- **Hover muda a cor do texto**; o sublinhado permanece tracejado.
- Cor de hover deve ter contraste adequado ao background. Light Ochre vale para texto sobre Olive; fundos claros precisam de solução apropriada.
- Contorno de foco externo visível com `:focus-visible`.
- Ícone pode ser opcional em contextos apropriados.

O comportamento anterior de aumentar a espessura do sublinhado no hover foi substituído. Links dentro do callout continuam usando Charcoal com sublinhado; o hover nesse fundo não foi detalhado.

### 5.6 `ProjectGallery` e padrão visual `ProjectThumbnail`

**Uso:** exclusivamente na Home. Componente `project-gallery.astro` implementado e validado isoladamente com dois projetos de teste. Cada thumbnail é renderizado pelo próprio componente da galeria, sem `ProjectThumbnail.astro` independente.

**Anatomia:** imagem e rótulo de título **sobreposto à imagem**, próximo à base e alinhado à esquerda; substitui o título centralizado abaixo da imagem.

**Tipografia do rótulo:** Familjen Grotesk **Regular (400), 18px**, implementada nos três breakpoints; entrelinha 1.2.

**Cores e estados do rótulo:**

| Estado | Fundo | Texto |
|---|---|---|
| Default | Ochre `#B89A58` | Charcoal `#262720` |
| Hover | Cream `#F2EDE4` | Charcoal `#262720` (inalterado) |

**Decisões:**
- Estrutura visual própria e compacta, implementada dentro de `ProjectGallery`, separada de `ProjectCard`. Não criar variante thumbnail de ProjectCard.
- **Toda a área clicável**, levando ao projeto.
- Hover em qualquer parte da área clicável muda **somente o fundo do rótulo**, não a cor do título nem a imagem.
- Sem zoom na imagem ou elevação do card.
- Nome acessível com base no título do projeto; foco visível.
- Sem variantes inicialmente.

**Medidas iniciais aprovadas em 26/11/2026:**

| Propriedade | Valor |
|---|---|
| Offset esquerdo e inferior | 12px |
| Largura máxima do rótulo | 85% da imagem |
| Padding vertical / horizontal | 8px / 12px |
| Raio do rótulo | 12px |
| Entrelinha | 1.2 |
| Transição do fundo | 180ms; desativada com movimento reduzido |
| Títulos longos | Quebra natural, sem truncamento |
| Imagem | Proporção intrínseca, largura 100%, altura automática, raio 18px |

A implementação aplica no focus-visible a mesma mudança de fundo do hover, além de contorno Cream de 2px com offset de 3px. O gutter global também é usado como espaçamento vertical; esses detalhes de implementação são revisáveis.

**Distribuição responsiva:**

| Resolução | Colunas ocupadas por item | Máximo por linha |
|---|---:|---:|
| Desktop | 2 de 6 | 3 |
| Tablet | 2 de 4 | 2 |
| Mobile | 3 de 3 | 1 |

Exibir até três projetos publicados marcados `showOnHome`, por `order` crescente, sem prioridade de `featured`. Menos de três: exibir somente os disponíveis, alinhados ao início do grid; zero: omitir a galeria. Não usar placeholders ou duplicar projetos. O posicionamento da galeria em relação à fotografia pertence ao HomeLayout.

**Pendente:** validar os rótulos com conteúdo definitivo e diferentes imagens, e a composição da galeria integrada ao Hero. O rótulo permanece sobreposto em todos os breakpoints; a referência mobile antiga com título abaixo da imagem não é vigente.

### 5.7 `ProjectCard`

**Uso:** índice de Projetos.

**Anatomia:** imagem, categoria/contexto, título, descrição e CTA visual.

**Variantes:**
- `default`: composição vertical, usada na grade de projetos.
- `featured`: composição horizontal, para projeto em destaque.

**Decisões:**
- As variantes compartilham os mesmos tipos de conteúdo e diferem principalmente na disposição visual.
- **Toda a área do card é um único link** para o estudo de caso.
- O CTA é **visual**, parte do link principal; **não criar links aninhados**.
- Hover em qualquer área do card **inverte as cores do CTA**: Brown/Cream → Cream/Brown.
- Sem zoom na imagem ou elevação do card.
- Foco visível com `:focus-visible`.
- Fonte de dados de projetos compartilhada com `ProjectThumbnail`, sem duplicação de conteúdo no modelo de dados.

**Título desktop:** Familjen Grotesk **Bold (700), 52px**, tanto na variante `default` quanto na `featured`.

**Composição implementada:** default vertical em 3/2/3 colunas (desktop/tablet/mobile); featured ocupa todo o grid e dispõe imagem/conteúdo em 3+3 no desktop, 2+2 no tablet e empilha no mobile. Featured centraliza verticalmente os blocos. Hover e foco invertem o CTA presentacional.

**Imagens:** asset único WebP otimizado manualmente por projeto, compartilhado com ProjectThumbnail, preservando proporção original, sem recorte forçado. O card atual ainda possui atributos 688 × 373, aspect-ratio fixo e object-fit cover; adequação pendente no refinamento. Raio de 18px mantido.

### 5.8 `PageIntro`

**Uso aprovado:** página Sobre, índice de Projetos e índice de Artigos.

**Anatomia:** título e texto introdutório, configuráveis por página.

**Decisões:**
- Desktop: título e introdução ocupam três colunas do grid cada; tablet, duas cada; título à esquerda e introdução à direita.
- Mobile: **uma coluna**, título acima do texto.
- Sem variantes inicialmente.
- **Índice de Artigos** é a página que lista os artigos; páginas individuais de artigos possuem outra estrutura.

**Tipografia desktop:** título de página em Familjen Grotesk Bold (700), 72px; **introdução em Familjen Grotesk Regular (400), 28px**.

### 5.9 `ProjectHeader`

**Uso:** páginas individuais dos projetos.

**Anatomia:** título e metadados do projeto.

**Decisões:**
- **Metadados flexíveis**, como pares `label` e `value`.
- Campos, quantidade e ordem definidos individualmente para cada estudo de caso, sem conjunto obrigatório.
- Empregar semântica de lista de descrição (`dl`, `dt`, `dd`).
- `MetadataList` permanece **interno ao `ProjectHeader`**, sem componente global separado.
- Não criar variantes baseadas em imagem de capa: a opção de **projetos sem capa** foi aprovada.

**Composição aprovada e implementada:** título Familjen Grotesk 700, Page title (40–72px); desktop 4 colunas de título e 2 de metadados. Tablet e mobile empilham os blocos em largura integral. Sem metadados, omitir lista e expandir título. Rótulo e valor sempre lado a lado em grid interno 1:1, inclusive mobile; alinhamento pelo topo e quebra de palavras longas. Recursive Mono 400, 14px, entrelinha 1.50, Cream; divisores Ochre entre entradas. Valores HTTP(S) válidos renderizados com TextLink, URL completa como texto visível; demais valores permanecem texto. Não há campo adicional para link.

**Medidas provisórias implementadas:** gap entre blocos 32px, gap interno 16px, padding vertical das entradas 12px e divisor 1px.

**Exemplo conceitual:**

```astro
<ProjectHeader
  title="Nome do projeto"
  metadata={[
    { label: "Cliente", value: "Empresa X" },
    { label: "Período", value: "2025–2026" },
    { label: "Atuação", value: "Design e desenvolvimento" }
  ]}
/>
```

### 5.10 `EditorialContent`

**Uso:** estudos de caso e artigos individuais.

**Decisões:**
- **Estrutura editorial flexível**, sem seções narrativas obrigatórias.
- Cada projeto ou artigo pode definir livremente seções, ordem, títulos, subtítulos, parágrafos, listas, links e imagens.
- Um **container editorial com estilos compartilhados** substitui a criação de um componente para cada seção.
- Tipografia exclusivamente Commissioner, conforme escala H2–H6 da seção 4.3.
- Links editoriais usam âncoras HTML com sublinhado tracejado, hover Light Ochre e foco Cream; não são substituídos automaticamente por TextLink nem abrem necessariamente em nova aba.
- Markdown e MDX suportados; componente Astro com slot e estilos escopados para conteúdo gerado.
- Imagens sem arredondamento (exceção deliberada), sem recorte ou ampliação forçada; `max-width: 100%; height: auto`. Largura espacial controlada pelo layout consumidor; projetos seguem seção 6, artigos preservam coluna de até 900px, variações específicas de mídia em artigos ainda pendentes.
- Citações com borda lateral Ochre; separadores com linha Ochre de 1px; legendas em cor secundária; listas com marcadores e numeração.
- Medidas provisórias implementadas: 24px entre blocos, 48px antes de títulos não iniciais, 8px entre itens de lista, recuo de 1.5em, 12px antes de legendas. Estilos específicos de tabelas, código e galerias permanecem pendentes.

### 5.11 `ArticlePreview`

**Uso:** entradas da listagem na página de índice de Artigos.

**Anatomia:** título e descrição; não há categoria, imagem, data visível nem CTA visual adicional.

**Decisões:**
- Composição vertical, alinhada à esquerda e sem superfície de card, borda, sombra, elevação ou divisor próprio.
- **Toda a área do artigo é um único link** para sua página individual, sem links aninhados.
- Ao passar o cursor por **qualquer parte da área clicável**, **somente o título** muda de Cream (`#F2EDE4`) para Light Ochre (`#E2C88E`). A descrição não muda.
- O título **não recebe sublinhado tracejado**: o padrão de `TextLink` se aplica a links dentro de conteúdo editorial, não à apresentação do título do `ArticlePreview`.
- Foco perceptível em toda a área interativa com `:focus-visible`, conforme a regra global.
- Sem variantes definidas para esta fase.

**Tipografia desktop:** título **Familjen Grotesk Semibold (600), 36px**, descrição Commissioner Regular (400), 18px. Escala implementada do título: 24–36px, entrelinha 1.15; descrição 16–18px, entrelinha 1.40. Gap interno inicial de 8px. Transição de cor de 180ms, desativada com movimento reduzido; foco Cream 2px, offset 3px. Medidas finas revisáveis.

## 6. Layouts de página

Os arquivos em `src/layouts/` usam nomes em `kebab-case`, com `-index` para listagens e `-detail` para páginas individuais. Os identificadores importados mantêm o sufixo `Layout`.

| Layout implementado | Arquivo | Uso |
|---| --- |---|
| `BaseLayout` | `base.astro` | Estrutura comum com `SiteHeader`, área principal e `SiteFooter` |
| `HomeLayout` | `home.astro` | Página inicial, Hero local e `ProjectGallery`; sem listagem de artigos |
| `AboutLayout` | `about.astro` | Página Sobre, com `PageIntro` e composição local do perfil |
| `ProjectIndexLayout` | `project-index.astro` | Índice de Projetos, implementado separadamente |
| `ArticleIndexLayout` | `article-index.astro` | Índice de Artigos, com PageIntro e agrupamento anual de ArticlePreview |
| `ProjectDetailLayout` | `project-detail.astro` | Estudos de caso com `ProjectHeader` e `EditorialContent` |
| `ArticleDetailLayout` | `article-detail.astro` | Artigo individual com cabeçalho editorial local e `EditorialContent` |

### Estrutura compartilhada do `BaseLayout` (desktop) — definida em 21/11/2026

Valores informados a partir do Figma:

| Propriedade | Valor | Status |
|---|---|---|
| Container principal | **1440px** | Definido como referência desktop do Figma |
| Número de colunas do grid | **6** | Definido |
| Margens laterais | **16px** | Definido |
| Gutter entre colunas | **32px** | Definido |
| Border-radius das imagens de conteúdo | **18px**; EditorialContent **0px** | Definido |
| Fundo das páginas | **Olive `#50594B` com textura repetível** | Definido; asset integrado |

Grid responsivo implementado e validado:

| Resolução | Colunas | Margens laterais | Gutter |
|---|---:|---:|---:|
| Desktop ≥1200px | 6 | 16px | 32px |
| Tablet 768–1199px | 4 | 12px | 24px |
| Mobile <768px | 3 | 8px | 16px |

Container máximo 1440px; main e wrappers intermediários propagam subgrid. Valores de tablet permanecem revisáveis no refinamento. O raio de 18px não se aplica ao EditorialContent, monograma ou ícones; Button possui divergência registrada na seção 5.4. Fundo repetível conforme seção 3.3.

### Decisões sobre a Home — aprovadas em 26/11/2026

`HomeLayout` compartilhado pelas duas versões de idioma. Hero com fotografia, eyebrow, H1 com o nome, frase principal, texto complementar e Button; galeria de até três projetos. Sem artigos na Home. CTA leva ao índice de Projetos do idioma correspondente. Conteúdo provisório; o Hero não constitui componente independente.

| Elemento | Desktop ≥1200px | Tablet 768–1199px | Mobile <768px |
|---|---|---|---|
| Composição do Hero | Assimétrica | Assimétrica | Assimétrica |
| Fotografia | Lateral direita | Lateral direita | Lateral direita |
| Nome sobreposto à fotografia | Uma linha | Conforme espaço disponível | Duas linhas |
| Projetos por linha | Até 3 | Até 2 | 1 |
| Galeria sobreposta à fotografia | Sim | Não | Não |
| Rótulos dos projetos | Sobrepostos | Sobrepostos | Sobrepostos |

Preservar a sobreposição tipográfica característica da composição desktop e a assimetria controlada no mobile (direção D aprovada), com os textos sem tarjas Cream. O texto principal fica à esquerda e os detalhes/CTA são reorganizados conforme o espaço. O gradiente localizado sobre a fotografia para contraste não constitui alteração do fundo global texturizado.

**Primeira implementação (provisória, não especificação final):** fotografia `/images/foto.jpg`, raio 18px, `object-fit: cover`, enquadramento central, largura de 46% e altura mínima de 15rem no mobile; tablet/desktop com proporção 4:5, ocupando a metade direita do grid. Frase principal com largura de 51% no mobile e metade esquerda do grid nos demais breakpoints. Galeria com margem superior negativa de 9rem apenas no desktop. Escala nominal do Hero preservada, com limite local provisório de 15vw a partir do tablet. Espaço explícito entre os dois spans do nome.

**Status:** galeria validada isoladamente. A primeira renderização da Home apresentou problemas tipográficos, de espaçamento e distribuição; correções dos tokens e do espaço entre nome e sobrenome aplicadas, sem novo screenshot de validação. Ajustes de escala, composição, contraste, enquadramento, espaçamentos, CTA, sobreposição e responsividade ficam para o segundo momento por decisão do usuário. Não interpretar medidas iniciais como revisão do layout de referência aprovada.

### Decisões sobre a página Sobre

PageIntro compartilhado e até quatro links auxiliares. Desktop: biografia e fotografia 3+3; callout sobreposto à parte inferior esquerda da fotografia, largura de 65%. Tablet: 2+2, callout abaixo da fotografia. Mobile: biografia antes da fotografia, blocos empilhados. Conteúdo e medidas finas provisórios. A implementação registra fundo Charcoal no callout, divergindo da referência Ochre com texto Charcoal; manter a decisão visual anterior até revisão explícita, sem alterar automaticamente o código validado.

### Decisões sobre o índice de Projetos

ProjectIndexLayout reutiliza PageIntro e ProjectCard. Featured sempre primeiro, ordenado internamente por `order`, seguido dos cards default também ordenados; grupos vazios omitidos. Cada featured ocupa uma linha; default apresenta dois cards por linha no desktop/tablet e um no mobile. Divisor Ochre antes de cada featured e antes do grupo default. Esta prioridade não se aplica à Home, que usa `showOnHome` e `order`. Masonry editorial adiado para pós-MVP. Espaçamentos e textos introdutórios/CTA ainda provisórios.

### Decisões sobre estudos de caso

- **Não utilizar imagem de capa** no início dos layouts individuais de projeto.
- Título e metadados aparecem como apresentação inicial.
- Imagens são inseridas ao longo do conteúdo editorial.
- **Não exigir estrutura fixa de seções** como Desafio, Solução e Resultados.
- Metadados variam conforme o projeto.
- Não manter duas versões de layout com e sem capa.

**Composição aprovada em 25/11/2026:**

| Bloco | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Título | 4 | 4 | 3 |
| Metadados | 2 | 4 | 3 |
| Texto editorial alinhado à esquerda | 4 | 4 | 3 |
| Imagens (até) | 6 | 4 | 3 |

Imagens preservam dimensões intrínsecas e proporções; sem variantes individuais de largura no MVP. ProjectDetailLayout define a ocupação de colunas, incluindo imagens isoladas em parágrafos Markdown e figuras. Composições MDX personalizadas podem exigir tratamento próprio. Padding vertical 48px e gap entre cabeçalho e corpo 64px; no mobile 32px e 48px, respectivamente (provisórios).

### Decisões sobre o índice de Artigos — atualizado em 26/11/2026

- `ArticleIndexLayout` implementado, reutiliza `PageIntro`, `SiteHeader` e `SiteFooter` via BaseLayout.
- `PageIntro` mantém a composição de **duas colunas no desktop**: título da página à esquerda e introdução à direita. No mobile, segue a regra compartilhada de uma coluna.
- Publicações **agrupadas por ano**, com marcador visual do ano no início de cada grupo (ex.: `2026`).
- Marcador de ano: **Commissioner Black 900, 52px** no desktop.
- Dentro de cada ano, entradas `ArticlePreview` em **grade de duas colunas no desktop e tablet, uma no mobile**, organizadas em linhas; sem miniaturas e sem divisores entre entradas.
- Cada entrada exibe **título e descrição**; não exibe categoria nem data de publicação.
- Título da entrada: **Familjen Grotesk Semibold 600, 36px**; descrição: **Commissioner Regular 400, 18px**.
- Artigos com títulos de comprimentos distintos podem quebrar em mais de uma linha; preservar a coerência dos alinhamentos na grade.
- Rodapé segue `SiteFooter` sem variante específica.

**Pendente:** validação visual da grade responsiva, medidas finas de espaçamento e tamanhos do marcador de ano. A escala de ArticlePreview já está implementada. Não introduzir filtros, paginação ou imagens de capa como decisões aprovadas, pois não estão no layout final.

### Decisões sobre o artigo individual — atualizado em 26/11/2026

- Conteúdo disposto em **coluna editorial centralizada, com largura máxima de 900px**.
- **Sem imagem de capa** no cabeçalho; imagens podem aparecer ao longo do conteúdo.
- Cabeçalho editorial com **título e data de publicação abaixo**, centralizados; sem categoria.
- Data: **Recursive Mono 14px** (peso 400 conforme padrão de metadados, sujeito a confirmação).
- Título principal: **Commissioner Black 900, 52px** no desktop, podendo ocupar múltiplas linhas.
- Corpo editorial alinhado à esquerda, compartilhando `EditorialContent` e os estilos existentes de parágrafo (**Commissioner Regular 18px** no desktop).
- O cabeçalho é uma **composição local** do layout individual; não criar `ArticleHeader` global sem necessidade comprovada.
- A estrutura narrativa segue livre: parágrafos, títulos internos, listas, links e imagens conforme o conteúdo.
- Para a data, utilizar o elemento semântico HTML `<time>` com valor legível por máquina na implementação existente.

**Pendente:** medidas exatas entre título, data e corpo; entrelinhas e tamanhos mobile/tablet; largura e variações específicas de imagens editoriais. Os 900px são a largura máxima da **coluna**, não uma obrigação de que cada imagem ocupe 900px.

## 7. Elementos não abstraídos em componentes globais

| Elemento | Decisão |
|---|---|
| `ProfileCard` | Composição **local** da página Sobre; extração futura apenas se houver necessidade real |
| `SectionHeading` | Usar títulos HTML semânticos (`h1` a `h6`) com estilos tipográficos compartilhados |
| `MetadataList` | Parte interna do `ProjectHeader` |
| `Image` | Utilizar `<img>` e recursos nativos do Astro, incluindo `astro:assets` quando apropriado; cada componente controla a apresentação de suas imagens e aplica o raio de 18px às imagens de conteúdo, exceto EditorialContent (0px) |
| `Divider` | Usar `border` para divisão visual ou `<hr>` para separação semântica; sem componente independente |
| `ArticleHeader` | Composição local no artigo individual; sem componente global por enquanto |
| `ArticleYearGroup` | Agrupamento de listagem por ano, sob responsabilidade do layout; sem componente global por enquanto |
| Hero | Composição local do `HomeLayout`, com tokens tipográficos exclusivos |
| `ProjectThumbnail` | Padrão visual interno do `ProjectGallery`; sem componente independente |

## 8. Arquitetura e acessibilidade

- Evitar **abstrações prematuras**: criar componentes independentes somente quando houver reutilização, responsabilidade específica ou ganho claro de manutenção.
- Componentes visualmente distintos podem compartilhar **o mesmo modelo de dados**, sem que precisem compartilhar a mesma marcação. Tokens exclusivos de componentes e layouts permanecem locais; sua presença neste Design System não exige declaração no CSS global.
- Preservar semântica HTML: links para navegação, `aria-current="page"` para página atual e `location` para seção atual, lista de descrição para metadados, títulos hierárquicos, `<time>` para datas de publicação e divisões semânticas quando cabíveis. `ArticlePreview` deve possuir um único link sem âncoras aninhadas.
- Implementar **foco visível com `:focus-visible` em todos os controles interativos**.
- Considerar contraste de texto em todos os estados de interação; não transportar cores de hover de um fundo para outro sem verificar a combinação.
- Respeitar preferência de movimento reduzido na rolagem suave e em animações quando aplicável.
- O design system deve permanecer **enxuto**, orientado aos layouts existentes, e não tentar antecipar todos os componentes futuros.
- O grid desktop do `BaseLayout` usa os valores registrados do Figma (container 1440px, seis colunas, margens 16px, gutter 32px); tablet e mobile seguem a tabela responsiva da seção 6.
- Imagens dos layouts usam raio de 18px, exceto EditorialContent (0px); ícones, monograma e botões mantêm regras próprias.
- O fundo utiliza Olive `#50594B` com textura seamless repetível, sem gradientes ou variações globais de luminosidade. Asset integrado em `/images/bg_texture.webp`.

## 9. CSS de referência consolidado

O CSS abaixo é uma referência de design, não uma cópia integral do `global.css`. Tokens específicos são ilustrativos e devem permanecer locais ao componente/layout consumidor quando não compartilhados. O CSS **aplica a precedência das decisões consolidadas** nos pontos divergentes. As declarações de tipografia, cores sem conflito e responsividade foram preservadas. Os valores em `rem` pressupõem 16px como referência de equivalência com os tamanhos informados, mas acompanham a preferência do navegador.

**Escopo:** tokens são uma base de implementação, não um arquivo de estilos completo. As classes nos exemplos são ilustrativas; não equivalem à definição de APIs ou estrutura definitiva de componentes. Duração/easing, tratamento de hover em superfícies claras e demais detalhes de microinteração continuam sujeitos a refinamento. O peso ativo é 700. Exemplos de tokens locais não exigem novas variáveis globais.

```css
:root {
  /* ========================================
     COLORS — PRIMITIVES
     ======================================== */
  --color-olive: #50594b;
  --color-ochre: #b89a58;
  --color-brown: #5a3426;
  --color-cream: #f2ede4;
  --color-charcoal: #262720;
  --color-light-ochre: #e2c88e;

  /* COLORS — SEMANTICS */
  --color-background-primary: var(--color-olive);
  --bg-texture-image: url('/images/bg_texture.webp');

  --color-text-primary: var(--color-cream);
  --color-text-secondary: rgb(242 237 228 / 85%);
  /* Nome provisório; usar para hover textual sobre Olive */
  --color-text-hover: var(--color-light-ochre);

  --color-button-primary-bg: var(--color-brown);
  --color-button-primary-text: var(--color-cream);

  --color-brand-bg: var(--color-brown);
  --color-brand-fg: var(--color-ochre);

  --color-border-decorative: var(--color-ochre);

  /* Callout da página Sobre */
  --color-callout-background: var(--color-ochre);
  --color-callout-text: var(--color-charcoal);

  /* COLORS — INTERACTIONS (hover de botão usa inversão direta) */
  --color-action-active: var(--color-charcoal);

  --color-focus-dark-surface: var(--color-cream);
  --color-focus-light-surface: var(--color-charcoal);

  --color-link-primary: var(--color-cream);
  --color-link-on-callout: var(--color-charcoal);

  /* ========================================
     TYPOGRAPHY — FAMILIES
     ======================================== */
  --font-display: "Familjen Grotesk", sans-serif;
  --font-body: "Commissioner", sans-serif;
  --font-mono: "Recursive", monospace;

  /* TYPOGRAPHY — WEIGHTS */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900; /* Artigos: marcador de ano e título individual */

  /* LAYOUT — DESKTOP; valores responsivos abaixo */
  --layout-container-max-width: 90rem; /* 1440px */
  --layout-grid-columns: 6;
  --layout-margin-inline: 1rem;      /* 16px */
  --layout-grid-gutter: 2rem;        /* 32px */
  --radius-image: 1.125rem;         /* 18px */

  /* TYPOGRAPHY — FLUID SIZES (360px–1200px) */
  --type-size-page-title: clamp(
    2.5rem, calc(1.643rem + 3.81vw), 4.5rem
  );
  --type-size-project-title: clamp(
    2rem, calc(1.464rem + 2.381vw), 3.25rem
  );
  --type-size-page-intro: clamp(
    1.375rem, calc(1.214rem + 0.714vw), 1.75rem
  );
  --type-size-body: clamp(
    1rem, calc(0.946rem + 0.238vw), 1.125rem
  );
  --type-size-project-preview: var(--type-size-body);
  --type-size-button: var(--type-size-body);
  --type-size-eyebrow: clamp(
    0.875rem, calc(0.768rem + 0.476vw), 1.125rem
  );

  /* TYPOGRAPHY — FIXED SIZES */
  --type-size-navigation: 1rem;
  --type-size-callout: 1rem;
  --type-size-auxiliary: 0.875rem;
  --type-size-metadata: 0.875rem;
  --type-size-copyright: 0.75rem;

  /* ARTIGOS — TAMANHOS APROVADOS APENAS NO DESKTOP.
     Não aplicar como tokens responsivos sem validar mobile/tablet. */
  --type-size-article-year-desktop: 3.25rem;          /* 52px */
  --type-size-article-preview-title-desktop: 2.25rem; /* 36px */
  --type-size-article-page-title-desktop: 3.25rem;    /* 52px */
  --layout-article-content-max-width: 56.25rem;      /* 900px */

  /* TYPOGRAPHY — LINE HEIGHTS (PROVISIONAL) */
  --type-leading-page-title: 1.05;
  --type-leading-project-title: 1.10;
  --type-leading-page-intro: 1.35;
  --type-leading-body: 1.60;
  --type-leading-project-preview: 1.40;
  --type-leading-button: 1.20;
  --type-leading-eyebrow: 1.40;
  --type-leading-navigation: 1.40;
  --type-leading-callout: 1.60;
  --type-leading-auxiliary: 1.40;
  --type-leading-metadata: 1.50;
  --type-leading-copyright: 1.50;
}

```

### Tokens locais do Hero (home.astro)

Declarações aplicadas no ciclo de 26/11/2026, não no `global.css`:

```css
.home-hero {
  --type-size-hero: clamp(3.5rem, calc(1.294rem + 9.804vw), 6rem);
  --type-size-hero-statement: clamp(1.5rem, calc(1.179rem + 1.429vw), 2.25rem);
  --type-leading-hero: 1;
  --type-leading-hero-statement: 1.25;
}

@media (min-width: 768px) {
  .home-hero {
    --type-size-hero: clamp(6rem, calc(27.778vw - 7.333rem), 13.5rem);
    --type-leading-hero: 0.95;
  }

  /* Limite provisório da implementação inicial */
  .home-hero__name {
    font-size: min(var(--type-size-hero), 15vw);
  }
}
```

As expressões de clamp aproximam os tamanhos nominais da seção 4; com raiz de 16px, o limite local resulta em 180px a 1200px. Validar a escala efetiva no refinamento.

### Grid responsivo implementado (complemento)

```css
@media (max-width: 47.999rem) {
  :root {
    --layout-grid-columns: 3;
    --layout-margin-inline: 0.5rem;
    --layout-grid-gutter: 1rem;
  }
}
@media (min-width: 48rem) and (max-width: 74.999rem) {
  :root {
    --layout-grid-columns: 4;
    --layout-margin-inline: 0.75rem;
    --layout-grid-gutter: 1.5rem;
  }
}
```

O token de raio efetivamente compartilhado é `--radius: 1.125rem`; `--radius-image` no exemplo histórico é ilustrativo. Não duplicar tokens apenas para reproduzir os exemplos.

### Exemplo de aplicação do fundo texturizado

O token `--bg-texture-image` já referencia o asset integrado. A escala visual ainda pode ser refinada.

```css
body {
  background-color: var(--color-background-primary);
  background-image: var(--bg-texture-image);
  background-repeat: repeat;
}
```

### Exemplos de estados coerentes com as decisões vigentes

```css
/* Exemplos iniciais de aplicação. Classes são ilustrativas. */
.button-primary {
  background: var(--color-button-primary-bg);
  color: var(--color-button-primary-text);
  border-radius: 9999px;
}

/* Decisão vigente: hover por inversão, não por color-mix() */
.button-primary:hover {
  background: var(--color-cream);
  color: var(--color-brown);
}

/* Preservado do documento inicial; validar no componente real. */
.button-primary:active {
  background: var(--color-action-active);
  color: var(--color-cream);
}

.button-primary:focus-visible {
  outline: 2px solid var(--color-focus-dark-surface);
  outline-offset: 3px;
}

/* Links editoriais sobre Olive; para outras superfícies, adaptar. */
.editorial-content--on-olive a {
  color: var(--color-link-primary);
  text-decoration-line: underline;
  text-decoration-style: dashed;
}

.editorial-content--on-olive a:hover {
  color: var(--color-text-hover);
}

/* ProjectGallery: padrão visual ProjectThumbnail.
   Imagem e rótulo integram um único link; tokens específicos
   são opcionais, com fallback na paleta global. */
.home-project-gallery__label {
  font-family: var(--font-display);
  font-weight: var(--font-weight-regular);
  font-size: 1.125rem;
  line-height: 1.2;
  background-color: var(--color-project-thumbnail-label-bg, var(--color-ochre));
  color: var(--color-project-thumbnail-label-text, var(--color-charcoal));
}

.home-project-gallery__link:hover .home-project-gallery__label,
.home-project-gallery__link:focus-visible .home-project-gallery__label {
  background-color: var(--color-project-thumbnail-label-hover-bg, var(--color-cream));
}

.home-project-gallery__link:focus-visible {
  outline: 2px solid var(--color-cream);
  outline-offset: 3px;
}

/* Estilos tipográficos definidos em 21/11/2026 (seletores ilustrativos). */
.project-card__title {
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
  font-size: var(--type-size-project-title);
}

.page-intro__description {
  font-family: var(--font-display);
  font-weight: var(--font-weight-regular);
  font-size: var(--type-size-page-intro);
}

.article-preview__title {
  font-family: var(--font-display);
  font-weight: var(--font-weight-semibold);
  font-size: var(--type-size-article-preview-title-desktop);
}

/* Aplicar o raio às imagens de conteúdo nos componentes apropriados.
   Não aplicar indiscriminadamente a monograma, ícones ou controles. */
.home-project-gallery__image,
.project-card img {
  border-radius: var(--radius-image);
}

.editorial-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0;
}

/* ArticlePreview: todo o bloco é uma única âncora.
   O efeito visual ocorre exclusivamente no título, mesmo ao passar
   o cursor sobre a descrição. Sem sublinhado de TextLink. */
.article-preview:hover .article-preview__title {
  color: var(--color-text-hover);
}

.article-preview:focus-visible {
  outline: 2px solid var(--color-focus-dark-surface);
  outline-offset: 3px;
}

/* Navegação e rodapé sobre Olive: hover somente muda cor. */
.site-header a:hover,
.site-footer a:hover {
  color: var(--color-text-hover);
}

/* Página e seção atuais, inclusive idioma selecionado. */
.site-header a[aria-current="page"],
.site-header a[aria-current="location"],
.site-header a[aria-current="true"] {
  font-weight: var(--font-weight-bold);
}

.callout {
  background: var(--color-callout-background);
  color: var(--color-callout-text);
}

.callout a {
  color: var(--color-link-on-callout);
  text-decoration: underline;
}

.callout a:focus-visible {
  outline: 2px solid var(--color-focus-light-surface);
  outline-offset: 3px;
}
```

## 10. Pendências e validações

### 10.1. Definições deliberadamente adiadas

- **Nomes definitivos de tokens semânticos**, incluindo a proposta `--color-text-hover` e a possível conciliação com nomes de tokens de botão; o **comportamento** dos componentes já está definido.
- Valores exatos de **espaçamentos internos**, **dimensões adicionais**, **bordas**, **sombras** e **animações**, quando não especificados. **Já estão definidos no desktop:** container 1440px, grid de seis colunas, margens de 16px, gutter de 32px e raio de 18px nas imagens (exceto editoriais, 0px). Conceitos como botão totalmente arredondado e `PageIntro` em duas colunas permanecem definidos.
- Refinamento do grid responsivo já implementado, especialmente tablet; breakpoints estruturais 768px e 1200px estabelecidos.
- Detalhes do menu mobile aberto: composição, posicionamento, animação e gerenciamento do foco.
- Duração, easing e demais especificações de microinteração.
- Refinamento da hierarquia e legibilidade editorial aprovada com conteúdo real; tabelas, código e galerias quando necessários.
- Validação de escala e `line-height` do marcador de ano e título individual de Artigos; ArticlePreview já possui escala e entrelinha iniciais implementadas.
- Validar apresentação da data no artigo individual, com peso 400 como referência; categoria removida.
- Medidas específicas de espaçamento e organização da grade de duas colunas do índice de Artigos, já implementada em duas colunas no desktop/tablet e uma no mobile; não se confundem com o grid global de seis colunas do `BaseLayout`.
- Espaçamentos do cabeçalho do artigo individual (título, data, início do corpo).
- Variações específicas de imagens editoriais em artigos; raio editorial de 0px definido e coluna de artigo de até 900px preservada. Validar medidas aprovadas do rótulo sobreposto do `ProjectThumbnail` com conteúdo definitivo.
- Detalhes responsivos do índice e da página individual de Artigos ainda não evidenciados nas referências desktop.
- Adequar o ProjectCard ao asset único e proporção intrínseca; avaliar lazy loading do primeiro card. Masonry pós-MVP.
- Validação da escala/resolução de aplicação do asset de textura já integrado. A cor Olive, a repetição seamless e a ausência de variações globais de luminosidade já estão definidas.
- Conteúdo definitivo de Projetos e Artigos ainda pendente; estrutura Markdown/MDX já implementada.
- Estados `disabled`, erro, sucesso, aviso e validação; novas superfícies, temas e formulários não existentes.
- Hover de links em fundos claros, incluindo o callout, quando aplicável; **exceto** o estado já definido do rótulo de `ProjectThumbnail` (Ochre → Cream).

- Resolver divergências de Button (raio 18px implementado versus totalmente arredondado na referência) e callout da Sobre (fundo Charcoal implementado versus Ochre na referência).
- Confirmar no BaseLayout vigente o carregamento de Commissioner 900, necessário para títulos/anos de Artigos. A declaração exata não foi verificada nesta revisão.

- Home: refinamento visual da escala efetiva do nome, contraste e enquadramento da fotografia, posição dos textos e CTA, espaçamentos e sobreposição da galeria exclusivamente no desktop. Revalidar todos os breakpoints após as correções tipográficas; verificar conteúdo nos dois idiomas e de zero a três projetos elegíveis.
- Validação visual integrada da versão atual. Os resultados do build e do preview da refatoração estão na [documentação técnica](technical-documentation.md#8-validação-e-problemas-conhecidos).

### 10.2. Validações durante implementação

- Contraste e legibilidade de Light Ochre sobre Olive, inclusive a pequena diferença numérica em relação a 4,5:1; testar todos os estados sem trocar a cor aprovada silenciosamente.
- Identificação e delimitação do botão Brown sobre Olive, com seus estados default/hover/active/focus-visible.
- Validar o `ProjectThumbnail` sobre diferentes imagens, inclusive foco e contraste do rótulo Charcoal em Ochre/Cream, sem alterar o comportamento de hover aprovado.
- Reflow, zoom, redimensionamento e quebras do hero de 216px, títulos longos e textos menores de 12px/14px.
- Entrelinhas com as fontes reais, carregamento monoespaçado de Recursive e disponibilidade do **peso 900 (Black) de Commissioner**.
- Testar o fluxo editorial em 900px de largura máxima e títulos longos que ocupam várias linhas; validar no mobile antes de estipular escalas específicas de Artigos.
- Largura de leitura de parágrafos longos: **60–75 caracteres/linha** foi uma referência de teste, não uma restrição fixa.
- Rolagem suave com `prefers-reduced-motion`, menu com teclado e foco, contraste e foco em todos os elementos interativos.
- Validar a repetição sem emendas da textura, a ausência de vinhetas/gradientes e o contraste do conteúdo sobre o fundo texturizado em diferentes telas.
- Introduzir componentes ou novos tokens somente quando houver necessidade concreta.

## 11. Fontes e regra para continuidade

**Fontes consolidadas:**

1. `design_system_tokens_cores_tipografia_v1(1).md`: cores, tokens originais, contraste, tipografia e proposta responsiva.
2. `design_system_decisoes_componentes(1).md`: cor adicional de hover, componentes, layouts, regras de interação, acessibilidade e decisões de arquitetura.
3. **Decisões aprovadas em 19/11/2026:** layouts desktop do índice de Artigos e do artigo individual, dimensões e tipografia anteriores à revisão, interatividade de `ArticlePreview` e largura máxima de 900px do artigo.
4. **Revisão aprovada em 21/11/2026:** atualização tipográfica de `ProjectThumbnail`, `ProjectCard`, `PageIntro` e `ArticlePreview`; rótulo sobreposto de `ProjectThumbnail` (Ochre/Charcoal, hover Cream/Charcoal); grid desktop do `BaseLayout` (1440px, seis colunas, margens 16px, gutter 32px); e raio de 18px nas imagens. Demais componentes e layouts mantidos.
5. **Complemento de 21/11/2026:** registro da textura de fundo das páginas como padrão seamless sobre Olive `#50594B`, sem variações globais de luminosidade; asset final pendente de identificação.

6. **Decisões de 25/11/2026 e documentação técnica atualizada:** grid responsivo, Sobre, listagem e páginas individuais de Projetos, ProjectHeader, EditorialContent, asset único, navegação e validação do build/preview.

7. **Decisões de 26/11/2026 e documentação técnica atualizada:** [documentação técnica](technical-documentation.md), implementação e validação dos artigos, remoção de categorias, galeria da Home, composição responsiva aprovada, tokens locais do Hero e refinamento visual adiado.

**Regra de referência:** as decisões expressas de 26/11/2026 prevalecem sobre as anteriores nos pontos alterados; nos demais, preservam-se as decisões de 25/11/2026 e anteriores conforme sua precedência. A segunda fonte tem precedência **apenas nas divergências anteriores à revisão de 21/11/2026**; as decisões expressas nessa revisão prevalecem para os elementos alterados. O sistema continua usando Light Ochre no hover de texto sobre Olive, exceto no `ProjectThumbnail`, cujo hover altera somente o **fundo do rótulo** de Ochre para Cream. Mantêm-se inversão de cores no hover do botão e CTA, página atual identificada por peso e links editoriais tracejados com hover por cor. Comportamentos substituídos não permanecem como alternativas concorrentes.

**Inventário:** seis cores registradas (cinco de base e uma adicional para interação), três famílias tipográficas, **dez componentes implementados** (incluindo ProjectGallery, específico da Home), **sete layouts implementados** na seção 6 e **nove elementos não abstraídos em componentes globais** na seção 7. ProjectThumbnail permanece como padrão visual interno.
