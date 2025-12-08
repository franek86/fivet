import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1rem 1.4rem;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background: var(--bg-linear-gradient);
    font-weight: 600;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease-in-out;
    &:hover {
      background: var(--bg-linear-gradient-soft);
      color: var(--color-grey-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-200);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  third: css`
    color: var(--color-grey-0);
    background: var(--color-grey-600);
    border: 1px solid var(--color-grey-600);

    &:hover {
      color: var(--color-grey-600);
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background: var(--color-red-700);
    gap: 4px;
    font-size: 1.2rem;

    &:hover {
      color: var(--color-red-700);
      background-color: var(--color-red-100);
    }
  `,
  icon: css`
    width: 100%;
    gap: 0.75rem;
    font-size: 1.3rem;
    background-color: transparent;
    justify-content: space-between;

    &:hover {
      background-color: var(--color-brand-200);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }

  ${(props) => sizes[props.$size]};
  ${(props) => variations[props.$variation]}
`;
Button.defaultProps = {
  $variation: "primary",
  $size: "medium",
};

export default Button;
