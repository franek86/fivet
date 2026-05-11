import styled from "styled-components";
import { useLogout } from "../hooks/useAuth.js";

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--color-text);
  background: var(--color-accent);
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--border-radius-lg);

  &:hover {
    background: var(--color-accent);
  }
`;

function Logout() {
  const { mutate: logout, isLoading } = useLogout();

  return <Btn onClick={logout}>{isLoading ? "Logging out..." : "Logout"}</Btn>;
}

export default Logout;
