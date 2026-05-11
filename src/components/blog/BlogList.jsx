import { useMemo, useState } from "react";
import styled from "styled-components";

import BlogColumn from "./BlogColumn.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import Spinner from "../Spinner.jsx";
import Button from "../ui/Button.jsx";
import TablePlaceholder from "../../components/ui/TablePlaceholder.jsx";
import Pagination from "../Pagination.jsx";

import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { useDeleteBlog, useGetBlogs } from "../../hooks/useBlog.js";
import { SlidersHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import BlogFilters from "./BlogFilters.jsx";
import Sort from "../ui/Sort.jsx";

const Container = styled.main`
  position: relative;
`;

const RightBox = styled.div`
  margin-left: ${({ $toggleBox }) => ($toggleBox ? "clamp(220px, 20vw, 320px)" : "0px")};
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 3rem;
`;

const ShipFilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  background: var(--color-accent-600);
  color: var(--color-white);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
`;

const BlogList = () => {
  const dispatch = useDispatch();
  // React Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterToggle, setFilterToggle] = useState(false);

  const searchTerm = useSelector((state) => state.search.term);

  /* Read params from url */
  const page = Number(searchParams.get("page") ?? 1);
  const sortBy = searchParams.get("sortBy") ?? "createdAt-desc";

  /* Checkboxe filters */
  const checkboxFilterKeys = ["categories", "tags"];

  const selectedFilters = useMemo(() => {
    return checkboxFilterKeys.reduce((acc, key) => {
      acc[key] = searchParams.get(key)?.split(",").filter(Boolean) || [];

      return acc;
    }, {});
  }, [searchParams]);

  // Stable filters object
  const filters = useMemo(
    () => ({
      status: searchParams.get("status"),
      categories: searchParams.get("categories"),
      search: searchTerm?.trim() || undefined,
      tags: searchParams.get("tags"),
      dateFrom: searchParams.get("dateFrom"),
      dateTo: searchParams.get("dateTo"),
    }),
    [searchParams, searchTerm],
  );

  /* API */
  const { mutate } = useDeleteBlog();
  const { data, isLoading, isFetching } = useGetBlogs({
    page,
    sortBy,
    filters,
  });

  /* Handle delete items */

  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(
    data?.blogs,
    useDeleteBlog().mutate,
  );

  /* sort item mock  */
  const sortItems = [
    { value: "title-asc", name: "Title (A-Z)" },
    { value: "title-desc", name: "Title (Z-A)" },
    { value: "views-asc", name: "Lowest" },
    { value: "views-desc", name: "Most" },
    { value: "createdAt-desc", name: "Newest first" },
    { value: "createdAt-asc", name: "Oldest first" },
  ];

  /* Handle filter checkbox */
  const handleFilterCheckboxChange = (type, value) => {
    const params = new URLSearchParams(searchParams);

    const current = selectedFilters[type] || [];

    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

    if (updated.length) {
      params.set(type, updated.join(","));
    } else {
      params.delete(type);
    }

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  };

  // Function to update URL query parameters
  const updatedQueryParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => ((value ?? "") ? newParams.set(key, value) : newParams.delete(key)));
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  };

  /*  // Apply filter values to URL and trigger data reload
  const handleApplyFilters = ({ status, categories, tags, dateFrom, dateTo }) => {
    updatedQueryParams({
      status: status ? "true" : null,
      price: priceRange ? priceRange : null,
      shipType: shipType ? shipType : null,
      dateFrom: dateFrom ? urlFormatDate(dateFrom) : null,
      dateTo: dateTo ? urlFormatDate(dateTo) : null,
    });
  }; */

  // Reset filters and search term, update URL
  const handleResetFilter = () => {
    dispatch(setSearchTerm(""));
    updatedQueryParams({
      status: null,
      categories: null,
      tags: null,
      dateFrom: null,
      dateTo: null,
    });
  };

  /* Handle toggle filter */
  const handleFilterToggle = () => {
    setFilterToggle((prev) => !prev);
  };

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

  if (isLoading && !data) {
    return <Spinner />;
  }

  const renderRow = (item) => <BlogColumn key={item.id} data={item} selectedBlog={selected} onCheckboxChange={handleCheckboxChange} />;

  return (
    <Container>
      <BlogFilters
        filterToggle={filterToggle}
        selectedFilters={selectedFilters}
        onCheckboxChange={handleFilterCheckboxChange}
        onResetFilter={handleResetFilter}
      />

      <RightBox $toggleBox={filterToggle}>
        <FlexWrapper>
          <ShipFilterWrap onClick={() => handleFilterToggle()}>
            <SlidersHorizontal size={25} />
            <div>Filters</div>
          </ShipFilterWrap>
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
      </RightBox>
    </Container>
  );
};

export default BlogList;
