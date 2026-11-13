import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AvatarBody, AvatarCircle, AvatarRow, Card, FieldError, Form, Hint, Section, SectionIntro } from "./settings.style.js";
import { useChangeAvatar } from "../../hooks/useSettings.js";
import { useUser } from "../../hooks/useAuth.js";

import { avatarSchema } from "../../utils/validationSchema.js";
import Button from "../ui/Button.jsx";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const AvatarSection = () => {
  const mutation = useChangeAvatar();
  const { data: me } = useUser();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(avatarSchema), mode: "onChange" });

  const { ref: registerRef, ...avatarField } = register("avatar");
  const inputRef = useRef(null);

  const file = watch("avatar")?.[0];
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const src = preview || me?.avatar || null;
  const canSave = Boolean(file) && !errors.avatar;

  const onSubmit = (values) => mutation.mutate(values.avatar[0], { onSuccess: () => reset() });

  const onCancel = () => {
    reset();
    mutation.reset();
  };

  return (
    <Section aria-labelledby='avatar-title'>
      <SectionIntro>
        <h2 id='avatar-title'>Profile photo</h2>
        <p>Your photo appears next to your name across the platform.</p>
      </SectionIntro>

      <Card>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AvatarRow>
            <AvatarCircle>{src ? <img src={src} alt='Your profile photo' /> : getInitials(me?.fullName) || null}</AvatarCircle>

            <AvatarBody>
              <input
                type='file'
                accept='image/jpeg,image/png,image/webp'
                hidden
                {...avatarField}
                ref={(el) => {
                  registerRef(el);
                  inputRef.current = el;
                }}
              />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {file ? (
                  <>
                    <Button type='submit' disabled={!canSave || mutation.isPending}>
                      {mutation.isPending ? "Saving…" : "Save photo"}
                    </Button>
                    <Button $variant='secondary' onClick={onCancel} disabled={mutation.isPending}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button $variant='secondary' onClick={() => inputRef.current?.click()}>
                    {me?.avatar ? "Change photo" : "Upload photo"}
                  </Button>
                )}
              </div>

              <Hint>JPG, PNG or WebP, up to 2 MB.</Hint>
              {errors.avatar && <FieldError role='alert'>{errors.avatar.message}</FieldError>}
            </AvatarBody>
          </AvatarRow>
        </Form>
      </Card>
    </Section>
  );
};

export default AvatarSection;
