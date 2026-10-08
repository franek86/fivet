/**
 * Third-party libraries
 */
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";

/**
 * Custom Hooks
 */
import { useGetAddressBookById } from "../../hooks/useAddressBook.js";

/**
 * UI Components
 */
import Title from "../ui/Title.jsx";
import Spinner from "../Spinner.jsx";
import { AppWindow, Building2, Earth, Mail, MapPinCheck, Phone } from "lucide-react";

function SingleAddressBook({ id }) {
  const { data, isError, isPending } = useGetAddressBookById(id);

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  const {
    fullName,
    email,
    phone_number,
    mobile_number,
    country,
    address,
    address_2,
    company,
    linkedin_link,
    facebook_link,
    instagram_link,
    tiktok_link,
    note,
    web_link,
    priority,
  } = data;
  //const [noteValue, setNoteValue] = useState(note || "");

  return (
    <StyledModalContent>
      <FlexWrap>
        <div>
          <Priority $props={priority}>{priority}</Priority>
          <Title tag='h2'>{fullName}</Title>
          <div>
            {email && (
              <StyledItem>
                <Mail />
                <a href={`mailto:${email}`}>
                  <strong>{email}</strong>
                </a>
              </StyledItem>
            )}
          </div>
        </div>

        <StyledIcons>
          {linkedin_link && (
            <StyledIconLink href={linkedin_link}>
              <FaLinkedinIn size={20} />
            </StyledIconLink>
          )}

          {facebook_link && (
            <StyledIconLink href={facebook_link}>
              <FaFacebookF size={18} />
            </StyledIconLink>
          )}
          {instagram_link && (
            <StyledIconLink href={instagram_link}>
              <FaInstagram size={20} />
            </StyledIconLink>
          )}
          {tiktok_link && (
            <StyledIconLink href={tiktok_link}>
              <FaTiktok size={18} />
            </StyledIconLink>
          )}
        </StyledIcons>
      </FlexWrap>

      <StyledGrid>
        <StyledList>
          {phone_number && (
            <StyledItem>
              <Phone />
              <a href={`${phone_number}`}>
                <strong>{phone_number}</strong>
              </a>
            </StyledItem>
          )}
          {mobile_number && (
            <StyledItem>
              <Phone />
              <a href={`${mobile_number}`}>
                <strong>{mobile_number}</strong>
              </a>
            </StyledItem>
          )}
          {country && (
            <StyledItem>
              <Earth />
              <strong>{country}</strong>
            </StyledItem>
          )}
          {address && (
            <StyledItem>
              <MapPinCheck />
              <strong>{address}</strong>
            </StyledItem>
          )}
        </StyledList>

        <StyledList>
          {address_2 && (
            <StyledItem>
              <MapPinCheck />
              <strong>{address_2}</strong>
            </StyledItem>
          )}
          {company && (
            <StyledItem>
              <Building2 />
              <strong>{company}</strong>
            </StyledItem>
          )}
          {web_link && (
            <StyledItem>
              <AppWindow />
              <a href={web_link}>
                <strong>{web_link}</strong>
              </a>
            </StyledItem>
          )}
          {note && (
            <StyledBox>
              <Title tag='h4'>Note</Title>
              {note}
            </StyledBox>
          )}
        </StyledList>
      </StyledGrid>
    </StyledModalContent>
  );
}

export default SingleAddressBook;

const StyledModalContent = styled.div`
  width: 100%;
  padding: 28px 30px 30px;
  background: var(--color-background);
  color: var(--color-text);

  @media screen and (max-width: 640px) {
    padding: 22px 18px 24px;
  }
`;

/* =========================================================
   Header
========================================================= */

const FlexWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);

  > div:first-child {
    min-width: 0;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Priority = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 9px;
  padding: 5px 9px;
  border-radius: 999px;

  font-size: 11px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: ${({ $props }) => {
    switch ($props?.toLowerCase()) {
      case "important":
        return "var(--color-success)";
      case "regular":
        return "var(--color-white)";

      default:
        return "var(--color-text-muted)";
    }
  }};

  background: ${({ $props }) => {
    switch ($props?.toLowerCase()) {
      case "important":
        return "var(--color-success-600)";
      case "regular":
        return "var(--color-accent-600)";

      default:
        return "var(--color-background-muted)";
    }
  }};
`;

/* =========================================================
   Social links
========================================================= */

const StyledIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const StyledIconLink = styled.a`
  width: 38px;
  height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--color-border);
  border-radius: 9px;

  color: var(--color-text-muted);
  background: var(--color-background);

  transition:
    color 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    color: var(--color-primary);
    background: var(--color-background-muted);
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  @media screen and (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

/* =========================================================
   Main information
========================================================= */

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;

  padding-top: 26px;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

/* =========================================================
   Individual information row
========================================================= */

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  min-height: 52px;
  padding: 10px 0;

  border-bottom: 1px solid var(--color-border);

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--color-text-muted);
    stroke-width: 1.8;
  }

  strong {
    display: block;
    min-width: 0;

    color: var(--color-text);
    font-size: 14px;
    line-height: 1.4;
    font-weight: 600;

    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  a {
    min-width: 0;
    color: inherit;
    text-decoration: none;

    &:hover strong {
      color: var(--color-primary);
    }
  }

  &:first-child {
    padding-top: 0;
  }

  @media screen and (max-width: 700px) {
    min-height: 50px;
  }
`;

/* =========================================================
   Note
========================================================= */

const StyledBox = styled.div`
  margin-top: 20px;
  padding: 16px 18px;

  border: 1px solid var(--color-border);
  border-radius: 11px;

  background: var(--color-background-muted);

  color: var(--color-text);
  font-size: 13px;
  line-height: 1.6;
`;
