import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import Input from "../ui/Input.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import Button from "../ui/Button.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Label from "../ui/Label.jsx";

import { EVENT_PRIORITY, EVENT_REMINDER, EVENT_STATUS } from "../../utils/constants.js";
import { eventSchema } from "../../utils/validationSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isSameDay, setHours, setMinutes } from "date-fns";
import { useCreateEvent, useGetSingleEvent } from "../../hooks/useEvents.js";
import { useEffect } from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Column = styled(Row)`
  flex-direction: column;
  gap: 0;
`;

const FullColumn = styled(Row)`
  grid-column: 1 / -1;
  & > div {
    width: 100%;
  }
`;

function FormEvent() {
  const { editId } = useSelector((state) => state.ui);
  const editMode = Boolean(editId);
  const { mutate, isPending } = useCreateEvent();
  const { data: singleData } = useGetSingleEvent(editId);

  const today = new Date();
  const formatToday = format(new Date(), "dd.MM.yyyy");

  const {
    register,
    control,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      start: null,
      end: null,
    },
    resolver: zodResolver(eventSchema),
  });

  const start = watch("start");
  const end = watch("end");

  useEffect(() => {
    if (!editMode) {
      reset({
        start: null,
        end: null,
        status: "",
        priority: "",
        title: "",
        reminder: "",
        location: "",
        tags: "",
        description: "",
      });
      return;
    }
    if (singleData) {
      reset({
        ...singleData,
      });
    }
  }, [singleData, editMode, reset]);

  const onSubmit = (data) => {
    if (editMode) {
      console.log(data);
    } else {
      mutate(data);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Column>
          <Label>Date start *</Label>
          <Controller
            control={control}
            name='start'
            render={({ field }) => {
              const minTime = field.value && isSameDay(field.value, today) ? today : setHours(setMinutes(new Date(), 0), 0);

              return (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    if (end && date && end < date) setValue("end", null);
                  }}
                  dateFormat='dd.MM.yyyy HH:mm'
                  calendarClassName='custom-calendar'
                  showTimeSelect
                  placeholderText={formatToday}
                  timeIntervals={15}
                  selectsStart
                  startDate={field.value}
                  endDate={end}
                  minDate={today}
                  minTime={minTime}
                  maxTime={setHours(setMinutes(new Date(), 59), 23)}
                />
              );
            }}
          />
          <InputErrorMessage message={errors.start?.message} />
        </Column>
        <Column>
          <Label>Date end *</Label>
          <Controller
            control={control}
            name='end'
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat='dd.MM.yyyy HH:mm'
                calendarClassName='custom-calendar'
                showTimeSelect
                placeholderText={formatToday}
                timeIntervals={15}
                selectsEnd
                startDate={start}
                endDate={field.value}
                minDate={start}
                minTime={start && field.value && isSameDay(start, field.value) ? start : setHours(setMinutes(new Date(), 0), 0)}
                maxTime={setHours(setMinutes(new Date(), 59), 23)}
              />
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
                name='priority'
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
          <Input directions='column' label='Title *' register={register} placeholder='Enter title' {...register("title")} />
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
                placeholder='Set reminder time'
                label='Set reminder time'
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
          <Input directions='column' label='Related link' register={register} placeholder='Zoom link etc.' {...register("location")} />
          <InputErrorMessage message={errors.location?.message} />
        </Column>
        <Column>
          <Input directions='column' label='Tags' register={register} placeholder='best, expensive ...' {...register("tags")} />
          <InputErrorMessage message={errors.tags?.message} />
        </Column>
        <FullColumn>
          <TextArea directions='column' label='Description' register={register} {...register("description")} />
          <InputErrorMessage message={errors.description?.message} />
        </FullColumn>
        {editMode ? <Button>{isPending ? "Editing..." : "Edit"}</Button> : <Button>{isPending ? "Creating..." : "Create"}</Button>}
      </Grid>
    </form>
  );
}

export default FormEvent;
