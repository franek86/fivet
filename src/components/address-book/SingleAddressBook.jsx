import styled from "styled-components";

import Title from "../ui/Title.jsx";
import Spinner from "../Spinner.jsx";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { useGetAddressBookById } from "../../hooks/useAddressBook.js";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 4rem;
  gap: 3rem;

  @media screen and (min-width: 786px) {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Priority = styled.div`
  background-color: ${({ $props }) => ($props === "REGULAR" ? "#c7d2fe" : "#99f6e4")};
  padding: 0.5rem 0.85rem;
  font-size: 1.2rem;
  border-radius: var(--border-radius-lg);
`;

const StyledItem = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  p {
    color: var(--color-grey-500);
  }
  a {
    color: var(--color-brand-500);
    &:hover {
      color: var(--color-blue-500);
    }
  }
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 1rem;
  background: var(--color-grey-100);
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
  background-color: var(--color-grey-0);
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
        <StyledItem>
          <Title tag='h1'>{fullName}</Title>
          <Priority $props={priority}>{priority}</Priority>
        </StyledItem>
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
        <div>
          <StyledList>
            {email && (
              <StyledItem>
                <p>Email:</p>
                <a href={`mailto:${email}`}>
                  <strong>{email}</strong>
                </a>
              </StyledItem>
            )}
            {phone_number && (
              <StyledItem>
                <p>Phone number:</p>
                <a href={`${phone_number}`}>
                  <strong>{phone_number}</strong>
                </a>
              </StyledItem>
            )}
            {mobile_number && (
              <StyledItem>
                <p>Mobile number:</p>
                <a href={`${mobile_number}`}>
                  <strong>{mobile_number}</strong>
                </a>
              </StyledItem>
            )}
            {country && (
              <StyledItem>
                <p>Country:</p>
                <strong>{country}</strong>
              </StyledItem>
            )}
            {address && (
              <StyledItem>
                <p>Address:</p>
                <strong>{address}</strong>
              </StyledItem>
            )}
            {address_2 && (
              <StyledItem>
                <p>Address 2:</p>
                <strong>{address_2}</strong>
              </StyledItem>
            )}
            {company && (
              <StyledItem>
                <p>Company:</p>
                <strong>{company}</strong>
              </StyledItem>
            )}
            {web_link && (
              <StyledItem>
                <p>Web:</p>
                <a href={web_link}>
                  <strong>{web_link}</strong>
                </a>
              </StyledItem>
            )}
          </StyledList>
        </div>

        {note && (
          <StyledBox>
            <Title tag='h4'>Note</Title>
            {note}
          </StyledBox>
        )}
      </StyledGrid>
    </>
  );
}

export default SingleAddressBook;
