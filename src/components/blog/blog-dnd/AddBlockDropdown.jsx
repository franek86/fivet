import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BLOCK_OPTIONS, DEFAULT_BLOCK } from "../../../constants/index.js";

/* ── styled ── */
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 1.2rem;
`;

const TriggerBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 500;
  border: 1.5px dashed var(--color-border);
  border-radius: var(--border-radius-lg);
  background: transparent;
  cursor: pointer;
  color: var(--color-text);
  transition:
    border-color 0.15s,
    color 0.15s;
  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 200;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-md);
  min-width: 160px;
  overflow: hidden;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 14px;
  font-size: 13px;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  cursor: pointer;
  color: var(--color-text);

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--color-white);
  }

  span.icon {
    font-size: 15px;
    opacity: 0.6;
    width: 18px;
    text-align: center;
  }
`;

/* ── component ── */
const AddBlockDropdown = ({ append }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAdd = (type) => {
    append({ ...DEFAULT_BLOCK[type] });
    setOpen(false);
  };

  return (
    <Wrapper ref={menuRef}>
      <TriggerBtn type='button' onClick={() => setOpen((o) => !o)}>
        <span>
          <Plus size={14} />
        </span>
        Add block
      </TriggerBtn>

      {open && (
        <Menu>
          {BLOCK_OPTIONS.map(({ type, label, icon }) => {
            const Icon = icon;
            return (
              <MenuItem key={type} type='button' onClick={() => handleAdd(type)}>
                <span className='icon'>
                  <Icon size={14} />
                </span>
                {label}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </Wrapper>
  );
};

export default AddBlockDropdown;
