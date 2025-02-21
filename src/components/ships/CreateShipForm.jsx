import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

import Spinner from "../Spinner.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import ImageUplader from "../ImageUplader.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import Label from "../ui/Label.jsx";
import DatePicker from "react-date-picker";

import { createShipSchema, editShipSchema } from "../../utils/validationSchema.js";
import styled from "styled-components";
import { LuCalendarDays, LuX } from "react-icons/lu";

import { useCreateShip } from "../../hooks/ships/useCreateShip.js";
import { useEditShip } from "../../hooks/ships/useEditShip.js";
import { useShip } from "../../hooks/ships/useShip.js";
import { useCategories } from "../../hooks/categories/useCategories.js";
import { useUploadSingleImage } from "../../hooks/files/useUploadSingleImage.js";
import { useImagePublicUrl } from "../../hooks/files/useImagePublicUrl.js";

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
  const navigate = useNavigate();
  const { id: shipId } = useParams();
  const isEditSession = Boolean(shipId);

  const { categories } = useCategories();
  const { data: singleShipData, isLoading, isError } = useShip(shipId);

  const { mutate: submitData, isPending } = useCreateShip();
  const { editShip } = useEditShip();
  const { mutate: uploadImage } = useUploadSingleImage();
  const { mutate: getImageUrl } = useImagePublicUrl();

  const schema = isEditSession ? editShipSchema : createShipSchema;

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (singleShipData && isEditSession) {
      reset({
        ...singleShipData,
        imoNumber: singleShipData?.imoNumber ? String(singleShipData?.imoNumber) : "",
        price: singleShipData?.price ? String(singleShipData?.price) : "",
        mainImage: singleShipData?.mainImage || null,
        buildYear: singleShipData?.buildYear || "",
        refitYear: singleShipData?.refitYear || "",
      });
    }
  }, [singleShipData, reset]);

  const onSubmit = (data) => {
    const file = data.mainImage;

    const formatedData = {
      ...data,
      buildYear: data?.buildYear || null,
      refitYear: data?.refitYear || null,
    };

    if (file instanceof File) {
      var filePath = `${Date.now()}${Math.floor(Math.random() * 10000)}-${file.name.replaceAll(/\s/g, "-")}`;
      var bucket = "Ship images";

      uploadImage(
        { file, bucket, filePath },
        {
          onSuccess: (filePath) => {
            getImageUrl(
              { filePath, bucket },
              {
                onSuccess: (urlImage) => {
                  if (isEditSession) {
                    editShip(
                      {
                        newData: {
                          ...data,
                          buildYear: data?.buildYear || null,
                          refitYear: data?.refitYear || null,
                          mainImage: urlImage,
                        },
                        id: Number(shipId),
                      },
                      {
                        onSuccess: () => {
                          navigate("/ships");
                        },
                      }
                    );
                  } else {
                    submitData(
                      {
                        ...data,
                        mainImage: urlImage,
                      },
                      {
                        onSuccess: () => {
                          navigate("/ships");
                        },
                      }
                    );
                  }
                },
              }
            );
          },
        }
      );
    } else {
      editShip(
        { newData: formatedData, id: Number(shipId) },
        {
          onSuccess: () => {
            navigate("/ships");
          },
        }
      );
    }
  };

  const cancelEditBtn = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

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
            type='number'
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
          <InputErrorMessage message={errors.shipType?.message} />
        </Column>
        <Column>
          <Input
            type='number'
            label='Price (USD)'
            directions='column'
            placeholder='2000000'
            register={register}
            {...register("price", { require: true })}
          />
          <InputErrorMessage message={errors.price?.message} />
        </Column>
        <Column>
          <Input
            label='Ship location'
            directions='column'
            placeholder='e.g. Croatia'
            register={register}
            {...register("location", { require: true })}
          />
          <InputErrorMessage message={errors.location?.message} />
        </Column>
        <Column>
          <Input
            label='Main engine'
            directions='column'
            placeholder='e.g. 1x Makita 2400 kw'
            register={register}
            {...register("mainEngine", { require: true })}
          />
          <InputErrorMessage message={errors.mainEngine?.message} />
        </Column>
      </Form>

      <Form>
        <Column>
          <Input
            label='Length overall'
            directions='column'
            placeholder='e.g. 94 m'
            register={register}
            {...register("lengthOverall", { require: true })}
          />
          <InputErrorMessage message={errors.lengthOverall?.message} />
        </Column>
        <Column>
          <Input label='Beam' directions='column' placeholder='e.g. 15 m' register={register} {...register("beam", { require: true })} />
          <InputErrorMessage message={errors.beam?.message} />
        </Column>
        <Column>
          <Input label='Depth' directions='column' placeholder='e.g. 7.2 m' register={register} {...register("depth", { require: true })} />
          <InputErrorMessage message={errors.depth?.message} />
        </Column>
        <Column>
          <Input label='Draft' directions='column' placeholder='e.g. 5.8 m' register={register} {...register("draft", { require: true })} />
          <InputErrorMessage message={errors.draft?.message} />
        </Column>
        <Column>
          <Input
            label='Tonnage'
            directions='column'
            placeholder='e.g. 4000 t'
            register={register}
            {...register("tonnage", { require: true })}
          />
          <InputErrorMessage message={errors.tonnage?.message} />
        </Column>
        <Column>
          <Input
            label='Cargo capacity'
            directions='column'
            placeholder='e.g. 3990 cbm'
            register={register}
            {...register("cargoCapacity", { require: true })}
          />
          <InputErrorMessage message={errors.cargoCapacity?.message} />
        </Column>
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
        <Column>
          <ImageUplader
            name='mainImage'
            value={watch("mainImage")}
            onChange={(file) => setValue("mainImage", file)}
            initialImage={singleShipData?.mainImage}
          />
          <InputErrorMessage message={errors.mainImage?.message} />
        </Column>
      </Form>

      <Row>
        {isEditSession ? <Button>{isPending ? "Loading..." : "Edit"}</Button> : <Button>{isPending ? "Loading..." : "Save"}</Button>}

        {/* <Button $variation='third'>Draft</Button> */}
        {isEditSession && (
          <Button onClick={cancelEditBtn} $variation='secondary'>
            Cancel
          </Button>
        )}
        {!isEditSession && (
          <Button onClick={() => reset()} $variation='secondary'>
            Cancel
          </Button>
        )}
      </Row>
    </form>
  );
};

export default ShipsForm;
