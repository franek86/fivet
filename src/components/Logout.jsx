import Button from "../components/ui/Button.jsx";
import { useLogout } from "../hooks/useAuth.js";

function Logout() {
  const { mutate: logout, isLoading } = useLogout();

  return <Button onClick={logout}>{isLoading ? "Logging out..." : "Logout"}</Button>;
}

export default Logout;
