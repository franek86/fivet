/**
 * React & Hooks
 */
import { Link } from "react-router";

/**
 * Third-party libraries
 */
import { UserRound } from "lucide-react";

/**
 * Features
 */
import { customFormatDate } from "../../utils/formatDate.js";

/**
 * UI Components
 */
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import {
  ImagePlaceholder,
  ListContainer,
  ListHeaderTitle,
  ListRow,
  ListThumbnail,
  ListContentLabel,
  ListRightContent,
  ListLeftContent,
  ListTitle,
  Pill,
} from "../ui/DashboardUI.jsx";

function LastUsers({ data, isLoading }) {
  if (isLoading) {
    return <TablePlaceholder count={5} />;
  }

  console.log(data);

  return (
    <ListContainer>
      <ListHeaderTitle>Recent users</ListHeaderTitle>

      {data?.map((user) => (
        <ListRow key={user.id}>
          {user?.avatar ? (
            <ListThumbnail src={user.avatar} alt={user.fullName} />
          ) : (
            <ImagePlaceholder>
              <UserRound />
            </ImagePlaceholder>
          )}
          <ListLeftContent>
            <ListTitle>{user.fullName}</ListTitle>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </ListLeftContent>
          <ListRightContent>
            <ListContentLabel>{customFormatDate(user.createdAt)}</ListContentLabel>
            <ListContentLabel>
              Role: <Pill $status={user.role}>{user.role}</Pill>
            </ListContentLabel>
          </ListRightContent>
        </ListRow>
      ))}
    </ListContainer>
  );
}

export default LastUsers;
