import { SectionBody, SectionHeader, SectionSubtitle, SectionTitle, SectionWrapper } from "../SingleUserProfile.styles.js";

const SectionUserProfile = ({ title, subtitle, action, children }) => {
  return (
    <SectionWrapper>
      <SectionHeader>
        <div>
          <SectionTitle>{title}</SectionTitle>
          {subtitle ? <SectionSubtitle>{subtitle}</SectionSubtitle> : null}
        </div>
        {action}
      </SectionHeader>
      <SectionBody>{children}</SectionBody>
    </SectionWrapper>
  );
};

export default SectionUserProfile;
