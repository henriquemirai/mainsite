# Site pessoal | Refinamento visual da Fase 2

**Data da consolidação:** 27/11/2026  
**Status:** direção visual e motion design aprovados; implementação e validação pendentes.  
**Escopo:** fundamentos gráficos, componentes compartilhados, seis layouts existentes, microinterações, navegação mobile, coreografias de entrada e transições entre páginas.

## 1. Finalidade e regras de continuidade

Este documento consolida as decisões de refinamento visual tomadas após a primeira implementação do site em Astro. É uma especificação complementar ao `design-system.md`, à `technical-documentation.md` e à `naming-conventions.md`, não um relato de alterações já executadas no código.

- Preservar a direção de arte, a arquitetura de informação e a identidade gráfica existentes. O objetivo é refinar, não redesenhar o site.
- As decisões posteriores registradas aqui substituem especificações anteriores somente nos pontos explicitamente revisados. As demais regras dos documentos vigentes continuam válidas.
- **Aprovado:** direção ou comportamento decidido pelo usuário. **Referência inicial:** medida aprovada para iniciar a implementação, sujeita a ajuste no navegador. **Pendente:** decisão técnica ou validação ainda não realizada. **Follow-up:** evolução fora do escopo atual.
- Os laboratórios de animação foram protótipos esquemáticos, não testes do site real. Nenhuma alteração no repositório foi executada neste ciclo de discussão.
- A Home ainda necessita de revalidação visual integrada após as correções da primeira implementação; a galeria havia sido validada isoladamente.
- Preservar Astro SSG, CSS nativo, Markdown/MDX, conteúdo bilíngue independente (EN na raiz, PT-BR em `/br/`), sem CMS ou novas dependências sem aprovação.
- Preservar nomenclatura dos arquivos em kebab-case, identificadores de componentes e layouts em PascalCase, variáveis e funções em camelCase, classes BEM e rotas públicas existentes. Trabalhar uma atividade por vez, com aprovação da abordagem, implementação e testes manuais confirmados pelo usuário.

**Escopo complementar:** as variantes minimal de SiteHeader e SiteFooter pertencem à Fase 2, considerando os novos tipos de página LP, Pitch e Proposal discutidos em outra conversa. Este documento não define os layouts, requisitos de publicação ou controle de acesso desses tipos; consultar a especificação própria antes de implementá-los.

## 2. Fundamentos gráficos

### 2.1. Paleta e contraste

Preservar a paleta existente:

| Cor | HEX | Aplicação principal |
|---|---|---|
| Olive | `#50594B` | Fundo base |
| Cream | `#F2EDE4` | Texto principal, foco em fundo escuro |
| Ochre | `#B89A58` | Filetes, monograma, callout, rótulos da galeria |
| Brown | `#5A3426` | Button e fundo do monograma |
| Charcoal | `#262720` | Texto em superfícies Ochre, estado active anteriormente registrado |
| Light Ochre | `#E2C88E` | Hover textual sobre Olive |

- Manter Cream a 85% como referência de texto secundário sobre Olive; metadados em Cream, não Ochre.
- Não confundir Ochre com Light Ochre. A numeração decorativa da galeria usa **Ochre** no hover; TextLink sobre Olive continua com **Light Ochre**.
- Revalidar contraste em toda a extensão do novo fundo, inclusive sob a iluminação e nos estados interativos. A cor de hover em superfícies claras, como o callout, precisa ser definida contextualmente; não aplicar Light Ochre de forma indiscriminada.

### 2.2. Fundo global

**Aprovado:** preservar a textura seamless e acrescentar iluminação assimétrica, com área mais clara na parte superior direita e escurecimento periférico.

- Base e fallback: Olive `#50594B`.
- Asset existente: `/images/bg_texture.webp`, repetido horizontal e verticalmente, sem emendas.
- Intensidade de referência do estudo C: iluminação de 12% e escurecimento periférico de 32%. São referências visuais de intensidade, não uma fórmula CSS final.
- A iluminação pertence à superfície global, independente do container central; considerar telas ultrawide e páginas longas.
- Fundo estático, sem parallax ou animação contínua.
- Implementar com CSS nativo e validar a escala, a integração da textura e as cores com o asset real.

**Substitui** a restrição anterior de fundo sem gradientes ou variações globais de luminosidade. Não implica eliminar a textura ou alterar a cor base.

### 2.3. Tipografia

Preservar as famílias e a escala existente, com ajustes ópticos específicos:

| Família | Papel |
|---|---|
| Familjen Grotesk | Display, nome, títulos de páginas e projetos, títulos de ArticlePreview, introduções de PageIntro e rótulos da galeria |
| Commissioner | Corpo, interface, botões, marcador anual e título de artigo individual |
| Recursive Mono | Eyebrows, metadados, datas e código |

| Estilo | Referência desktop | Tracking inicial | Entrelinha |
|---|---|---|---|
| Hero name | 216px nominal, Bold 700 | `-0.035em` | Preservar 1.00 mobile / 0.95 tablet e desktop |
| Page title | 72px, Bold 700 | `-0.025em` | 1.00 |
| Project title (ProjectCard) | 52px, Bold 700 | `-0.02em` | 1.05 |
| ArticlePreview title | 36px, Semibold 600 | `-0.015em` | Preservar 1.15 |

- O ProjectHeader usa o estilo Page title (72px desktop), não a escala de 52px do ProjectCard.
- O título de ArticleDetail mantém o estilo próprio Commissioner Black 900, 52px desktop; não impor o estilo Page title a ele.
- Preservar os demais pesos, tamanhos e entrelinhas vigentes. PageIntro 28px desktop, headline da Home 36px, corpo 18px, metadados 14px, eyebrow 18px, copyright 12px.
- Não alterar a caixa, o tracking ou a identidade tipográfica de eyebrows e metadados.
- Usar `text-wrap: balance` para títulos e destaques curtos, quando adequado; `text-wrap: pretty` para parágrafos. Preservar as regras especiais do nome na Home.
- Testar o peso, a escala efetiva e o encaixe óptico do nome na Home. Não substituir automaticamente o peso original nem fixar novos tamanhos sem teste.
- Entrelinhas e tracking são pontos de partida; verificar com as fontes reais, os dois idiomas e títulos longos. Manter a variante monoespaçada de Recursive corretamente configurada.

### 2.4. Grid, imagens e espaçamento

Preservar o sistema responsivo existente e a propagação do grid por subgrid:

| Resolução | Colunas | Margens laterais | Gutter |
|---|---:|---:|---:|
| Desktop ≥ 1200px | 6 | 16px | 32px |
| Tablet 768–1199px | 4 | 12px | 24px |
| Mobile < 768px | 3 | 8px | 16px |

Container máximo de 1440px. Manter raio de 18px para imagens de conteúdo; imagens editoriais são exceção (0px). Preservar proporções intrínsecas, sem recorte obrigatório de imagens de projetos. Espaçamentos finos serão ajustados na composição real, sem criar uma nova escala global prematuramente.

### 2.5. Filetes e elementos gráficos

| Tipo | Tratamento aprovado | Aplicação |
|---|---|---|
| Estrutural | Linha Ochre de 1px em toda a largura, com segmento inicial de 48px × 3px | Rodapé, separações estruturais do índice de Projetos, PageIntro quando habilitado |
| Funcional | Linha Ochre de 1px, sem reforço inicial | Metadados, divisores entre links do menu mobile, separadores editoriais |

As dimensões do reforço estrutural são referências iniciais. Usar CSS/border ou `hr` quando semanticamente apropriado; não criar um componente Divider independente. Evitar duplicação de filetes consecutivos.

Não adicionar diagonais, molduras ornamentais ou elementos decorativos generalizados. A numeração editorial permanece restrita à Home (galeria) e à navegação fullscreen mobile, com tratamentos próprios.

## 3. Componentes compartilhados

### 3.1. SiteHeader (`src/components/site-header.astro`)

**Default:** preservar logo com link para Home, navegação horizontal, separadores e alternância de idioma. Header estático, no fluxo do documento; não sticky. Hover de texto Cream → Light Ochre.

| Estado ativo | Tratamento |
|---|---|
| Navegação horizontal | Cream, peso 700, underline Ochre de 2px na largura do texto |
| Fullscreen mobile | Cream, peso 700, **sem underline** |
| Semântica | `aria-current="page"` para página exata, `aria-current="location"` para seção atual; preservar identificação do idioma atual |

A identificação por underline na navegação horizontal revisa a regra anterior de apenas negrito. A eventual animação desse indicador durante page transitions precisa de teste; não é condição de entrega.

**Fullscreen mobile:** substitui o painel expansível anterior. Direção visual aprovada combina estrutura e expressão editorial:

- Overlay em tela inteira, com o mesmo fundo global, monograma no topo esquerdo e botão de fechar à direita.
- Links grandes em Familjen Grotesk, referência inicial de 48–64px, peso 400 e 700 para o ativo, tracking `-0.025em`. Ajustar à largura e ao idioma.
- Numeração 01–03 em Recursive Mono, setas à direita, filetes funcionais de 1px entre os links. Sem sublinhado adicional sob o link selecionado.
- Seletor de idioma na parte inferior, preservando a escala de interface. Manter a troca para a página equivalente quando disponível.
- Overlay lateral, com Fade Up interno, conforme seção 5.4.
- Considerar `100dvh`, telas baixas e rolagem interna se necessária; scroll lock do conteúdo de fundo, foco inicial e retorno de foco, Escape, teclado, isolamento do fundo e estados interrompíveis.
- `<dialog>` é uma abordagem candidata, não decisão arquitetural final. A implementação existente com `details`/`summary` deverá ser revisada.

**Minimal (nova variante da Fase 2):** monograma e CTA opcional usando Button; sem navegação, seletor de idioma ou menu fullscreen. Header estático, mesmo grid. Destino do monograma, disponibilidade do CTA e comportamento de idioma serão definidos nos layouts consumidores. Não postergar automaticamente a variante para pós-Fase 2.

### 3.2. SiteFooter (`src/components/site-footer.astro`)

- Default: composição assimétrica (alternativa C). Links Email e LinkedIn à esquerda, copyright abaixo deles, Voltar ao topo à direita. Filete estrutural superior. Preservar fontes, ícones e cores.
- Manter a mesma lógica em desktop, tablet e mobile, com medidas e quebras a validar.
- Hover de links em Light Ochre; seta de retorno ao topo desloca-se na direção do movimento. Rolagem suave respeitando reduced motion.
- Minimal (Fase 2): apenas copyright centralizado (alternativa B), com filete estrutural superior. Sem introduzir outros elementos.

### 3.3. Button (`src/components/button.astro`)

| Propriedade | Definição |
|---|---|
| Variante visual | Uma, primária |
| Default | Brown / Cream |
| Hover | Cream / Brown |
| Raio | 18px, resolvendo a divergência com o formato pill do mockup |
| Tipografia | Commissioner Semibold 600, 18px desktop |
| Padding de referência | 14px vertical / 24px horizontal |
| Ícone | Preservar padrão direcional, quando aplicável |
| Active | Compressão `scale(0.98)`; estado cromático Charcoal/Cream anterior não revogado, validar composição |

Utilizar `a` para navegação e `button` para ações. Disabled apenas quando semanticamente aplicável. Não criar Accent/Secondary preventivamente: LPs possuem uma ação principal (por exemplo, WhatsApp ou email), que pode se repetir. Se houver necessidade real de outra superfície/variante, discutir antes. O modo presentacional existente deixa de ser necessário no ProjectCard após a substituição do CTA visual; verificar outros consumidores antes de removê-lo.

### 3.4. TextLink (`src/components/text-link.astro`)

- Um padrão reutilizável para links auxiliares e de navegação contextual, herdando família, tamanho e peso do contexto.
- Sublinhado tracejado permanente, espessura de 1px e afastamento de `0.25em`; não aumentar a espessura nem animar o traço no hover.
- Cream → Light Ochre sobre Olive; cores contextuais em outros fundos. Ícone direcional opcional e foco visível.
- Links de Markdown/MDX devem compartilhar a aparência, mas não precisam ser convertidos automaticamente no componente Astro.
- Nos cards, utilizar a aparência do TextLink sem criar uma segunda âncora ou ponto de foco.
- Button é reservado à ação principal; TextLink atende navegação e ações suplementares. Política de abertura de links externos em nova aba não foi redefinida neste ciclo.

### 3.5. PageIntro (`src/components/page-intro.astro`)

- Preservar `title` e `description` como conteúdo obrigatório e os estilos tipográficos existentes.
- Alinhamento pelo topo: título à esquerda, introdução à direita; desktop 3+3 colunas, tablet 2+2, mobile empilhado.
- Adicionar `links?`, reutilizando o tipo existente do AboutLayout. Até quatro links auxiliares, abaixo da descrição, usando TextLink; referência desktop de 14px. Ausência de links não deixa espaço residual.
- Adicionar `showDivider?: boolean`, default `false`. Quando habilitado, filete estrutural abaixo de toda a composição, incluindo links, em largura integral.
- Não criar variantes adicionais. Decidir o uso do divisor em cada página durante a validação integrada; evitar redundância com o primeiro filete de ProjectIndex.

### 3.6. ProjectCard (`src/components/project-card.astro`)

- Preservar variantes `featured` (horizontal) e `default` (vertical), dados compartilhados, título, categoria/contexto e descrição.
- Featured ocupa todo o grid: desktop 3+3, tablet 2+2, mobile empilhado. Default ocupa 3/2/3 colunas, respectivamente.
- Substituir a aparência de Button pelo **TextLink presentacional** nas duas variantes. Toda a área continua um único link para o estudo de caso, com um único ponto de foco; não criar âncoras aninhadas.
- Hover/foco da área inteira aciona a mudança cromática do CTA visual; seta direcional com microinteração aprovada. Não aplicar zoom, sombra ou elevação.
- Título e descrição seguem os refinamentos tipográficos; metadados preservados.
- Usar o asset WebP compartilhado com ProjectGallery, proporção intrínseca, raio de 18px, sem recorte forçado. Rever `aspect-ratio`, `object-fit: cover` e dimensões fixas 688 × 373 da implementação anterior.
- Filetes pertencem à organização estrutural da listagem, não a cada card default. Refinar espaçamentos e alinhamentos na página.

### 3.7. ProjectGallery (`src/components/project-gallery.astro`)

Preservar sua responsabilidade exclusiva na Home. `ProjectThumbnail` permanece um padrão interno, sem componente separado ou variante de ProjectCard.

- Até três projetos publicados com `showOnHome`, ordenados por `order` crescente, independentemente de `featured`. Menos de três: alinhar ao início sem preencher artificialmente. Zero: omitir a galeria.
- Distribuição desktop/tablet/mobile: 3/2/1 por linha, ocupando respectivamente 2/2/3 colunas por item.
- Imagem de proporção intrínseca e raio de 18px. Cada item é um único link acessível.
- Rótulo: Familjen Grotesk Regular 400, 18px, entrelinha 1.2, alinhado à esquerda na parte inferior da imagem. Offsets 12px, largura máxima 85%, padding 8px × 12px, raio 12px. Títulos longos quebram naturalmente.
- Rótulo default: Ochre / Charcoal; hover: Cream / Charcoal. Apenas o fundo do rótulo muda, sem zoom ou elevação.

**Numeração editorial (decisão final, substitui o estudo sólido/vazado):**

| Propriedade | Definição |
|---|---|
| Conteúdo | 01, 02, 03, calculado pela ordem de exibição; sem novo frontmatter |
| Posição | Atrás do thumbnail, no canto superior esquerdo, parcialmente encoberta pela imagem |
| Família e peso | Familjen Grotesk Bold 700 |
| Tracking inicial | `-0.035em` |
| Cor default | Cream `#F2EDE4` |
| Cor hover | Ochre `#B89A58` |
| Opacidade | **45% nos dois estados** |
| Contorno | Nenhum |
| Transição | Apenas cor, 180ms |
| Transformação no hover | Nenhuma |
| Acessibilidade | Elemento decorativo, fora do nome acessível do link |

A numeração e o thumbnail entram como uma unidade na coreografia da Home. Escala, offset, encobrimento e percepção da cor de hover com 45% de opacidade precisam de validação óptica. Não recuperar a proposta de preenchimento de contorno no hover.

### 3.8. ProjectHeader (`src/components/project-header.astro`)

- Preservar composição 4+2 no desktop, empilhada em tablet e mobile; título em Page title, sem capa automática.
- Metadados flexíveis em `dl`, `dt` e `dd`, com campos e quantidade definidos por projeto. Sem metadados: omitir bloco e expandir o título.
- Alterar proporção interna label/value de 1:1 para **1:2** como referência aprovada. Preservar alinhamento pelo topo, Recursive Mono 14px, entrelinha 1.5 e filetes funcionais de 1px.
- Validar labels e valores longos nos dois idiomas, inclusive mobile; evitar que a seta de link externo fique isolada na quebra de linha.
- Preservar o tratamento existente de URLs e dados, sem criar campos ou um MetadataList separado. Medidas finas e comportamento de quebra serão testados.

### 3.9. ArticlePreview (`src/components/article-preview.astro`)

- Preservar título e descrição, sem imagem, categoria, data, CTA, divisor próprio ou superfície de card.
- Título Familjen Grotesk 600 (24–36px), tracking `-0.015em`, balanceamento quando adequado; descrição Commissioner 400 (16–18px), pretty quando adequado.
- Uma única âncora por entrada; hover em qualquer ponto altera somente o título de Cream para Light Ochre, sem sublinhado, mudança do fundo, zoom ou elevação.
- Preservar a grade do índice; validar espaçamento, alinhamento e títulos longos com volume maior de artigos. Sem novas variantes.

### 3.10. EditorialContent (`src/components/editorial-content.astro`)

Preservar conteúdo livre em Markdown/MDX, sem estrutura narrativa obrigatória e sem abstração por seção.

| Elemento | Peso | Mobile | Desktop |
|---|---:|---:|---:|
| H2 | 600 | 32px | 52px |
| H3 | 600 | 24px | 36px |
| H4 | 500 | 22px | 28px |
| H5 | 700 | 16px | 18px |
| H6 | 600 | 16px | 18px |
| Parágrafos e listas | 400 | 16px | 18px |
| Legendas | 400 | 14px | 14px |

Commissioner para os elementos acima, line-height 1.2 em títulos e 1.6 no corpo; manter os valores intermediários da escala existente. H1 pertence ao cabeçalho da página.

- Listas, citações com borda lateral Ochre, links tracejados, separadores de 1px e legendas alinhadas à esquerda: preservar e refinar.
- Imagens sem arredondamento, sem recorte ou upscale forçado, legendas opcionais. Sem lightbox ou zoom nesta etapa.
- Tabelas: cabeçalho em negrito e regras horizontais Ochre; sem divisores verticais, zebra ou moldura. Overflow localizado no container da tabela.
- Código inline: Recursive Mono, com superfície de contraste adequado. Bloco: Recursive Mono 14px, fundo Charcoal, texto Cream, raio 0, destaque de sintaxe coerente com a paleta e rolagem horizontal localizada. Sem botão de copiar ou números de linha inicialmente. Solução técnica de syntax highlighting a verificar com Astro, sem adicionar dependências sem discussão.
- O layout consumidor determina largura de leitura e de mídia. Não introduzir variantes de conteúdo ou animação por bloco durante a leitura.

## 4. Refinamento integrado dos layouts

### 4.1. Home (`src/layouts/home.astro`)

- **Nome como protagonista gráfico; fotografia complementar.** A sobreposição do nome à fotografia, inclusive sobre o rosto, é deliberada. Não tentar eliminá-la como se fosse uma falha de layout.
- Preservar composição assimétrica nos três breakpoints, foto à direita, nome em uma linha no desktop e duas no mobile, respeitando o espaço no tablet.
- Preservar eyebrow, headline, texto complementar e CTA para o índice de Projetos localizado. Não acrescentar novas seções, artigos ou indicadores de scroll.
- Experimentar peso, escala efetiva, legibilidade, contraste, enquadramento da foto e espaçamentos com os assets reais. O limite de 15vw e as medidas anteriores são referências provisórias, não objetivos absolutos.
- Galeria é a evidência principal do trabalho e deve ter continuidade com o hero. Preservar sobreposição parcial à foto somente no desktop (margem anterior de -9rem como referência), com numeração revisada. Em tablet/mobile, não sobrepor a galeria à foto.
- Procurar mostrar parte dos projetos na primeira dobra em viewports desktop típicos, sem impor altura fixa nem comprimir excessivamente o hero. Validar, por exemplo, 1440 × 900 e 1440 × 768.
- Jornada visual: identidade → trabalho → rodapé. Validar com zero, um, dois e três projetos e os dois idiomas.
- Entrada cinematográfica em camadas somente nos acessos elegíveis (seção 5.5).

### 4.2. Sobre (`src/layouts/about.astro`)

- Preservar PageIntro e composição desktop de fotografia e biografia em 3+3; tablet em 2+2; mobile empilhado, com biografia antes da fotografia.
- Mover links auxiliares do layout para PageIntro. Avaliar divisor opcional sem duplicar elementos.
- Callout aprovado em **Ochre sólido / Charcoal**, substituindo o fundo Charcoal da implementação anterior. Desktop: sobreposto à parte inferior esquerda da foto, largura inicial de 65%; tablet/mobile: abaixo da foto.
- `ProfileCard` continua composição local; validar proporção, enquadramento, comprimento da biografia, contraste e encaixe do callout. Sem novo componente global.
- Coreografia gráfica (B).

### 4.3. Índice de Projetos (`src/layouts/project-index.astro`)

- Preservar ordenação: featured primeiro por `order`, depois default também por `order`; omitir grupos vazios. Featured em uma linha e default em duas colunas desktop/tablet, uma no mobile.
- Filete estrutural antes de cada featured e antes do grupo default; sem divisor entre cards default. Avaliar se PageIntro deve habilitar divisor evitando duplicidade.
- Aplicar ProjectCard com TextLink visual e imagem intrínseca. Ajustar espaçamentos e legibilidade sem alterar a estrutura.
- Testar mais projetos que os placeholders atuais, incluindo cenários sem destaque, todos destacados e títulos longos. Verificar LCP e estratégia de carregamento do primeiro card se necessário.
- Sem filtros, busca, paginação ou masonry nesta etapa. Masonry permanece pós-MVP conforme documentação anterior.
- Coreografia gráfica (B), com os primeiros grupos visíveis, não stagger ilimitado de todos os cards.

### 4.4. Detalhe de Projeto (`src/layouts/project-detail.astro`)

- Preservar ProjectHeader e EditorialContent, sem capa obrigatória nem narrativa fixa. Texto alinhado à esquerda em quatro colunas desktop; imagens até seis. Tablet/mobile: largura integral de quatro/três colunas.
- Adicionar TextLink localizado para o índice de Projetos, com seta para a esquerda e alinhado ao início do conteúdo, antes do rodapé. Pertence ao layout, não ao MDX individual.
- Preservar imagens intrínsecas e flexibilidade de conteúdo. Sem sidebar, TOC, sticky, navegação para o próximo projeto ou outras seções adicionais.
- Coreografia editorial (A): somente cabeçalho.

### 4.5. Índice de Artigos (`src/layouts/article-index.astro`)

- Preservar agrupamento anual, marcadores Commissioner Black 900, 52px desktop, e grid de ArticlePreview em duas colunas desktop/tablet e uma no mobile.
- Separar grupos anuais por espaço negativo, sem acrescentar filetes entre anos ou entradas. Avaliar divisor opcional de PageIntro caso a composição precise.
- Validar escala responsiva do ano e listagens maiores. Sem busca, filtros, paginação, imagens ou categorias nesta etapa.
- Coreografia gráfica (B): PageIntro e primeiro agrupamento visível.

### 4.6. Detalhe de Artigo (`src/layouts/article-detail.astro`)

- Reduzir a largura máxima da coluna editorial de 900px para **780px**. Preservar alinhamento central da coluna e do cabeçalho, corpo alinhado à esquerda.
- Título Commissioner Black 900, 52px desktop; data Recursive Mono 14px, elemento `time`; sem categoria, capa ou filete adicional no cabeçalho.
- Adicionar TextLink localizado para índice de Artigos, seta esquerda, alinhado à coluna editorial antes do rodapé. Pertence ao layout, não ao conteúdo individual.
- Não introduzir artigos relacionados, compartilhamento, TOC ou barra de progresso nesta etapa.
- Coreografia editorial (A): somente título e data.

## 5. Motion Design

### 5.1. Linguagem global e princípios

A animação do site anterior serve de base para o novo: **Fade Up + Stagger**. No JavaScript fornecido do site anterior, Anime.js aplicava `opacity: [0, 1]`, `translateY: [20, 0]`, duração de 700ms, stagger de 150ms com delay inicial de 400ms, `easeOutQuad` e ativação a partir de 1024px. A ordem vinha do DOM. Na Home, sete elementos resultavam em aproximadamente 2 segundos de animação. Esta referência explica a origem da linguagem, não determina a tecnologia do novo site.

A evolução aprovada reduz a espera inicial e agrupa elementos em unidades visuais, preservando identidade de movimento. CSS nativo é suficiente para Fade Up e Stagger; não adicionar Anime.js automaticamente. As coreografias mais complexas e o contexto de navegação podem exigir JavaScript.

**Prioridade explícita:** Page Transitions > coreografias de entrada. Se houver conflito de implementação, desempenho, acessibilidade ou manutenção, simplificar as coreografias em favor das transições e da navegação funcional.

| Linguagem | Aplicação |
|---|---|
| A. Editorial | Detalhes de projeto e artigo; microinterações globais discretas |
| B. Gráfica | Sobre, Índice de Projetos, Índice de Artigos |
| C. Cinematográfica | Home e Fullscreen Mobile Navigation |

Regras gerais:

- Animar unidades coerentes, não palavras/letras, linhas de metadados ou parágrafos individualmente.
- Sem preloader, scroll hijacking, cursor personalizado, parallax exagerado, animações contínuas, zoom de cards ou efeitos decorativos sem função.
- Não bloquear rolagem ou interação durante a entrada de páginas. Não esperar que todos os assets carreguem para apresentar o conteúdo.
- Header, footer e fundo permanecem estáticos nas coreografias de entrada. O header e o fundo ficam visualmente estáveis nas transições; não presumir persistência real no DOM.
- Não introduzir animações disparadas pela rolagem. Nas entradas gráficas, animar apenas os blocos inicialmente visíveis, mantendo os demais disponíveis no estado final. Critério de visibilidade a implementar e testar.
- Respeitar `prefers-reduced-motion: reduce`; apresentação imediata e navegação funcional, incluindo menu e retorno ao topo.

### 5.2. Tokens de movimento

Referências propostas e utilizadas nos protótipos. Conciliar nomes com `global.css` e as convenções existentes, evitando duplicações. Durações específicas de coreografias podem permanecer em layouts/componentes quando não houver reutilização real.

| Token de trabalho | Valor | Uso |
|---|---|---|
| `--motion-fast` | 80ms | Press feedback |
| `--motion-short` | 180ms | Microinterações |
| `--motion-medium` | 300ms | Entradas curtas |
| `--motion-long` | 500ms | Entrada gráfica |
| `--motion-extended` | 800ms | Referência de movimento prolongado; não impõe duração às coreografias |
| `--ease-enter` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrada e page transition aprovada |
| `--ease-exit` | `cubic-bezier(0.64, 0, 0.78, 0)` | Referência de saída, não substituir a curva aprovada da page transition |
| `--ease-in-out` | `cubic-bezier(0.76, 0, 0.24, 1)` | Referência de revelações de interface |
| `--motion-icon-distance` | 3px | Deslocamento direcional |
| `--motion-press-scale` | 0.98 | Compressão do Button |

Os valores das coreografias e microinterações abaixo têm precedência sobre nomes genéricos de tokens. A nomenclatura definitiva e a necessidade dos tokens auxiliares permanecem para implementação.

### 5.3. Microinterações (aprovadas)

| Padrão | Valor |
|---|---|
| Transição cromática | 180ms |
| Deslocamento de ícones e setas | 3px em direção à ação, 180ms, ease-enter |
| Compressão no acionamento | `scale(0.98)`, 80ms, somente Button |
| Numeração ProjectGallery | Cream → Ochre, 45% de opacidade constante, 180ms, sem contorno, escala ou deslocamento |

| Componente | Interação |
|---|---|
| SiteHeader | Transição cromática dos links; indicador ativo conforme layout |
| SiteFooter | Transição cromática; seta de retorno ao topo desloca para cima |
| Button | Inversão cromática, deslocamento direcional do ícone e compressão no acionamento |
| TextLink | Transição cromática e deslocamento direcional do ícone, quando presente |
| ProjectCard | Transição cromática do TextLink visual e deslocamento da seta em resposta à área inteira do card |
| ProjectGallery | Fundo do rótulo Ochre → Cream; texto Charcoal inalterado; numeração Cream → Ochre |
| ArticlePreview | Apenas o título muda de Cream para Light Ochre |
| EditorialContent | Transição cromática dos links |

- Foco perceptível e independente do hover: referência de 2px de espessura e offset de 3px; Cream sobre Olive e Charcoal sobre Ochre. Conferir contraste sobre a nova iluminação. A implementação anterior apresenta diferenças a conciliar.
- Estados `:focus-visible` devem oferecer feedback equivalente onde pertinente. Evitar hover persistente indesejado em touchscreen. Não depender de animação ou apenas de cor para indicar foco.
- Sem underline animado como padrão de hover, ripple, efeito magnético, bounce, zoom de imagens ou elevação. Reduced motion elimina transições de movimento, preservando feedback de estado imediato.
- Pendente: definir tratamento de hover em superfícies claras e confirmar o estado cromático active do Button em conjunto com a compressão.

### 5.4. Fullscreen Mobile Navigation (cinematográfica)

**Alternativa B aprovada: revelação lateral pela direita, velocidade normal.** Não usar as alternativas de cortina vertical, máscara circular ou múltiplas camadas cromáticas.

| Elemento | Início de referência | Duração |
|---|---:|---:|
| Hamburger → X | 0ms | 300ms |
| Overlay (direita → esquerda) | 0ms | 550ms |
| Filetes | 180ms, escalonados com os links | 250ms |
| Link 01, número e seta | 180ms | 300ms |
| Link 02, número e seta | 240ms | 300ms |
| Link 03, número e seta | 300ms | 300ms |
| Idiomas | 360ms | 250ms |
| Monograma | Estático | 0ms |

- Abertura estimada: 610ms. Os elementos internos entram antes da conclusão do overlay.
- Filetes expandem horizontalmente; links, números e setas usam Fade Up (deslocamento de referência do protótipo: 18px); idiomas usam Fade Up com deslocamento menor (8px no protótipo). Stagger de 60ms entre links.
- Fechamento manual: recolhimento à direita em 350ms, saída dos elementos internos predominantemente simultânea, sem repetir todo o stagger de entrada ao contrário.
- O link ativo usa somente negrito, sem underline, evitando conflito com os filetes entre links.
- Acionamento de link: integrar saída do menu à page transition, sem fechamento completo seguido de uma segunda animação completa. O mecanismo exato permanece pendente.
- Validar abertura/fechamento rápidos e interrupções, foco, Escape, acessibilidade, scroll lock e troca de breakpoint. Não sacrificar a agilidade do menu em favor do efeito cinematográfico.

### 5.5. Coreografias de entrada aprovadas

**Aplicação final:** acesso direto a uma página elegível. Na navegação interna, as coreografias são substituídas pela page transition (seção 5.6).

| Propriedade | Editorial (A) | Gráfica (B) | Cinematográfica (C) |
|---|---:|---:|---:|
| Opacidade | 0 → 100% | 0 → 100% | 0 → 100% |
| Deslocamento vertical | 8px | 20px | 32px |
| Duração individual | 300ms | 500ms | 650ms |
| Stagger base | 40ms | 60ms | 75ms |
| Delay inicial | 0ms | 0ms | 0ms |
| Duração total de referência | 340ms | 680ms | 950ms |
| Easing | Ease-enter | Ease-enter | Ease-enter |

As durações totais são as das coreografias de referência, não exigência de que todo layout dure exatamente o mesmo tempo. Adaptar a quantidade de grupos visíveis e o conteúdo sem prolongar indiscriminadamente a entrada. Máscaras não fazem parte das coreografias de entrada efetivamente aprovadas; efeitos pontuais, como expansão de filetes, só quando pertinentes e validados.

#### 5.5.1. C. Cinematográfica: Home

**Coreografia em camadas aprovada.** Nome e fotografia entram simultaneamente, com sobreposição temporal entre apresentação e galeria. Não utilizar o movimento horizontal de encontro ou máscaras como animação principal.

| Elemento | Início | Duração | Término |
|---|---:|---:|---:|
| Nome e eyebrow | 0ms | 650ms | 650ms |
| Fotografia | 0ms | 650ms | 650ms |
| Headline | 100ms | 650ms | 750ms |
| Texto complementar e CTA | 175ms | 650ms | 825ms |
| Projeto 01 | 150ms | 650ms | 800ms |
| Projeto 02 | 225ms | 650ms | 875ms |
| Projeto 03 | 300ms | 650ms | 950ms |

- Cada projeto entra com numeração, thumbnail e rótulo como unidade gráfica. Stagger de 75ms. Não animar a numeração separadamente.
- A galeria começa antes que o hero termine, para indicar continuidade abaixo da dobra.
- Testar nos três breakpoints e com diferentes quantidades de projetos; ajustar composição e tempo com o layout real. Avaliar LCP e evitar ocultação excessiva do conteúdo principal.
- O retorno abreviado de 300ms/8px sem stagger foi aprovado em estudo anterior; a decisão final de substituição por page transition o torna obsoleto **nas navegações internas**. Reload ou novo acesso direto à Home já visitada na sessão ainda precisa de regra explícita (ver seção 5.7).

#### 5.5.2. B. Gráfica: Sobre e índices

A coreografia de Sobre foi aprovada como **padrão para toda a linguagem gráfica**. Usar Fade Up em grupos, com 500ms de duração individual, 20px de deslocamento, stagger base de 60ms.

| Elemento de Sobre (referência) | Início | Duração | Término |
|---|---:|---:|---:|
| Título | 0ms | 500ms | 500ms |
| Introdução e links auxiliares | 60ms | 500ms | 560ms |
| Biografia | 120ms | 500ms | 620ms |
| Fotografia | 120ms | 500ms | 620ms |
| Callout | 180ms | 500ms | 680ms |

- Biografia e fotografia entram simultaneamente, callout levemente atrasado para reforçar a sobreposição.
- Em mobile, o protótipo manteve foto e callout estáticos por estarem abaixo da primeira dobra. Regra geral: considerar blocos inicialmente visíveis, não impor animação a elementos fora de tela.
- Índice de Projetos: PageIntro, filetes quando pertinentes e primeiros projetos visíveis.
- Índice de Artigos: PageIntro e primeiro agrupamento anual visível.
- A sequência exata de cada índice não foi individualmente prototipada; aplicar o padrão aprovado sem inventar uma timeline definitiva para esses layouts.
- Caso `showDivider` seja utilizado, pode-se testar expansão horizontal do filete. É possibilidade de refinamento, não condição para entrega.

#### 5.5.3. A. Editorial: detalhes

| Página | Elemento | Início | Duração |
|---|---|---:|---:|
| ArticleDetail | Título | 0ms | 300ms |
| ArticleDetail | Data | 40ms | 300ms |
| ProjectDetail | Título e descrição (quando presente) | 0ms | 300ms |
| ProjectDetail | Metadados e respectivos filetes, como bloco | 40ms | 300ms |

Duração total de referência: 340ms. Deslocamento de 8px, ease-enter. Corpo editorial disponível imediatamente, sem máscaras, animações de imagens ou stagger entre parágrafos e linhas de metadados. Testar se a entrada do cabeçalho não cria desconexão com o corpo já visível em viewports maiores.

### 5.6. Page Transitions: especificação final aprovada

**Alternativa B: Fade Through + Slide.** A transição atua sobre o conteúdo, preservando visualmente o header e o fundo. Sem cortina cromática, preloader, troca abrupta de paleta ou deslocamento horizontal do documento.

| Propriedade | Valor de referência |
|---|---|
| Duração total | 380ms |
| Saída | Opacidade 1 → 0, deslocamento 0 → -16px (para cima) |
| Entrada | Opacidade 0 → 1, deslocamento +20px → 0 (de baixo para cima) |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Header | Visualmente estável, estado ativo atualizado para o destino |
| Fundo | Estático |
| Reduced motion | Sem transição animada |

Como referência, o protótipo completava a saída aos 50% da duração total (190ms), e a entrada iniciava aos 16% (aproximadamente 61ms) e terminava aos 380ms. Esses detalhes reproduzem o ritmo demonstrado; não constituem exigência de implementação literal. A duração de 380ms é de animação, não de carregamento real da página.

**Integração escolhida: A. Substituição.** A navegação interna usa exclusivamente a page transition; não executar a coreografia específica da página de destino. Não implementar a integração sobreposta (alternativa B) nem empilhar animações completas sequenciais.

| Contexto | Comportamento final | Duração de referência |
|---|---|---:|
| Acesso direto à Home | Cinematográfica | 950ms |
| Acesso direto a Sobre ou índices | Gráfica | 680ms |
| Acesso direto a detalhes de artigo/projeto | Editorial | 340ms |
| Navegação interna, incluindo primeira ida à Home por link interno | Somente Fade Through + Slide | 380ms |
| Retorno à Home por link interno | Somente Fade Through + Slide | 380ms |
| Voltar/avançar pelo histórico | Nenhuma animação | 0ms |
| Reduced motion | Nenhuma animação | 0ms |

A última decisão de substituição prevalece sobre a antiga proposta de animação cinematográfica na primeira visita à Home independentemente da origem. Preservar a posição de rolagem ao navegar pelo histórico quando possível. Não atrasar a navegação para fechar o menu mobile por completo.

**Elementos compartilhados:** monograma, navegação/indicador ativo e fundo são candidatos à continuidade visual. Não foi aprovada uma transformação específica dos títulos de cards para títulos individuais; não tratar shared element transitions adicionais como requisito. Thumbnail → imagem de estudo de caso fica fora do escopo inicial, pois projetos não possuem capa obrigatória.

### 5.7. Arquitetura técnica: pendente de aprovação e testes

A decisão visual não fixa a tecnologia. Duas abordagens foram discutidas:

| Aspecto | View Transition API nativa (cross-document) | Astro ClientRouter |
|---|---|---|
| Navegação | MPA, documentos distintos | Roteamento no cliente |
| SSG | Preservada | Preservada |
| Ativação | Opt-in CSS; JS pode ser necessário para regras específicas | Roteador e ciclo de navegação do Astro |
| Continuidade do DOM | Não; continuidade visual por snapshots | Pode persistir elementos selecionados |
| Fallback | Navegação convencional | Possíveis fallbacks do roteador |
| Complexidade | Menor ponto de partida | Maior controle e maior responsabilidade sobre scripts e estados |

A proposta de investigação inicial foi experimentar a opção nativa antes de considerar ClientRouter. **Não é uma escolha arquitetural já aprovada.** Avaliar suporte dos navegadores e versões efetivamente utilizados, integração com menu mobile, controle de snapshots, distinção de acessos diretos/internos, histórico e acessibilidade antes da escolha.

Exemplo de opt-in discutido (não é código completo para copiar ao projeto):

```css
@view-transition {
    navigation: auto;
}
```

A regra habilita transições cross-document em contextos compatíveis; não implementa, por si só, o Fade Through + Slide nem todas as condições aprovadas. Navegação convencional deve continuar funcional sem suporte à API.

**Contexto de visita e aprendizado:** antes da decisão de substituição, foram discutidos `sessionStorage` para sinalizar primeira visita à Home por sessão/aba, `PerformanceNavigationTiming` para distinguir navegação/reload/back_forward, `pageshow` e bfcache, e estados declarativos (`data-home-motion=full|short|none`). Em ClientRouter, o ciclo `astro:before-swap` / `astro:page-load` seria relevante. Esses mecanismos são candidatos, não uma solução validada; nenhum deles isoladamente garante a identificação de todos os contextos. A decisão final simplifica o retorno interno à Home, mas ainda deixa pendente o tratamento de reload e novo acesso direto a uma Home já visitada. Definir o comportamento nesses casos e em fallback sem transições durante a implementação, sem reintroduzir animação duplicada. O usuário deseja compreender a implementação dessa distinção.

**Separação de responsabilidades (proposta, não contrato final):** tokens compartilhados de movimento, CSS com keyframes, componentes identificando unidades animáveis por atributos declarativos, layouts definindo intensidade e coreografia. Evitar uma lista global de seletores fortemente acoplada à estrutura interna dos componentes. Sem novas dependências automaticamente. A apresentação estática deve ser o estado seguro caso um script ou uma transição falhe.

## 6. Implementação, validação e documentação

Não considerar esta lista como alterações já realizadas. Trabalhar incrementalmente, com teste manual e confirmação após cada atividade. A ordem exata de execução deve ser discutida antes de iniciar o código; a prioridade funcional das page transitions está definida.

### 6.1. Checklist de implementação e conciliação

- [ ] Atualizar fundo, tokens tipográficos, filetes e estados de foco, conciliando CSS global e estilos locais.
- [ ] Refinar os componentes compartilhados conforme seção 3, incluindo variantes minimal e novos parâmetros de PageIntro.
- [ ] Adequar ProjectCard à proporção intrínseca das imagens e ao TextLink presentacional.
- [ ] Aplicar numeração de 45% e validar composição integrada da Home.
- [ ] Aplicar callout Ochre, metadados 1:2, coluna de artigo 780px e links localizados de retorno.
- [ ] Discutir e testar arquitetura de page transitions e menu fullscreen; preservar fallback funcional.
- [ ] Implementar microinterações e coreografias compatíveis com a regra de substituição.
- [ ] Validar estados, acessibilidade e desempenho com os assets e conteúdos reais.
- [ ] Atualizar `design-system.md` e `technical-documentation.md`, substituindo regras obsoletas e registrando implementação real e resultados dos testes. Preservar `naming-conventions.md` salvo necessidade aprovada.

### 6.2. Checklist de validação manual

**Visual e responsivo**

- [ ] Desktop, tablet, mobile e ultrawide; verificar também limites dos breakpoints.
- [ ] Textura repetível sem emendas, iluminação assimétrica e contraste nas zonas claras e escuras.
- [ ] Fontes carregadas corretamente; pesos, tracking, entrelinhas, títulos longos e conteúdos PT-BR/EN.
- [ ] Home: protagonismo do nome, interferência intencional com a foto, posição dos projetos perto da dobra, numeração parcialmente encoberta, 45% de opacidade e cores corretas.
- [ ] Home com zero a três projetos, e índices com volumes maiores, featured/default, grupos anuais e variações de comprimento.
- [ ] Sobre: composição e callout; links sem gaps indevidos; metadados longos e setas sem quebra isolada; coluna editorial de 780px.
- [ ] Imagens pequenas e grandes sem recorte ou deformação forçada; tabelas e código sem overflow horizontal do documento.
- [ ] Filetes sem duplicação e indicadores de página ativa adequados em navegação horizontal e mobile.

**Interação, acessibilidade e navegação**

- [ ] Links e CTAs sem âncoras aninhadas; semântica e foco visível em todos os controles.
- [ ] Hover, foco, press e touch; feedback cromático sem depender exclusivamente de movimento.
- [ ] Menu mobile: abertura, fechamento, reversão rápida, Escape, teclado, foco, scroll lock, telas baixas, rotação e mudança de breakpoint.
- [ ] Navegação bilíngue, links de retorno aos índices e back-to-top.
- [ ] Entrada direta de cada linguagem, navegação interna em ambas as direções, retorno à Home, reload, histórico, bfcache e preservação de scroll.
- [ ] Sem dupla animação na navegação interna; integração do acionamento do link do menu com a page transition.
- [ ] Reduced motion e ausência de suporte à tecnologia escolhida: conteúdo e controles permanecem disponíveis.

**Desempenho e execução**

- [ ] Avaliar LCP e percepção de carregamento da Home e do primeiro card dos índices; evitar delay artificial e conteúdo invisível por falha de script.
- [ ] Observar fluidez em dispositivos menos potentes; ausência de overflow, layout shifts ou interrupções visuais relevantes causados pelas animações.
- [ ] Verificar console e terminal; executar `npm run build` e `npm run preview` e testar rotas localizadas.
- [ ] Registrar evidências e confirmação do usuário antes de marcar qualquer funcionalidade como validada.

### 6.3. Pontos pendentes que não devem ser tratados como decisões fechadas

| Tema | Pendente |
|---|---|
| Fundo | Composição CSS e intensidades finais com textura real; contraste |
| Tipografia/Home | Escala efetiva, peso e encaixe óptico do nome; foto e espaçamentos |
| Filetes | Ajuste fino das dimensões e uso de `showDivider` por página |
| Minimal | Integração com requisitos e layouts de LP, Pitch e Proposal |
| TextLink/callout | Hover em superfície clara e eventual política de nova aba |
| Button | Composição do estado cromático active e compressão |
| ProjectGallery | Tamanho e posição da numeração, percepção do Ochre a 45% |
| EditorialContent | Cores e implementação de destaque de sintaxe, contraste e testes de tabela/código |
| Coreografia gráfica | Sequência de grupos visíveis nos índices, sem nova decisão de layout |
| Page transitions | Arquitetura técnica, compatibilidade, estabilidade do header, integração com menu, contexto de reload/acesso direto e fallback |
| Validação | Implementação e testes reais de todas as decisões desta consolidação |

### 6.4. Follow-up explícito: futura atualização

**Integração entre Page Transitions e coreografias de entrada (alternativa B de integração).** Explorar uma sequência única que combine a saída da página de origem com a coreografia específica da página de destino. Fora da Fase 2. Não criar arquitetura antecipada para suportar esse recurso nem condicionar a entrega atual a ele.

Outras funcionalidades não aprovadas (por exemplo, masonry pós-MVP, novas funcionalidades editoriais ou shared element transitions adicionais) permanecem fora do escopo atual, conforme decisões anteriores. Isso não cria novos compromissos de implementação futura.

## 7. Mapa de substituição das especificações anteriores

Usar este mapa ao incorporar o refinamento aos documentos normativos. As partes não mencionadas continuam válidas.

| Especificação anterior | Decisão que prevalece |
|---|---|
| Fundo texturizado sem iluminação global | Textura seamless + iluminação assimétrica estática |
| Tracking normal e entrelinhas iniciais de títulos | Ajustes ópticos da seção 2.3 |
| Header ativo sem underline em todas as resoluções | Underline de 2px na navegação horizontal; somente peso 700 no fullscreen mobile |
| Menu mobile expansível | Fullscreen com revelação lateral |
| Header/Footer sem variantes | Default e minimal |
| Rodapé anterior | Assimétrico, filete estrutural e variante minimal centralizada |
| Button pill em mockup / 18px implementado | Raio de 18px aprovado |
| CTA de ProjectCard com aparência Button | TextLink presentacional, link único |
| Recorte fixo de ProjectCard | Proporção intrínseca do asset |
| PageIntro sem links/divisor configuráveis | `links?` e `showDivider?` (false) |
| Numeração sólida/vazada proposta no refinamento | Bold 700, atrás do thumbnail, Cream → Ochre, 45% constante |
| Metadados internos 1:1 | 1:2 |
| Callout Charcoal implementado | Ochre sólido / Charcoal |
| Coluna de artigo 900px | 780px |
| Retorno aos índices sem link local específico | TextLink antes do footer em ambos os detalhes |
| Tabelas e código sem tratamento definido | Direção visual registrada em EditorialContent |
| Coreografias em todas as navegações ou retorno interno abreviado à Home | Acesso direto com coreografia; navegação interna somente com Fade Through + Slide |
| Integração futura de transição e coreografia na Fase 2 | Follow-up explícito fora da Fase 2 |

## 8. Fontes e limites desta consolidação

- Conversa de refinamento visual da Fase 2, incluindo os estudos e decisões sucessivas de motion design até 27/11/2026.
- `design-system.md` e `technical-documentation.md` (base do projeto em 26/11/2026), `naming-conventions.md` e `instrucoes_projeto_site_pessoal.md`.
- Layouts Figma de referência fornecidos ao projeto, nos três breakpoints.
- JavaScript e CSS do site anterior fornecidos durante a discussão de Fade Up + Stagger (`Texto colado.txt` e `Texto colado (2).txt`).

Este arquivo é independente para facilitar a retomada do trabalho, mas deve ser conciliado com os documentos normativos no repositório. Os layouts e protótipos não constituem evidência de implementação ou validação. Não houve inspeção do código-fonte atual do repositório nem novos testes de navegador neste ciclo de consolidação. As escolhas de estrutura do documento, agrupamento e redação não alteram o escopo aprovado.
