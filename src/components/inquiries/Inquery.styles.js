import styled, { css } from "styled-components";

const focusRing = css`
  &:focus-visible {
    outline: 1px solid var(--color-border);
    outline-offset: 1px;
  }
`;

const focusRingInset = css`
  &:focus-visible {
    outline: 1px solid var(--color-border);
    outline-offset: -1px;
  }
`;

export const Layout = styled.div`
  display: grid;
  min-height: 0;
  flex: 1;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 360px minmax(0, 1fr);
  }
`;

const panel = css`
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
`;

export const ListPanel = styled.div`
  ${panel}
  min-height: 0;
  display: ${({ $hiddenOnMobile }) => ($hiddenOnMobile ? "none" : "flex")};

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const DetailPanel = styled.div`
  ${panel}
  min-height: 400px;
  display: ${({ $visibleOnMobile }) => ($visibleOnMobile ? "flex" : "none")};

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const ListScroll = styled.div`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
`;

/* -------------------------------------------------------------------------- */
/* Empty / error states                                                       */
/* -------------------------------------------------------------------------- */

export const StateBox = styled.div`
  display: flex;
  flex: ${({ $padding }) => ($padding ? "none" : 1)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ $padding }) => $padding ?? "32px"};
  text-align: center;
`;

export const StateIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 4px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-accent);
`;

export const StateTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
`;

export const StateText = styled.p`
  max-width: 280px;
  margin: 0;
  font-size: 14px;
  color: var(--color-text-muted);
`;

export const OutlineButton = styled.button`
  margin-top: 4px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: var(--color-white);
  padding: 6px 12px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    background: var(--color-bg);
  }
`;

/* -------------------------------------------------------------------------- */
/* List items                                                                 */
/* -------------------------------------------------------------------------- */

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ItemButton = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  gap: 12px;
  border: 0;
  border-bottom: 1px solid var(--color-grey-200);
  background: ${({ $active }) => ($active ? "var(--color-border)" : "transparent")};
  padding: 14px 16px;
  text-align: left;
  color: inherit;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ $active }) => ($active ? "var(--color-border)" : "var(--color-bg)")};
  }
  ${focusRingInset}
`;

export const ActiveBar = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background: var(--color-accent);
`;

export const ItemBody = styled.span`
  display: block;
  min-width: 0;
  flex: 1;
`;

export const ItemTop = styled.span`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

export const ItemName = styled.span`
  font-size: 14px;
  font-weight: ${({ $unread }) => ($unread ? 600 : 500)};
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemTime = styled.time`
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-text-muted);
`;

export const ItemShip = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent);
`;

export const ItemPreview = styled.span`
  display: -webkit-box;
  margin-top: 4px;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-muted);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ItemBadge = styled.span`
  display: inline-block;
  margin-top: 8px;
`;

export const UnreadDot = styled.span`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: var(--color-accent);
`;

export const Avatar = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-accent);
  font-size: ${({ $font }) => $font}px;
  font-weight: 600;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Tabs = styled.div`
  display: inline-flex;
  max-width: 100%;
  gap: 2px;
  align-self: flex-start;
  overflow-x: auto;
  border-radius: var(--border-radius-lg);
  background: var(--color-grey-200);
  padding: 3px;
`;

export const Tab = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: var(--border-radius-md);
  padding: 6px 12px;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s;
  background: ${({ $active }) => ($active ? "var(--color-white)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--color-text)" : "var(--color-text-muted)")};
  box-shadow: ${({ $active }) => ($active ? "var(--shadow-sm)" : "none")};
  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        color: var(--color-text);
      }
    `}
`;

export const TabCount = styled.span`
  min-width: 20px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-text-muted)")};
  padding: 1px 6px;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: var(--color-white);
`;

export const Article = styled.article`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
`;

export const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--color-border);
  padding: 16px;

  @media (min-width: 640px) {
    padding: 16px 24px;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  margin-left: -8px;
  border: 0;
  border-radius: var(--border-radius-md);
  background: transparent;
  padding: 8px;
  color: var(--color-text-muted);
  cursor: pointer;

  &:hover {
    background: var(--color-grey-200);
    color: var(--color-text);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const HeaderText = styled.div`
  min-width: 0;
  flex: 1;
`;

export const SenderName = styled.h2`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--color-text);
`;

export const ReceivedAt = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-muted);
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  padding: 24px 16px;

  @media (min-width: 640px) {
    padding: 24px;
  }
`;

export const VesselCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg);
  padding: 12px;
`;

const vesselMedia = css`
  width: 96px;
  height: 64px;
  flex-shrink: 0;
  border-radius: var(--border-radius-md);
`;

export const VesselImage = styled.img`
  ${vesselMedia}
  object-fit: cover;
`;

export const VesselPlaceholder = styled.span`
  ${vesselMedia}
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-200);
  color: var(--color-text-muted);
`;

export const VesselInfo = styled.div`
  min-width: 0;
`;

export const VesselName = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  color: var(--color-text);
`;

export const VesselPrice = styled.p`
  margin: 2px 0 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
`;

export const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ContactLink = styled.a`
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-white);
  padding: 6px 14px;
  font-size: 14px;
  color: var(--color-text);
  text-decoration: none;
  transition:
    border-color 0.15s,
    color 0.15s;

  svg {
    flex-shrink: 0;
    color: var(--color-text-muted);
  }

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
`;

export const BreakAll = styled.span`
  min-width: 0;
  word-break: break-all;
`;

export const Message = styled.div`
  max-width: 680px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  background: var(--color-bg);
  padding: 16px 18px;
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text);
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
  padding: 16px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
  }
`;

export const Segmented = styled.div`
  display: inline-flex;
  gap: 2px;
  border-radius: var(--border-radius-lg);
  background: var(--color-grey-200);
  padding: 3px;
  font-size: 14px;
`;

export const SegmentButton = styled.button`
  flex: 1;
  border: 0;
  border-radius: var(--border-radius-md);
  padding: 6px 12px;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s;
  background: ${({ $active }) => ($active ? "var(--color-white)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--color-text)" : "var(--color-text-muted)")};
  box-shadow: ${({ $active }) => ($active ? "var(--shadow-sm)" : "none")};

  ${({ $active }) =>
    !$active &&
    css`
      &:hover:not(:disabled) {
        color: var(--color-text);
      }
    `}

  &:disabled {
    cursor: default;
  }
`;

export const ReplyLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--border-radius-md);
  background: var(--color-accent);
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-white);
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: background 0.15s;

  &:hover {
    background: var(--color-accent-600);
  }
`;
