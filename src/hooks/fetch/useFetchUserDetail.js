import { useLocalStorage } from "react-use";
import { userDetail } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";

export default function useFetchUserDetail(setName) {
  const [token] = useLocalStorage("token", "");

  async function fetchUserDetail() {
    const response = await userDetail({ token });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setName(responseBody.data.name);
    } else if (response.status === 500) {
      await alertError("Internal server error");
    } else {
      await alertError(responseBody.errors);
    }
  }

  return { fetchUserDetail };
}
