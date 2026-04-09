import styled from "styled-components";

const StyledToggle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${({ $pressed }) => ($pressed ? "red" : "transparent")};
  color: ${({ $pressed }) => ($pressed ? "#0f172a" : "#64748b")};
  transition: all 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  &.is-active {
    color: var(--color-grey-0);
    background-color: var(--color-brand-500);
  }
`;

const ToggleMenuEditorIcon = ({ pressed, onPressedChange, children }) => {
  return (
    <StyledToggle $pressed={pressed} onClick={onPressedChange}>
      {children}
    </StyledToggle>
  );
};

export default ToggleMenuEditorIcon;
