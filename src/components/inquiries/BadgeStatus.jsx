import styled, { css } from "styled-components";

export const STATUS_LABELS = {
  OPEN: "Open",
  RESPONDED: "Responded",
  CLOSED: "Closed",
};

function BadgeStatus({ status }) {
  if (!status || !(status in STATUS_LABELS)) return null;
  return <Badge $status={status}>{STATUS_LABELS[status]}</Badge>;
}

export default BadgeStatus;

const BADGE_VARIANTS = {
  OPEN: css`
    background: var(--color-white);
    color: var(--color-accent);
    box-shadow: var(--shadow-md);
  `,
  RESPONDED: css`
    background: var(--color-success);
    color: var(--color-success-600);
    box-shadow: var(--shadow-md);
  `,
  CLOSED: css`
    background: var(--color-grey-200);
    color: var(--color-text-muted);
    box-shadow: inset 0 0 0 1px var(--color-border);
  `,
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  ${({ $status }) => BADGE_VARIANTS[$status]};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;
