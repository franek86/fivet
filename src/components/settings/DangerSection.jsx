import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";

import { Form, Actions, Card, Section, SectionIntro, DangerRow, Column, Dialog, Overlay } from "./settings.style.js";
import { freezeAccountSchema } from "../../utils/validationSchema.js";
import { useFreezeAccount } from "../../hooks/useSettings.js";

import Button from "../ui/Button.jsx";
import PasswordInput from "../ui/PasswordInput.jsx";

function FreezeDialog({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(freezeAccountSchema),
    defaultValues: { password: "" },
  });

  const mutation = useFreezeAccount();
  const pending = mutation.isPending;

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && !pending && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, pending]);

  return createPortal(
    <Overlay onMouseDown={(e) => e.target === e.currentTarget && !pending && onClose()}>
      <Dialog role='dialog' aria-modal='true' aria-labelledby='freeze-dialog-title'>
        <h3 id='freeze-dialog-title'>Freeze your account?</h3>
        <p>You’ll be signed out right away. Sign in again whenever you’re ready to restore your account.</p>

        <Form onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate>
          <Column>
            <PasswordInput
              autoFocus
              autoComplete='current-password'
              label='Confirm with your password'
              errors={errors.password?.message}
              {...register("password")}
            />
          </Column>

          <Actions>
            <Button $variation='secondary' onClick={onClose} disabled={pending}>
              Cancel
            </Button>
            <Button $variation='danger' type='submit' disabled={pending}>
              {pending ? "Freezing…" : "Freeze account"}
            </Button>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>,
    document.body,
  );
}

const DangerSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <Section aria-labelledby='freeze-title'>
      <SectionIntro>
        <h2 id='freeze-title'>Freeze account</h2>
        <p>Pause your account and sign out. Nothing is deleted, and signing in again restores it.</p>
      </SectionIntro>

      <Card $danger>
        <DangerRow>
          <div>
            <strong>Freeze this account</strong>
            <span>You can restore it at any time by signing in.</span>
          </div>
          <Button $variation='danger' onClick={() => setOpen(true)}>
            Freeze account
          </Button>
        </DangerRow>
      </Card>

      {open && <FreezeDialog onClose={() => setOpen(false)} />}
    </Section>
  );
};

export default DangerSection;
