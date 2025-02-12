import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import ImageUplader from "../ImageUplader.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Label from "../ui/Label.jsx";

import DatePicker from "react-date-picker";

import styled from "styled-components";
import { LuCalendarDays, LuX } from "react-icons/lu";

import { createShipSchema } from "../../utils/validationSchema.js";
import { useCreateShip } from "../../hooks/ships/useCreateShip.js";
import { useCategories } from "../../hooks/categories/useCategories.js";
import { useUploadSingleImage } from "../../hooks/files/useUploadSingleImage.js";
import { useImagePublicUrl } from "../../hooks/files/useImagePublicUrl.js";
import { useNavigate } from "react-router";

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
  gap: 0;
`;

const ShipsForm = () => {
  const { categories } = useCategories();
  const { mutate: submitData } = useCreateShip();
  const { mutate: uploadImage } = useUploadSingleImage();
  const { mutate: getImageUrl } = useImagePublicUrl();

  const navigate = useNavigate();

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const file = data.mainImage;
    const filePath = `${Date.now()}${Math.floor(Math.random() * 10000)}-${file.name.replaceAll(/\s/g, "-")}`;
    const bucket = "Ship images";

    uploadImage(
      { file, bucket, filePath },
      {
        onSuccess: (filePath) => {
          getImageUrl(
            { filePath, bucket },
            {
              onSuccess: (urlImage) => {
                submitData({
                  ...data,
                  mainImage: urlImage,
                });
                navigate("/ships");
              },
            }
          );
        },
      }
    );
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
          <Input
            label='Price (USD)'
            directions='column'
            placeholder='2,000,00'
            register={register}
            {...register("price", { require: true })}
          />
          <InputErrorMessage message={errors.price?.message} />
        </Column>
        <Input label='Ship location' directions='column' placeholder='e.g. Croatia' register={register} {...register("location")} />
        <Input
          label='Main engine'
          directions='column'
          placeholder='e.g. 1x Makita 2400 kw'
          register={register}
          {...register("mainEngine")}
        />
      </Form>

      <Form>
        <Input label='Length overall' directions='column' placeholder='e.g. 94 m' register={register} {...register("lengthOverall")} />
        <Input label='Beam' directions='column' placeholder='e.g. 15 m' register={register} {...register("beam")} />
        <Input label='Depth' directions='column' placeholder='e.g. 7.2 m' register={register} {...register("depth")} />
        <Input label='Draft' directions='column' placeholder='e.g. 5.8 m' register={register} {...register("draft")} />
        <Input label='Tonnage' directions='column' placeholder='e.g. 4000 t' register={register} {...register("tonnage")} />
        <Input label='Cargo capacity' directions='column' placeholder='e.g. 3990 cbm' register={register} {...register("cargoCapacity")} />
        {/*      <Input label='Build year' directions='column' register={register} {...register("buildYear")} />
         */}
        <Column>
          <Label>Build year</Label>
          <Controller
            control={control}
            name='buildYear'
            render={({ field }) => (
              <DatePicker
                {...field}
                format='dd-MM-yyyy'
                value={field.value || null}
                onChange={(date) => field.onChange(date)}
                calendarIcon={<LuCalendarDays size={24} />}
                clearIcon={<LuX size={24} />}
                dayPlaceholder='dd'
                monthPlaceholder='MM'
                yearPlaceholder='yyyy'
              />
            )}
          />
        </Column>
        <Input label='Build country' directions='column' placeholder='e.g. Poland' register={register} {...register("buildCountry")} />
        {/* <Input label='Refit year' directions='column' register={register} {...register("refitYear")} />
         */}
        <Column>
          <Label>Refit year</Label>
          <Controller
            control={control}
            name='refitYear'
            render={({ field }) => (
              <DatePicker
                {...field}
                format='dd-MM-yyyy'
                value={field.value || null}
                onChange={(date) => field.onChange(date)}
                calendarIcon={<LuCalendarDays size={24} />}
                clearIcon={<LuX size={24} />}
                dayPlaceholder='dd'
                monthPlaceholder='MM'
                yearPlaceholder='yyyy'
              />
            )}
          />
        </Column>
      </Form>
      <Form>
        <TextArea label='Remarks' directions='column' register={register} {...register("remarks")} />
        <TextArea label='Description' directions='column' register={register} {...register("description")} />
        <ImageUplader name='mainImage' value={watch("mainImage")} onChange={(file) => setValue("mainImage", file)} />
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
