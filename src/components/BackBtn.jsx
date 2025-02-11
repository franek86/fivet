import Button from "./ui/Button.jsx";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)}>
      <LuChevronLeft />
      Back
    </Button>
  );
}

export default BackBtn;
