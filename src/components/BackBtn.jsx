import Button from "./ui/Button.jsx";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)}>
      <ChevronLeft size={20} />
      Back
    </Button>
  );
}

export default BackBtn;
