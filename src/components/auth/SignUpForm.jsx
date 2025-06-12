import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import InputErrorMessage from "../ui/InputErrorMessage.jsx";
import Title from "../ui/Title.jsx";
import { FiEyeOff, FiEye } from "react-icons/fi";

import styled from "styled-components";
import { toast } from "react-toastify";

import { registerUser, verifyOtpApi } from "../../services/apiAuth.js";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;
const PasswordWrap = styled.div`
  position: relative;
`;

const PasswordIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 4rem;
  cursor: pointer;
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

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [resend, setResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userData, setUserData] = useState(null);
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

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, formData) => {
      setUserData(formData);
      setShowOtp(true);
      setResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: verifyOtpMutation, isPending: verifyOtpPending } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: () => {
      toast.success("OTP verified successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onHandleSubmit = ({ email, password, fullName }) => {
    signUp({ email, password, fullName });
  };

  const onHandleVerifyOtp = () => {
    verifyOtpMutation({ data: userData, otp });
  };

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

  const resendOtp = () => {
    if (userData) {
      signUp(userData);
    }
  };

  return (
    <>
      {!showOtp ? (
        <FormWrapper onSubmit={handleSubmit(onHandleSubmit)}>
          <Column>
            <Input
              directions='column'
              label='Full name *'
              register={register}
              {...register("fullName", { required: "Full name is required" })}
              autoComplete='fullName'
            />
            <InputErrorMessage message={errors.fullName?.message} />
          </Column>
          <Column>
            <Input
              directions='column'
              label='Email *'
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
          </Column>
          <Column>
            <PasswordWrap>
              <Input
                directions='column'
                label='Password *'
                type={showPassword ? "text" : "password"}
                register={register}
                {...register("password", {
                  required: "Password is requierd",
                  minLength: { value: 8, message: "Minimun 8 characters" },
                })}
                autoComplete='password'
              />
              <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </PasswordIcon>
            </PasswordWrap>
            <InputErrorMessage message={errors.password?.message} />
          </Column>
          <Column>
            <Input
              directions='column'
              type='password'
              label='Repeat password *'
              register={register}
              {...register("repeatPassword", {
                required: "Please repeat password",
                validate: (value) => value === watch("password") || "Passowords does not match",
              })}
              autoComplete='repeatPassword'
            />
            <InputErrorMessage message={errors.repeatPassword?.message} />
          </Column>
          <Button disabled={isPending}>{isPending ? "Signing up ..." : "Sign up"}</Button>
        </FormWrapper>
      ) : (
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
    </>
  );
}

export default SignUpForm;
