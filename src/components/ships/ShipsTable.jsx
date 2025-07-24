import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { useShips } from "../../hooks/ships/useShips.js";

import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import ShipsColumn from "./ShipsColumn.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import EmptyState from "../EmptyState.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import Sort from "../ui/Sort.jsx";

import { Range } from "react-range";
import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2.8rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.4rem;
`;

const ShipFilters = styled.div``;

const ShipFiltersDropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RangeLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

function ShipsTable() {
  const { ships, count, isLoading, error, isFetching } = useShips();
  const role = useSelector((state) => state.auth.role);

  const prices = ships?.map((s) => s.price) || [];
  const MIN = 0;
  const MAX = prices.length ? Math.max(...prices) : 1000;
  const [rangeValue, setRangeValue] = useState([MIN, MAX]);
  const [isPublished, setIsPublished] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortItems = [
    { value: "shipName-asc", name: "Ship name (A-Z)" },
    { value: "shipName-desc", name: "Ship name (Z-A)" },
    { value: "price-asc", name: "Cheapest" },
    { value: "price-desc", name: "Expensive" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  const tableColumns = [
    { header: "", accessor: "delete row" },
    { header: "Image", accessor: "image" },
    ...(role === "ADMIN" ? [{ header: "Published", accessor: "published" }] : []),
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

  const togglePublishFilter = () => {
    const newValue = !isPublished;
    setIsPublished(newValue);
    setSearchParams(newValue);
  };

  const filterShips = () => {
    const query = new URLSearchParams(searchParams);

    if (isPublished) query.set("isPublished", isPublished);

    console.log(query.toString());
  };

  return (
    <>
      <FlexWrapper>
        <ShipFilters>
          <P>Publish filter</P>

          <ShipFiltersDropdown>
            <Checkbox checked={isPublished} label='Published' position='left' onChange={togglePublishFilter} />
            <div>
              <RangeLabel>
                Price filter: ${rangeValue[0]} - ${rangeValue[1]}
              </RangeLabel>
              <Range
                step={1}
                min={MIN}
                max={MAX}
                values={rangeValue}
                onChange={setRangeValue}
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
                  return <div {...props} key={index} style={props.style} className='range-thumb' />;
                }}
              />
            </div>
          </ShipFiltersDropdown>
        </ShipFilters>
        <Sort items={sortItems} label='Sort by:' />
      </FlexWrapper>
      {isFetching ? <TablePlaceholder count={dataLength} /> : <CustomTable columns={tableColumns} renderRow={renderRow} data={ships} />}
      <Pagination count={count} />
    </>
  );
}

export default ShipsTable;
