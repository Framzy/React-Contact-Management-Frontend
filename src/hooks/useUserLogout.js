import { useLocalStorage } from "react-use";
import { userLogout } from "../lib/api/UserApi";
import { alertConfirm, alertError } from "../lib/alert";
import { useNavigate } from "react-router";

export default function useUserLogout() {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleLogout() {
    const result = await alertConfirm();
    if (!result.isConfirmed) return; // batal logout

    try {
      const response = await userLogout({ token });
      const responseBody = await response.json();

      if (response.status === 200) {
        setToken("");
        navigate("/login");
      } else {
        await alertError(responseBody.errors);
      }
    } catch (error) {
      console.log(error);
      await alertError("Failed to logout. Please try again.");
    }
  }

  return { handleLogout };
}
