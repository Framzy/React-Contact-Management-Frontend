import { useLocalStorage } from "react-use";
import { contactList } from "../../lib/api/ContactApi";
import { alertError } from "../../lib/alert";

export default function useFetchContactList(
  payload,
  setContacts,
  setTotalPage
) {
  const [token, _] = useLocalStorage("token", "");
  async function fetchContacts() {
    const response = await contactList(token, payload);

    const responseBody = await response.json();

    if (response.status === 200) {
      setContacts(responseBody.data);
      setTotalPage(responseBody.paging.total_page);
    } else if (response.status === 500) {
      await alertError("Internal server error");
    } else {
      await alertError(responseBody.errors);
    }
  }

  return { fetchContacts };
}
