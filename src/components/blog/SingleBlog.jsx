import React from "react";
import { Link, useParams } from "react-router";
import DOMPurify from "dompurify";
import styled from "styled-components";

import { useGetBlog } from "../../hooks/useBlog.js";
import Spinner from "../Spinner.jsx";
import BackBtn from "../BackBtn.jsx";

import { customFormatDate } from "../../utils/formatDate.js";

/* -------------------- styles -------------------- */

const Container = styled.article`
  max-width: 780px;
  margin: 0 auto;
  padding: 0 40px 20px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--color-text);
  line-height: 1.7;
`;

const Header = styled.header`
  margin-bottom: 24px;

  .header-top {
    display: flex;
    justify-content: space-between;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 18px;
  color: var(--color-text);
  margin-bottom: 16px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text-muted);
`;

const Author = styled.span``;

const Date = styled.span``;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  background: var(--color-text-muted);
  border-radius: 50%;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 16px;
  margin: 30px 0;
`;

const Content = styled.div`
  font-size: 18px;

  p {
    margin-bottom: 16px;
  }

  h2 {
    margin-top: 32px;
    font-size: 26px;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 20px 0;
  }

  blockquote {
    border-left: 3px solid var(--color-border);
    padding-left: 16px;
    color: var(--color-text-muted);
    font-style: italic;
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 30px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

const ShareSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
`;

const ShareTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: var(--color-accent);
  }
`;

const SingleBlog = () => {
  const { slug } = useParams();

  const { data, isLoading } = useGetBlog(slug);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container>
      <Header>
        <div className='header-top'>
          <BackBtn />
          <Link to={`/blogs/edit/${data.slug}`}>
            <Button>Edit</Button>
          </Link>
        </div>
        <Title>{data.title}</Title>
        <Description>{data.shortDescription}</Description>

        <Meta>
          <Author>By {data.author}</Author>
          <Dot />
          <Date>{customFormatDate(data.createdAt)}</Date>
        </Meta>
      </Header>

      <HeroImage src={data.bannerImage} alt={data.bannerImageAlt} />

      {data?.blocks.map((block) => {
        const sanitizedData = () => ({
          __html: DOMPurify.sanitize(block.text),
        });
        return (
          <Content>
            {(block?.text || block?.text != undefined) && <div key={block.id} dangerouslySetInnerHTML={sanitizedData()} />}
            {block?.imageUrl && <img src={block.imageUrl} alt={block.imageAlt} />}
          </Content>
        );
      })}

      {data.gallery?.length > 0 && (
        <Gallery>
          {post.gallery.map((img, i) => (
            <GalleryImage key={i} src={img} />
          ))}
        </Gallery>
      )}

      <ShareSection>
        <ShareTitle>Share this article</ShareTitle>
        <ShareButtons>
          <Button onClick={() => share("twitter", data)}>Twitter</Button>
          <Button onClick={() => share("facebook", data)}>Facebook</Button>
          <Button onClick={() => copyLink()}>Copy Link</Button>
        </ShareButtons>
      </ShareSection>
    </Container>
  );
};

export default SingleBlog;
