import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Label from "./ui/Label.jsx";

import { CircleX } from "lucide-react";

const ImageUploadContainer = styled.section`
  height: ${({ $hasPreview }) => ($hasPreview ? "100%" : "140px")};
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;

  border: 2px dashed var(--color-grey-300);
  transition: all 0.2s ease;
  color: #64748b;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);

  &:hover {
    border-color: #6366f1;
    background: #f0f1ff;
    color: #4f46e5;
  }

  .image-input {
    display: none;
  }
`;

const StyledImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const StyledIconClose = styled(CircleX)`
  position: absolute;
  top: -20px;
  right: -20px;
  color: var(--color-grey-500);
  height: 2rem;
  width: 2rem;
`;

const StyledPreviewImageWrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  position: relative;
`;

const StyledPreviewImage = styled.img`
  object-fit: cover;
  /*  height: 16rem;
  width: 16rem;
  border-radius: 50%; */
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.4rem;
`;

const ImageUploader = ({ name, onChange, initialImage, title, children }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(initialImage || null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewImage(initialImage);
  }, [initialImage]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0] || null;

    onChange(selectedFile);
    if (e.target.files?.[0]) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewImage(null);
  };

  return (
    <ImageUploadContainer $hasPreview={previewImage}>
      <input className='image-input' type='file' ref={fileInputRef} name={name} onChange={handleFileChange} />
      {!file && !previewImage && (
        <Row>
          <StyledImageUpload onClick={handleIconClick}>
            <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='17 8 12 3 7 8' />
              <line x1='12' y1='3' x2='12' y2='15' />
            </svg>
            <Label>Upload main image</Label>
          </StyledImageUpload>
        </Row>
      )}

      {previewImage && (
        <StyledPreviewImageWrap>
          <StyledIconClose onClick={removeImage} />
          <Column>
            {previewImage && <StyledPreviewImage src={previewImage} alt='' />}
            {title ? <P>Main image</P> : title}
          </Column>
          {children}
        </StyledPreviewImageWrap>
      )}
    </ImageUploadContainer>
  );
};

export default ImageUploader;
