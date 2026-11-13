import React from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../utils/validationSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";

import { useChangePassword } from "../../hooks/useSettings.js";

import { Actions, Card, Column, Form, Section, SectionIntro } from "./settings.style.js";

import Button from "../ui/Button.jsx";
import PasswordInput from "../ui/PasswordInput.jsx";

const PasswordSection = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const mutation = useChangePassword();

  const onSubmit = (values) => mutation.mutate(values, { onSuccess: () => reset() });

  return (
    <Section aria-labelledby='password-title'>
      <SectionIntro>
        <h2 id='password-title'>Password</h2>
        <p>Use at least 8 characters. You'll stay signed in on this device.</p>
      </SectionIntro>

      <Card>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Column>
            <PasswordInput label='Current password' errors={errors.currentPassword?.message} {...register("currentPassword")} />
          </Column>

          <Column>
            <PasswordInput label='New password' errors={errors.newPassword?.message} {...register("newPassword")} />
          </Column>

          <Column>
            <PasswordInput label='Repeat password' errors={errors.confirmPassword?.message} {...register("confirmPassword")} />
          </Column>

          <Actions>
            <Button type='submit' disabled={mutation.isPending}>
              {mutation.isPending ? "Updating…" : "Update password"}
            </Button>
          </Actions>
        </Form>
      </Card>
    </Section>
  );
};

export default PasswordSection;
