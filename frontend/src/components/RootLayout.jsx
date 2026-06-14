import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4]">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;