# Documentação técnica | Henrique Mirai

**Projeto:** Site pessoal e portfólio profissional  
**Data:** 27/11/2026 (baseline da Fase 2)
**Marco:** Sobre, listagens e páginas individuais de projetos e artigos implementadas e validadas; Home implementada em sua primeira versão, com galeria validada e correções tipográficas aplicadas. Refinamento visual e validação integrada final ficam para o segundo momento.

## 1. Escopo e fontes

Registro técnico complementar ao Design System atualizado em 26/11/2026 e às instruções do projeto. Consolida as decisões posteriores discutidas durante a implementação. O Design System permanece como referência visual, observadas as decisões mais recentes registradas aqui. Não substitui o código-fonte.

**Escopo da verificação:** a estrutura, os imports e a saída estática foram conferidos no repositório durante a refatoração de nomenclatura. As validações visuais anteriores são registros históricos. A revisão visual integrada e os testes de acessibilidade continuam pendentes.

## 2. Arquitetura e ambiente

| Item | Definição |
|---|---|
| Framework | Astro |
| Renderização | Static Site Generation (SSG) |
| Estilização | CSS nativo, sem framework CSS previsto |
| Idiomas | EN na raiz; PT-BR sob `/br/` |
| Conteúdo editorial | Markdown e MDX via Content Collections; coleções de projetos e artigos implementadas |
| CMS | Fora do MVP |
| Ambiente local | Windows, Sublime Text |
| Desenvolvimento | `npm run dev` |
| Versionamento | Git e GitHub operacionais; main como referência compartilhada da Fase 2; estratégia de ambientes na Fase 3 |
| Hospedagem prevista | HostGator Brasil, plano compartilhado; deploy pendente |

Conteúdo definitivo produzido manualmente nos dois idiomas. Integrações GA4, GTM e consentimento não integram o escopo atual. Versões declaradas no package.json durante o ciclo: Astro `^7.4.13`, `@astrojs/mdx` `^8.1.6`, `@astrojs/markdown-satteri` `^0.4.10`, engines Node `>=22.23.4`. Versões instaladas verificadas em 27/11/2026: Astro `7.4.13`, `@astrojs/mdx` `8.1.6` e `@astrojs/markdown-satteri` `0.4.10`; Node `24.15.0` e npm `11.12.1`. Comandos de produção: `npm run build` e `npm run preview`.

## 3. Estrutura e nomenclatura

Os nomes de arquivos internos usam `kebab-case`. Componentes e layouts são importados com identificadores em `PascalCase`, e funções e variáveis usam `camelCase`. Nos layouts, `-index` indica listagem e `-detail` indica página individual. O sufixo `Layout` pertence ao identificador importado, como `ArticleIndexLayout` para `src/layouts/article-index.astro`. O código usa `projects` internamente e a navegação apresenta Works em inglês e Projetos em português. As convenções completas estão em [Convenções de nomenclatura](naming-conventions.md).

```text
astro.config.mjs
src/
  components/
    site-header.astro
    site-footer.astro
    button.astro
    text-link.astro
    page-intro.astro
    project-card.astro
    article-preview.astro
    project-header.astro
    editorial-content.astro
    project-gallery.astro
  layouts/
    base.astro
    about.astro
    project-index.astro
    project-detail.astro
    article-index.astro
    article-detail.astro
    home.astro
  content.config.ts
  content/
    projects/
      project-alpha/
        en.md
        pt-br.md
        images/
      project-beta/
        en.mdx
        pt-br.mdx
        images/
    articles/
      <article-id>/
        en.md ou en.mdx
        pt-br.md ou pt-br.mdx
  lib/
    projects.ts
    articles.ts
  pages/
    index.astro
    about.astro
    home-gallery-test.astro
    works/
      index.astro
      [slug].astro
    articles/
      index.astro
      [slug].astro
    br/
      index.astro
      sobre.astro
      projetos/
        index.astro
        [slug].astro
      artigos/
        index.astro
        [slug].astro
  styles/
    global.css
public/
  images/
    bg_texture.webp
    logo.svg
    foto.jpg
```

A árvore resume a estrutura do site. Alpha e Beta são conteúdos de teste. As duas páginas iniciais usam `HomeLayout` com conteúdo provisório. A rota de diagnóstico `/home-gallery-test/` integra o build atual. Os diretórios de artigos identificam o conteúdo editorial, cujos slugs públicos são definidos por idioma. Os caminhos públicos dos assets preexistentes, como `/images/bg_texture.webp` e `/images/foto.jpg`, foram preservados.

## 4. BaseLayout e grid

`base.astro` recebe `lang: 'en' | 'pt-BR'` e `title: string`, além de `languageLinks?: { en: string; ptBR: string }`, encaminhado ao SiteHeader. Sem links específicos, o header usa `/` e `/br/`. Importa o CSS global, carrega as fontes e organiza `SiteHeader`, slot de conteúdo e `SiteFooter` dentro de `.site-grid`. O `body` possui `id="top"`.

| Propriedade | Mobile (<768px) | Tablet (768 a <1200px) | Desktop (≥1200px) |
|---|---:|---:|---:|
| Colunas | 3 | 4 | 6 |
| Margem interna lateral | 8px | 12px | 16px |
| Gutter | 16px | 24px | 32px |
| Container máximo | 1440px | 1440px | 1440px |

Valores em rem no CSS (equivalências em px considerando raiz de 16px). Breakpoints implementados: `47.999rem` e `74.999rem` como limites superiores, `48rem` como início do tablet.

```css
.site-grid {
  width: 100%;
  max-width: var(--layout-container-max-width);
  margin-inline: auto;
  padding-inline: var(--layout-margin-inline);
  display: grid;
  grid-template-columns: repeat(var(--layout-grid-columns), minmax(0, 1fr));
  column-gap: var(--layout-grid-gutter);
}
.site-grid > main {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}
```

A regra de `main` foi introduzida e validada para evitar que o conteúdo ocupasse apenas uma coluna. Seções intermediárias que precisam compartilhar o grid devem ocupar toda a largura e propagar `subgrid`. O layout de listagem controla agrupamentos, divisores e espaçamentos entre cards.

## 5. CSS e convenções

- `global.css`: reset, tokens compartilhados, fundo, tipografia de base, configuração responsiva do grid e integração de `main`.
- Blocos `<style>` dos componentes Astro: composição, tipografia específica, espaçamentos, variantes, interações e media queries locais.
- Não promover valores exclusivos de um componente a tokens globais sem necessidade concreta. Esta decisão substitui a proposta anterior de tokens globais exclusivos do ProjectCard.
- Classes de componentes seguem padrão observado de bloco, elemento e modificador (`project-card__title`, `project-card--featured`). Não há exigência de nova metodologia ou dependência.
- Props fornecem textos e destinos localizados; componentes de listagem não traduzem conteúdo internamente.
- Reset global: `box-sizing: border-box`, margens e paddings zerados; rolagem suave desativada quando `prefers-reduced-motion: reduce`.

### 5.1. Tokens efetivamente compartilhados

| Token | Valor |
|---|---|
| `--color-olive` | #50594B |
| `--color-ochre` | #B89A58 |
| `--color-brown` | #5A3426 |
| `--color-cream` | #F2EDE4 |
| `--color-charcoal` | #262720 |
| `--color-light-ochre` | #E2C88E |
| `--color-background-primary` | Olive |
| `--color-text-primary` | Cream |
| `--color-text-secondary` | Cream com 85% de opacidade |
| `--color-text-hover` | Light Ochre |
| `--color-brand-bg` / `--color-brand-fg` | Brown / Ochre |
| `--color-button-primary-bg` / `--color-button-primary-text` | Brown / Cream |
| `--color-border-decorative` | Ochre |
| `--bg-texture-image` | `url('/images/bg_texture.webp')` |
| `--radius` | 1.125rem |
| `--font-display` | Familjen Grotesk |
| `--font-body` | Commissioner |
| `--font-mono` | Recursive |
| `--font-weight-regular/medium/semibold/bold/black` | 400/500/600/700/900 |

O fundo usa Olive e textura repetível. Fontes carregadas via Google Fonts no layout: Commissioner 400/500/600/700/900; Familjen Grotesk 400/500/600/700/900; Recursive MONO@1. Commissioner 900 é necessário para os marcadores de ano e títulos individuais de artigos. A presença de Commissioner 900 na configuração de Google Fonts em `src/layouts/base.astro` foi confirmada na inspeção de 27/11/2026; não houve teste de carregamento no navegador nesta inspeção.

| Token de tamanho | Expressão |
|---|---|
| `--type-size-page-title` | `clamp(2.5rem, calc(1.643rem + 3.81vw), 4.5rem)` |
| `--type-size-page-intro` | `clamp(1.375rem, calc(1.214rem + 0.714vw), 1.75rem)` |
| `--type-size-body` | `clamp(1rem, calc(0.946rem + 0.238vw), 1.125rem)` |
| `--type-size-eyebrow` | `clamp(0.875rem, calc(0.768rem + 0.476vw), 1.125rem)` |
| `--type-size-auxiliary` / `--type-size-metadata` | 0.875rem |

Line-heights globais (`--type-leading-*`): page-title 1.05; page-intro 1.35; body 1.60; eyebrow 1.40; auxiliary 1.40; metadata 1.50.

## 6. Inventário de componentes

| Componente | Status |
|---|---|
| BaseLayout | Validado |
| SiteHeader | Validado |
| SiteFooter | Validado |
| Button | Validado, incluindo modo presentacional |
| TextLink | Validado |
| PageIntro | Validado |
| ProjectCard | Validado; refinamento visual posterior |
| ArticlePreview | Validado; categoria removida no ciclo de artigos |
| ProjectHeader | Implementado e validado |
| EditorialContent | Implementado e validado em projetos e artigos |
| ProjectGallery | Implementado e validado isoladamente |

`ProjectThumbnail` permanece como conceito visual do Design System, implementado diretamente dentro de `project-gallery.astro`. Não existe necessidade de um arquivo `ProjectThumbnail.astro`, nem de uma variante thumbnail do `ProjectCard`.

### 6.1. SiteHeader, SiteFooter e TextLink

Header e Footer recebem `lang` do BaseLayout. SiteHeader também recebe `languageLinks`, permitindo alternância entre páginas equivalentes, inclusive estudos de caso com o mesmo slug. Navegação desktop e mobile utiliza `getAriaCurrent(href)`: normaliza barras finais, retorna `page` para igualdade exata, `location` para descendentes com limite de segmento (`${normalizedHref}/`) e `undefined` para demais caminhos. Ambos os estados aparecem em negrito. Seletor de idioma mantém `aria-current="true"` no idioma atual. A Home não ativa itens da navegação principal. A regra contempla as rotas de artigos já implementadas. Para artigos individuais, o layout fornece links de idioma específicos (ver seção 7.6).

TextLink recebe `href`, `class?`, `ariaLabel?` e slot. Links HTTP(S) abrem em nova aba com indicação externa, sublinhado tracejado, hover Light Ochre e foco visível. Consultar implementação local para detalhes. SiteFooter permanece sem alterações neste ciclo.

### 6.2. Button

```ts
interface Props {
  label: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  presentational?: boolean;
  class?: string;
}
```

- `type` padrão `button`; `disabled` e `presentational` padrão `false`.
- Com href habilitado: âncora. URLs HTTP(S) são tratadas como externas, com nova aba, `rel="noopener noreferrer"` e seta ↗ decorativa.
- Com href desabilitado: span com `aria-disabled="true"`. Sem href: button nativo.
- `presentational` tem precedência e renderiza span sem foco ou ação própria. Utilizado dentro do link do ProjectCard.
- Estilo: inline-flex, padding 14px 24px, gap 8px, raio 18px, Commissioner semibold, tamanho body, line-height 1.2.
- Hover convencional: inversão Brown/Cream; foco Light Ochre 2px com offset 3px; desabilitado com opacidade 0.5.
- Custom properties herdáveis `--button-bg` e `--button-text` permitem controle pelo elemento pai, com fallback nos tokens globais de botão. O modo presentacional não possui hover independente e herda cursor.
- Transição de 180ms; desativada com preferência por movimento reduzido.

### 6.3. PageIntro

```ts
interface Props {
  title: string;
  description: string;
}
```

Section com h1 e parágrafo. Ocupa todo o grid e utiliza subgrid; título e descrição ocupam três colunas cada no desktop, duas no tablet e toda a largura no mobile. Alinhamento inicial e row-gap de 1rem. Usa Familjen Grotesk e tokens globais de page-title/page-intro. Validado após correção da integração do `main` com o grid.

### 6.4. ProjectCard

```ts
interface Props {
  title: string;
  description: string;
  context: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel: string;
  variant?: 'default' | 'featured';
}
```

Variante padrão: `default`. Uma única âncora envolve imagem, contexto, h2, descrição e `Button presentational`. Hover e foco da âncora invertem apenas as cores do CTA por custom properties; foco com contorno Cream 2px e offset 3px. Sem zoom ou elevação.

| Variante | Mobile | Tablet | Desktop |
|---|---|---|---|
| Default | 3 colunas, vertical | 2 colunas, vertical | 3 colunas, vertical |
| Featured | 3 colunas, vertical | 4 colunas, horizontal 2+2 | 6 colunas, horizontal 3+3 |

Featured utiliza subgrid e centralização vertical entre imagem e conteúdo. Imagem de referência 688 × 373px, proporção preservada em larguras menores, `max-width: 688px`, `object-fit: cover`, raio 18px, atributos width/height, lazy loading e decoding async.

Título Familjen Grotesk 700, `clamp(2rem, calc(1.464rem + 2.381vw), 3.25rem)`, line-height 1.10. Contexto Recursive 400, 14px, line-height 1.50. Descrição Commissioner 400, tamanho body, line-height 1.40. Espaçamentos iniciais: 24px entre imagem e conteúdo vertical, 16px entre elementos textuais, 8px adicionais antes do CTA.

Validação funcional confirmada. Refinamento visual, especialmente composição tablet, permanece para etapa posterior. Lazy loading do primeiro card poderá ser revisto conforme performance. Decisão posterior: utilizar um único asset WebP otimizado manualmente por projeto, compartilhado entre cards e thumbnails da Home, preservando proporção original, sem recorte forçado. O `ProjectCard` ainda mantém `aspect-ratio`, `object-fit: cover` e atributos fixos 688 × 373; adequação dessas regras foi adiada para refinamento visual. Não confundir decisão aprovada com CSS já implementado.

### 6.5. ArticlePreview

```ts
interface Props {
  title: string;
  description: string;
  href: string;
}
```

Uma única âncora com h2 e descrição. A categoria foi removida do modelo de conteúdo e de todas as apresentações de artigos. Sem imagem, CTA ou variantes. Data, agrupamento por ano e ordenação cronológica pertencem à página de listagem.

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Colunas ocupadas | 3 | 2 | 3 |
| Artigos por linha | 1 | 2 | 2 |
| Título de referência | 24px | 30px | 36px |
| Descrição de referência | 16px | 17px | 18px |

Título Familjen Grotesk 600, `clamp(1.5rem, calc(1.179rem + 1.429vw), 2.25rem)`, line-height 1.15. Descrição Commissioner 400, tamanho body, line-height 1.40. Gap interno 8px. Hover em toda a área muda somente o título para Light Ochre; foco Cream 2px com offset 3px. Transição de cor 180ms, desativada com movimento reduzido. Validado pelo usuário; medidas finas permanecem revisáveis.

### 6.6. ProjectHeader

```ts
interface Props {
  title: string;
  metadata?: { label: string; value: string }[];
}
```

Header semântico com `h1`, `dl`, `dt` e `dd`. Desktop: título em quatro colunas e metadados em duas; tablet e mobile: blocos empilhados ocupando toda a largura. Sem metadados, lista omitida e título ocupa todo o grid. Título Familjen Grotesk 700, tokens page-title/page-title leading (72px máximos, 40px mínimos). Metadados Recursive 400, 14px, line-height 1.50; rótulo e valor lado a lado em todas as resoluções, grid interno 1:1, alinhados pelo topo, com quebra de valores longos. Divisores Ochre entre entradas. Valores reconhecidos pela API `URL` como HTTP ou HTTPS são renderizados com TextLink; demais valores permanecem texto. URL completa é o próprio rótulo visível; não há campo adicional de link. Espaçamentos provisórios: row-gap 32px, gap interno 16px, padding vertical 12px, divisor 1px.

### 6.7. EditorialContent

Componente com slot, sem consulta de dados. Estilos locais com `:global()` para elementos produzidos por Markdown/MDX. Tipografia exclusivamente Commissioner; o H1 externo pertence ao layout/cabeçalho da página.

| Elemento | Peso | Faixa de tamanho |
|---|---:|---|
| H2 | 600 | 32–52px |
| H3 | 600 | 24–36px |
| H4 | 500 | 22–28px (`--type-size-page-intro`) |
| H5 | 700 | 16–18px |
| H6 | 600 | 16–18px |
| Parágrafos e listas | 400 | 16–18px |
| Legendas | 400 | 14px |

H2 e H3 reutilizam as expressões clamp de ProjectCard e ArticlePreview, respectivamente, mas com Commissioner. H2–H6 têm line-height 1.2; corpo usa tokens body (1.60); legendas usam tokens auxiliary (1.40), cor secundária. Espaçamentos iniciais: 24px entre blocos, 48px antes de títulos não iniciais, 8px entre itens de lista, recuo 1.5em, legendas 12px. Strong em bold, em em itálico. Links Markdown são âncoras convencionais com sublinhado tracejado, hover Light Ochre e foco Cream; não são substituídos automaticamente por TextLink e não têm comportamento externo adicional garantido. Citações com borda lateral Ochre, separadores com linha Ochre de 1px. Imagens `display: block`, `max-width: 100%`, `height: auto`, `border-radius: 0`; exceção deliberada ao raio global. Sem ampliação forçada ou recorte. Estilos específicos de tabelas, código e galerias pendentes. Composição de colunas pertence ao layout consumidor, não ao componente editorial.

### 6.8. ProjectGallery

`src/components/project-gallery.astro` é específico da Home. Encapsula a apresentação do conjunto de até três projetos e renderiza o markup de cada thumbnail em um `map()`, sem componente individual adicional. A seleção permanece em `projects.ts`; o posicionamento da galeria em relação à fotografia pertence ao HomeLayout.

```ts
import type { getHomeProjects } from '../lib/projects';

interface Props {
  projects: Awaited<ReturnType<typeof getHomeProjects>>;
  label: string;
}
```

Lista `ul` com `aria-label` localizado e `role="list"`, omitida quando vazia. Cada `li` contém uma única âncora com título acessível, imagem e rótulo visível. Imagem nativa com `entry.data.image.src`, `imageAlt`, dimensões intrínsecas (`width`/`height`) e `decoding="async"`; largura 100%, altura automática, raio global de 18px. Sem recorte forçado, zoom ou elevação. Mesmo asset WebP da listagem de projetos.

| Propriedade | Mobile | Tablet | Desktop |
|---|---|---|---|
| Colunas ocupadas por item | 3 de 3 | 2 de 4 | 2 de 6 |
| Máximo por linha | 1 | 2 | 3 |
| Gap horizontal e vertical | Gutter global | Gutter global | Gutter global |

Itens alinhados no início do grid; se houver menos de três, colunas não ocupadas permanecem livres. Rótulo sobreposto ao canto inferior esquerdo, offset de 12px em ambos os eixos, largura máxima 85%, padding 8px 12px, raio 12px, Familjen Grotesk 400, 18px, line-height 1.2, quebra natural sem truncamento (`overflow-wrap: anywhere`). Medidas aprovadas como ponto de partida.

Fundo Ochre, texto Charcoal. Hover e focus-visible alteram apenas o fundo do rótulo para Cream; foco também tem contorno Cream de 2px com offset 3px. Transição de fundo 180ms, desativada com preferência por movimento reduzido. Sem JavaScript. As custom properties `--color-project-thumbnail-label-bg`, `--color-project-thumbnail-label-text` e `--color-project-thumbnail-label-hover-bg` são consultadas com fallback nos tokens globais de paleta; o `global.css` compartilhado não contém essas propriedades específicas.

Validação isolada confirmada pelo usuário com dois projetos de teste. Não foi exigida a existência de três projetos. Integração espacial com o Hero permanece sujeita a refinamento visual.

## 7. Páginas e conteúdo

### 7.1. AboutLayout

Rotas `src/pages/about.astro` e `src/pages/br/sobre.astro`, compartilhando `about.astro`. Props: `lang`, `title`, `description`, `links?`, `biography: string[]`, `image`, `imageAlt`, `imageWidth`, `imageHeight`, `callout: { text, link? }`. PageIntro reutilizado; até quatro links. Desktop: biografia e fotografia 3+3 colunas, callout com fundo Charcoal sobreposto à parte inferior esquerda da fotografia, largura de 65%. Tablet: 2+2, callout abaixo da fotografia. Mobile: blocos empilhados com biografia antes da imagem. Conteúdo, links e fotografia provisórios; refinamento visual pendente. Alternância entre `/about/` e `/br/sobre/` validada.

### 7.2. Content Collection de projetos

`astro.config.mjs`: site `https://henriquemirai.com`, integração `mdx()`, i18n com locale padrão `en`, locale `{ path: 'br', codes: ['pt-BR'] }`, `prefixDefaultLocale: false`. Instalação MDX via `npx astro add mdx`.

Cada projeto ocupa um diretório em `src/content/projects/<slug>/`, com `en.md` ou `en.mdx`, `pt-br.md` ou `pt-br.mdx`, e `images/`. O slug é compartilhado entre idiomas, derivado do diretório; escolher slugs concisos e adequados a ambos. Evitar manter simultaneamente MD e MDX para o mesmo idioma/slug.

Trecho do schema de projetos em `src/content.config.ts` (os imports são compartilhados com a coleção de artigos; o export ao final do arquivo inclui ambas):

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '*/{en,pt-br}.{md,mdx}',
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    context: z.string(),
    image: image(),
    imageAlt: z.string(),
    metadata: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).default([]),
    order: z.number().int(),
    featured: z.boolean().default(false),
    showOnHome: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
```

Exemplo de frontmatter:

```yaml
---
title: Project Alpha
description: Test project description
context: Test context
image: ./images/thumbnail.webp
imageAlt: Project preview
metadata:
  - label: Website
    value: https://example.com/
order: 1
featured: true
showOnHome: true
draft: false
---
```

`image()` retorna metadados do asset; cards recebem `entry.data.image.src` e usam `img` nativo. Imagens inseridas no corpo Markdown passam pelo pipeline editorial do Astro. O arquivo de capa/card não é automaticamente exibido na página individual. Imagens editoriais são inseridas no conteúdo.

### 7.3. Consultas e publicação

`src/lib/projects.ts` centraliza as regras:

- `getPublishedProjects(lang)` consulta `getCollection('projects')`, exclui drafts e só retorna entradas cuja tradução também existe e não está em draft.
- Identidade derivada de `entry.id` (`<slug>/en` ou `<slug>/pt-br`); retorno com `slug`, `lang`, `href` e `entry`.
- URLs EN `/works/<slug>/`, PT-BR `/br/projetos/<slug>/`.
- Ordenação por `order` ascendente, desempate por slug.
- `getHomeProjects(lang)` filtra o resultado por `showOnHome`, preservando a ordenação, e limita a seleção com `.slice(0, 3)`. Destaque não altera prioridade na Home. O limite é de até três, não uma quantidade obrigatória; não há placeholders ou duplicação quando existem menos de três. Não foi criado campo de data: a seleção continua manual por `order`.

A consistência de `order`, `featured` e `showOnHome` entre traduções é responsabilidade editorial; não há validação cruzada no schema. Ausência de tradução ou draft em qualquer idioma remove o projeto das duas listagens e das duas rotas individuais. A coleção de artigos possui regras próprias, incluindo publicação independente por idioma (seção 7.6).

### 7.4. ProjectIndexLayout

Rotas `/works/` e `/br/projetos/` usam `project-index.astro`, com props `lang`, `title`, `description`, `ctaLabel`. Links de idioma explícitos para as duas listagens. Consulta `getPublishedProjects`, separa featured e default preservando ordenação interna; featured sempre primeiro somente nesta listagem. Grupos vazios omitidos. Reutiliza PageIntro e ProjectCard sem alterar suas interfaces. Cada featured ocupa linha completa; default apresenta dois cards por linha no desktop e tablet e um no mobile. Divisor Ochre antes de cada featured e antes do grupo default. Wrappers propagam subgrid. Espaçamentos provisórios: padding vertical 48px (32px mobile), margem inicial 48px (32px mobile), separações internas 24–48px conforme grupo e resolução. Composição editorial assimétrica/masonry adiada para pós-MVP. Textos introdutórios e CTA provisórios.

### 7.5. ProjectDetailLayout e rotas individuais

`project-detail.astro` recebe `lang`, `slug`, `entry: CollectionEntry<'projects'>`. Usa `render(entry)` de `astro:content` e `<Content />` dentro de EditorialContent. BaseLayout recebe título do projeto e links de idioma com slug compartilhado. Main contém ProjectHeader e wrapper `.project__body` que propaga subgrid até `.editorial-content`. Sem capa automática.

Desktop: blocos editoriais diretos ocupam quatro colunas à esquerda (`grid-column: 1 / 5`); `img`, `picture`, `figure` e parágrafos com `img` ou `picture` como único elemento filho (`:has(> img:only-child)` / equivalente para picture) podem ocupar seis. Tablet e mobile: todos os blocos ocupam o grid integral. Imagens menores não devem ser ampliadas. O seletor verifica elementos filhos, não nós de texto; composições MDX personalizadas e imagens misturadas com texto podem exigir ajustes. Padding vertical 48px e row-gap 64px; mobile 32px e 48px, respectivamente, provisórios.

`src/pages/works/[slug].astro` e `src/pages/br/projetos/[slug].astro` implementam `getStaticPaths()`, consultando `getPublishedProjects` no idioma respectivo e retornando `params: { slug }` e `props: { entry }`. O layout recebe slug de `Astro.params` e entry de `Astro.props`. Não é necessário criar arquivo Astro por projeto. Markdown e MDX usam o mesmo fluxo.

### 7.6. Content Collection de artigos

Artigos usam a mesma infraestrutura Markdown/MDX, em coleção separada `articles`, declarada em `src/content.config.ts`. Cada artigo possui um diretório de identidade estável em `src/content/articles/<article-id>/`, com `en.md` ou `en.mdx` e/ou `pt-br.md` ou `pt-br.mdx`. Não criar simultaneamente dois arquivos para o mesmo idioma e identidade. Diferentemente dos projetos, os slugs públicos são definidos no frontmatter e podem variar por idioma.

Campos confirmados:

| Campo | Tipo / regra |
|---|---|
| `title` | String |
| `description` | String |
| `slug` | String, validada por expressão regular para slug |
| `publishedAt` | Data de publicação original |
| `draft` | Boolean, padrão `false` |

Exemplo de conteúdo de teste:

```yaml
---
title: "Design systems in practice"
description: "Sample description for the article listing."
slug: "design-systems-in-practice"
publishedAt: 2026-11-26
draft: false
---
```

Categoria removida por decisão aprovada; não deve existir no schema, ArticlePreview ou cabeçalho individual. O arquivo `content.config.ts` exporta as duas coleções (`projects` e `articles`). A versão completa mais recente do schema não foi compartilhada nesta consolidação, portanto a expressão regular exata e demais detalhes devem ser conferidos no código local antes de editá-lo.

#### Identidade, publicação e consultas

O loader `glob` de artigos precisa preservar o ID do arquivo independentemente do campo `slug` no frontmatter. Foi corrigido com geração explícita de identidade a partir do caminho de entrada:

```ts
generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.mdx?$/, '')
```

O resultado esperado é `<article-id>/en` ou `<article-id>/pt-br`. A lógica rejeita identidades/idiomas inválidos. O problema anterior ocorria porque o `slug` de frontmatter substituía o ID gerado pelo loader, impedindo a resolução de idioma pela identidade. Não aplicar esta correção automaticamente ao loader de projetos, que possui outro modelo de slug.

`src/lib/articles.ts` centraliza consultas e o tipo `Article`, com registros contendo `id`, `slug`, `lang`, `href` e `entry`. Regras aprovadas:

- Publicação independente por idioma: uma tradução ausente ou em draft não impede a publicação da outra.
- `draft` controla publicação manualmente; `publishedAt` não atua como agendamento automático. Artigos com data futura e `draft: false` podem aparecer.
- A data de publicação original deve ser mantida entre traduções por responsabilidade editorial.
- URLs localizadas: `/articles/<slug-en>/` e `/br/artigos/<slug-pt-br>/`.
- Listagem agrupada por ano decrescente, artigos ordenados por data decrescente e desempate alfabético.
- Alternância de idioma usa a identidade interna para localizar a tradução publicada e seu slug. Sem tradução disponível, o link leva ao índice de artigos no outro idioma.

Conferir assinaturas exatas das funções no arquivo local antes de alterações. Não há artigos na Home.

### 7.7. ArticleIndexLayout e índices

Rotas `src/pages/articles/index.astro` e `src/pages/br/artigos/index.astro` usam o layout compartilhado `article-index.astro`. PageIntro e ArticlePreview reutilizados; conteúdo localizado fornecido pelas rotas. Agrupamento anual pertence ao layout, sem componente `ArticleYearGroup` separado. Marcadores de ano com Commissioner 900. Cada grupo renderiza os artigos do ano em grid de duas colunas no desktop/tablet e uma no mobile; sem miniaturas, categorias ou divisores entre entradas. Os estados de navegação e a alternância entre as listagens foram tratados na etapa de artigos.

As dimensões e espaçamentos finos da composição editorial permanecem sujeitos à revisão visual. Consultar o layout local para os nomes exatos das props e medidas de CSS.

### 7.8. ArticleDetailLayout e páginas individuais

Rotas `src/pages/articles/[slug].astro` e `src/pages/br/artigos/[slug].astro` geram páginas estáticas a partir dos artigos publicados no idioma correspondente, usando o slug localizado. `article-detail.astro` compartilha a apresentação, utiliza o BaseLayout com links de idioma resolvidos a partir da identidade interna e reutiliza EditorialContent para renderização Markdown/MDX.

Cabeçalho editorial local, sem `ArticleHeader` separado: título em Commissioner 900 e data de publicação com elemento semântico `time`; não há categoria. O corpo editorial mantém largura máxima de 900px, sem capa automática nem variantes especiais de mídia introduzidas. As imagens preservam as regras do EditorialContent (seção 6.7). Dimensões, entrelinhas e espaçamentos específicos do cabeçalho permanecem revisáveis. As rotas e os fluxos de publicação foram validados pelo usuário no ciclo de artigos.

### 7.9. HomeLayout

`src/pages/index.astro` e `src/pages/br/index.astro` foram substituídas para consumir `src/layouts/home.astro`. O layout usa BaseLayout com título `Henrique Mirai` e `lang` correspondente, consulta `getHomeProjects(lang)` e reutiliza Button e ProjectGallery. Os antigos blocos de teste das páginas iniciais não integram a Home. Não renderiza artigos, ProjectCard ou ArticlePreview.

```ts
interface Props {
  lang: 'en' | 'pt-BR';
  eyebrow: string;
  statement: string;
  secondaryText: string;
  ctaLabel: string;
  galleryLabel: string;
}
```

Hero local ao HomeLayout, sem componente separado. Estrutura: `main.home`, `section.home-hero` com fotografia, eyebrow, h1 (nome), frase principal, texto secundário e Button; wrapper `.home__projects` com ProjectGallery quando há projetos elegíveis. Seletor de idioma padrão do BaseLayout (`/` e `/br/`). CTA para `/works/` ou `/br/projetos/`. Conteúdo provisório localizado nas páginas de entrada.

Fotografia existente em `public/images/foto.jpg`, referenciada como `/images/foto.jpg`. Imagem nativa, `fetchpriority="high"`, `decoding="async"`, `alt=""` (tratada como complementar ao nome), `object-fit: cover`, posição central e raio global; gradiente horizontal de escurecimento localizado no lado esquerdo. Não houve inspeção independente do asset original ou auditoria de contraste. Enquadramento, semântica da imagem e legibilidade poderão ser revistos no refinamento.

#### Direção responsiva aprovada

| Elemento | Mobile (<768px) | Tablet (768–1199px) | Desktop (≥1200px) |
|---|---|---|---|
| Hero | Assimétrico | Assimétrico | Assimétrico |
| Fotografia | Lateral direita | Lateral direita | Lateral direita |
| Nome | Duas linhas | Conforme espaço disponível | Uma linha |
| Galeria | 1 por linha | Até 2 por linha | Até 3 por linha |
| Sobreposição da galeria à fotografia | Não | Não | Sim |

A referência mobile mais antiga não representa o rótulo vigente dos thumbnails; o Design System atualizado prevalece. Preservar composição assimétrica com nome sobreposto à fotografia, sem tarjas Cream para os textos. Os tamanhos e posições atuais são primeira implementação, não revisão visual final.

#### Tipografia específica do Hero

Tokens exclusivos declarados em `.home-hero`, não no `global.css`. Ausência desses tokens na primeira implementação provocou renderização de nome e frase principal sem a hierarquia esperada. Correção aplicada pelo usuário:

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
}
```

Escala nominal do nome: 56px a 360px, 96px a 768px, 216px a 1200px; Familjen Grotesk 700. A regra local `font-size: min(var(--type-size-hero), 15vw)` a partir de tablet limita o tamanho efetivamente renderizado (por exemplo, 180px a 1200px). Esta diferença do valor nominal do Design System é provisória, a verificar na revisão visual. Frase principal em Commissioner 400, escala 24–36px, line-height 1.25. Eyebrow usa tokens globais, Recursive 400; texto secundário Commissioner 400, 16px, cor secundária, entrelinha body. O Button mantém seu estilo validado.

O h1 usa `<span>Henrique</span>{' '}<span>Mirai</span>` para preservar o espaço explícito no Astro; spans em bloco no mobile e inline-block a partir de 768px. Desktop usa `white-space: nowrap`. A correção do markup foi confirmada como aplicada; não foi enviado novo screenshot após as correções.

#### Composição inicial implementada (provisória)

- `.home`, `.home-hero`, `.home-hero__intro` e `.home__projects` propagam o grid global com subgrid quando necessário; foto e introdução ocupam áreas sobrepostas, com `z-index` para textos e galeria.
- Mobile: foto com 46% da largura e altura mínima de 15rem, frase com 51% da largura; texto secundário e CTA em linha de grid inferior. Padding vertical da Home 3rem/5rem, gap de 2rem.
- Tablet: foto em colunas 3–4, proporção 4:5; frase e detalhes em duas colunas à esquerda. Padding 4rem/7rem, gap de 3rem; galeria sem sobreposição.
- Desktop: foto em colunas 4–6; frase e detalhes em três colunas à esquerda; padding 5rem/10rem, gap zero; introdução com padding superior fluido de 6–9rem. Detalhes com padding inferior de 10rem e galeria com `margin-block-start: -9rem`.
- Sem JavaScript novo, dependências novas ou alteração de tokens globais nesta implementação.

O screenshot anterior às correções mostrou tipografia sem escala, ausência de espaço entre nome e sobrenome e problemas de distribuição vertical (espaço excessivo, posição da galeria e enquadramento da foto). Os dois primeiros pontos receberam correções; o resultado visual posterior e o comportamento em todos os breakpoints ainda precisam de validação. O usuário decidiu adiar refinamento visual para o segundo momento. Não considerar essas medidas finais nem a Home integralmente validada.

## 8. Validação e problemas conhecidos

**Refatoração de nomenclatura:** o build de produção gerou as mesmas 18 páginas estáticas antes e depois da refatoração. O HTML e o CSS coincidem após o mapeamento dos identificadores de escopo e do nome do arquivo CSS gerados pelo Astro. Os demais arquivos do build coincidem byte a byte. O preview local respondeu com HTTP 200 e o HTML esperado nas 18 rotas. A capitalização exata dos 35 imports relativos de arquivos Astro foi conferida contra o sistema de arquivos.

Validação manual orientada por componente: desktop, tablet, mobile, links, hover, foco por teclado, semântica, overflow e erros de console/terminal. A confirmação do usuário encerra cada atividade; não há evidência de suíte automatizada ou auditoria formal nesta etapa.

**HMR:** foi observado comportamento desatualizado após edição do Button: o modo presentacional ainda renderizava button e o hover não era herdado. Reiniciar o servidor (`Ctrl+C`, `npm run dev`) e atualizar a página (`Ctrl+Shift+R`) resolveu o caso. A causa raiz não foi confirmada; investigação adiada. Usar esse procedimento como contorno quando alterações não aparecerem.

### 8.1. Validação integrada em 25/11/2026

Usuário confirmou: Sobre nos dois idiomas; consultas da coleção, defaults, ordenação, drafts, traduções ausentes e filtro da Home; listagens com cenários de destaque prioritário, nenhum destaque e todos destacados; páginas individuais Markdown/MDX, links nos metadados, tipografia, imagens pequenas e largas, regras de publicação refletidas nas rotas e navegação. Preview de produção confirmado ao final do ciclo.

Build final (`npm run build`): output e mode `static`, 10 páginas em 1,75s, sem erros ou warnings exibidos. Duas imagens thumbnail otimizadas no log. O log não comprova a presença de todos os assets de teste temporários no resultado final.

| Rotas geradas EN | Rotas geradas PT-BR |
|---|---|
| `/` | `/br/` |
| `/about/` | `/br/sobre/` |
| `/works/` | `/br/projetos/` |
| `/works/project-alpha/` | `/br/projetos/project-alpha/` |
| `/works/project-beta/` | `/br/projetos/project-beta/` |

A rota de diagnóstico não consta no build. `npm run preview` validado pelo usuário. Não equivale a auditoria independente, teste automatizado, revisão de performance ou deploy público.

### 8.2. Validação do ciclo de 26/11/2026

Artigos: estrutura de conteúdo, listagens e páginas individuais confirmadas pelo usuário após correções de identidade e ambiente. Cenários contemplados: idiomas independentes, drafts, slugs localizados, agrupamento anual, navegação, Markdown e MDX. Os arquivos de teste incluem casos de tradução ausente, tradução em draft e data futura. O build-log deste ciclo contém um estado intermediário com aviso de coleção vazia; não tratá-lo como evidência de build final limpo. Os detalhes completos da última execução não estão disponíveis nesta consolidação.

**Windows / CSS ausente:** durante a etapa de artigos, foi observado CSS global ausente no resultado servido, apesar da geração de assets. O usuário confirmou a diferença entre executar o projeto com unidade minúscula (`d:\`) e maiúscula (`D:\`). Contorno validado: iniciar o servidor a partir do diretório com unidade maiúscula no CMD:

```cmd
cd /d D:\Dev\JS\henriquemirai
npm run dev
```

Se necessário, interromper primeiro o servidor em execução. A causa interna no pipeline não foi comprovada; registrar como problema de ambiente reproduzido e contornado, não como falha genérica do Astro.

Home: `ProjectGallery` validado isoladamente com dois projetos. HomeLayout renderizado no navegador, correções de tokens locais e espaço explícito do nome aplicadas. Não houve confirmação de novo teste visual após elas; a revisão visual em desktop, tablet e mobile e os testes de interação continuam pendentes para o refinamento. O build e o preview da refatoração incluem a rota de diagnóstico.

### 8.3. Baseline técnico inicial da Fase 2 — 27/11/2026

- Commit de referência: `75f00c07d3cac71c37c6992865434b765c44a42d` (`getting ready to phase 2`). Branch `main`, working tree limpo, sem diferenças staged ou locais. HEAD e `origin/main` coincidentes; consulta direta com `git ls-remote origin refs/heads/main` confirmou o mesmo hash remoto naquele momento.
- `npm.cmd run build`: saída 0, output e mode `static`, **18 páginas em 5,97s**, sem erros ou warnings exibidos. Inclui a rota `/home-gallery-test/` e conteúdos demonstrativos; duas thumbnails reutilizaram o cache de otimização.
- Node `24.15.0`, npm `11.12.1`; dependências instaladas verificadas com `npm.cmd ls --depth=0`, conforme seção 2. `package-lock.json` versionado.
- A política de execução do PowerShell bloqueou `npm.ps1`. `npm.cmd --version`, `npm.cmd ls --depth=0` e `npm.cmd run build` funcionaram sem alterar a política; `npm.cmd` é a alternativa validada neste ambiente.
- Sete pacotes locais foram identificados como `extraneous`: `@emnapi/core@1.11.3`, `@emnapi/runtime@1.11.3`, `@emnapi/wasi-threads@1.2.3`, `@img/sharp-wasm32@0.35.5`, `@napi-rs/wasm-runtime@1.2.7`, `@tybys/wasm-util@0.10.5` e `tslib@2.9.1`. Observação técnica não bloqueante para o build; nenhum pacote foi removido. A contagem de oito informada no relatório inicial fica corrigida para sete, conforme o inventário exibido.
- Não há `.github/workflows` no repositório examinado. O README descreve deploy por push na `main` para staging e tags `v*` para produção como fluxo planejado, com automação ainda não implementada. Integrações externas, webhooks e configurações da hospedagem não foram verificados; ausência de workflows no repositório não comprova ausência de automações externas.

O build gerou artefatos locais em diretórios ignorados pelo Git. Não houve alteração de código, dependências ou configurações, commit, merge, push ou deploy. Preview, testes de navegador, acessibilidade e validação visual não foram executados nesta inspeção. Build bem-sucedido não comprova ausência de regressões ou deploy. Refinamento visual e expansão comercial são requisitos futuros, sujeitos às conciliações das instruções da Fase 2.

## 9. Conciliação com o Design System

Decisões técnicas preservadas dos ciclos anteriores, considerando o Design System atualizado em 26/11/2026:

- Grid responsivo implementado em 3/4/6 colunas e margens/gutters conforme seção 4.
- Asset de textura integrado no caminho e token da seção 5.
- Button implementado com raio compartilhado de 18px, diferente do conceito de botão totalmente arredondado presente no Design System anterior. Registrar a divergência; não alterar automaticamente o componente validado.
- Modo presentacional do Button e controle de CTA pelo ProjectCard.
- Dimensões de imagem do ProjectCard e alinhamento vertical do Featured.
- Escalas responsivas de ProjectCard e ArticlePreview aprovadas para implementação; valores intermediários de clamp são aproximados.
- Tokens exclusivos de componentes permanecem locais. Exemplos de tokens específicos no Design System não devem ser interpretados como exigência de criação global.

Decisões anteriores preservadas e alterações do ciclo atual a considerar na próxima revisão do Design System:

- ProjectHeader utiliza Page title (Familjen Grotesk 700, máximo 72px); composição desktop 4+2, empilhada em tablet e mobile; metadados sempre lado a lado internamente.
- EditorialContent usa exclusivamente Commissioner, hierarquia H2–H6 conforme seção 6.7 e imagens sem arredondamento, exceção ao raio geral.
- Nos projetos, texto em quatro colunas à esquerda no desktop e imagens até seis; tablet e mobile usam toda a largura. Preservar proporções e dimensões intrínsecas, sem variantes de largura neste MVP.
- Listagem prioriza featured; Home mantém `showOnHome` e `order`, sem prioridade de featured, com limite de até três projetos.
- Um asset de projeto compartilhado por card e thumbnail, com adequação de proporções ainda pendente no card.
- AboutLayout, composições responsivas e estados ativos de seção conforme implementação registrada.

Alterações posteriores a 25/11 já incorporadas à atualização do Design System de 26/11:

- Categoria removida do ArticlePreview, índice e artigo individual; publicação independente por idioma e agrupamento anual mantidos.
- ProjectThumbnail é padrão visual, não um componente Astro independente. A implementação é ProjectGallery, específica da Home, com as medidas aprovadas da seção 6.8.
- Home assimétrica nos três breakpoints; foto à direita; galeria sobreposta apenas no desktop; até 3/2/1 projetos por linha conforme resolução.
- Tokens tipográficos exclusivos do Hero encapsulados no HomeLayout, com escala nominal mantida e limite de 15vw provisório na implementação.

A inspeção inicial da Fase 2 confirmou a atualização de 26/11/2026 no Design System vigente, corrigindo o registro anterior de atualização pendente. Isso não representa nova validação visual. Preservam-se as decisões aprovadas e a precedência das conciliações das instruções da Fase 2; refinamentos futuros continuam pendentes.

## 10. Próximas etapas

Sequência de trabalho atualizada (marco de 26/11/2026):

1. Infraestrutura, i18n e componentes iniciais: concluídos e validados.
2. Página Sobre: concluída funcionalmente.
3. Estrutura de conteúdo dos projetos: concluída.
4. Listagem de projetos: concluída.
5. Página individual de projeto e ProjectHeader: concluída; EditorialContent implementado.
6. Estrutura de conteúdo dos artigos: concluída e validada.
7. Listagem e páginas individuais de artigos: concluídas e validadas no ciclo de artigos.
8. Home: primeira implementação entregue; galeria validada isoladamente e correções iniciais aplicadas. Refinamento visual e revalidação adiados pelo usuário.
9. Refinamento visual e validação integrada: segundo momento, ainda não iniciado como ciclo completo.

Pendências para o segundo momento:

- Home: revisar escala efetiva do nome, legibilidade, contraste, enquadramento e dimensões da fotografia, espaçamentos do Hero, CTA, sobreposição desktop e transição para tablet/mobile. Validar com zero a três projetos elegíveis e conteúdo nos dois idiomas.
- Demais páginas: substituir conteúdo e assets provisórios; revisar composição tablet, legibilidade com conteúdo real e espaçamentos; adequar proporções e atributos fixos de ProjectCard à decisão de asset único; avaliar lazy loading do primeiro card; resolver divergência de raio do Button; definir estilos editoriais adicionais quando necessários.
- Documentação: manter o Design System atualizado após implementação e validação das decisões visuais pertinentes; a atualização de 26/11 já está presente (seção 9).
- A rota de diagnóstico `/home-gallery-test/` e os conteúdos de teste continuam disponíveis. A eventual retirada faz parte de uma etapa futura.
- Validação integrada final: revisar links, interações, foco e responsividade nas rotas bilíngues.

Masonry permanece para pós-MVP. Versionamento, build/deploy operacional, ambientes, rollback e publicação serão tratados verificando as capacidades reais da hospedagem antes de decidir. Build local validado não implica deploy realizado.

## 11. Regra de continuidade

Manter documentação técnica e Design System em Markdown no repositório. Trabalhar uma atividade por vez: discutir requisitos e alternativas, aprovar decisões, implementar, testar localmente e registrar validação. Não presumir que código sugerido foi salvo nem que funcionalidades não testadas estão prontas. Atualizar os documentos ao concluir etapas ou aprovar mudanças relevantes.
