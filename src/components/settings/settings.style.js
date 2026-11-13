import styled, { css } from "styled-components";

export const Page = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  color: var(--color-text);

  @media (max-width: 600px) {
    padding: 24px 16px 64px;
  }
`;

export const PageHeader = styled.header`
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);

  h1 {
    margin: 0 0 6px;
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--color-text-muted);
  }
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  padding: 32px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-of-type {
    border-bottom: 0;
  }

  @media (min-width: 860px) {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 56px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const SectionIntro = styled.div`
  h2 {
    margin: 0 0 6px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--color-text-muted);
  }

  strong {
    color: var(--color-text);
    font-weight: 500;
    overflow-wrap: anywhere;
  }
`;

export const Card = styled.div`
  background: var(--color-white);
  border: 1px solid ${(p) => (p.$danger ? "color-mix(in srgb, var(--color-danger-600) 35%, var(--color-border))" : "var(--color-border)")};
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;

  @media (max-width: 600px) {
    padding: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
`;

/* ---------- Fields ---------- */

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13.5px;
  font-weight: 500;
  color: var(--color-text);
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 12.5px;
  color: var(--color-text-muted);
`;

export const FieldError = styled.p`
  margin: 0;
  font-size: 12.5px;
  color: var(--color-danger-600);
`;

export const Note = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-text-muted);

  strong {
    color: var(--color-text);
    font-weight: 500;
    overflow-wrap: anywhere;
  }
`;

export const PasswordWrap = styled.div`
  position: relative;
`;

export const PasswordIcon = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  top: 37px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font: inherit;
  font-size: 14px;
  color: var(--color-text);
  background: var(--color-white);
  border: 1px solid ${(p) => (p.$invalid ? "var(--color-danger-600)" : "var(--color-border)")};
  border-radius: var(--border-radius-md);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: var(--color-text-muted);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${(p) => (p.$invalid ? "var(--color-danger-600)" : "var(--color-accent)")};
    box-shadow: 0 0 0 3px ${(p) => (p.$invalid ? "rgba(197, 61, 75, 0.15)" : "rgba(23, 105, 170, 0.15)")};
  }

  &:disabled {
    background: var(--color-grey-200);
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Toggle = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  padding: 4px 8px;
  font: inherit;
  font-size: 13px;
  color: var(--color-text-muted);
  background: transparent;
  border: 0;
  border-radius: var(--border-radius-sm);
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    background: var(--color-grey-200);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
  }
`;

/* ---------- Buttons ---------- */

const variants = {
  primary: css`
    color: var(--color-white);
    background: var(--color-accent);
    border-color: var(--color-accent);

    &:hover:not(:disabled) {
      background: var(--color-accent-600);
      border-color: var(--color-accent-600);
    }
  `,
  secondary: css`
    color: var(--color-text);
    background: var(--color-white);
    border-color: var(--color-border);

    &:hover:not(:disabled) {
      background: var(--color-grey-200);
    }
  `,
  danger: css`
    color: var(--color-white);
    background: var(--color-danger-600);
    border-color: var(--color-danger-600);

    &:hover:not(:disabled) {
      filter: brightness(0.92);
    }
  `,
  dangerOutline: css`
    color: var(--color-danger-600);
    background: var(--color-white);
    border-color: var(--color-danger-600);

    &:hover:not(:disabled) {
      background: var(--color-danger);
    }
  `,
};

export const Button = styled.button.attrs((p) => ({ type: p.type || "button" }))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    filter 0.15s ease;
  ${(p) => variants[p.$variant || "primary"]}

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* ---------- Feedback ---------- */

const tones = {
  success: css`
    color: var(--color-success-600);
    background: var(--color-success);
  `,
  danger: css`
    color: var(--color-danger-600);
    background: var(--color-danger);
  `,
  warning: css`
    color: var(--color-warning-600);
    background: var(--color-warning);
  `,
};

export const Alert = styled.div`
  padding: 10px 12px;
  font-size: 13.5px;
  line-height: 1.5;
  border-radius: var(--border-radius-md);
  ${(p) => tones[p.$tone || "danger"]}
`;

/* ---------- Avatar ---------- */

export const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AvatarCircle = styled.div`
  display: grid;
  place-items: center;
  flex: none;
  width: 72px;
  height: 72px;
  overflow: hidden;
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-grey-200);
  border: 1px solid var(--color-border);
  border-radius: 50%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AvatarBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

/* ---------- Danger zone & dialog ---------- */

export const DangerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  strong {
    font-size: 14px;
    font-weight: 500;
  }

  span {
    font-size: 13.5px;
    color: var(--color-text-muted);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(11, 31, 51, 0.45);
  backdrop-filter: blur(2px);
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: 440px;
  padding: 24px;
  color: var(--color-text);
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  h3 {
    margin: 0 0 6px;
    font-size: 17px;
    font-weight: 600;
  }

  > p {
    margin: 0 0 18px;
    font-size: 14px;
    line-height: 1.55;
    color: var(--color-text-muted);
  }
`;
