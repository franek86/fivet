import { forwardRef, useRef, useState } from "react";

import Label from "./ui/Label.jsx";
import { LuCircleX } from "react-icons/lu";
import { LuImageDown } from "react-icons/lu";

import styled from "styled-components";
import Button from "./ui/Button.jsx";
import supabase from "../services/databaseConfig.js";

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
  height: 8rem;
  width: 8rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ImageUplader = ({ bucket, folder = "", onUpload, name, onChange, value }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

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
      fileInputRef.current.click(); // Trigger the file input when the div is clicked
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewImage(null);
    setImageUrl(null);
  };

  const uploadImage = async (url) => {
    console.log("Uploaded Image URL: ", url);
    if (!file) return;
    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`.replaceAll("/", "");
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file);
    if (error) {
      console.error("Upload failed:", error.message);
      setUploading(false);
      return;
    }

    // Get public URL of uploaded image
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    setImageUrl(urlData.publicUrl);
    if (onUpload) onUpload(urlData.publicUrl);

    setUploading(false);
  };

  return (
    <ImageUploadContainer>
      <input type='file' ref={fileInputRef} name={name} onChange={handleFileChange} />
      {!file && (
        <Row>
          <StyledImageUpload onClick={handleIconClick}>
            <Label>Upload main image</Label>
            <StyledIcon />
          </StyledImageUpload>
        </Row>
      )}

      {file && (
        <StyledPreviewImageWrap>
          <StyledIconClose onClick={removeImage} />
          <Row>
            {previewImage && <StyledPreviewImage src={previewImage} />}
            <p>{file.name}</p>
          </Row>
        </StyledPreviewImageWrap>
      )}
      {imageUrl && (
        <p>
          Image uploaded:{" "}
          <a href={imageUrl} target='_blank' rel='noopener noreferrer'>
            View
          </a>
        </p>
      )}
    </ImageUploadContainer>
  );
};

export default ImageUplader;
