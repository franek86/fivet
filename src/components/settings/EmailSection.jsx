import React, { useState } from "react";
import { useUser } from "../../hooks/useAuth.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { confirmEmailSchema, requestEmailSchema } from "../../utils/validationSchema.js";
import { useConfirmEmailChange, useRequestEmailChange } from "../../hooks/useSettings.js";

import { Actions, Alert, Card, Column, Form, Note, PasswordWrap, PasswordIcon, Section, SectionIntro } from "./settings.style.js";
import Input from "../ui/Input.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import Button from "../ui/Button.jsx";

const RequestStep = ({ onSent }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requestEmailSchema),
    defaultValues: { email: "", password: "" },
  });
  console.log(errors);
  const mutation = useRequestEmailChange();

  // values.newEmail is already trimmed and lower-cased by the schema
  const onSubmit = (values) => mutation.mutate(values, { onSuccess: () => onSent(values.email) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Column>
        <Input
          directions='column'
          type='email'
          label='New email address'
          register={register}
          placeholder='name@company.com'
          {...register("email")}
        />
        <InputErrorMessage message={errors.email?.message} />
      </Column>

      <Column>
        <PasswordWrap>
          <Input
            directions='column'
            type={showPassword ? "text" : "password"}
            label='Current password'
            register={register}
            placeholder='*********'
            {...register("password")}
          />
          <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff className='input-icon' size={18} /> : <Eye className='input-icon' size={16} />}
          </PasswordIcon>
        </PasswordWrap>
        <InputErrorMessage message={errors.password?.message} />
      </Column>

      <Actions>
        <Button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? "Sending…" : "Send code"}
        </Button>
      </Actions>
    </Form>
  );
};

const ConfirmStep = ({ email, onBack, onDone }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: { otp: "" },
  });

  const mutation = useConfirmEmailChange();

  const onSubmit = ({ otp }) => mutation.mutate({ email: email, otp }, { onSuccess: onDone });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Note>
        We sent a 6-digit code to <strong>{email}</strong>. It expires in 5 minutes.
      </Note>

      <Column>
        <Input
          directions='column'
          label='Verification code'
          register={register}
          placeholder='123456'
          inputMode='numeric'
          autoComplete='one-time-code'
          maxLength={6}
          {...register("otp")}
        />
        <InputErrorMessage message={errors.otp?.message} />
      </Column>

      <Actions>
        <Button onClick={onBack} disabled={mutation.isPending}>
          Use a different email
        </Button>
        <Button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? "Confirming…" : "Confirm email"}
        </Button>
      </Actions>
    </Form>
  );
};

const EmailSection = () => {
  const { data: me } = useUser();
  const [pendingEmail, setPendingEmail] = useState(null);
  const [notice, setNotice] = useState(null);

  return (
    <Section aria-labelledby='email-title'>
      <SectionIntro>
        <h2 id='email-title'>Email address</h2>
        <p>
          {me?.email ? (
            <>
              Your current email is <strong>{me.email}</strong>. We'll send a code to the new address to confirm the change.
            </>
          ) : (
            "We'll send a code to the new address to confirm the change."
          )}
        </p>
      </SectionIntro>

      <Card>
        {notice && (
          <Alert $tone='success' role='status' style={{ marginBottom: 18 }}>
            {notice}
          </Alert>
        )}

        {pendingEmail ? (
          <ConfirmStep
            email={pendingEmail}
            onBack={() => setPendingEmail(null)}
            onDone={() => {
              setPendingEmail(null);
              setNotice("Your email address has been updated.");
            }}
          />
        ) : (
          <RequestStep
            onSent={(email) => {
              setNotice(null);
              setPendingEmail(email);
            }}
          />
        )}
      </Card>
    </Section>
  );
};

export default EmailSection;
