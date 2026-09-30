import styled from "styled-components";
import { MAX_PAGE_BUTTONS, PAGE_SIZE } from "../constants/index.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SytledSection = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem;
`;

const SytledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--color-accent);
  font-size: 1.25rem;
  font-weight: 600;
  padding: 10px 12px;
  color: var(--color-white);
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-accent-600);
  }

  &:disabled {
    background: var(--color-grey-200);
    color: var(--color-text-muted);
  }
`;

const StyledNumber = styled.button`
  background-color: ${({ $active }) => ($active ? "var(--color-accent-600)" : "var(--color-accent)")};
  font-size: 1.25rem;
  line-height: 1.2;
  color: var(--color-white);
  padding: 10px 12px;
  border-radius: var(--border-radius-sm);
  border: none;

  &:hover {
    background-color: var(--color-accent-600);
  }
`;

const P = styled.p`
  font-size: 1.25rem;
  & span {
    font-weight: 600;
  }
`;

function Pagination({ count, page, limit, onPageChange }) {
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = () => {
    if (page < pageCount) {
      onPageChange(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  function handlePageChange(newPage) {
    onPageChange(newPage);
  }

  const generatePageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_PAGE_BUTTONS / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(pageCount, start + MAX_PAGE_BUTTONS - 1);

    if (end - start < MAX_PAGE_BUTTONS - 1) {
      start = Math.max(1, end - MAX_PAGE_BUTTONS + 1);
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < pageCount - 1) pages.push("...");
    if (end < pageCount) pages.push(pageCount);

    return pages;
  };

  if (count <= PAGE_SIZE) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, count);

  return (
    <SytledSection>
      <P>
        Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span>
      </P>
      <SytledButton onClick={prevPage} disabled={page === 1}>
        <ChevronLeft size={16} />
        Previous
      </SytledButton>

      {generatePageNumbers().map((num, index) =>
        num === "..." ? (
          <span key={index} className='px-3 py-1 mx-1'>
            ...
          </span>
        ) : (
          <StyledNumber key={num} onClick={() => handlePageChange(num)} $active={num === page}>
            {num}
          </StyledNumber>
        ),
      )}

      <SytledButton onClick={nextPage} disabled={page === pageCount}>
        Next
        <ChevronRight size={16} />
      </SytledButton>
    </SytledSection>
  );
}

export default Pagination;
