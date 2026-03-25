import { useRef } from "react";

import styled, { keyframes } from "styled-components";

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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const PreviewImage = styled.div`
  /* position: relative;
  width: 100%;
  height: 15rem; */
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  animation: ${fadeIn} 0.25s ease both;
  display: flex;
  flex-direction: column;

  /*   img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    color: white;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    cursor: pointer;
  } */
`;

const ImageThumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: rgba(15, 23, 42, 0.7);
  color: #fff;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.15s;

  &:hover {
    background: #ef4444;
  }
`;

const UploadZone = styled.div`
  border: 2px dashed var(--color-grey-300);
  border-radius: 14px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-grey-50);
  color: #64748b;

  &:hover {
    border-color: #6366f1;
    background: #f0f1ff;
    color: #4f46e5;
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
                <RemoveButton type='button' onClick={() => handleRemoveExistingImage(img.id)}>
                  X
                </RemoveButton>
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

                <RemoveButton type='button' onClick={() => handleRemoveNewImage(index)}>
                  X
                </RemoveButton>
              </ImageThumb>
              <CardBody>
                <input
                  type='text'
                  placeholder='Alt text'
                  value={img.alt}
                  onChange={(e) => {
                    const updated = [...newImages];
                    updated[index] = { ...updated[index], alt: e.target.value };
                    onNewImagesChange(updated);
                  }}
                />
              </CardBody>
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
