import { useLocalStorage } from "react-use";
import { alertConfirm, alertError, alertSuccess } from "../lib/alert";
import { addressDelete } from "../lib/api/AddressApi";

export default function useAddressDelete() {
  const [token, _] = useLocalStorage("token", "");

  async function handleAddressDelete(contactId, addressId) {
    if (
      !(await alertConfirm(
        "You will delete this address from your contact!",
        "delete"
      ))
    )
      return; // batal delete

    try {
      const response = await addressDelete(token, { contactId, addressId });
      const responseBody = await response.json();

      if (response.status === 200) {
        alertSuccess("Address deleted successfully");
      } else {
        await alertError(responseBody.errors);
      }
    } catch (error) {
      console.error(error);
      await alertError("Failed to delete address. Please try again.");
    }
  }

  return { handleAddressDelete };
}
