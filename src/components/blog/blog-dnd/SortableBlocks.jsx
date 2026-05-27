import { useState } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import BlogBlocks from "./BlogEditorDnd.jsx";
import { BLOCK_ICON, DEFAULT_BLOCK, PALETTE_BLOCKS } from "../../../constants/index.js";
import { GripVertical } from "lucide-react";

/* ─────────────────────────────────────────────
   Styled
───────────────────────────────────────────── */
const Layout = styled.div`
  display: flex;
  gap: 0;
  align-items: flex-start;
`;

/* ── Header ── */
const Header = styled.div`
  width: 72px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 0;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  background: var(--color-grey-200);
  margin-right: 14px;
  position: sticky;
  top: 16px;
`;

const HeaderLabel = styled.span`
  font-size: 10px;
  color: var(--colot-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
`;

const PaletteItem = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1.5px dashed var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  cursor: grab;
  user-select: none;
  transition:
    border-color 0.15s,
    background 0.15s,
    transform 0.1s;

  &:hover {
    border-color: var(--color-text-muted);
    background: var(--color-accent);
    transform: scale(1.04);
  }

  &:active {
    cursor: grabbing;
  }
`;

const PaletteIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const PaletteLabel = styled.span`
  font-size: 9px;
  color: var(--color-text);
  font-weight: 500;
`;

/* ── Canvas ── */
const Canvas = styled.div`
  flex: 1;
  min-height: 120px;
`;

const DropZone = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: 10px;
  padding: 32px 20px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-muted);
  transition:
    border-color 0.15s,
    background 0.15s;
  background: ${({ $over }) => ($over ? "var(--color-white)" : "transparent")};
  border-color: ${({ $over }) => ($over ? "var(--color-accent)" : "var(--color-border)")};
`;

/* ── Sortable row ── */
const SortableRow = styled.div`
  position: relative;

  &:hover .drag-handle {
    opacity: 1;
  }
`;

const DragHandle = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: grab;
  color: var(--color-text);
  font-size: 14px;
  transition:
    opacity 0.15s,
    color 0.15s;
  user-select: none;

  &:hover {
    color: var(--color-accent);
  }
`;

/* ── DragOverlay card ── */
const OverlayCard = styled.div`
  border: 2px solid var(--color-accent);
  border-radius: 10px;
  background: var(--color-white);
  box-shadow: var(--box-shadow-md);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.95;
  pointer-events: none;
`;

/* ─────────────────────────────────────────────
   Single sortable canvas block
───────────────────────────────────────────── */
function SortableItem({ field, index, register, control, remove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SortableRow>
        <DragHandle className='drag-handle' {...listeners} {...attributes} title='Drag to reorder'>
          <GripVertical size={16} />
        </DragHandle>
        <BlogBlocks type={field.type} index={index} register={register} control={control} remove={remove} />
      </SortableRow>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main SortableBlocks
───────────────────────────────────────────── */
const SortableBlocks = ({ fields, register, control, remove, move, append }) => {
  const [activeId, setActiveId] = useState(null);
  const [activePalette, setActivePalette] = useState(null);
  const [canvasOver, setCanvasOver] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const activeField = fields.find((f) => f.id === activeId);

  /* ── dnd-kit: reorder existing blocks ── */
  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const from = fields.findIndex((f) => f.id === active.id);
    const to = fields.findIndex((f) => f.id === over.id);
    move(from, to);
  };

  /* ── Native HTML drag: palette → canvas ── */
  const handlePaletteDragStart = (type) => setActivePalette(type);
  const handlePaletteDragEnd = () => setActivePalette(null);

  const handleCanvasDragOver = (e) => {
    if (!activePalette) return;
    e.preventDefault();
    setCanvasOver(true);
  };
  const handleCanvasDragLeave = () => setCanvasOver(false);
  const handleCanvasDrop = (e) => {
    e.preventDefault();
    setCanvasOver(false);
    const type = e.dataTransfer.getData("paletteType") || activePalette;
    if (type) append({ ...DEFAULT_BLOCK[type] });
    setActivePalette(null);
  };

  return (
    <Layout>
      {/* ── LEFT SIDEBAR PALETTE ── */}
      <Header>
        <HeaderLabel>Blocks</HeaderLabel>
        {PALETTE_BLOCKS.map(({ type, label, icon }) => {
          const Icon = icon;
          return (
            <PaletteItem
              key={type}
              draggable
              title={`Drag to add ${label}`}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "copy";
                e.dataTransfer.setData("paletteType", type);
                handlePaletteDragStart(type);
              }}
              onDragEnd={handlePaletteDragEnd}
            >
              <PaletteIcon>
                <Icon size={14} />
              </PaletteIcon>
              <PaletteLabel>{label}</PaletteLabel>
            </PaletteItem>
          );
        })}
      </Header>

      {/* ── RIGHT CANVAS ── */}
      <Canvas onDragOver={handleCanvasDragOver} onDragLeave={handleCanvasDragLeave} onDrop={handleCanvasDrop}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            {fields.length === 0 ? (
              <DropZone $over={canvasOver}>{canvasOver ? "Release to add block" : "← Drag a block from the left to get started"}</DropZone>
            ) : (
              <>
                {fields.map((field, index) => (
                  <SortableItem key={field.id} field={field} index={index} register={register} control={control} remove={remove} />
                ))}
                {/* drop zone at bottom when canvas already has blocks */}
                {activePalette && (
                  <DropZone $over={canvasOver} style={{ marginTop: 10 }}>
                    Release to add {activePalette} block
                  </DropZone>
                )}
              </>
            )}
          </SortableContext>

          {/* floating ghost while reordering */}
          <DragOverlay>
            {activeField ? (
              <OverlayCard>
                <span style={{ fontSize: 18, opacity: 0.6 }}>{BLOCK_ICON[activeField.type] || "□"}</span>
                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>{activeField.type} block</span>
              </OverlayCard>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Canvas>
    </Layout>
  );
};

export default SortableBlocks;
