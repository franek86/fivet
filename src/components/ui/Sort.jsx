import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import CustomSelect from "./CustomSelect.jsx";
import { useEffect } from "react";

function Sort({ items }) {
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

  return <CustomSelect name='sortBy' control={control} options={items} size='small' variation='primary' valueKey='value' />;
}

export default Sort;
