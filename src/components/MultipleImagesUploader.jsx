import { useRef } from "react";
import styled from "styled-components";

// Styled Components
const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PreviewImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  img {
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
  }
`;

const UploadButton = styled.button`
  background: #4f46e5;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #4338ca;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const MultipleImagesUploader = ({ name, value = [], onChange }) => {
  const inputRef = useRef();

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updated = [...value, ...newImages];

    onChange(updated);
  };

  const handleRemoveImage = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <UploadWrapper>
      <UploadButton type='button' onClick={() => inputRef.current.click()}>
        Upload Gallery
      </UploadButton>
      <HiddenInput type='file' name={name} multiple ref={inputRef} onChange={handleSelectImages} />

      {value.length > 0 && (
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
      )}
    </UploadWrapper>
  );
};

export default MultipleImagesUploader;
