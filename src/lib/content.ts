import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface Post {
  slug: string;
  title: string;
  meta_title?: string;
  description?: string;
  date?: string;
  image?: string;
  image_alt?: string;
  authors: string[];
  tags: string[];
  draft?: boolean;
  content: string;
}

export interface Author {
  slug: string;
  title: string;
  meta_title?: string;
  image?: string;
  description?: string;
  social?: {
    facebook?: string;
    x?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    youtube?: string;
  };
  content: string;
}

export interface PageContent {
  title: string;
  meta_title?: string;
  description?: string;
  image?: string;
  content: string;
  [key: string]: any;
}

export async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .filter((fileName) => !fileName.startsWith("-")) // Ignore -index.md
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        meta_title: data.meta_title,
        description: data.description,
        date: data.date ? new Date(data.date).toISOString() : undefined,
        image: data.image,
        image_alt: data.image_alt,
        authors: data.authors || ["Admin"],
        tags: data.tags || ["others"],
        draft: data.draft,
      } as Post;
    });

  return allPostsData
    .filter((post) => !post.draft)
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const postsDirectory = path.join(contentDirectory, "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const filePathMdx = path.join(postsDirectory, `${slug}.mdx`);

  let fullPath = filePath;
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePathMdx)) {
      fullPath = filePathMdx;
    } else {
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    meta_title: data.meta_title,
    description: data.description,
    date: data.date ? new Date(data.date).toISOString() : undefined,
    image: data.image,
    image_alt: data.image_alt,
    authors: data.authors || ["Admin"],
    tags: data.tags || ["others"],
    draft: data.draft,
  } as Post;
}

export async function getAuthors(): Promise<Author[]> {
  const authorsDirectory = path.join(contentDirectory, "authors");
  if (!fs.existsSync(authorsDirectory)) return [];
  const fileNames = fs.readdirSync(authorsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(authorsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        meta_title: data.meta_title,
        image: data.image,
        description: data.description,
        social: data.social,
      } as Author;
    });
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAuthors();
  const slugified = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

  return (
    authors.find(
      (a) =>
        a.slug.toLowerCase() === slug.toLowerCase() ||
        slugified(a.title) === slug.toLowerCase()
    ) || null
  );
}

export async function getPage(slug: string): Promise<PageContent | null> {
  const filePath = path.join(contentDirectory, slug, "-index.md");
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    title: data.title,
    content,
  } as PageContent;
}
