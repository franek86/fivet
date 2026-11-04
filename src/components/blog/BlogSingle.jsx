import { useRef } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router";

import Spinner from "../Spinner.jsx";
import Title from "../ui/Title.jsx";

import { useGetBlog } from "../../hooks/useBlog.js";

import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";

const formatDate = (iso) => new Intl.DateTimeFormat("en-EN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

const estimateReadingTime = (content) => Math.max(1, Math.round(content?.trim().split(/\s+/).length / 200));

const BlogSingle = () => {
  const { slug } = useParams();
  const articleRef = useRef(null);

  const { data: blog, isLoading } = useGetBlog(slug);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(blog.content),
  });

  if (isLoading) {
    return (
      <Page>
        <Wrap>
          <Spinner />
        </Wrap>
      </Page>
    );
  }

  const published = blog.publishedAt ?? blog.createdAt;
  const readingTime = blog.readingTime ?? estimateReadingTime(blog.content);
  const authorName = blog.author?.trim();
  const gallery = [...blog.gallery].sort((a, b) => a.order - b.order);

  return (
    <Page>
      <Wrap as='article' ref={articleRef}>
        <div>
          <BackLink as={Link} to='/admin/blogs'>
            ← All blogs
          </BackLink>

          {blog.category && (
            <div>
              <CategoryPill as={Link} to={`/blog?category=${blog.category.slug ?? blog.category.id}`}>
                {blog.category.title}
              </CategoryPill>
            </div>
          )}

          <Title tag='h1'>{blog.title}</Title>
          {blog.subTitle && <Title tag='h2'>{blog.subTitle}</Title>}

          <Meta>
            {authorName && (
              <Author>
                <Avatar aria-hidden='true'>{authorName.charAt(0).toUpperCase()}</Avatar>
                <MetaText>
                  <strong>{authorName}</strong>
                  <span>Author</span>
                </MetaText>
              </Author>
            )}
            <MetaItem>
              <span>Published</span>
              <strong>
                <time dateTime={published}>{formatDate(published)}</time>
              </strong>
            </MetaItem>
            <MetaItem>
              <span>Reading</span>
              <strong>{readingTime} min</strong>
            </MetaItem>
            {typeof blog.views === "number" && (
              <MetaItem>
                <span>Views</span>
                <strong>{blog.views.toLocaleString("en-EN")}</strong>
              </MetaItem>
            )}
          </Meta>
        </div>

        {blog.bannerImage && (
          <Banner>
            <img src={blog.bannerImage} alt={blog.bannerImageAlt ?? blog.title} />
          </Banner>
        )}

        <div>
          <Prose>
            <ReactMarkdown
              components={{
                a: ({ href, children }) =>
                  href?.startsWith("http") ? (
                    <a href={href} target='_blank' rel='noopener noreferrer'>
                      {children}
                    </a>
                  ) : (
                    <a href={href}>{children}</a>
                  ),
                img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading='lazy' />,
              }}
            >
              {blog.content}
            </ReactMarkdown>
            <div className='text-test-frane' dangerouslySetInnerHTML={sanitizedData()} />
          </Prose>

          {blog.tags.length > 0 && (
            <TagRow aria-label='Tags'>
              {blog.tags.map((tag) => (
                <Tag key={tag} as={Link} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                  {tag}
                </Tag>
              ))}
            </TagRow>
          )}
        </div>

        {gallery.length > 0 && (
          <GallerySection aria-labelledby='gallery-heading'>
            <SectionHeading id='gallery-heading'>Gallery</SectionHeading>
            <GalleryGrid>
              {gallery.map((image) => (
                <li key={image.id}>
                  <GalleryImage src={image.url} alt={image.alt ?? ""} loading='lazy' />
                </li>
              ))}
            </GalleryGrid>
          </GallerySection>
        )}
      </Wrap>
    </Page>
  );
};

export default BlogSingle;

export const t = {
  bg: "#FFFFFF",
  wash: "#F5F8FA",
  line: "#E3E9EF",
  lineStrong: "#CCD6DF",
  ink: "#16212C",
  body: "#273544",
  muted: "#5F7083",
  faint: "#93A1B0",
  accent: "#0F766E",
  accentHover: "#0B5F59",
  accentTint: "#E3F2EF",
  accentRing: "rgba(15, 118, 110, 0.16)",
};

/* ---------- Page ---------- */

export const Page = styled.div`
  min-height: 100vh;
  padding: 3rem;
  background-color: var(--color-white);
  color: var(--color-text);

  @media (max-width: 640px) {
    padding: 2.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: var(--color-text);
  line-height: 1.7;

  @media screen and (min-width: 640px) {
    padding: 0 40px 20px;
  }
`;

/* ---------- Header ---------- */

export const BackLink = styled.a`
  display: inline-block;
  margin-bottom: 28px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;

  &:hover {
    color: var(--color-accent);
  }
  &:focus-visible {
    outline: 1px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

export const CategoryPill = styled.a`
  display: inline-block;
  margin-bottom: 18px;
  padding: 5px 12px;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-accent);
  background: var(--color-border);
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.15s ease;

  &:hover {
    color: var(--color-grey-200);
    background: var(--color-accent);
  }
  &:focus-visible {
    outline: 1px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 28px;
  margin-top: 30px;
  padding: 18px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.span`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-accent);
  background: var(--color-border);
  border-radius: 50%;
`;

export const MetaText = styled.div`
  display: grid;
  line-height: 1.3;

  strong {
    font-size: 1.4rem;
    font-weight: 700;
  }
  span {
    font-size: 1.3rem;
    color: var(--color-text-muted);
  }
`;

export const MetaItem = styled.div`
  display: grid;
  line-height: 1.3;

  span {
    font-size: 1.2rem;
    color: var(--color-text-muted);
  }
  strong {
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

/* ---------- Banner ---------- */

export const Banner = styled.figure`
  margin: 44px 0 0;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 8.5;
    object-fit: cover;
    background: var(--color-white);
    border-radius: 20px;
  }

  @media (max-width: 640px) {
    margin-top: 28px;

    img {
      aspect-ratio: 4 / 3;
      border-radius: 14px;
    }
  }
`;

/* ---------- Article body ---------- */

export const Prose = styled.div`
  margin-top: 52px;
  font-size: 19px;
  line-height: 1.78;
  color: var(--color-text);
  overflow-wrap: anywhere;

  @media (max-width: 640px) {
    margin-top: 36px;
    font-size: 1.7rem;
  }

  > *:first-child {
    margin-top: 0;
  }

  p {
    margin: 0 0 1.35em;
  }

  h2,
  h3,
  h4 {
    color: var(--color-text);
    line-height: 1.2;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }
  h2 {
    margin: 2.2em 0 0.6em;
    font-size: 30px;
    font-weight: 800;
  }
  h3 {
    margin: 1.9em 0 0.5em;
    font-size: 23px;
    font-weight: 700;
  }
  h4 {
    margin: 1.6em 0 0.4em;
    font-size: 19px;
    font-weight: 700;
  }

  a {
    color: var(--color-accent);
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 3px;
  }
  a:hover {
    color: var(--color-text);
  }

  ul,
  ol {
    margin: 0 0 1.35em;
    padding-left: 1.4em;
  }
  li {
    margin-bottom: 0.4em;
    padding-left: 0.2em;
  }
  li::marker {
    color: var(--color-accent);
  }

  blockquote {
    margin: 2em 0;
    padding: 4px 0 4px 22px;
    font-size: 1.12em;
    font-style: italic;
    color: var(--color-text-muted);
    border-left: 1px solid var(--color-accent);
  }
  blockquote p:last-child {
    margin-bottom: 0;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 2em auto;
    border-radius: 14px;
  }

  hr {
    margin: 2.6em 0;
    border: 0;
    border-top: 1px solid var(--color-border);
  }

  code {
    padding: 2px 6px;
    font-size: 0.82em;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 6px;
  }
  pre {
    margin: 1.8em 0;
    padding: 18px 20px;
    overflow-x: auto;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 12px;
  }
  pre code {
    padding: 0;
    font-size: 0.78em;
    line-height: 1.7;
    background: none;
    border: 0;
  }

  table {
    display: block;
    width: 100%;
    margin: 1.8em 0;
    overflow-x: auto;
    border-collapse: collapse;
    font-size: 15px;
  }
  th,
  td {
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }
  th {
    font-weight: 700;
    background: var(--color-white);
  }
`;

/* ---------- Tags ---------- */

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid var(--color-border);
`;

export const Tag = styled.a`
  padding: 6px 13px;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-success);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  text-decoration: none;
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: var(--color-white);
    background: var(--color-accent);
    border-color: transparent;
  }
  &:focus-visible {
    outline: 1px solid var(--color-success);
    outline-offset: 2px;
  }
`;

/* ---------- Gallery ---------- */

export const GallerySection = styled.section`
  margin-top: 72px;
`;

export const SectionHeading = styled.h2`
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const GalleryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

export const StateBox = styled.div`
  max-width: 480px;
  margin: 12vh auto 0;
  text-align: center;

  h1 {
    margin: 0 0 10px;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  p {
    margin: 0 0 22px;
    color: var(--color-text-muted);
  }
`;

export const ActionLink = styled.a`
  display: inline-block;
  padding: 11px 20px;
  font-weight: 700;
  color: var(--color-white);
  background: var(--color-accent);
  border-radius: 12px;
  text-decoration: none;

  &:hover {
    background: var(--color-border);
  }
  &:focus-visible {
    outline: 1px solid var(--color-border);
    outline-offset: 2px;
  }
`;
