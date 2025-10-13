import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import DatePicker from "react-datepicker";

import Label from "../ui/Label.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Input from "../ui/Input.jsx";
import TextArea from "../ui/TextArea.jsx";
import Button from "../ui/Button.jsx";

import styled from "styled-components";
import { useEditEvent, useGetSingleEvent } from "../../hooks/useEvents.js";
import { EVENT_PRIORITY, EVENT_REMINDER, EVENT_STATUS } from "../../utils/constants.js";
import { eventSchema } from "../../utils/validationSchema.js";

const Column = styled.div``;
const ColumnFull = styled.div`
  grid-column: 1 / -1;
  & > div {
    width: 100%;
  }
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  gap: 1rem;
`;

function EventEdit({ editId }) {
  const { mutate, isPending } = useEditEvent();
  const { data: singleData } = useGetSingleEvent(editId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...singleData },
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    if (singleData) {
      const formatStartDate = format(singleData.start);
      const formatEndDate = format(singleData.end);
      reset({ ...singleData, start: formatStartDate, end: formatEndDate });
    }
  }, [singleData, reset]);

  const onSubmit = (data) => {
    mutate({ id: editId, data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Column>
          <Label>Date start</Label>
          <Controller
            control={control}
            name='start'
            render={({ field }) => (
              <DatePicker value={field.value} onChange={field.onChange} showTimeSelect dateFormat='dd.MM.yyyy HH:mm' withPortal />
            )}
          />
          <InputErrorMessage message={errors.start?.message} />
        </Column>
        <Column>
          <Label>Date end</Label>
          <Controller
            control={control}
            name='end'
            render={({ field }) => (
              <DatePicker value={field.value} onChange={field.onChange} showTimeSelect dateFormat='dd.MM.yyyy HH:mm' />
            )}
          />
          <InputErrorMessage message={errors.end?.message} />
        </Column>

        <Column>
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                name='status'
                control={control}
                options={EVENT_STATUS}
                placeholder='Status'
                label='Status'
                size='medium'
                variation='transparent'
                valueKey='value'
                {...register("status")}
              />
            )}
          />

          <InputErrorMessage message={errors.status?.message} />
        </Column>

        <Column>
          <Controller
            name='priority'
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                name='prority'
                control={control}
                options={EVENT_PRIORITY}
                placeholder='Priority'
                label='Priority'
                size='medium'
                variation='transparent'
                valueKey='value'
                {...register("priority")}
              />
            )}
          />

          <InputErrorMessage message={errors.priority?.message} />
        </Column>

        <Column>
          <Input directions='column' label='Title' register={register} placeholder='Enter title' {...register("title")} />
          <InputErrorMessage message={errors.title?.message} />
        </Column>

        <Column>
          <Controller
            name='reminder'
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                name='reminder'
                control={control}
                options={EVENT_REMINDER}
                placeholder='Set reminder'
                label='Set reminder'
                size='medium'
                variation='transparent'
                valueKey='value'
                {...register("reminder")}
              />
            )}
          />

          <InputErrorMessage message={errors.reminder?.message} />
        </Column>
        <Column>
          <Input directions='column' label='Location' register={register} placeholder='Enter url location' {...register("location")} />
          <InputErrorMessage message={errors.location?.message} />
        </Column>
        <Column>
          <Input directions='column' label='Tags' register={register} placeholder='best, expensive ...' {...register("tags")} />
          <InputErrorMessage message={errors.tags?.message} />
        </Column>
        <ColumnFull>
          <TextArea directions='column' label='Description' register={register} {...register("description")} />
          <InputErrorMessage message={errors.description?.message} />
        </ColumnFull>

        <Button>{isPending ? "Editing..." : "Edit"}</Button>
      </Wrapper>
    </form>
  );
}

export default EventEdit;
