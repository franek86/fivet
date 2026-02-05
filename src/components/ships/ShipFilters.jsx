import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Range } from "react-range";
import styled from "styled-components";
import Checkbox from "../ui/Checkbox.jsx";
import Label from "../ui/Label.jsx";
import { useAllShipType } from "../../hooks/useShipType.js";

/* ================= styles ================= */

const ShipFiltersSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30rem;
  gap: 3rem;
  padding: 2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const RangeLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;

  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
  align-items: center;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.7rem;
  font-weight: 600;
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
`;

const FilterButton = styled(ButtonStyle)`
  background: var(--bg-linear-gradient);
  color: var(--color-grey-50);
  &:hover {
    background: var(--bg-linear-gradient-soft);
    color: var(--color-grey-700);
  }
`;

const ResetButton = styled(ButtonStyle)`
  background-color: var(--color-grey-300);
  &:hover {
    opacity: 0.7;
  }
`;

const ShipFilters = ({ data, shipTypes, onApply, onReset }) => {
  const [searchParams] = useSearchParams();

  /* Get values from url query params  */
  const currentIsPublished = searchParams.get("isPublished") ?? false;
  const currentShipType = searchParams.get("shipType")?.split(",") ?? "";
  const currentPricePramas = searchParams.get("price");

  const currentPrice = currentPricePramas ? currentPricePramas?.split("-").map(Number) : [];

  /* Check active filters */
  /*  const isShipTypeActive = !!currentShipType;

  const hasActiveFilter = isShipTypeActive;

  const activeFilterCount = isShipTypeActive.filter(Boolean).length; */

  /*  Set local state */
  const [isPublished, setIsPublished] = useState(currentIsPublished);
  const [selectedShipType, setSelectedShipType] = useState(currentShipType);

  // Calculate dynamic min/max price from fetched ships
  const { minPrice, maxPrice } = useMemo(() => {
    if (!data.length) return { minPrice: 0, maxPrice: 1000 };
    const prices = data.map((s) => s.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [data]);

  const [priceRange, setPriceRange] = useState(() => [minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  /* Handle chechbox change */
  const handleCheckbox = (type) => {
    setSelectedShipType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  /* Handle oogle published */
  const togglePublishFilter = () => {
    setIsPublished((prev) => !prev);
  };

  /* Handle change price range */
  const onChangePriceFilter = (newRange) => {
    setPriceRange(newRange);
  };

  /*  Apply filter values to URL and trigger data reload */
  const applyFilter = () => {
    onApply?.({
      isPublished,
      priceRange: priceRange ? priceRange.join("-") : null,
      shipType: selectedShipType ? selectedShipType.join(",") : null,
    });
  };

  /* Reset filters and search term, update URL */
  const resetFilter = () => {
    setIsPublished(false);
    setPriceRange([minPrice, maxPrice]);
    setSelectedShipType([]);
    onReset?.();
  };

  /* Range helpers  */
  const safeRange = Math.max(maxPrice - minPrice, 1);
  const [min, max] = priceRange;

  const leftPercent = ((min - minPrice) / safeRange) * 100;
  const rightPercent = ((max - minPrice) / safeRange) * 100;

  return (
    <ShipFiltersSection>
      {/* Ship type checkboxes */}

      <div>
        <P>Ship types</P>
        <CheckboxGrid>
          {shipTypes?.map((t) => (
            <Checkbox
              key={t.id}
              id={t}
              label={t.name}
              position='left'
              checked={selectedShipType?.includes(t.name)}
              onChange={() => handleCheckbox(t.name)}
            />
          ))}
        </CheckboxGrid>
      </div>

      {/* Publish checkbox */}
      <div>
        <P>Publish filter</P>
        <Checkbox checked={isPublished} label='Published' position='left' onChange={togglePublishFilter} />
      </div>

      {/* range */}
      <div>
        <RangeLabel>
          Price filter:
          <span>
            ${min} – ${max}
          </span>
        </RangeLabel>
        <Range
          step={1}
          min={minPrice}
          max={maxPrice}
          values={priceRange}
          onChange={onChangePriceFilter}
          renderTrack={({ props, children }) => {
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

      <ButtonWrap>
        <FilterButton onClick={applyFilter}>Filter now</FilterButton>
        <ResetButton onClick={resetFilter}>Reset</ResetButton>
      </ButtonWrap>
    </ShipFiltersSection>
  );
};

export default ShipFilters;
