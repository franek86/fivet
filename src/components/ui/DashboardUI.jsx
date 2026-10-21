import { Link } from "react-router";
import styled from "styled-components";

export const ListContainer = styled.section`
  padding: 2rem 0;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
`;

export const ListHeaderTitle = styled.h5`
  font-size: calc(1.5rem + 0.2vw);
  font-weight: 600;
  color: var(--color-text);
  padding: 0 2rem;
  margin-bottom: 0.8rem;
`;

export const ListLink = styled(Link)`
  display: block;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: 0;
  }
  &:nth-child(odd) {
    background-color: var(--color-bg);
  }
`;

export const ListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  gap: 12px;
`;

export const ListThumbnail = styled.img`
  .thumb {
    display: none;
    width: 44px;
    height: 44px;
    border-radius: var(--border-radius-lg);

    @media screen and (min-width: 640px) {
      display: block;
    }
  }
`;

export const ListTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListLeftContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ListRightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 13px;
`;

export const ImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-bg);
`;

export const ListViews = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Pill = styled.div`
  width: max-content;
  padding: 5px 9px;
  border-radius: var(--border-radius-sm);
  font-size: 11px;
  background-color: ${({ $status }) =>
    ["DRAFT", "REJECTED", "CANCELLED", "FAILED", "ARCHIVE", "BROKER"].includes($status)
      ? "var(--color-danger)"
      : ["OWNER"].includes($status)
        ? "var(--color-warning)"
        : "var(--color-success)"};
`;

export const ListContentLabel = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
`;
