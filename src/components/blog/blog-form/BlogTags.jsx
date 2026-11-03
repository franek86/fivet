import { useState } from "react";
import styled from "styled-components";

const BlogTags = ({ value, onChange, placeholder, max, invalid, id }) => {
  const [draft, setDraft] = useState("");

  const add = () => {
    const next = draft.trim().replace(/,$/, "");
    if (next && !value.includes(next) && value.length < max) onChange([...value, next]);
    setDraft("");
  };

  return (
    <TagBox $error={invalid}>
      {value.map((tag) => (
        <Chip key={tag}>
          {tag}
          <ChipRemove type='button' aria-label={`Remove ${tag}`} onClick={() => onChange(value.filter((x) => x !== tag))}>
            ×
          </ChipRemove>
        </Chip>
      ))}
      <TagField
        id={id}
        value={draft}
        placeholder={value.length ? "" : placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={add}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
      />
    </TagBox>
  );
};

export default BlogTags;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: var(--color-accent);
  }
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 4px 3px 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-white);
  background: var(--color-accent);
  border-radius: 999px;
`;

export const ChipRemove = styled.button`
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  font-size: 15px;
  line-height: 1;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid var(--color-accent);
  }
`;

export const TagField = styled.input`
  flex: 1;

  background-color: transparent;
  padding: 1.35rem 1rem;
  border: 0;
  min-width: 100%;

  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1.2rem;
    color: var(--color-text-muted);
  }
`;
