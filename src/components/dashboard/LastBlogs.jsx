/**
 * Third-party libraries
 */
import styled from "styled-components";
import { Eye } from "lucide-react";

/**
 * Features
 */
import { customFormatDate } from "../../utils/formatDate.js";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import {
  ListHeaderTitle,
  ListContainer,
  ListLeftContent,
  ListLink,
  ListRightContent,
  ListRow,
  ListTitle,
  ListViews,
  Pill,
} from "../ui/DashboardUI.jsx";

function LastBlogs({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  return (
    <ListContainer>
      <ListHeaderTitle>Recent blogs</ListHeaderTitle>

      {data?.map((blog) => (
        <ListLink to={`/admin/blogs/${blog.slug}`}>
          <ListRow key={blog.id}>
            <ListLeftContent>
              <ListTitle>{blog.title}</ListTitle>
              <Pill $status={blog.status}>{blog.status}</Pill>
            </ListLeftContent>
            <ListRightContent>
              <Date> {customFormatDate(blog.createdAt)}</Date>
              <ListViews>
                <Eye size={14} />
                {blog.views}
              </ListViews>
            </ListRightContent>
          </ListRow>
        </ListLink>
      ))}
    </ListContainer>
  );
}

export default LastBlogs;

const Date = styled.span`
  font-size: 1.2rem;
  color: var(--color-text-muted);
`;
