import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../ui/Input.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import DateTime from "react-datetime";
import Button from "../ui/Button.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Label from "../ui/Label.jsx";

import { EVENT_PRIORITY, EVENT_REMINDER, EVENT_STATUS } from "../../utils/constants.js";
import { eventSchema } from "../../utils/validationSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useCreateEvent } from "../../hooks/useEvents.js";

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
  const user = useSelector((state) => state.auth.user);
  const { mutate, isPending, isSuccess, isError } = useCreateEvent();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' {...register("userId")} value={user.id} />
      <Grid>
        <Column>
          <Label>Date start *</Label>
          <Controller
            control={control}
            name='start'
            render={({ field }) => (
              <DateTime
                value={field.value}
                initialValue={moment()}
                onChange={field.onChange}
                isValidDate={(current) => current.isSameOrAfter(moment(), "minute")}
                dateFormat='DD-MM-YYYY'
                timeFormat='HH:mm'
              />
            )}
          />
          <InputErrorMessage message={errors.start?.message} />
        </Column>
        <Column>
          <Label>Date end *</Label>
          <Controller
            control={control}
            name='end'
            render={({ field }) => (
              <DateTime
                value={field.value}
                initialValue={moment()}
                isValidDate={(current) => current.isSameOrAfter(moment(), "minute")}
                onChange={field.onChange}
                dateFormat='DD-MM-YYYY'
                timeFormat='HH:mm'
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
                placeholder='Reminder'
                label='Reminder'
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
        <FullColumn>
          <TextArea directions='column' label='Description' register={register} {...register("description")} />
          <InputErrorMessage message={errors.description?.message} />
        </FullColumn>

        <Button>{isPending ? "Creating..." : "Create"}</Button>
      </Grid>
    </form>
  );
}

export default FormEvent;
