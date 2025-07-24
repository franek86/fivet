import styled from "styled-components";
import { MdOutlineCheck } from "react-icons/md";

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$position ? props.$position : "center")};
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
  position: relative;
`;

const StyleHiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckmark = styled.div`
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--color-silver-700);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const StyledIconCheckmark = styled(MdOutlineCheck)`
  display: ${(props) => (props.$checked ? "block" : "none")};
`;

const StyledCheckboxLabel = styled.label`
  position: absolute;
  left: 3rem;
  font-size: 1.4rem;
`;

function Checkbox({ checked, onChange, label, position }) {
  return (
    <StyledCheckbox onClick={onChange} $position={position}>
      <StyleHiddenCheckbox type='checkbox' $checked={checked} readOnly />
      <StyledCheckmark>
        <StyledIconCheckmark $checked={checked} size={14} />
        {label && <StyledCheckboxLabel>{label}</StyledCheckboxLabel>}
      </StyledCheckmark>
    </StyledCheckbox>
  );
}

export default Checkbox;
