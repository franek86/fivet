import styled from "styled-components";

const StyledPlaceholderTable = styled.div`
  margin-top: 2.4rem;
`;

function TablePlaceholder({ count }) {
  return (
    <StyledPlaceholderTable>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={index} className='simmer'>
            <div className='simmer-data-placehoder'></div>
          </div>
        ))}
    </StyledPlaceholderTable>
  );
}

export default TablePlaceholder;
