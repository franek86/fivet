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

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const StyledGrid = styled.div`
  display: grid;
  gap: 3rem;
  padding: 20px;

  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Priority = styled.div`
  background-color: ${({ $props }) => ($props === "REGULAR" ? "var(--color-accent-600)" : "var(--color-success)")};
  color: ${({ $props }) => ($props === "REGULAR" ? "var(--color-text)" : "var(--color-white)")};
  padding: 0.5rem 0.85rem;
  font-size: 12px;
  border-radius: var(--border-radius-md);
`;

const StyledItem = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  p {
    color: var(--color-text-muted);
  }
  a {
    color: var(--color-text);
    &:hover {
      color: var(--color-text-muted);
    }
  }
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 1rem;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-sizing: border-box;
  padding: 0.8rem 1.25rem;
`;

const StyledIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-md);
`;

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
    <>
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
    </>
  );
}

export default SingleAddressBook;
