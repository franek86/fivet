import { FieldLabel, FieldLink, FieldValue, FieldWrapper } from "../SingleUserProfile.styles.js";

const SectionUserField = ({ icon: Icon, label, value, href }) => {
  return (
    <FieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>
        {Icon ? <Icon className='size-4 shrink-0 text-accent-600' /> : null}
        {href ? <FieldLink href={href}>{value}</FieldLink> : value}
      </FieldValue>
    </FieldWrapper>
  );
};

export default SectionUserField;
