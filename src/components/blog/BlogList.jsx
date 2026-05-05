import styled from "styled-components";

import BlogColumn from "./BlogColumn.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Spinner from "../Spinner.jsx";
import Button from "../ui/Button.jsx";
import TablePlaceholder from "../../components/ui/TablePlaceholder.jsx";
import Pagination from "../Pagination.jsx";

import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { useGetBlogs } from "../../hooks/useBlog.js";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import Sort from "../ui/Sort.jsx";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2.8rem;
  gap: 3rem;
`;

const BlogList = () => {
  const searchTerm = useSelector((state) => state.search.term);

  // React Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  /* Read params from url */
  const page = Number(searchParams.get("page") ?? 1);
  const sortBy = searchParams.get("sortBy") ?? "createdAt-desc";

  const { data, isLoading, isFetching } = useGetBlogs({
    page,
    sortBy,
  });

  const deleteBlog = () => {
    console.log("delete blog");
  };
  // Custom hook for selection and deletion
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(data?.blogs, deleteBlog);

  const sortItems = [
    { value: "title-asc", name: "Title (A-Z)" },
    { value: "title-desc", name: "Title (Z-A)" },
    { value: "views-asc", name: "Lowest" },
    { value: "views-desc", name: "Most" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  // Table columns configuration
  const tableColumns = [
    {
      header: (
        <Checkbox
          checked={selected?.length > 0 && selected?.length === data?.blogs.length}
          onChange={(checked) => handleSelectAll(checked)}
        />
      ),
      accessor: "delete row",
      style: "hidden-table-sm",
    },
    { header: "Image", accessor: "image", style: "hidden-table-sm" },
    { header: "Blog title", accessor: "blog title" },
    { header: "Description", accessor: "blog description" },
    { header: "Status", accessor: "status" },
    { header: "Views", accessor: "views" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  const renderRow = (item) => <BlogColumn key={item.id} data={item} selectedBlog={selected} onCheckboxChange={handleCheckboxChange} />;

  return (
    <>
      <FlexWrapper>
        <Sort items={sortItems} label='Sort by:' />
        {selected.length > 0 && (
          <div>
            <Button $variation='danger' onClick={handleDeleteSelected}>
              <Trash2 size={14} />
              <div>
                Delete {selected.length} item
                {selected.length > 1 ? "s" : ""}
              </div>
            </Button>
          </div>
        )}
      </FlexWrapper>
      <div>
        {isFetching ? (
          <TablePlaceholder count={data.blogs.length} />
        ) : (
          <CustomTable columns={tableColumns} renderRow={renderRow} data={data?.blogs} />
        )}
      </div>
      <Pagination count={data?.meta?.total} />
    </>
  );
};

export default BlogList;
