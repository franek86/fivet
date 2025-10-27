import { useState } from "react";

export const useSelectDeleteItem = (data = [], mutate) => {
  const [selected, setSelected] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) setSelected(data?.map((c) => c.id));
    else setSelected([]);
  };

  const handleCheckboxChange = (dataId) => {
    setSelected((prev) => (prev.includes(dataId) ? prev.filter((id) => id !== dataId) : [...prev, dataId]));
  };

  const handleDeleteSelected = () => {
    selected.forEach((id) => mutate(id));
    setSelected([]);
  };

  const resetSelection = () => {
    setSelected([]);
  };

  return {
    selected,
    setSelected,
    handleSelectAll,
    handleCheckboxChange,
    handleDeleteSelected,
    resetSelection,
  };
};
