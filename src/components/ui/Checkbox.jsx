import styled from "styled-components";
import { MdOutlineCheck } from "react-icons/md";

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
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

function Checkbox({ checked, onChange }) {
  return (
    <StyledCheckbox onClick={onChange}>
      <StyleHiddenCheckbox type='checkbox' $checked={checked} readOnly />
      <StyledCheckmark>
        <StyledIconCheckmark $checked={checked} size={14} />
      </StyledCheckmark>
    </StyledCheckbox>
  );
}

export default Checkbox;
