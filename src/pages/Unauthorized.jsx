import styled from "styled-components";
import Button from "../components/ui/Button.jsx";
import { Link } from "react-router";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

function Unauthorized() {
  return (
    <Center>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>

      <Link to='/dashboard'>
        <Button>Back to Home page</Button>
      </Link>
    </Center>
  );
}

export default Unauthorized;
