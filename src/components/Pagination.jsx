import React from "react";
import { useSearchParams } from "react-router";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants.js";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

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
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.8rem 2.5rem;
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
  border-radius: 50%;
  background-color: var(--color-brand-600);
  font-size: 1.4rem;
  color: var(--color-brand-200);
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

  const maxVisiblePages = 1;
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(currentPage + halfVisible, totalPage);

    if (currentPage <= halfVisible) {
      startPage = 1;
      endPage = Math.min(maxVisiblePages, count);
    } else if (currentPage > count - halfVisible) {
      startPage = Math.max(count - maxVisiblePages + 1, 1);
      endPage = count;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <StyledNumber
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded-full ${currentPage === i ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          {i}
        </StyledNumber>
      );
    }

    if (endPage < totalPage) {
      pageNumbers.push(
        <span key='end-ellipsis' className='px-2'>
          ...
        </span>
      );
    }

    return pageNumbers;
  };

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

  if (count <= PAGE_SIZE) return null;

  return (
    <SytledSection>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span>
      </P>
      <SytledButton onClick={prevPage} disabled={currentPage === 1}>
        <LuChevronLeft />
        Previous
      </SytledButton>
      {renderPageNumbers}
      <SytledButton onClick={nextPage} disabled={currentPage === pageCount}>
        Next
        <LuChevronRight />
      </SytledButton>
    </SytledSection>
  );
}

export default Pagination;
