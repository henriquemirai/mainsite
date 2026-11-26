import {
  getCollection,
  type CollectionEntry,
} from 'astro:content';

type Lang = 'en' | 'pt-BR';

type ProjectEntry = CollectionEntry<'projects'>;

interface Project {
  slug: string;
  lang: Lang;
  href: string;
  entry: ProjectEntry;
}

function getProjectIdentity(id: string) {
  const [slug, locale] = id.split('/');

  return {
    slug,
    lang: locale === 'pt-br' ? 'pt-BR' : 'en',
  } as const;
}

export async function getPublishedProjects(
  lang: Lang
): Promise<Project[]> {

  const entries = await getCollection('projects');

  const publishedEntries = entries.filter(
    (entry) => !entry.data.draft
  );

  const publishedIds = new Set(
    publishedEntries.map((entry) => entry.id)
  );

  return publishedEntries
    .filter((entry) => {
      const identity = getProjectIdentity(entry.id);

      if (identity.lang !== lang) {
        return false;
      }

      const translationId =
        lang === 'en'
          ? `${identity.slug}/pt-br`
          : `${identity.slug}/en`;

      return publishedIds.has(translationId);
    })
    .map((entry) => {
      const { slug } = getProjectIdentity(entry.id);

      const href =
        lang === 'en'
          ? `/works/${slug}/`
          : `/br/projetos/${slug}/`;

      return {
        slug,
        lang,
        href,
        entry,
      };
    })
    .sort(
      (a, b) =>
        a.entry.data.order - b.entry.data.order ||
        a.slug.localeCompare(b.slug)
    );
}

export async function getHomeProjects(
  lang: Lang
): Promise<Project[]> {

  const projects = await getPublishedProjects(lang);

  return projects
    .filter((project) => project.entry.data.showOnHome)
    .slice(0, 3);
}