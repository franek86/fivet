import styled from "styled-components";

const UpgradeSticker = styled.span`
  font-size: 1rem;
  font-weight: 600;
  position: absolute;
  top: -1rem;
  right: -5rem;
  background-color: var(--color-red-700);
  color: var(--color-grey-0);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-lg);
  text-transform: uppercase;
`;

function PremiumSticker({ text = "Premium" }) {
  return <UpgradeSticker>{text}</UpgradeSticker>;
}

export default PremiumSticker;
