import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import CustomSelect from "./CustomSelect.jsx";
import styled from "styled-components";

const SortWrap = styled.div`
  margin-top: 2.8rem;
`;

function Sort({ items, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const { control, watch } = useForm({ defaultValues: { sortBy } });

  const selectedValue = watch("sortBy");

  useEffect(() => {
    if (selectedValue || selectedValue.value) {
      searchParams.set("sortBy", selectedValue);
      setSearchParams(searchParams);
    }
  }, [selectedValue]);

  return (
    <SortWrap>
      <CustomSelect name='sortBy' control={control} options={items} size='small' variation='primary' valueKey='value' label={label} />
    </SortWrap>
  );
}

export default Sort;
