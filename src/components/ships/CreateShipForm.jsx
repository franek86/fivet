import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import ImageUplader from "../ImageUplader.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

import DatePicker from "react-date-picker";

import styled from "styled-components";

import { createShipSchema } from "../../utils/validationSchema.js";
import { useCreateShip } from "../../hooks/ships/useCreateShip.js";
import { useCategories } from "../../hooks/categories/useCategories.js";

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Column = styled(Row)`
  flex-direction: column;
`;

const ShipsForm = () => {
  const { categories } = useCategories();
  const { mutate } = useCreateShip();

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createShipSchema),
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      mainImage: data.mainImage,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form>
        <Column>
          <Input
            label='Ship name'
            placeholder='e.g. Ten Spirit'
            directions='column'
            register={register}
            {...register("shipName", { require: true })}
          />
          <InputErrorMessage message={errors.shipName?.message} />
        </Column>
        <Column>
          <Input
            label='IMO number'
            placeholder='e.g. 0000001'
            directions='column'
            register={register}
            {...register("imoNumber", { required: true })}
          />
          <InputErrorMessage message={errors.imoNumber?.message} />
        </Column>
        <Column>
          <Controller
            name='shipType'
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                control={control}
                options={categories}
                placeholder='Ship Type'
                label='Choose an ship type'
                size='medium'
                variation='transparent'
                valueKey='name'
              />
            )}
          />
        </Column>
        <Column>
          <Input label='Price (USD)' directions='column' register={register} {...register("price", { require: true })} />
          <InputErrorMessage message={errors.price?.message} />
        </Column>
        <Input label='Ship location' directions='column' register={register} {...register("location")} />
        <Input label='Main engine' directions='column' register={register} {...register("mainEngine")} />
      </Form>

      <Form>
        <Input label='Length overall' directions='column' register={register} {...register("lengthOverall")} />
        <Input label='Beam' directions='column' register={register} {...register("beam")} />
        <Input label='Depth' directions='column' register={register} {...register("depth")} />
        <Input label='Draft' directions='column' register={register} {...register("draft")} />
        <Input label='Tonnage' directions='column' register={register} {...register("tonnage")} />
        <Input label='Cargo capacity' directions='column' register={register} {...register("cargoCapacity")} />
        {/*      <Input label='Build year' directions='column' register={register} {...register("buildYear")} />
         */}
        <Controller
          control={control}
          name='buildYear'
          render={({ field }) => (
            <DatePicker {...field} format='dd-MM-yyyy' value={field.value || null} onChange={(date) => field.onChange(date)} />
          )}
        />
        <Input label='Build country' directions='column' register={register} {...register("buildCountry")} />
        {/* <Input label='Refit year' directions='column' register={register} {...register("refitYear")} />
         */}
        <Controller
          control={control}
          name='refitYear'
          render={({ field }) => (
            <DatePicker {...field} format='dd-MM-yyyy' value={field.value || null} onChange={(date) => field.onChange(date)} />
          )}
        />
      </Form>
      <Form>
        <TextArea label='Remarks' directions='column' register={register} {...register("remarks")} />
        <TextArea label='Description' directions='column' register={register} {...register("description")} />
        <ImageUplader
          name='mainImage'
          value={watch("mainImage")}
          onChange={(file) => setValue("mainImage", file)}
          bucket='Ship images'
          folder='ships'
        />
      </Form>

      <Row>
        <Button>Publish</Button>
        <Button variation='third'>Draft</Button>
        <Button variation='secondary'>Cancel</Button>
      </Row>
    </form>
  );
};

export default ShipsForm;
