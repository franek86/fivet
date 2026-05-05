import { Link } from "react-router";
import styled from "styled-components";
import { Eye, Pencil, Trash2 } from "lucide-react";

import Checkbox from "../ui/Checkbox.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import { useDispatch } from "react-redux";

const StyledImage = styled.img`
  width: 80px;
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const P = styled.div`
  text-align: start;
  width: max-content;
`;

const BlogColumn = ({ data, selectedBlog, onCheckboxChange }) => {
  const { id, bannerImage, bannerImageAlt, title, description, status, views } = data;
  const dispatch = useDispatch();
  return (
    <tr>
      <td className='table-td'>
        <Checkbox checked={selectedBlog.includes(id)} onChange={() => onCheckboxChange(id)} />
      </td>
      <td className='table-td'>
        <StyledImage src={bannerImage ? bannerImage : "/images/no-image.webp"} alt={bannerImageAlt} />
      </td>

      <td>{title}</td>
      <td>{description}</td>

      <td>{status}</td>
      <td>{views}</td>
      <td>
        <Dropdown>
          <Button $variation='icon'>
            <Link to={`${id}`}>
              <ButtonInner>
                <Eye size={16} />
                <P>View</P>
              </ButtonInner>
            </Link>
          </Button>
          <Button $variation='icon'>
            <Link to={`edit/${id}`}>
              <ButtonInner>
                <Pencil size={16} />
                <P>Edit</P>
              </ButtonInner>
            </Link>
          </Button>
          <Button $variation='icon' onClick={() => dispatch(openModalByName(id))}>
            <ButtonInner>
              <Trash2 size={16} />
              <P>Delete</P>
            </ButtonInner>
          </Button>
        </Dropdown>
      </td>

      <Modal name={id} onClose={() => dispatch(closeModalByName())}>
        <ConfirmDialog itemName={title} onConfirm={() => mutate(id)} onCloseModal={() => dispatch(closeModalByName(id))} />
      </Modal>
    </tr>
  );
};

export default BlogColumn;
