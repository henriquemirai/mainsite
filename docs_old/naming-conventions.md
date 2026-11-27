# Convenções de nomenclatura

Documento normativo do site pessoal Henrique Mirai.

## 1. Regras gerais

- Utilizar `kebab-case` para nomes de arquivos e diretórios.
- Utilizar inglês na arquitetura interna, exceto arquivos de conteúdo identificados por idioma e rotas públicas localizadas.
- Priorizar nomes concisos, precisos e representativos da responsabilidade do arquivo.
- Eliminar sufixos redundantes quando a categoria já estiver estabelecida pelo diretório.
- Evitar distinguir responsabilidades apenas pelo singular ou plural.
- Preservar as convenções obrigatórias do Astro, incluindo `index.astro`, segmentos dinâmicos como `[slug].astro` e `content.config.ts`.
- Utilizar `PascalCase` para identificadores de componentes e layouts no código e `camelCase` para funções e variáveis.
- Preservar o padrão BEM existente nas classes CSS.

## 2. Componentes

| Nome anterior | Nome aprovado |
|---|---|
| `articlepreview.astro` | `article-preview.astro` |
| `button.astro` | `button.astro` |
| `editorialcontent.astro` | `editorial-content.astro` |
| `homeprojectgallery.astro` | `project-gallery.astro` |
| `pageintro.astro` | `page-intro.astro` |
| `projectcard.astro` | `project-card.astro` |
| `projectheader.astro` | `project-header.astro` |
| `sitefooter.astro` | `site-footer.astro` |
| `siteheader.astro` | `site-header.astro` |
| `textlink.astro` | `text-link.astro` |

O prefixo `site-` identifica componentes de escopo global e diferencia, por exemplo, `site-header` de `project-header`.

## 3. Layouts

Não utilizar o sufixo `-layout` nos nomes dos arquivos dentro de `src/layouts/`. Utilizar `index` para layouts de listagem e `detail` para layouts de páginas individuais. Preservar o sufixo `Layout` nos identificadores importados no código.

| Nome anterior | Nome aprovado | Identificador no código |
|---|---|---|
| `aboutlayout.astro` | `about.astro` | `AboutLayout` |
| `articlelayout.astro` | `article-detail.astro` | `ArticleDetailLayout` |
| `articleslayout.astro` | `article-index.astro` | `ArticleIndexLayout` |
| `BaseLayout.astro` | `base.astro` | `BaseLayout` |
| `HomeLayout.astro` | `home.astro` | `HomeLayout` |
| `projectlayout.astro` | `project-detail.astro` | `ProjectDetailLayout` |
| `projectslayout.astro` | `project-index.astro` | `ProjectIndexLayout` |

Exemplo de importação:

```astro
---
import BaseLayout from '../layouts/base.astro';
import ProjectCard from '../components/project-card.astro';
---

<BaseLayout>
  <ProjectCard />
</BaseLayout>
```

## 4. Terminologia interna e pública

A distinção entre `projects` e `works` é intencional.

- Arquitetura interna: `projects`, incluindo `src/content/projects/`, `src/lib/projects.ts` e componentes e layouts relacionados.
- Interface pública em inglês: Works.
- Interface pública em português: Projetos.

| Página | Inglês | Português |
|---|---|---|
| Listagem de projetos | `/works/` | `/br/projetos/` |
| Projeto individual | `/works/[slug]/` | `/br/projetos/[slug]/` |
| Listagem de artigos | `/articles/` | `/br/artigos/` |
| Artigo individual | `/articles/[slug]/` | `/br/artigos/[slug]/` |

Preservar todas as rotas públicas existentes. Não substituir `/works/` por `/projects/`.

## 5. Estrutura de referência

```text
src/
├── components/
│   ├── article-preview.astro
│   ├── button.astro
│   ├── editorial-content.astro
│   ├── page-intro.astro
│   ├── project-card.astro
│   ├── project-gallery.astro
│   ├── project-header.astro
│   ├── site-footer.astro
│   ├── site-header.astro
│   └── text-link.astro
├── content/
│   ├── articles/
│   └── projects/
├── layouts/
│   ├── about.astro
│   ├── article-detail.astro
│   ├── article-index.astro
│   ├── base.astro
│   ├── home.astro
│   ├── project-detail.astro
│   └── project-index.astro
├── lib/
│   ├── articles.ts
│   └── projects.ts
├── pages/
│   ├── articles/
│   ├── br/
│   ├── works/
│   ├── about.astro
│   ├── home-gallery-test.astro
│   └── index.astro
├── styles/
│   └── global.css
└── content.config.ts
```

A árvore representa a estrutura discutida, sem expandir todos os subdiretórios. Não constitui autorização para excluir arquivos adicionais ou temporários.

## 6. Aplicação da convenção ao código existente

A refatoração deve ser exclusivamente organizacional, sem mudanças de design, comportamento, arquitetura ou URLs públicas.

- [ ] Inspecionar a estrutura real do repositório antes de executar as renomeações.
- [ ] Renomear componentes e layouts conforme as tabelas aprovadas.
- [ ] Atualizar imports, identificadores relacionados e demais referências aos arquivos renomeados.
- [ ] Verificar a capitalização exata dos caminhos, considerando o desenvolvimento em Windows e a implantação em ambiente potencialmente sensível a maiúsculas e minúsculas.
- [ ] Preservar rotas, slugs, conteúdo, estilos e funcionalidades existentes.
- [ ] Atualizar a documentação técnica e o Design System para refletir a nomenclatura aprovada.
- [ ] Executar as verificações e o build disponíveis no projeto.
- [ ] Relatar alterações realizadas, resultados das verificações e eventuais impedimentos ou divergências encontrados.

Caso a estrutura real apresente arquivos ou responsabilidades não contemplados neste documento, sinalizar as divergências antes de realizar alterações semânticas ou arquiteturais não aprovadas.
