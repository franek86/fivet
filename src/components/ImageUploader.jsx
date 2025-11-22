import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Label from "./ui/Label.jsx";

import { LuCircleX } from "react-icons/lu";
import { LuImageDown } from "react-icons/lu";

const ImageUploadContainer = styled.section`
  height: 16rem;
  width: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-shadow: var(--shadow-lg);
  border-radius: 50%;

  input {
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

const StyledIcon = styled(LuImageDown)`
  width: 3rem;
  height: 3rem;
`;

const StyledIconClose = styled(LuCircleX)`
  position: absolute;
  top: -20px;
  right: -20px;
  color: var(--color-grey-500);
  height: 2rem;
  width: 2rem;
`;

const StyledPreviewImageWrap = styled.div`
  display: flex;
  height: 16rem;
  width: 16rem;
  flex-direction: column;
  position: relative;
`;

const StyledPreviewImage = styled.img`
  height: 16rem;
  width: 16rem;
  object-fit: cover;
  border-radius: 50%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.4rem;
`;

const ImageUploader = ({ name, onChange, initialImage, title }) => {
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
    <ImageUploadContainer>
      <input type='file' ref={fileInputRef} name={name} onChange={handleFileChange} />
      {!file && !previewImage && (
        <Row>
          <StyledImageUpload onClick={handleIconClick}>
            <Label>Upload main image</Label>
            <StyledIcon />
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
        </StyledPreviewImageWrap>
      )}
    </ImageUploadContainer>
  );
};

export default ImageUploader;
