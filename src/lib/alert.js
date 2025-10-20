import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};
export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Ups",
    text: message,
  });
};
export const alertConfirm = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout",
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Logout!",
      text: "Logout successfully",
      icon: "success",
    });
  }

  return result;
};
