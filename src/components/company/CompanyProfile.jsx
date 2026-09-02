import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Spinner from "../Spinner.jsx";
import ProfileImageUploader from "../profile/ProfileImageUploader.jsx";

import styled from "styled-components";

import { useUpdateProfile } from "../../hooks/useProfile.js";
import { useEditCompanyProfile, useGetCompanyProfile } from "../../hooks/useCompany.js";

const StyledForm = styled.form`
  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3rem 0;
    gap: 10px;

    .profile-header-left {
      display: flex;
      gap: 20px;
      .profile-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .email {
          font-size: 13px;
          color: var(--color-text-muted);
        }
      }
    }
  }

  .profile-grid {
    display: grid;
    gap: 20px;
    margin-bottom: 20px;

    @media screen and (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

function CompanyProfileData() {
  const { data, isLoading } = useGetCompanyProfile();
  const { mutate: updateCompanyProfile, isPending: loadUpdateCompanyProfile } = useEditCompanyProfile(data);

  const { register, handleSubmit, setValue, watch, reset } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
        legalName: data?.legalName || "",
        vat: data?.vat || "",
        email: data?.email || "",
        country: data?.country || "",
        city: data?.city || "",
        phone: data?.phone || "",
        website: data?.website || "",
        address: data?.address || "",
        description: data?.description || "",
        logo: data?.logo || null,
      });
    }
  }, [data, reset]);

  const handleOnSubmit = (formData) => {
    const payload = new FormData();

    payload.append("name", formData.name || "");
    payload.append("legalName", formData.legalName || "");
    payload.append("vat", formData.vat || "");
    payload.append("email", formData.email || "");
    payload.append("country", formData.country || "");
    payload.append("city", formData.city || "");
    payload.append("phone", formData.phone || "");
    payload.append("website", formData.website || "");
    payload.append("address", formData.address || "");
    payload.append("description", formData.description || "");

    // Only append logo when user selected a new file
    if (formData.logo instanceof File) {
      payload.append("logo", formData.logo);
    }

    updateCompanyProfile(payload);
  };

  const handleLogoChange = (file) => {
    setValue("logo", file, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
      <div className='profile-header'>
        <div className='profile-header-left'>
          <ProfileImageUploader name='logo' value={watch("logo")} initialImage={data?.logo} onChange={handleLogoChange} />
          <div className='profile-info'>
            <h2 className='name'>{data?.name}</h2>
            <div className='email'>{data?.email}</div>
          </div>
        </div>
        <Button>{loadUpdateCompanyProfile ? "Editing..." : "Edit"}</Button>
      </div>
      <div className='profile-grid'>
        <Input register={register} {...register("name")} label='Name' directions='column' />
        <Input register={register} {...register("legalName")} label='Legal name' directions='column' />
        <Input register={register} {...register("vat")} label='Vat no.' directions='column' />
        <Input type='email' register={register} {...register("email")} label='Email' directions='column' />
      </div>
      <div className='profile-grid'>
        <Input register={register} {...register("country")} label='Country' directions='column' />
        <Input register={register} {...register("city")} label='City' directions='column' />
        <Input register={register} {...register("address")} label='Address' directions='column' />
      </div>
      <div className='profile-grid'>
        <Input register={register} {...register("phone")} label='Phone' directions='column' />
        <Input register={register} {...register("website")} label='Website' directions='column' />
      </div>
    </StyledForm>
  );
}

export default CompanyProfileData;
