import styled from "styled-components";

import EmptyState from "../EmptyState.jsx";
import Pagination from "../Pagination.jsx";
import Spinner from "../Spinner.jsx";
import CustomTable from "../ui/CustomTable.jsx";
import TablePlaceholder from "../ui/TablePlaceholder.jsx";
import PaymentColumn from "./PaymentColumn.jsx";
import Checkbox from "../ui/Checkbox.jsx";
import Button from "../ui/Button.jsx";

import { useGetPayments } from "../../hooks/usePayments.js";
import { useSelectDeleteItem } from "../../hooks/useSelectDeleteItem.js";
import { Trash2 } from "lucide-react";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.8rem;
`;

function PaymentTable() {
  // Fetch payments data from api
  const { data, count, isLoading, isError, isFetching } = useGetPayments();

  // Custom hook for selection and deletion
  const { selected, handleSelectAll, handleCheckboxChange, handleDeleteSelected } = useSelectDeleteItem(data);

  // Table columns configuration
  const tableColumns = [
    {
      header: (
        <Checkbox checked={selected?.length > 0 && selected?.length === data?.length} onChange={(checked) => handleSelectAll(checked)} />
      ),
      accessor: "delete row",
      style: "hidden-table-sm",
    },
    { header: "Client ID", accessor: "id" },
    { header: "Plan", accessor: "plan" },
    { header: "Amount", accessor: "amount" },
    { header: "Currency", accessor: "currency" },
    { header: "Date", accessor: "date" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  if (isLoading) return <Spinner />;
  if (data.length < 1) return <EmptyState message='No notifications for now.' />;
  if (isError) return <div>Error</div>;

  const renderRow = (item) => <PaymentColumn key={item.id} data={item} selected={selected} onCheckboxChange={handleCheckboxChange} />;

  return (
    <>
      <Header>
        {selected.length > 0 && (
          <div>
            <Button $variation='danger' onClick={handleDeleteSelected} className='flex items-center gap-2'>
              <Trash2 size={14} />
              <div>
                Delete {selected.length} item
                {selected.length > 1 ? "s" : ""}
              </div>
            </Button>
          </div>
        )}
      </Header>
      {isFetching ? (
        <TablePlaceholder count={count} />
      ) : (
        <>
          <CustomTable columns={tableColumns} renderRow={renderRow} data={data} />
        </>
      )}
      <Pagination count={count} />
    </>
  );
}

export default PaymentTable;
