import { Header } from "@/widgets/header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <main>
      <Header />
      <div className="container mx-auto mt-4">
        <Outlet />
      </div>
    </main>
  );
};
