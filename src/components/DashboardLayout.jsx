import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <>
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
        <Outlet />
      </div>
    </>
  );
}
