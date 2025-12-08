import { useSearchParams } from "react-router";
import styled from "styled-components";
import { MAX_PAGE_BUTTONS, PAGE_SIZE } from "../utils/constants.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SytledSection = styled.section`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
`;

const SytledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--color-brand-600);
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0.85rem 1.25rem;
  color: var(--color-brand-200);
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-brand-200);
    color: var(--color-brand-600);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-400);
  }
`;

const StyledNumber = styled.button`
  background-color: ${(props) => (props.active ? "#c7d2fe" : "#4f46e5")};
  font-size: 1.35rem;
  color: ${(props) => (props.active ? "#4f46e5" : "#c7d2fe")};
  padding: 0.6rem 0.8rem;
  border-radius: var(--border-radius-sm);
  border: none;
`;

const P = styled.p`
  font-size: 1.5rem;
  & span {
    font-weight: 600;
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  function handlePageChange(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  const generatePageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_PAGE_BUTTONS / 2);
    let start = Math.max(1, currentPage - half);
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

  return (
    <SytledSection>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span>
      </P>
      <SytledButton onClick={prevPage} disabled={currentPage === 1}>
        <ChevronLeft />
        Previous
      </SytledButton>

      {generatePageNumbers().map((num, index) =>
        num === "..." ? (
          <span key={index} className='px-3 py-1 mx-1'>
            ...
          </span>
        ) : (
          <StyledNumber key={num} onClick={() => handlePageChange(num)} active={num === currentPage}>
            {num}
          </StyledNumber>
        )
      )}

      <SytledButton onClick={nextPage} disabled={currentPage === pageCount}>
        Next
        <ChevronRight />
      </SytledButton>
    </SytledSection>
  );
}

export default Pagination;
