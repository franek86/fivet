import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 14px;
    padding: 12px 14px;
    text-transform: uppercase;
    text-align: center;
  `,
  medium: css`
    padding: 10px 12px;
  `,
};

const variations = {
  primary: css`
    color: var(--color-text);
    background-color: var(--color-accent);
    font-weight: 600;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease-in-out;
    &:hover {
      background: var(--color-accent-600);
      color: var(--color-white);
    }
  `,
  secondary: css`
    color: var(--color-text);
    background: var(--color-grey-200);
    border: 1px solid var(--color-border);

    &:hover {
      background-color: var(--color-white);
    }
  `,
  third: css`
    color: var(--color-white);
    background: var(--color-text);
    border: 1px solid var(--color-text);

    &:hover {
      color: var(--color-text);
      background-color: var(--color-white);
    }
  `,
  danger: css`
    color: var(--color-white);
    background-color: var(--color-danger);
    gap: 4px;
    font-size: 1.2rem;

    &:hover {
      opacity: 0.7;
    }
  `,
  icon: css`
    width: 100%;
    gap: 0.75rem;
    font-size: 1.3rem;
    background: transparent;
    justify-content: space-between;

    &:hover {
      background: var(--color-accent);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-lg);
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
