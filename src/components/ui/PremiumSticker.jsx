import styled from "styled-components";

const UpgradeSticker = styled.span`
  font-size: 1rem;
  font-weight: 600;
  position: absolute;
  top: -1rem;
  right: 0;
  background-color: var(--color-green-700);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-lg);
  text-transform: uppercase;
`;

function PremiumSticker({ text = "Premium" }) {
  return <UpgradeSticker>{text}</UpgradeSticker>;
}

export default PremiumSticker;
