import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import Title from "../ui/Title.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";

import { forgetPasswordApi, resetPasswordApi, verifyOtpForgetPasswordApi } from "../../services/apiAuth.js";

import styled from "styled-components";
import { toast } from "react-toastify";
import ResetPasswordForm from "./ResetPasswordForm.jsx";

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ShowOtpWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const OtpInput = styled.input`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-500);
  text-align: center;
  font-size: 2rem;
`;

const ResendOtp = styled.p`
  font-weight: 600;
  color: var(--color-brand-600);
  cursor: pointer;
  &:hover {
    color: var(--color-brand-300);
  }
`;

function ForgotPasswordForm() {
  const [step, setStep] = useState("emailStep");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userEmail, setUserEmail] = useState(null);
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const { mutate: forgetPasswordMutation, isPending } = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (_, { email }) => {
      setUserEmail(email);
      //setOtp("otp");
      setStep("otpStep");
      setResend(false);
      startResendTimer();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyOtpMutation, isPending: verifyOtpPending } = useMutation({
    mutationFn: verifyOtpForgetPasswordApi,
    onSuccess: (_, { email, otp }) => {
      setStep("resetStep");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: resetPasswordMutation } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (_, { email, password }) => {
      setStep("emailStep");
      toast.success("Password reset successfully! Please login with your new password.");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmitEmail = ({ email }) => {
    forgetPasswordMutation({ email });
  };

  const onHandleVerifyOtp = () => {
    verifyOtpMutation({ email: userEmail, otp });
  };

  return (
    <>
      {step === "emailStep" && (
        <>
          <Title>Forgot password</Title>
          <Form onSubmit={handleSubmit(onSubmitEmail)}>
            <Input
              directions='column'
              placeholder='Email address'
              label='Email *'
              name='email'
              register={register}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              autoComplete='email'
            />
            <InputErrorMessage message={errors.email?.message} />

            <Button>{isPending ? "Submitting..." : "Submit"}</Button>
          </Form>
        </>
      )}
      {step === "otpStep" && (
        <>
          <Title tag='h4'>Enter OTP</Title>
          <ShowOtpWrapper>
            {otp?.map((digit, index) => (
              <OtpInput
                key={index}
                type='text'
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
              />
            ))}
          </ShowOtpWrapper>
          <Button disabled={verifyOtpPending} onClick={onHandleVerifyOtp}>
            {verifyOtpPending ? "Verifing..." : "Verify OTP"}
          </Button>
          <>{resend ? <ResendOtp onClick={resendOtp}>Resend OTP</ResendOtp> : `Resend OTP in ${timer}`}</>
        </>
      )}

      {step === "resetStep" && <ResetPasswordForm email={userEmail} />}
    </>
  );
}

export default ForgotPasswordForm;
