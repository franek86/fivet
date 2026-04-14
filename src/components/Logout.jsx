import styled from "styled-components";
import { useLogout } from "../hooks/useAuth.js";

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.35rem 1rem;
  font-size: 1.4rem;
  background: var(--bg-linear-gradient);
  color: var(--color-grey-0);
  cursor: pointer;

  &:hover {
    background: var(--bg-linear-gradient-soft);
  }
`;

function Logout() {
  const { mutate: logout, isLoading } = useLogout();

  return <Btn onClick={logout}>{isLoading ? "Logging out..." : "Logout"}</Btn>;
}

export default Logout;
