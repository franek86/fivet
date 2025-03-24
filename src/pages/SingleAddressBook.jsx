import { useParams } from "react-router";
import { useState } from "react";

import Title from "../components/ui/Title.jsx";
import Spinner from "../components/Spinner.jsx";
import BackBtn from "../components/BAckBtn.jsx";

import ReactQuill from "react-quill";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import styled from "styled-components";

import { useGetAddressBookById } from "../hooks/useAddressBook.js";

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

const StyledItem = styled.div`
  font-size: 1.8rem;
  display: flex;
  gap: 10px;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 0.5rem 0.8rem;

  a {
    color: var(--color-blue-700);
    &:hover {
      color: var(--color-blue-500);
    }
  }
`;

const StyledIcons = styled.div`
  display: flex;
  margin-top: 3rem;
  gap: 1rem;
`;

const StyledIconLink = styled.a`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
`;

const StyledBox = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-md);
  padding: 2rem;
`;

function SingleAddressBook() {
  const { id } = useParams();
  const { data, isError, isPending } = useGetAddressBookById(id);

  if (isPending) return <Spinner />;
  if (isError) return <div>Error</div>;

  const {
    full_name,
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
  } = data;
  //const [noteValue, setNoteValue] = useState(note || "");

  return (
    <>
      <FlexWrap>
        <Title tag='h1'>{full_name} </Title>
        <BackBtn />
      </FlexWrap>
      <StyledGrid>
        <div>
          <StyledList>
            {email && (
              <StyledItem>
                <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
              </StyledItem>
            )}
            {phone_number && (
              <StyledItem>
                <strong>Phone number:</strong>
                <a href={`${phone_number}`}>{phone_number}</a>
              </StyledItem>
            )}
            {mobile_number && (
              <StyledItem>
                <strong>Mobile number:</strong>
                <a href={`${mobile_number}`}>{mobile_number}</a>
              </StyledItem>
            )}
            {country && (
              <StyledItem>
                <strong>Country:</strong>
                {country}
              </StyledItem>
            )}
            {address && (
              <StyledItem>
                <strong>Address:</strong>
                {address}
              </StyledItem>
            )}
            {address_2 && (
              <StyledItem>
                <strong>Address 2:</strong>
                {address_2}
              </StyledItem>
            )}
            {company && (
              <StyledItem>
                <strong>Company:</strong>
                {company}
              </StyledItem>
            )}
          </StyledList>

          <StyledIcons>
            {linkedin_link && (
              <StyledIconLink href={linkedin_link}>
                <FaLinkedinIn size={25} />
              </StyledIconLink>
            )}

            {facebook_link && (
              <StyledIconLink href={facebook_link}>
                <FaFacebookF size={25} />
              </StyledIconLink>
            )}
            {instagram_link && (
              <StyledIconLink href={instagram_link}>
                <FaInstagram size={25} />
              </StyledIconLink>
            )}
            {tiktok_link && (
              <StyledIconLink href={tiktok_link}>
                <FaTiktok size={25} />
              </StyledIconLink>
            )}
          </StyledIcons>
        </div>

        {note && (
          <StyledBox>
            <Title tag='h3'>Note</Title>
            {note}
          </StyledBox>
        )}
      </StyledGrid>
    </>
  );
}

export default SingleAddressBook;
