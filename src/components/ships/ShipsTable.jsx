import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Range } from "react-range";
import { useShips } from "../../hooks/ships/useShips.js";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import ShipsColumn from "./ShipsColumn.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import EmptyState from "../EmptyState.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import Sort from "../ui/Sort.jsx";

import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { setSearchTerm } from "../../slices/searchSlice.js";
import Button from "../ui/Button.jsx";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2.8rem;
  gap: 3rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.4rem;
`;

const ShipFilters = styled.div`
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
`;

const ShipFiltersDropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;

  @media screen and (min-width: 640px) {
    display: flex;
    flex-direction: row;
    gap: 5rem;
  }
`;

const RangeLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.8rem;
  align-items: center;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem;
  font-weight: 600;
  font-size: 1.3rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const FilterButton = styled(ButtonStyle)`
  background-color: var(--color-brand-200);
  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-grey-100);
  }
`;

const ResetButton = styled(ButtonStyle)`
  background-color: var(--color-grey-300);
  &:hover {
    opacity: 0.7;
  }
`;

function ShipsTable() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);

  const { ships, count, isLoading, error, isFetching } = useShips();

  const prices = ships?.map((s) => s.price) || [];
  const MIN = 0;
  const MAX = prices.length ? Math.max(...prices) : 1000;
  const [rangeValue, setRangeValue] = useState([MIN, MAX]);
  const [isPublished, setIsPublished] = useState(false);

  const sortItems = [
    { value: "shipName-asc", name: "Ship name (A-Z)" },
    { value: "shipName-desc", name: "Ship name (Z-A)" },
    { value: "price-asc", name: "Cheapest" },
    { value: "price-desc", name: "Expensive" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  const tableColumns = [
    { header: "", accessor: "delete row", style: "hidden-table-sm" },
    { header: "Image", accessor: "image", style: "hidden-table-sm" },
    ...(role === "ADMIN" ? [{ header: "Published", accessor: "published", style: "hidden-table-sm" }] : []),
    { header: `${role !== "ADMIN" ? "Ship type" : "User"}`, accessor: "ship-type-user" },
    { header: "Ship Name", accessor: "ship name" },
    { header: "IMO no.", accessor: "imo" },
    { header: "Price", accessor: "price" },
    { header: "Actions", accessor: "actions" },
  ];

  useEffect(() => {
    setRangeValue([MIN, MAX]);
  }, [MIN, MAX]);

  if (isLoading) return <Spinner />;

  if (error) return <div>Error</div>;

  const renderRow = (item) => <ShipsColumn key={item.id} ship={item} />;
  const dataLength = ships?.length;
  if (dataLength < 1) return <EmptyState message='No ships for now. Please create ship' />;

  const updatedQueryParams = (params) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => (value ?? "" ? newParams.set(key, value) : newParams.delete(key)));
    setSearchParams(newParams);
  };

  const togglePublishFilter = () => {
    setIsPublished((prev) => !prev);
  };

  const onChangePriceFilter = (newRange) => {
    setRangeValue(newRange);
  };

  const applayFilter = () => {
    const query = {
      isPublished,
      price: rangeValue.join("-"),
    };

    updatedQueryParams(query);
  };

  const resetFilter = () => {
    setIsPublished(false);
    setRangeValue([MIN, MAX]);
    dispatch(setSearchTerm(""));

    updatedQueryParams({
      isPublished: null,
      price: null,
      search: null,
    });
  };

  return (
    <>
      <FlexWrapper>
        <ShipFilters onClick={() => setToggleFilter(!toggleFilter)}>
          <Button $variation='icon'>
            Filters
            {toggleFilter ? <FiChevronUp /> : <FiChevronDown />}
          </Button>
        </ShipFilters>
        <Sort items={sortItems} label='Sort by:' />
      </FlexWrapper>
      {toggleFilter && (
        <ShipFiltersDropdown>
          <div>
            <RangeLabel>
              Price filter: ${rangeValue[0]} - ${rangeValue[1]}
            </RangeLabel>
            <Range
              step={1}
              min={MIN}
              max={MAX}
              values={rangeValue}
              onChange={onChangePriceFilter}
              renderTrack={({ props, children }) => {
                const [min, max] = rangeValue;
                const leftPercent = ((min - MIN) / (MAX - MIN)) * 100;
                const rightPercent = ((max - MIN) / (MAX - MIN)) * 100;
                return (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: `linear-gradient(to right,#ccc ${leftPercent}%,
                        #548BF4 ${leftPercent}%,
                        #548BF4 ${rightPercent}%,
                        #ccc ${rightPercent}%)`,
                    }}
                    className='range-wrapper'
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props, index }) => {
                return <div {...props} key={index} style={props.style} className='range-thumb'></div>;
              }}
            />
          </div>
          <div>
            <P>Publish filter</P>
            <Checkbox checked={isPublished} label='Published' position='left' onChange={togglePublishFilter} />
          </div>
          <ButtonWrap>
            <FilterButton onClick={applayFilter}>Filter now</FilterButton>
            <ResetButton onClick={resetFilter}>Reset</ResetButton>
          </ButtonWrap>
        </ShipFiltersDropdown>
      )}
      {isFetching ? <TablePlaceholder count={dataLength} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={ships} />}
      <Pagination count={count} />
    </>
  );
}

export default ShipsTable;
