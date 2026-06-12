/**
 * Third-party libraries
 */
import { Link } from "react-router";
import styled from "styled-components";
import { UserRound } from "lucide-react";

/**
 * Features
 */
import { customFormatDate } from "../../utils/formatDate.js";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";

const Box = styled.div`
  display: flex;
  padding: 12px 0;
  gap: 12px;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: 0;
  }
`;

const Image = styled.img`
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-lg);
`;
const BoxContent = styled.div`
  flex: 1;
  min-width: 0;
  a {
    display: block;
    color: var(--color-text);
    &:hover {
      color: var(--color-text-muted);
    }
  }
`;

const Date = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
  font-style: 600;
`;

const ImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-accent);
`;

function LastBlogs({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <section className='card-container'>
      <div className='card-header'>
        <h3>Recent blogs</h3>
      </div>
      {data?.lastFiveBlogs?.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.slug}`}>
            <Box>
              {blog?.bannerImage ? (
                <Image src={blog.bannerImage} alt={blog.bannerImageAlt} />
              ) : (
                <ImagePlaceholder>
                  <UserRound />
                </ImagePlaceholder>
              )}
              <BoxContent>
                <strong>{blog.title}</strong>
                <p>{blog.status}</p>
              </BoxContent>
              <Date> {customFormatDate(blog.createdAt)}</Date>
            </Box>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default LastBlogs;
