import styled from "styled-components";
import { Controller } from "react-hook-form";
import ImageUploader from "../../ImageUploader.jsx";
import { Trash2 } from "lucide-react";
import { COL_BLOCK_TYPES } from "../../../constants/index.js";
import TextEditor from "../../text-editor/index.jsx";

/* ─────────────────────────────────────────────
   Shared styled components
───────────────────────────────────────────── */
const BlockWrapper = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);
  padding: 14px 16px;
  margin-bottom: 12px;
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BlockLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text);
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text);
  &:hover {
    color: var(--color-danger);
  }
`;

const AltInput = styled.input`
  width: 100%;
  padding: 7px 11px;
  font-size: 13px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
  background: var(--color-white);
  color: var(--color-text);
  outline: none;
  margin-top: 8px;
  transition: border-color 0.15s;
  &:focus {
    border-color: var(--color-accent);
  }
  &::placeholder {
    color: var(--color-text-muted);
  }
`;

/* ─────────────────────────────────────────────
   Columns styled
───────────────────────────────────────────── */
const ColCountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const ColCountLabel = styled.span`
  font-size: 11px;
  color: var(--color-text);
  margin-right: 4px;
`;

const ColCountBtn = styled.button`
  padding: 3px 10px;
  font-size: 12px;
  border: 1px solid ${({ $active }) => ($active ? "var(--color-accent)" : "var(--color-border)")};
  border-radius: 5px;
  background: ${({ $active }) => ($active ? "var(--color-accent)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--color-text)" : "var(--color-text)")};
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  transition: all 0.15s;
`;

const ColsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  gap: 8px;
`;

const ColCell = styled.div`
  border: 1.5px dashed var(--color-border);
  border-radius: 8px;
  min-height: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--color-white);
`;

const ColItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 5px 8px;
  font-size: 12px;
  color: var(--color-text);
`;

const ColItemRemove = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text);
  padding: 0;
  &:hover {
    color: var(--color-danger);
  }
`;

const ColAddBtn = styled.button`
  font-size: 11px;
  color: var(--color-text-muted);
  background: none;
  border: 1px dashed var(--color-border);
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
  &:hover {
    border-color: var(--color-accent);
    color: var(--color-text);
  }
`;

/* ─────────────────────────────────────────────
   Text block
───────────────────────────────────────────── */
function TextBlock({ index, control, remove }) {
  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockLabel>Text</BlockLabel>
        <RemoveBtn type='button' onClick={() => remove(index)} aria-label='remove block'>
          <Trash2 size={16} />
        </RemoveBtn>
      </BlockHeader>
      <Controller
        control={control}
        name={`blocks.${index}.text`}
        render={({ field }) => <TextEditor content={field.value} onChange={field.onChange} />}
      />
    </BlockWrapper>
  );
}

/* ─────────────────────────────────────────────
   Image block
───────────────────────────────────────────── */
function ImageBlock({ index, register, control, remove }) {
  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockLabel>Image</BlockLabel>
        <RemoveBtn type='button' onClick={() => remove(index)} aria-label='remove block'>
          <Trash2 size={16} />
        </RemoveBtn>
      </BlockHeader>
      <Controller
        name={`blocks.${index}.imageUrl`}
        control={control}
        render={({ field }) => (
          <ImageUploader name={`blocks.${index}.imageUrl`} value={field.value} onChange={(file) => field.onChange(file)} />
        )}
      />
      <AltInput type='text' placeholder='Image alt text / description' {...register(`blocks.${index}.imageAlt`)} />
    </BlockWrapper>
  );
}

/* ─────────────────────────────────────────────
   Columns block
───────────────────────────────────────────── */
function ColumnsBlock({ index, control, remove }) {
  return (
    <Controller
      name={`blocks.${index}`}
      control={control}
      render={({ field }) => {
        const block = field.value;

        const setCols = (n) => field.onChange({ ...block, cols: n });

        const addToCol = (colIdx, type) => {
          const newCols = block.columns.map((c, i) => (i === colIdx ? [...c, { type, id: `ci_${Date.now()}` }] : c));
          field.onChange({ ...block, columns: newCols });
        };

        const removeFromCol = (colIdx, itemIdx) => {
          const newCols = block.columns.map((c, i) => (i === colIdx ? c.filter((_, j) => j !== itemIdx) : c));
          field.onChange({ ...block, columns: newCols });
        };

        return (
          <BlockWrapper>
            <BlockHeader>
              <BlockLabel>Columns</BlockLabel>
              <RemoveBtn type='button' onClick={() => remove(index)} aria-label='remove block'>
                <Trash2 size={16} />
              </RemoveBtn>
            </BlockHeader>

            <ColCountRow>
              <ColCountLabel>Columns:</ColCountLabel>
              {[2, 3, 4].map((n) => (
                <ColCountBtn key={n} type='button' $active={block.cols === n} onClick={() => setCols(n)} aria-label={`${n} columns`}>
                  {n}
                </ColCountBtn>
              ))}
            </ColCountRow>

            <ColsGrid $cols={block.cols}>
              {Array.from({ length: block.cols }, (_, colIdx) => (
                <ColCell key={colIdx}>
                  {(block.columns[colIdx] || []).map((item, itemIdx) => (
                    <ColItem key={item.id || itemIdx}>
                      <span style={{ opacity: 0.5 }}>{item.type === "image" ? "🖼" : "T"}</span>
                      {/* TO DO: Add text input and image */}
                      {item.type}
                      <ColItemRemove type='button' onClick={() => removeFromCol(colIdx, itemIdx)} aria-label='remove item'>
                        <Trash2 size={14} />
                      </ColItemRemove>
                    </ColItem>
                  ))}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: "auto" }}>
                    {COL_BLOCK_TYPES.map(({ type, label, icon }) => {
                      const Icon = icon;
                      return (
                        <ColAddBtn
                          key={type}
                          type='button'
                          onClick={() => addToCol(colIdx, type)}
                          aria-label={`add ${label} to column ${colIdx + 1}`}
                        >
                          <Icon size={14} /> {label}
                        </ColAddBtn>
                      );
                    })}
                  </div>
                </ColCell>
              ))}
            </ColsGrid>
          </BlockWrapper>
        );
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Main switch
───────────────────────────────────────────── */
const BlogBlocks = ({ type, index, register, control, remove }) => {
  if (type === "text") return <TextBlock index={index} register={register} remove={remove} control={control} />;
  if (type === "image") return <ImageBlock index={index} register={register} control={control} remove={remove} />;
  if (type === "columns") return <ColumnsBlock index={index} control={control} remove={remove} />;
  return null;
};

export default BlogBlocks;
