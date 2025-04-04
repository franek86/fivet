import styled from "styled-components";
import AddCategory from "../components/categories/AddCategory.jsx";
import CategoryTable from "../components/categories/CategoryTable.jsx";
import Title from "../components/ui/Title.jsx";

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Categories() {
  return (
    <>
      <FlexWrap>
        <Title tag='h1'>Categories</Title>

        <AddCategory />
      </FlexWrap>
      <CategoryTable />
    </>
  );
}

export default Categories;
