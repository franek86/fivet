import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Globe, SlidersHorizontal, Trash2 } from "lucide-react";

import BlogColumn from "./BlogColumn.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Button from "../ui/Button.jsx";
import TablePlaceholder from "../../components/ui/TablePlaceholder.jsx";
import Pagination from "../Pagination.jsx";
import BlogFilters from "./BlogFilters.jsx";
import Sort from "../ui/Sort.jsx";
import EmptyState from "../EmptyState.jsx";

import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { useDeleteBlog, useGetBlogs } from "../../hooks/useBlog.js";

import { PAGE_SIZE } from "../../constants/index.js";

const BlogList = () => {
  const DEFAULT_FILTERS = {
    search: "",
    categories: [],
    tags: [],
    dateFrom: undefined,
    dateTo: undefined,
    status: undefined,
    page: 1,
    limit: PAGE_SIZE,
    sortBy: "createdAt",
    order: "desc",
  };

  const searchBlogs = useSelector((state) => state.search.blogs);

  // React Hooks
  const [filterToggle, setFilterToggle] = useState(false);
  const [filterState, setFilterState] = useState(DEFAULT_FILTERS);

  /* API */
  const { mutate } = useDeleteBlog();
  const { data, isLoading, isFetching } = useGetBlogs({ ...filterState, search: searchBlogs });

  /* Handle delete items */
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(
    data?.blogs,
    useDeleteBlog().mutate,
  );

  //Sort
  const sortItems = [
    { value: "titleAsc", name: "Title (A-Z)" },
    { value: "titleDesc", name: "Title (Z-A)" },
    { value: "viewsAsc", name: "Lowest views" },
    { value: "viewsDesc", name: "Most views" },
    { value: "newest", name: "Newest" },
    { value: "oldest", name: "Oldest" },
  ];

  //Handle sort
  const handleSortChange = (value) => {
    let sortBy = "createdAt";
    let order = "desc";

    switch (value) {
      case "titleAsc":
        sortBy = "title";
        order = "asc";
        break;

      case "titleDesc":
        sortBy = "title";
        order = "desc";
        break;

      case "viewsAsc":
        sortBy = "view";
        order = "asc";
        break;

      case "viewsDesc":
        sortBy = "view";
        order = "desc";
        break;

      case "oldest":
        sortBy = "createdAt";
        order = "asc";
        break;

      case "newest":
      default:
        sortBy = "createdAt";
        order = "desc";
    }

    setFilterState((current) => ({
      ...current,
      sortBy,
      order,
      page: 1,
    }));
  };

  //Current sort
  const currentSort =
    filterState.sortBy === "title" && filterState.order === "asc"
      ? "titleAsc"
      : filterState.sortBy === "title" && filterState.order === "desc"
        ? "titleDesc"
        : filterState.sortBy === "views" && filterState.order === "asc"
          ? "viewsAsc"
          : filterState.sortBy === "views" && filterState.order === "desc"
            ? "viewsDesc"
            : filterState.order === "asc"
              ? "oldest"
              : "newest";

  // Reset filters and search term, update URL
  const handleResetFilter = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  /* Handle toggle filter */
  const handleFilterToggle = () => {
    setFilterToggle((prev) => !prev);
  };

  //Current filters
  /* current filters  */
  const hasFilters =
    Boolean(filterState.search) ||
    filterState.categories.length > 0 ||
    filterState.tags.length > 0 ||
    filterState.dateFrom !== undefined ||
    filterState.status !== undefined ||
    filterState.dateTo !== undefined;

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
    return <TablePlaceholder count={6} />;
  }

  if (!isLoading && data?.blogs?.length === 0) {
    if (!hasFilters) {
      return (
        <FilterState>
          <h2>No blogs match in your filters</h2>
          <p>Please clear filters or adjust your search.</p>
          <Button onClick={() => resetFilters()}>Clear filters</Button>
        </FilterState>
      );
    }

    return (
      <EmptyState message='No blogs' icon={<Globe />}>
        <p>
          There are no blogs to display right now. <br /> Create a blog to get started.
        </p>
      </EmptyState>
    );
  }

  const renderRow = (item) => <BlogColumn key={item.id} data={item} selectedBlog={selected} onCheckboxChange={handleCheckboxChange} />;

  return (
    <>
      <BlogHeader>
        <ShipFilterWrap onClick={() => handleFilterToggle()}>
          <SlidersHorizontal size={18} />
          <div>Filters</div>
        </ShipFilterWrap>

        <Sort items={sortItems} value={currentSort} onChange={handleSortChange} />
      </BlogHeader>

      <Container $filterToggle={filterToggle}>
        <BlogFilters
          filterState={filterState}
          setFilterState={setFilterState}
          filterToggle={filterToggle}
          onResetFilter={handleResetFilter}
        />

        <RightBox $filterToggle={filterToggle}>
          <FlexWrapper>
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
          <Pagination
            count={data?.meta?.total}
            page={filterState.page}
            limit={filterState.limit}
            onPageChange={(page) =>
              setFilterState((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        </RightBox>
      </Container>
    </>
  );
};

export default BlogList;

const Container = styled.main`
  position: relative;
  display: grid;
  grid-template-columns: ${({ $filterToggle }) => ($filterToggle ? "30rem 1fr" : "0 1fr")};
  gap: ${({ $filterToggle }) => ($filterToggle ? "2rem" : "0")};
`;

const BlogHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 4.5rem;
  margin-bottom: 1.5rem;
`;

const RightBox = styled.section``;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 3rem;
`;

const ShipFilterWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  height: 4rem;
  padding: 0 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-white);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-700);
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
`;

const FilterState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;
