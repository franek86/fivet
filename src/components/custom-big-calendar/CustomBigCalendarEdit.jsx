import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { format, isSameDay, setHours, setMinutes } from "date-fns";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Label from "../ui/Label.jsx";
import DatePicker from "react-datepicker";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

import { useCreateEvent } from "../../hooks/useEvents.js";
import { eventSchema } from "../../utils/validationSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";

import { EVENT_STATUS } from "../../constants/index.js";

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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 18, 0.5);
  backdrop-filter: blur(5px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 20px;
`;

const CalendarModal = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 580px;
  box-shadow: var(--shadow-lg);
  animation: scaleIn 0.2s ease both;
  overflow: hidden;

  .modal-bar {
    height: 4px;
  }

  .modal-body {
    padding: 28px 28px 24px;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 6px;
  }

  .modal-meta {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-bottom: 18px;
  }

  .modal-desc {
    font-size: 12px;
    color: var(--color-text);
    line-height: 1.65;
    background: var(--color-accent);
    border-radius: var(--border-radius-md);
    padding: 14px;
    margin-bottom: 24px;
    min-height: 60px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.93);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const PriorityPicker = styled.div`
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  .color-picker {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .color-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      font-weight: 600;
    }

    p {
      font-size: 12px;
    }
  }
  .color-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    border: 2.5px solid transparent;
    transition:
      transform 0.15s,
      border-color 0.15s;
  }
  .color-dot:hover {
    transform: scale(1.2);
  }
  .color-dot.active {
    border-color: var(--color-text);
  }
`;

const EVENT_COLORS = [
  { bg: "#51cab2", priority: "LOW" },
  { bg: "#facc15", priority: "MEDIUM" },
  { bg: "#b91c1c", priority: "HIGH" },
];

const CustomBigCalendarEdit = ({ formState, setFormState }) => {
  const { mutate, isPending } = useCreateEvent();
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      start: null,
      end: null,
    },
    resolver: zodResolver(eventSchema),
  });

  const today = new Date();
  const formatToday = format(new Date(), "dd.MM.yyyy");
  const start = formState?.event.start;
  const end = formState?.event.end;

  const onSubmitForm = (data) => {
    mutate(data);
  };

  const saveEvent = () => {
    handleSubmit(onSubmitForm)();
    setFormState(null);
  };
  return (
    <Overlay onClick={() => setFormState(null)}>
      <CalendarModal onClick={(e) => e.stopPropagation()}>
        <div className='modal-bar' />
        <div className='modal-body'>
          <h2 className='modal-title'>{formState.mode === "add" ? "New Event" : "Edit Event"}</h2>
          <Grid>
            <FullColumn>
              <Input directions='column' label='Title *' register={register} placeholder='Enter title' {...register("title")} />
              <InputErrorMessage message={errors.title?.message} />
            </FullColumn>
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
              <Input directions='column' label='Related link' register={register} placeholder='Zoom link etc.' {...register("location")} />
              <InputErrorMessage message={errors.location?.message} />
            </Column>
            <Column>
              <Input directions='column' label='Tags' register={register} placeholder='best, expensive ...' {...register("tags")} />
              <InputErrorMessage message={errors.tags?.message} />
            </Column>

            <Column>
              <PriorityPicker>
                <Label>Priority</Label>
                <Controller
                  control={control}
                  name='priority'
                  render={({ field }) => (
                    <div className='color-picker'>
                      {EVENT_COLORS.map((c, i) => (
                        <div className={`color-btn${field.value === c.priority ? " active" : ""}`}>
                          <p>{c.priority}</p>
                          <button
                            key={i}
                            type='button'
                            className={`color-dot${field.value === c.priority ? " active" : ""}`}
                            style={{ background: c.bg }}
                            title={c.priority}
                            onClick={() => field.onChange(c.priority)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                />
                <InputErrorMessage message={errors.priority?.message} />
              </PriorityPicker>
            </Column>

            <Column>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    name='priority'
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

              <InputErrorMessage message={errors.priority?.message} />
            </Column>

            <FullColumn>
              <TextArea directions='column' label='Description' register={register} {...register("description")} />
              <InputErrorMessage message={errors.description?.message} />
            </FullColumn>
          </Grid>

          <ModalActions>
            <Button $variation='secondary' onClick={() => setFormState(null)}>
              Cancel
            </Button>
            <Button $variation='primary' onClick={saveEvent}>
              {formState.mode === "add" ? "Add Event" : "Save Changes"}
            </Button>
          </ModalActions>
        </div>
      </CalendarModal>
    </Overlay>
  );
};

export default CustomBigCalendarEdit;
