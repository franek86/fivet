import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

import Spinner from "../Spinner.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import ImageUploader from "../ImageUploader.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";

import { createShipSchema, editShipSchema } from "../../utils/validationSchema.js";
import styled from "styled-components";

import { useCreateShip } from "../../hooks/ships/useCreateShip.js";
import { useEditShip } from "../../hooks/ships/useEditShip.js";
import { useShip } from "../../hooks/ships/useShip.js";
import { useUploadSingleImage } from "../../hooks/files/useUploadSingleImage.js";
import { useImagePublicUrl } from "../../hooks/files/useImagePublicUrl.js";
import { useUser } from "../../hooks/useAuth.js";
import { useAllShipType } from "../../hooks/useShipType.js";

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

  const { allShipType } = useAllShipType();
  const { data: singleShipData, isLoading, isError } = useShip(shipId);
  const { data: user } = useUser();
  const { mutate: submitData, isPending } = useCreateShip();
  const { mutate: editShip } = useEditShip();

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
    defaultValues: isEditSession ? { ...singleShipData } : {},
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (singleShipData && isEditSession) {
      reset({
        ...singleShipData,
        /*  imo: singleShipData?.imoNumber ? String(singleShipData?.imoNumber) : "",
        price: singleShipData?.price ? String(singleShipData?.price) : "",
        mainImage: singleShipData?.mainImage || null,
        buildYear: singleShipData?.buildYear || "",
        refitYear: singleShipData?.refitYear || "", */
      });
    }
  }, [singleShipData, reset]);

  const onSubmit = (data) => {
    const file = data.mainImage;

    if (file instanceof File) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return;
        formData.append(key, value);
      });

      // Append the image file
      if (data.image && data.mainImage.length > 0) {
        formData.append("mainImage", data.mainImage[0]);
      }

      if (isEditSession) {
        editShip({ newData: data, id: shipId });
      } else {
        submitData(data);
      }
    } else {
      isEditSession && editShip({ newData: data, id: shipId });
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
        <input type='hidden' {...register("userId")} value={user.id} />
        <Column>
          <Input
            label='Ship name *'
            placeholder='e.g. Ten Spirit'
            directions='column'
            register={register}
            {...register("shipName", { required: "Ship name is required" })}
          />
          <InputErrorMessage message={errors.shipName?.message} />
        </Column>
        <Column>
          <Input
            label='IMO number *'
            placeholder='e.g. 0000001'
            directions='column'
            register={register}
            {...register("imo", { required: "IMO number is required" })}
          />
          <InputErrorMessage message={errors.imo?.message} />
        </Column>
        <Column>
          <Controller
            name='typeId'
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                control={control}
                options={allShipType}
                placeholder='Ship Type'
                label='Choose an ship type'
                size='medium'
                variation='transparent'
                valueKey='id'
                {...register("typeId", { required: "Ship type is required" })}
              />
            )}
          />
          <InputErrorMessage message={errors.shipType?.message} />
        </Column>
        <Column>
          <Input
            type='number'
            label='Price (USD) *'
            directions='column'
            placeholder='2000000'
            register={register}
            {...register("price", { required: "Price is required" })}
          />
          <InputErrorMessage message={errors.price?.message} />
        </Column>
        <Column>
          <Input
            label='Ship location *'
            directions='column'
            placeholder='e.g. Croatia'
            register={register}
            {...register("location", { required: "Ship location is required" })}
          />
          <InputErrorMessage message={errors.location?.message} />
        </Column>
        <Column>
          <Input
            label='Main engine *'
            directions='column'
            placeholder='e.g. 1x Makita 2400 kw'
            register={register}
            {...register("mainEngine", { required: "Main engine is required" })}
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
            {...register("lengthOverall", { required: "Length overall is required" })}
          />
          <InputErrorMessage message={errors.lengthOverall?.message} />
        </Column>
        <Column>
          <Input
            label='Length *'
            directions='column'
            placeholder='e.g. 94'
            register={register}
            {...register("length", { require: "Length is required" })}
          />
          <InputErrorMessage message={errors.length?.message} />
        </Column>
        <Column>
          <Input
            label='Beam *'
            directions='column'
            placeholder='e.g. 25.4'
            register={register}
            {...register("beam", { require: "Beam is required" })}
          />
          <InputErrorMessage message={errors.beam?.message} />
        </Column>
        <Column>
          <Input
            label='Depth *'
            directions='column'
            placeholder='e.g. 7.2'
            register={register}
            {...register("depth", { require: "Depth is required" })}
          />
          <InputErrorMessage message={errors.depth?.message} />
        </Column>
        <Column>
          <Input
            label='Draft *'
            directions='column'
            placeholder='e.g. 5.8'
            register={register}
            {...register("draft", { require: "Draft is required" })}
          />
          <InputErrorMessage message={errors.draft?.message} />
        </Column>
        <Column>
          <Input
            label='Tonnage *'
            directions='column'
            placeholder='e.g. 4000'
            register={register}
            {...register("tonnage", { require: true })}
          />
          <InputErrorMessage message={errors.tonnage?.message} />
        </Column>
        <Column>
          <Input
            label='Cargo capacity *'
            directions='column'
            placeholder='e.g. 3990 cbm'
            register={register}
            {...register("cargoCapacity", { required: "Cargo capacity is required" })}
          />
          <InputErrorMessage message={errors.cargoCapacity?.message} />
        </Column>
        <Column>
          <Input
            type='number'
            label='Build year'
            directions='column'
            placeholder='e.g. 1997'
            register={register}
            {...register("buildYear")}
          />
          <InputErrorMessage message={errors.buildYear?.message} />
        </Column>
        <Column>
          <Input label='Refit year' directions='column' placeholder='e.g. 2011' register={register} {...register("refitYear")} />
          <InputErrorMessage message={errors.refitYear?.message} />
        </Column>
        <Input label='Build country' directions='column' placeholder='e.g. Poland' register={register} {...register("buildCountry")} />
      </Form>
      <Form>
        <Controller
          name='remarks'
          control={control}
          render={({ field }) => (
            <TextArea {...field} defaultValue='' label='Remarks' directions='column' register={register} {...register("remarks")} />
          )}
        />

        <Controller
          name='Description'
          control={control}
          render={({ field }) => (
            <TextArea {...field} defaultValue='' label='Description' directions='column' register={register} {...register("description")} />
          )}
        />

        <Column>
          <ImageUploader
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
        <Button onClick={cancelEditBtn} $variation='secondary'>
          Cancel
        </Button>
      </Row>
    </form>
  );
};

export default ShipsForm;
