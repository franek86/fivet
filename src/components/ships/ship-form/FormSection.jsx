import { ChevronDownIcon } from "lucide-react";
import styled from "styled-components";

const FormSection = ({ id, title, description, open, onToggle, completed, children }) => {
  return (
    <Section id={id}>
      <SectionHeader type='button' onClick={onToggle} aria-expanded={open}>
        <SectionHeaderLeft>
          <SectionIcon> {completed ? "✓" : "•"} </SectionIcon>
          <SectionHeaderContent>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription> {description} </SectionDescription>
          </SectionHeaderContent>
        </SectionHeaderLeft>
        <Chevron $open={open}>
          <ChevronDownIcon size={20} />
        </Chevron>
      </SectionHeader>
      {open && <SectionBody>{children}</SectionBody>}
    </Section>
  );
};

export default FormSection;

const Section = styled.section`
  scroll-margin-top: 24px;
  margin-bottom: 14px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  //overflow: hidden;
`;
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 22px;
  border: 0;
  background: var(--color-white);
  cursor: pointer;
  text-align: left;
  &:hover {
    background: var(--color-border);
  }
  &:focus {
    outline: none;
  }
`;
const SectionHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const SectionHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const SectionIcon = styled.div`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 700;
`;
const SectionTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
`;
const SectionDescription = styled.div`
  margin-top: 3px;
  color: var(--color-text);
  font-size: 12px;
`;
const Chevron = styled.div`
  color: var(--color-text);
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
`;
const SectionBody = styled.div`
  padding: 0 22px 24px;
  border-top: 1px solid var(--color-bg);
`;
