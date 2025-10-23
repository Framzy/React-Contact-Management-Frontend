import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";

export default function UserCheck() {
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const location = useLocation();

  useEffectOnce(() => {
    if (token && location.pathname === "/") {
      navigate("/dashboard/contacts");
    }
    if (!token && location.pathname === "/") {
      navigate("/login");
    }
  });

  return <Outlet />;
}
