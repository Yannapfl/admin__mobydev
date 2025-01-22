import "./Layout.css";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { CategoriesProvider } from "../../pages/Categories/CategoriesContext";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="flex-body">
        <Navigation />
        <main className="content">
          <CategoriesProvider>
            <Outlet />
          </CategoriesProvider>
        </main>
      </div>
    </div>
  );
}
