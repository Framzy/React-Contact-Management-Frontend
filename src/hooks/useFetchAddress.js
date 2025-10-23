import { useLocalStorage } from "react-use";
import { addressDetail } from "../lib/api/AddressApi";

export default function useFetchAddress(id, addressId, setAddress) {
  const [token] = useLocalStorage("token", "");

  async function fetchAddress() {
    try {
      const response = await addressDetail(token, { contactId: id, addressId });
      const responseBody = await response.json();

      if (response.status === 200) {
        setAddress(responseBody.data);
      } else if (response.status === 500) {
        console.error("Internal server error");
      } else {
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error("Fetch address failed:", err);
    }
  }

  return { fetchAddress };
}
