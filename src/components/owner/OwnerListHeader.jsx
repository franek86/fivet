import styled from "styled-components";
import SearchBar from "../SearchBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setOwnersSearch } from "../../slices/searchSlice.js";

const OwnerListHeader = ({ data }) => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.owners);

  return (
    <Header>
      <div>
        <div>
          <Title>Owners</Title>
          <Subtitle>Find verified owners and connect with them.</Subtitle>
        </div>
        <Count>{data.owners?.length} owners</Count>
      </div>
      <SearchBar value={search} onChange={(value) => dispatch(setOwnersSearch(value))} placeholder='Owner search ...' />
    </Header>
  );
};

export default OwnerListHeader;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
`;

const Subtitle = styled.p`
  margin: 1rem 0;
  font-size: 1.4rem;
  color: var(--color-text-muted);
`;

const Count = styled.span`
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 600;
`;
