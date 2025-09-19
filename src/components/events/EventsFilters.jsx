import moment from "moment";
import DateTime from "react-datetime";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Button from "../ui/Button.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

import { useGetAllEvents } from "../../hooks/useEvents.js";
import { closeModalByName } from "../../slices/modalSlice.js";
import { EVENT_PRIORITY, EVENT_STATUS } from "../../utils/constants.js";
import styled from "styled-components";
import Label from "../ui/Label.jsx";

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Column = styled(Row)`
  flex-direction: column;
  gap: 0;
  margin-bottom: 1rem;

  .rdtPicker {
    position: relative;
  }
`;

function EventsFilters() {
  const { updateFilter } = useGetAllEvents();
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, watch, control } = useForm({});

  const handleApplyFilters = (formData) => {
    Object.entries(formData).forEach(([key, value]) => {
      updateFilter(key, value || undefined);
    });

    dispatch(closeModalByName("filter-events"));
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <form onSubmit={handleSubmit(handleApplyFilters)}>
      <Column>
        <Controller
          name='status'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              control={control}
              options={EVENT_STATUS}
              valueKey='value'
              label='Status'
              size='medium'
              variation='transparent'
            />
          )}
        />
      </Column>

      <Column>
        <Controller
          name='priority'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              control={control}
              options={EVENT_PRIORITY}
              valueKey='value'
              label='Priority'
              size='medium'
              variation='transparent'
            />
          )}
        />
      </Column>

      <Column>
        <Label>Start Date:</Label>
        <DateTime
          initialValue={moment(new Date()).format("YYYY-MM-DD")}
          value={startDate ? moment(startDate) : null}
          onChange={(date) => setValue("startDate", moment(date).format("YYYY-MM-DD"))}
          timeFormat={false}
          closeOnSelect={true}
        />
      </Column>

      <Column>
        <Label>End Date:</Label>
        <DateTime
          initialValue={moment(new Date()).format("YYYY-MM-DD")}
          value={endDate ? moment(endDate) : null}
          onChange={(date) => setValue("endDate", moment(date).format("YYYY-MM-DD"))}
          timeFormat={false}
          closeOnSelect={true}
        />
      </Column>

      <Button type='submit'>Apply Filters</Button>
    </form>
  );
}

export default EventsFilters;
