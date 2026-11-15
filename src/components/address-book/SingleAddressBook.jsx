/**
 * Third-party libraries
 */
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

/**
 * Custom Hooks
 */
import { useGetAddressBookById } from "../../hooks/useAddressBook.js";

/**
 * UI Components
 */
import Spinner from "../Spinner.jsx";
import { Building2, Earth, Globe2Icon, Mail, MapPinCheck, Phone } from "lucide-react";

function SingleAddressBook({ id }) {
  const { data, isError, isPending } = useGetAddressBookById(id);

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  const {
    fullName,
    email,
    phone_number,
    country,
    address,
    company,
    linkedin_link,
    facebook_link,
    instagram_link,
    note,
    web_link,
    priority,
  } = data;

  return (
    <>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <DrawerBody>
          <Profile>
            <LargeAvatar>TM</LargeAvatar>

            <ProfileName>{fullName}</ProfileName>

            <ProfileCompany>{company}</ProfileCompany>
          </Profile>

          <Section>
            <SectionTitle>Contact information</SectionTitle>

            <InfoItem>
              <InfoIcon>
                <Mail size={17} />
              </InfoIcon>

              <div>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>
                  <a href={`mailto:${email}`}>{email}</a>
                </InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <Phone size={17} />
              </InfoIcon>

              <div>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>
                  <a href={`tel:${email}`}>{phone_number}</a>
                </InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <Building2 size={17} />
              </InfoIcon>

              <div>
                <InfoLabel>Company</InfoLabel>
                <InfoValue>{company}</InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <MapPinCheck size={17} />
              </InfoIcon>

              <div>
                <InfoLabel>Address</InfoLabel>
                <InfoValue>{address}</InfoValue>
              </div>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <Globe2Icon size={17} />
              </InfoIcon>

              <div>
                <InfoLabel>Country</InfoLabel>
                <InfoValue>{country}</InfoValue>
              </div>
            </InfoItem>
          </Section>

          <Section>
            <SectionTitle>Social profiles</SectionTitle>

            {linkedin_link && (
              <SocialLink>
                <FaLinkedinIn size={17} />
                {linkedin_link}
              </SocialLink>
            )}

            {instagram_link && (
              <SocialLink>
                <FaInstagram size={17} />
                {instagram_link}
              </SocialLink>
            )}

            {facebook_link && (
              <SocialLink>
                <FaFacebookF size={17} />
                {facebook_link}
              </SocialLink>
            )}

            {web_link && (
              <SocialLink>
                <Earth size={17} />
                {web_link}
              </SocialLink>
            )}
          </Section>

          <Section>
            <SectionTitle>Contact details</SectionTitle>

            <Tags>
              <TypeBadge $type='BROKER'>BROKER</TypeBadge>

              <PriorityBadge $priority={priority}>
                <PriorityDot $priority={priority} />
                {priority}
              </PriorityBadge>
            </Tags>
            {note && <StyledBox>{note}</StyledBox>}
          </Section>
        </DrawerBody>
      </Drawer>
    </>
  );
}

export default SingleAddressBook;

const StyledBox = styled.div`
  margin-top: 20px;
  padding: 16px 18px;
  background: var(--color-background-muted);
  color: var(--color-text);
  font-size: 13px;
  line-height: 1.6;
`;

const Drawer = styled.aside`
  max-width: 100%;
  height: 100vh;
`;

const DrawerBody = styled.div`
  padding: 28px 24px;
`;

const Profile = styled.div`
  text-align: center;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--color-border);
`;

const LargeAvatar = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e7f0f8;
  color: var(--color-accent);

  font-size: 20px;
  font-weight: 700;
`;

const ProfileName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
`;

const ProfileCompany = styled.div`
  margin-top: 5px;
  color: var(--color-text-muted);
  font-size: 13px;
`;

const Section = styled.section`
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px;

  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  color: var(--color-text-muted);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 34px;
  height: 34px;

  border-radius: 7px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-grey-200);
  color: var(--color-accent);
`;

const InfoLabel = styled.div`
  color: var(--color-text-muted);
  font-size: 11px;
`;

const InfoValue = styled.div`
  margin-top: 2px;
  color: var(--color-text);
  font-size: 13px;
  font-weight: 500;
`;

const SocialLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 9px 0;

  color: var(--color-accent);
  font-size: 13px;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const PriorityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 6px;

  background: ${({ $priority }) => {
    if ($priority === "IMPORTANT") return "var(--color-danger)";
    if ($priority === "REGULAR") return "var(--color-warning)";
    return "var(--color-success)";
  }};

  color: ${({ $priority }) => {
    if ($priority === "IMPORTANT") return "var(--color-danger-600)";
    if ($priority === "REGULAR") return "var(--color-warning-600)";
    return "var(--color-success-600)";
  }};

  font-size: 10px;
  font-weight: 700;
`;

const PriorityDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $priority }) => {
    if ($priority === "IMPORTANT") return "var(--color-danger-600)";
    if ($priority === "REGULAR") return "var(--color-warning-600)";
    return "var(--color-success-600)";
  }};
`;

const TypeBadge = styled.span`
  display: inline-flex;
  padding: 5px 9px;
  border-radius: 6px;
  background: ${({ $type }) => {
    if ($type === "BROKER") return "#e7f0f8";
    if ($type === "DEALER") return "#edf4f1";
    if ($type === "MARINA") return "#eef3f8";
    return "#f0f1f3";
  }};
  color: ${({ $type }) => {
    if ($type === "BROKER") return "var(--color-accent)";
    if ($type === "DEALER") return "var(--color-success-600)";
    if ($type === "MARINA") return "#386581";
    return "var(--color-text-muted)";
  }};
  font-size: 10px;
  font-weight: 700;
`;
