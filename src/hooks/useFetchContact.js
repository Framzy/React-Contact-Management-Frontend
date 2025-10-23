import { useLocalStorage } from "react-use";
import { contactDetail } from "../lib/api/ContactApi";

export default function useFetchContact(id, setContacts) {
  const [token, _] = useLocalStorage("token", "");
  async function fetchContact() {
    const response = await contactDetail(token, id);

    const responseBody = await response.json();

    if (response.status === 200) {
      setContacts(responseBody.data);
    } else if (response.status === 500) {
      console.log("Internal server error");
    } else {
      console.log(responseBody.errors);
    }
  }

  return { fetchContact };
}
