import {
  getCollection,
  type CollectionEntry,
} from 'astro:content';

type Lang = 'en' | 'pt-BR';

type ArticleEntry = CollectionEntry<'articles'>;

export interface Article {
  id: string;
  slug: string;
  lang: Lang;
  href: string;
  entry: ArticleEntry;
}

interface ArticleYearGroup {
  year: number;
  articles: Article[];
}

function getArticleIdentity(id: string) {
  const [articleId, locale] = id.split('/');

  if (
    !articleId ||
    (locale !== 'en' && locale !== 'pt-br')
  ) {
    throw new Error(
      `Invalid article identity: "${id}"`
    );
  }

  return {
    id: articleId,
    lang: locale === 'pt-br' ? 'pt-BR' : 'en',
  } as const;
}

function getArticleHref(
  lang: Lang,
  slug: string
): string {

  return lang === 'en'
    ? `/articles/${slug}/`
    : `/br/artigos/${slug}/`;
}

function getArticlesIndexHref(
  lang: Lang
): string {

  return lang === 'en'
    ? '/articles/'
    : '/br/artigos/';
}

function validateArticles(
  entries: ArticleEntry[]
): void {

  const slugs = new Set<string>();
  const publicationDates = new Map<string, number>();

  for (const entry of entries) {
    const { id, lang } = getArticleIdentity(entry.id);

    const slugKey = `${lang}/${entry.data.slug}`;

    if (slugs.has(slugKey)) {
      throw new Error(
        `Duplicate article slug: "${entry.data.slug}" (${lang})`
      );
    }

    slugs.add(slugKey);

    const publishedAt = entry.data.publishedAt.getTime();

    if (
      publicationDates.has(id) &&
      publicationDates.get(id) !== publishedAt
    ) {
      throw new Error(
        `Publication date mismatch between translations: "${id}"`
      );
    }

    publicationDates.set(id, publishedAt);
  }
}

export async function getPublishedArticles(
  lang: Lang
): Promise<Article[]> {

  const entries = await getCollection('articles');

  validateArticles(entries);

  return entries
    .filter((entry) => {
      const identity = getArticleIdentity(entry.id);

      return (
        identity.lang === lang &&
        !entry.data.draft
      );
    })
    .map((entry) => {
      const { id } = getArticleIdentity(entry.id);
      const { slug } = entry.data;

      return {
        id,
        slug,
        lang,
        href: getArticleHref(lang, slug),
        entry,
      };
    })
    .sort(
      (a, b) =>
        b.entry.data.publishedAt.getTime() -
        a.entry.data.publishedAt.getTime() ||
        a.entry.data.title.localeCompare(
          b.entry.data.title,
          lang
        ) ||
        a.slug.localeCompare(b.slug)
    );
}

export async function getArticlesByYear(
  lang: Lang
): Promise<ArticleYearGroup[]> {

  const articles = await getPublishedArticles(lang);

  const groups = new Map<number, Article[]>();

  for (const article of articles) {
    const year =
      article.entry.data.publishedAt.getUTCFullYear();

    const group = groups.get(year) ?? [];

    group.push(article);

    groups.set(year, group);
  }

  return Array.from(
    groups,
    ([year, articles]) => ({
      year,
      articles,
    })
  ).sort((a, b) => b.year - a.year);
}

export async function getArticleLanguageLinks(
  article: Article
): Promise<{ en: string; ptBR: string }> {

  const targetLang =
    article.lang === 'en' ? 'pt-BR' : 'en';

  const targetArticles =
    await getPublishedArticles(targetLang);

  const translation = targetArticles.find(
    (target) => target.id === article.id
  );

  const targetHref =
    translation?.href ??
    getArticlesIndexHref(targetLang);

  return article.lang === 'en'
    ? {
        en: article.href,
        ptBR: targetHref,
      }
    : {
        en: targetHref,
        ptBR: article.href,
      };
}