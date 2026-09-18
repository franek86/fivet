import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

import Spinner from "../Spinner.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import TextArea from "../ui/TextArea.jsx";
import ImageUploader from "../ImageUploader.jsx";
import CustomSelect from "../ui/CustomSelect.jsx";
import MultipleImagesUploader from "../MultipleImagesUploader.jsx";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";
import FormSection from "./ship-form/FormSection.jsx";
import DatePicker from "react-datepicker";
import Label from "../ui/Label.jsx";

import { createShipSchema, editShipSchema } from "../../utils/validationSchema.js";

import { useCreateShip } from "../../hooks/ships/useCreateShip.js";
import { useEditShip } from "../../hooks/ships/useEditShip.js";
import { useShip } from "../../hooks/ships/useShip.js";
import { useUser } from "../../hooks/useAuth.js";

import { useAllShipType } from "../../hooks/useShipType.js";
import { FormHeader } from "./ship-form/FormHeader.jsx";
import { countriesJson } from "../../utils/countriesJson.js";
import { formatedPrice } from "../../utils/formattedPrice.js";
import { CURRENCY, FUEL_TYPE } from "../../constants/index.js";

const ShipsForm = () => {
  const navigate = useNavigate();

  const { data: user } = useUser();

  const { id: shipId } = useParams();
  const isEditSession = Boolean(shipId);

  const { allShipType } = useAllShipType();
  const { data: singleShipData, isLoading, isError } = useShip(shipId);
  const { mutate: submitData, isPending } = useCreateShip();
  const { mutate: editShip, isPending: editPendingShip } = useEditShip();

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteImageIds, setDeleteImageIds] = useState([]);

  const [openSections, setOpenSections] = useState({
    basic: true,
  });
  const [activeSection, setActiveSection] = useState("basic");

  const schema = isEditSession ? editShipSchema : createShipSchema;

  /* Required fields */
  const requiredFields = ["shipName", "imo", "typeId", "slug", "price", "mainImage"];

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      imagesMeta: [],
    },
    resolver: zodResolver(schema),
    shouldUnregister: false,
  });

  const shipNameWatch = watch("shipName", "");
  const requierdFiledsWatch = useWatch({
    control,
    name: requiredFields,
  });

  useEffect(() => {
    const slugify = shipNameWatch
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValue("slug", slugify);
  }, [shipNameWatch, setValue]);

  useEffect(() => {
    if (!singleShipData || !isEditSession) return;

    const normalizedImages = (singleShipData.images || []).map((img) => (typeof img === "string" ? { url: img } : img));

    // 1. Reset form first
    reset({
      ...singleShipData,
      images: normalizedImages,
    });

    // 2. Set existing images state
    setExistingImages(
      normalizedImages.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt || "",
        publicId: img.publicId || "",
      })),
    );

    // 3. Pre-fill alt fields AFTER reset so they aren't wiped
    normalizedImages.forEach((img) => {
      if (img.id) setValue(`existingImagesAlt_${img.id}`, img.alt || "");
    });
  }, [singleShipData, isEditSession, reset, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Handle mainImage
    if (data.mainImage instanceof File) {
      formData.append("mainImage", data.mainImage);
    }

    // Handle multiple images
    newImages.forEach((img) => {
      formData.append("images", img.file);
    });

    // New image: only alt
    const newImagesMeta = newImages.map((img) => ({
      alt: img.alt || "",
    }));

    // New images: only alt
    const existingImagesMeta = existingImages.map((img) => ({
      id: img.id,
      alt: img.alt || "",
    }));

    // Append imagesMeta as JSON
    formData.append("existingImagesMeta", JSON.stringify(existingImagesMeta));
    formData.append("imagesMeta", JSON.stringify(newImagesMeta));

    // deleteImageIds = ["publicId1", "publicId2"]
    if (deleteImageIds && deleteImageIds.length > 0) {
      formData.append("deleteImageIds", JSON.stringify(deleteImageIds));
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "mainImage" && key !== "newImages" && key !== "existingImages") {
        formData.append(key, value ?? "");
      }
    });

    if (isEditSession) {
      editShip({ newData: formData, id: shipId });
    } else {
      submitData(formData);
    }
  };

  const cancelEditBtn = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  /* Handle toggle section */
  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setActiveSection(id);
  };

  const openSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: true,
    }));

    setActiveSection(id);

    setTimeout(() => {
      document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* Progress bar */
  const completedRequiredFields = requierdFiledsWatch.filter(
    (value) => value !== undefined && value !== null && String(value).trim() !== "",
  ).length;
  const progress = Math.round((completedRequiredFields / requiredFields.length) * 100);

  const formatPrice = (value) => {
    if (value === null || value === "") {
      return "";
    }

    const number = typeof value === "number" ? value : Number(value.replace(/\D/g, ""));

    if (Number.isNaN(number)) {
      return "";
    }

    return new Intl.NumberFormat("en-US").format(number);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <Page>
      <FormHeader
        progress={progress}
        completedRequiredFields={completedRequiredFields}
        requiredFields={requiredFields}
        completed={completedRequiredFields}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Main>
          {user.role === "ADMIN" && (
            <ColumnPublish>
              <Controller
                name='isPublished'
                control={control}
                render={({ field }) => (
                  <ToggleSwitch label='Publish on web' name='isPublished' checked={!!field.value} onChange={field.onChange} />
                )}
              />
            </ColumnPublish>
          )}

          {/* SECTION BASIC VESSEL INFORMATION */}
          <FormSection
            id='basic'
            title='Basic information'
            description='Start with the essential vessel details.'
            open={openSections.basic}
            onToggle={() => toggleSection("basic")}
          >
            <Grid>
              {/* Vessle name input */}
              <Column>
                <Input
                  label='Ship name *'
                  placeholder='e.g. MV Ocean Star'
                  directions='column'
                  register={register}
                  {...register("shipName", { required: "Ship name is required" })}
                />
                <InputErrorMessage message={errors.shipName?.message} />
              </Column>

              {/* Slug input */}
              <Column>
                <Input
                  label='Slug *'
                  placeholder='e.g mv-ocean-star'
                  directions='column'
                  register={register}
                  {...register("slug", { required: "Slug is required" })}
                />
                <InputErrorMessage message={errors.slug?.message} />
              </Column>

              {/* IMO input */}
              <Column>
                <Input
                  type='number'
                  label='IMO number *'
                  placeholder='e.g. 9604732'
                  directions='column'
                  register={register}
                  {...register("imo")}
                />
                <InputErrorMessage message={errors.imo?.message} />
              </Column>

              {/* Ship type select */}
              <Column>
                <Controller
                  name='typeId'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      control={control}
                      options={allShipType}
                      placeholder='Vessel Type'
                      label='Select vessel type'
                      size='medium'
                      variation='transparent'
                      valueKey='id'
                      {...register("typeId", { required: "Vessel type is required" })}
                    />
                  )}
                />
                <InputErrorMessage message={errors.typeId?.message} />
              </Column>

              {/* Flag input */}
              <Column>
                <Controller
                  name='flag'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      control={control}
                      options={countriesJson}
                      placeholder='Select flag'
                      label='Flag'
                      size='medium'
                      variation='transparent'
                      {...register("flag")}
                    />
                  )}
                />

                <InputErrorMessage message={errors.flag?.message} />
              </Column>

              {/* Build year */}
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

              {/* Build country */}
              <Column>
                <Input
                  label='Build country'
                  directions='column'
                  placeholder='e.g. Poland'
                  register={register}
                  {...register("buildCountry")}
                />
              </Column>
            </Grid>
          </FormSection>

          {/* SECTION DIMENSION AND CAPACITY */}
          <FormSection
            id='section-dimensions'
            title='Dimensions & capacity'
            description='Physical characteristics and vessel capacity.'
            open={openSections.dimensions}
            onToggle={() => toggleSection("dimensions")}
          >
            <SubSectionTitle>Capacity</SubSectionTitle>
            <Grid>
              {/* DEADWEIGHT */}
              <Column>
                <Input
                  type='number'
                  label='Deadweight *'
                  directions='column'
                  placeholder='e.g. 28,240'
                  register={register}
                  {...register("dwt", { require: true })}
                />
                <InputErrorMessage message={errors.dwt?.message} />
              </Column>

              {/* GROSS TONNAGE */}
              <Column>
                <Input
                  type='number'
                  label='Gross tonnage *'
                  directions='column'
                  placeholder='e.g. 17,019'
                  register={register}
                  {...register("grossTonnage", { require: true })}
                />
                <InputErrorMessage message={errors.grossTonnage?.message} />
              </Column>

              {/* NET TONNAGE */}
              <Column>
                <Input
                  type='number'
                  label='Net tonnage *'
                  directions='column'
                  placeholder='e.g. 10,108'
                  register={register}
                  {...register("netTonnage", { require: true })}
                />
                <InputErrorMessage message={errors.netTonnage?.message} />
              </Column>
            </Grid>

            <Divider />

            <SubSectionTitle>Dimensions</SubSectionTitle>

            <Grid>
              {/* LENGHT OVERALL */}
              <Column>
                <Input
                  type='number'
                  step='0.01'
                  label='Length overall (meters) *'
                  directions='column'
                  placeholder='e.g. 169.37'
                  register={register}
                  {...register("lengthOverall", { required: "Length overall is required" })}
                />
                <InputErrorMessage message={errors.lengthOverall?.message} />
              </Column>

              {/* BEAM */}
              <Column>
                <Input
                  type='number'
                  step='0.01'
                  label='Beam (meters) *'
                  directions='column'
                  placeholder='e.g. 27.24'
                  register={register}
                  {...register("beam", { require: "Beam is required" })}
                />
                <InputErrorMessage message={errors.beam?.message} />
              </Column>

              {/* DRAFT */}
              <Column>
                <Input
                  type='number'
                  step='0.01'
                  label='Draft (meters) *'
                  directions='column'
                  placeholder='e.g. 9.29'
                  register={register}
                  {...register("draft", { require: "Draft is required" })}
                />
                <InputErrorMessage message={errors.draft?.message} />
              </Column>
            </Grid>
          </FormSection>

          {/* SECTION TECHNICAL */}
          <FormSection
            id='section-technical'
            title='Technical details'
            description='Engine, fuel and performance information.'
            open={openSections.technical}
            onToggle={() => toggleSection("technical")}
          >
            <Grid>
              {/* MAIN ENGINE */}
              <Column>
                <Input
                  label='Main engine'
                  directions='column'
                  placeholder='e.g. MAN B&W 6S42MC'
                  register={register}
                  {...register("mainEngine")}
                />
                <InputErrorMessage message={errors.mainEngine?.message} />
              </Column>

              {/* ENGINE POWER */}
              <Column>
                <Input
                  label='Engine power (kW)'
                  directions='column'
                  placeholder='e.g. 7500'
                  register={register}
                  {...register("enginePower")}
                />
                <InputErrorMessage message={errors.enginePower?.message} />
              </Column>

              {/* SELECT FUEL TYPE*/}
              <Column>
                <Controller
                  name='fuelType'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      control={control}
                      options={FUEL_TYPE}
                      placeholder='Select fuel'
                      label='Fuel type'
                      size='medium'
                      variation='transparent'
                      {...register("fuelType")}
                    />
                  )}
                />
                <InputErrorMessage message={errors.fuelType?.message} />
              </Column>

              {/* SPEED KNOTS */}
              <Column>
                <Input
                  type='number'
                  step='0.1'
                  label='Cruising speed (knots)'
                  directions='column'
                  placeholder='e.g. 14.5'
                  register={register}
                  {...register("cruisingSpeed")}
                />
                <InputErrorMessage message={errors.cruisingSpeed?.message} />
              </Column>
            </Grid>
          </FormSection>

          {/* SECTION CLASSIFICATION */}
          <FormSection
            id='section-classification'
            title='Classification & surveys'
            description='Classification society and survey dates.'
            open={openSections.classification}
            onToggle={() => toggleSection("classification")}
          >
            <Grid>
              {/* Class notation*/}
              <Column>
                <Input
                  label='Class notation'
                  directions='column'
                  placeholder='"e.g. +1A1'
                  register={register}
                  {...register("classNotation")}
                />
                <InputErrorMessage message={errors.classNotation?.message} />
              </Column>

              {/* SS Due date */}
              <Column>
                <Label>Special survey due</Label>
                <Controller
                  control={control}
                  name='ssDueDate'
                  render={({ field }) => {
                    return (
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat='dd.MM.yyyy'
                        placeholderText='e.g. 2011'
                        calendarClassName='custom-calendar'
                        startDate={field.value}
                      />
                    );
                  }}
                />

                <InputErrorMessage message={errors.ssDueDate?.message} />
              </Column>

              {/* Dry dock due */}
              <Column>
                <Label>Dry dock due</Label>
                <Controller
                  control={control}
                  name='ddDueDate'
                  render={({ field }) => {
                    return (
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat='dd.MM.yyyy'
                        placeholderText='e.g. 2011'
                        calendarClassName='custom-calendar'
                        startDate={field.value}
                      />
                    );
                  }}
                />

                <InputErrorMessage message={errors.ddDueDate?.message} />
              </Column>
            </Grid>
          </FormSection>

          {/* SECTION COMMERCAIL */}
          <FormSection
            id='section-commercial'
            title='Commercial information'
            description='Availability and pricing.'
            open={openSections.commercial}
            onToggle={() => toggleSection("commercial")}
          >
            <Grid>
              {/* Price */}
              <Column>
                <Controller
                  name='price'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='text'
                      inputMode='numeric'
                      label='Price *'
                      directions='column'
                      placeholder='e.g. 25000'
                      register={register}
                      value={formatPrice(field.value)}
                      onChange={(event) => {
                        const rawValue = event.target.value.replace(/\D/g, "");

                        field.onChange(rawValue === "" ? null : Number(rawValue));
                      }}
                      onBlur={field.onBlur}
                      {...register("price")}
                    />
                  )}
                />
                <InputErrorMessage message={errors.price?.message} />
              </Column>

              <Column>
                <Controller
                  name='currency'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      control={control}
                      options={CURRENCY}
                      placeholder='Select currency'
                      label='Currency'
                      size='medium'
                      variation='transparent'
                      {...register("currency")}
                    />
                  )}
                />
                <InputErrorMessage message={errors.currency?.message} />
              </Column>
            </Grid>
          </FormSection>

          {/* SECTION VOYAGE */}
          <FormSection
            id='section-voyage'
            title='Current voyage'
            description='Current position and next destination.'
            open={openSections.voyage}
            onToggle={() => toggleSection("voyage")}
          >
            <Grid>
              {/* Current port */}
              <Column>
                <Input
                  label='Current port'
                  directions='column'
                  placeholder='e.g. Recalada, Uruguay'
                  register={register}
                  {...register("currentPort")}
                />
                <InputErrorMessage message={errors.currentPort?.message} />
              </Column>

              {/* Next port */}
              <Column>
                <Input label='Next port' directions='column' placeholder='e.g. Rotterdam' register={register} {...register("nextPort")} />
                <InputErrorMessage message={errors.nextPort?.message} />
              </Column>
            </Grid>
          </FormSection>

          <FormSection
            id='section-media'
            title='Description & media'
            description='Tell buyers more about this vessel.'
            open={openSections.media}
            onToggle={() => toggleSection("media")}
          >
            <Grid>
              <Column>
                <Controller
                  name='Description'
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      defaultValue=''
                      label='Description'
                      placeholder='Describe the vessel, equipment, condition and other relevant information...'
                      directions='column'
                      register={register}
                      {...register("description")}
                    />
                  )}
                />
                <InputErrorMessage message={errors.description?.message} />
              </Column>

              <Column>
                <Label htmlFor='mainImage'>Main image</Label>
                <ImageUploader
                  name='mainImage'
                  value={watch("mainImage")}
                  onChange={(file) => setValue("mainImage", file)}
                  initialImage={singleShipData?.mainImage}
                >
                  <Input
                    type='text'
                    name='mainImageAlt'
                    placeholder='Enter main image description'
                    register={register}
                    {...register("mainImageAlt")}
                  />
                </ImageUploader>

                <InputErrorMessage message={errors.mainImage?.message} />
              </Column>
            </Grid>
            <GalleryColumn>
              <MultipleImagesUploader
                name='imagesMeta'
                existingImages={existingImages}
                setExistingImages={setExistingImages}
                onNewImagesChange={setNewImages}
                newImages={newImages}
                deleteImageIds={deleteImageIds}
                onDeleteImageIdsChange={setDeleteImageIds}
              />

              <InputErrorMessage message={errors.images?.message} />
            </GalleryColumn>
          </FormSection>
          <StickyFooter>
            <FooterInner>
              <Row>
                {isEditSession ? (
                  <Button $variation='primary'>{editPendingShip ? "Editing..." : "Edit"}</Button>
                ) : (
                  <Button $variation='primary'>{isPending ? "Loading..." : "Save"}</Button>
                )}

                {/* <Button $variation='third'>Draft</Button> */}
                <Button onClick={cancelEditBtn} $variation='secondary'>
                  Cancel
                </Button>
              </Row>
            </FooterInner>
          </StickyFooter>
        </Main>
      </form>
    </Page>
  );
};

export default ShipsForm;

const Page = styled.div`
  min-height: 100vh;
  margin-top: 4rem;
  background: var(--color-bg);
  padding-bottom: 100px;
  color: var(--color-text);
`;

const Main = styled.main`
  min-width: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 18px;
  padding-top: 22px;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const StickyFooter = styled.footer`
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 1px solid var(--colot-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

const Column = styled(Row)`
  flex-direction: column;
  gap: 0;
`;

const SubSectionTitle = styled.h3`
  margin: 22px 0 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
`;

const Divider = styled.div`
  height: 1px;
  margin-top: 24px;
  background: var(--color-border);
`;

const GalleryColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const ColumnPublish = styled(Row)`
  grid-column: 1 / -1;
  justify-content: flex-start;
  align-items: center;
  margin: 2rem 0;

  span {
    font-weight: 600;
    font-size: 1.4rem;
  }
`;
