import { useRef } from "react";

import styled, { keyframes } from "styled-components";
import Label from "./ui/Label.jsx";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreviewContainer = styled.div`
  display: grid;
  gap: 16px;
`;

const PreviewImage = styled.div`
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) auto;
  gap: 1.4rem;
  align-items: start;
  padding: 12px;
  border-radius: var(--border-radius-lg);

  background-color: var(--color-grey-200);
  border: 1px solid var(--color-border);
  animation: ${fadeIn} 0.25s ease both;
`;

const ImageThumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  img {
    width: 100%;
    border-radius: var(--border-radius-lg);
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 600;
  padding: 6px 10px;
  cursor: pointer;

  &:hover {
    color: var(--color-danger-600);
  }
`;

const UploadZone = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: 14px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--color-white);
  color: var(--color-text);

  &:hover {
    border-color: var(--color-accent);
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  svg {
    display: block;
    margin: 0 auto 10px;
    opacity: 0.5;
  }

  span {
    display: block;
    font-size: 1.2rem;
    font-weight: 500;
  }

  small {
    display: block;
    font-size: 1rem;
    margin-top: 4px;
    opacity: 0.6;
  }
`;

const CardBody = styled.div`
  padding: 10px 12px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  > input {
    background-color: var(--color-white);
    padding: 1.35rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    min-width: 100%;

    &::placeholder {
      font-size: 1.2rem;
      color: var(--color-text-muted);
    }
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const MultipleImagesUploader = ({
  name,
  existingImages = [],
  setExistingImages,
  newImages = [],
  onNewImagesChange,
  deleteImageIds = [],
  onDeleteImageIdsChange,
}) => {
  const inputRef = useRef();

  /* Add new images */
  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    const formatted = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      alt: "",
    }));

    onNewImagesChange([...newImages, ...formatted]);
    e.target.value = "";
  };

  /* Handle remove existing image */
  const handleRemoveExistingImage = (id) => {
    onDeleteImageIdsChange([...deleteImageIds, id]);

    //Remove from UI preview
    setExistingImages(existingImages.filter((img) => img.id !== id));
  };

  /* Remove a new image */
  const handleRemoveNewImage = (index) => {
    const updated = newImages.filter((_, i) => i !== index);
    onNewImagesChange(updated);
  };

  const hasExisting = existingImages.length > 0;
  const hasNew = newImages.length > 0;

  return (
    <UploadWrapper>
      <UploadZone onClick={() => inputRef.current.click()}>
        <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <polyline points='17 8 12 3 7 8' />
          <line x1='12' y1='3' x2='12' y2='15' />
        </svg>
        <span>Click to upload images</span>
        <small>PNG, JPG, WEBP — multiple files supported</small>
      </UploadZone>

      <HiddenInput type='file' name={name} multiple accept='image/*' ref={inputRef} onChange={handleSelectImages} />

      {/* == Existing Images == */}
      {hasExisting && (
        <PreviewContainer>
          {existingImages.map((img, index) => (
            <PreviewImage key={img.id}>
              <ImageThumb>
                <img src={img.url} alt={img.alt} />
              </ImageThumb>
              <CardBody>
                <input
                  type='text'
                  placeholder='Alt text'
                  value={img.alt}
                  onChange={(e) => {
                    const updated = [...existingImages];
                    updated[index] = { ...updated[index], alt: e.target.value };
                    setExistingImages(updated);
                  }}
                />
              </CardBody>

              <RemoveButton type='button' onClick={() => handleRemoveExistingImage(img.id)}>
                Remove
              </RemoveButton>
            </PreviewImage>
          ))}
        </PreviewContainer>
      )}

      {/* == New Images == */}
      {hasNew && (
        <PreviewContainer>
          {newImages.map((img, index) => (
            <PreviewImage key={index}>
              <ImageThumb>
                <img src={img.url} alt={img.alt} />
              </ImageThumb>
              <CardBody>
                <Label>Image description</Label>
                <input
                  type='text'
                  placeholder='Enter image description'
                  value={img.alt}
                  onChange={(e) => {
                    const updated = [...newImages];
                    updated[index] = { ...updated[index], alt: e.target.value };
                    onNewImagesChange(updated);
                  }}
                />
              </CardBody>

              <RemoveButton type='button' onClick={() => handleRemoveNewImage(index)}>
                Remove
              </RemoveButton>
            </PreviewImage>
          ))}
        </PreviewContainer>
      )}

      {/*  {value.length > 0 && (
        <PreviewContainer>
          {value.map((img, index) => (
            <PreviewImage key={index}>
              <img src={img.url} alt={`preview-${index}`} />
              <button type='button' onClick={() => handleRemoveImage(index)}>
                x
              </button>
            </PreviewImage>
          ))}
        </PreviewContainer>
      )} */}
    </UploadWrapper>
  );
};

export default MultipleImagesUploader;
