import { useEffect } from "react";

import { useForm } from "react-hook-form";

import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Spinner from "../Spinner.jsx";
import ProfileImageUploader from "../profile/ProfileImageUploader.jsx";

import styled from "styled-components";

import { useEditCompanyProfile, useGetCompanyProfile } from "../../hooks/useCompany.js";

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

const StyledForm = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 32px 0;

  /* =========================
     Header
  ========================= */

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-border);

    @media screen and (max-width: 640px) {
      flex-direction: column;
      align-items: stretch;
    }

    .profile-header-left {
      display: flex;
      align-items: center;
      gap: 18px;
      min-width: 0;

      .profile-avatar {
        width: 72px;
        height: 72px;
        flex-shrink: 0;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: var(--color-primary);
        color: #fff;
        font-size: 24px;
        font-weight: 700;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .profile-info {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 5px;

        h1 {
          margin: 0;
          font-size: 24px;
          line-height: 1.2;
          font-weight: 700;
          color: var(--color-text);
        }

        .email {
          font-size: 14px;
          line-height: 1.4;
          color: var(--color-text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .company-type {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          margin-top: 4px;
          padding: 4px 9px;
          border-radius: 6px;
          background: var(--color-primary-light);
          color: var(--color-primary);
          font-size: 12px;
          font-weight: 600;
        }
      }
    }

    .profile-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;

      @media screen and (max-width: 640px) {
        width: 100%;

        button {
          flex: 1;
        }
      }
    }
  }

  /* =========================
     Main layout
  ========================= */

  .profile-content {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 24px;
    align-items: start;

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .profile-main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* =========================
     Cards
  ========================= */

  .profile-card {
    padding: 24px;
    border: 1px solid var(--color-border);
    border-radius: 14px;
    background: var(--color-background);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

    @media screen and (max-width: 640px) {
      padding: 18px;
      border-radius: 12px;
    }

    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 22px;

      .card-title {
        display: flex;
        flex-direction: column;
        gap: 4px;

        h2 {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.3;
          color: var(--color-text);
        }

        p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-muted);
        }
      }
    }
  }

  /* =========================
     Form grid
  ========================= */

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin-top: 2rem;

    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .full-width {
      grid-column: 1 / -1;
    }
  }

  /* =========================
     Form fields
  ========================= */

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 7px;

    label {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text);
    }

    .field-description {
      margin-top: -2px;
      font-size: 12px;
      color: var(--color-text-muted);
    }

    input,
    textarea,
    select {
      width: 100%;
      min-height: 44px;
      padding: 0 13px;
      border: 1px solid var(--color-border);
      border-radius: 9px;
      outline: none;
      background: var(--color-background);
      color: var(--color-text);
      font-size: 14px;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease,
        background 0.15s ease;

      &::placeholder {
        color: var(--color-text-muted);
      }

      &:hover {
        border-color: var(--color-border-hover);
      }

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-light);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
        background: var(--color-background-muted);
      }
    }

    textarea {
      min-height: 110px;
      padding: 12px 13px;
      resize: vertical;
      line-height: 1.5;
    }
  }

  /* =========================
     Company logo
  ========================= */

  .company-logo-section {
    display: flex;
    align-items: center;
    gap: 18px;

    .company-logo {
      width: 88px;
      height: 88px;
      flex-shrink: 0;
      border-radius: 14px;
      border: 1px solid var(--color-border);
      background: var(--color-background-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .logo-content {
      display: flex;
      flex-direction: column;
      gap: 5px;

      strong {
        font-size: 14px;
        color: var(--color-text);
      }

      span {
        font-size: 12px;
        color: var(--color-text-muted);
      }
    }

    @media screen and (max-width: 500px) {
      align-items: flex-start;

      .company-logo {
        width: 64px;
        height: 64px;
        border-radius: 10px;
      }
    }
  }

  /* =========================
     Sidebar
  ========================= */

  .profile-sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: 901px) {
      position: sticky;
      top: 24px;
    }
  }

  .sidebar-card {
    padding: 20px;
    border: 1px solid var(--color-border);
    border-radius: 14px;
    background: var(--color-background);

    .sidebar-title {
      margin: 0 0 16px;
      font-size: 14px;
      font-weight: 700;
      color: var(--color-text);
    }
  }

  /* =========================
     Company stats / info
  ========================= */

  .company-info-list {
    display: flex;
    flex-direction: column;

    .company-info-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid var(--color-border);

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
      }

      .label {
        font-size: 12px;
        color: var(--color-text-muted);
      }

      .value {
        max-width: 60%;
        text-align: right;
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text);
        word-break: break-word;
      }
    }
  }

  /* =========================
     Status
  ========================= */

  .status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    width: fit-content;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    &.active {
      color: #16803c;
      background: #eaf8ef;
    }

    &.inactive {
      color: #a15c00;
      background: #fff4df;
    }
  }

  /* =========================
     Form actions
  ========================= */

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 8px;

    @media screen and (max-width: 500px) {
      flex-direction: column-reverse;
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
