import { useEffect, useRef, useState } from "react";

import Label from "./ui/Label.jsx";
import { LuCircleX } from "react-icons/lu";
import { LuImageDown } from "react-icons/lu";

import styled from "styled-components";

const ImageUploadContainer = styled.section`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  input {
    display: none;
  }
`;

const StyledImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem;
`;

const StyledIcon = styled(LuImageDown)`
  width: 3rem;
  height: 3rem;
`;

const StyledIconClose = styled(LuCircleX)`
  position: absolute;
  top: -10px;
  right: -10px;
  color: var(--color-grey-500);
  height: 2rem;
  width: 2rem;
`;

const StyledPreviewImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledPreviewImage = styled.img`
  height: 148px;
  border-radius: var(--border-radius-sm);
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

const ImageUploader = ({ name, onChange, initialImage }) => {
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
            <P>Main image</P>
            {previewImage && <StyledPreviewImage src={previewImage} alt='' />}
          </Column>
        </StyledPreviewImageWrap>
      )}
    </ImageUploadContainer>
  );
};

export default ImageUploader;
