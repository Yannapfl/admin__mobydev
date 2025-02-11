import "./Layout.css";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { DataProvider } from "../../contexts/DataContext";
import { FeaturedProjectsProvider } from "../../contexts/FeaturedProjectsContext";

export default function Layout() {
  const location = useLocation();

  const isNavigationPage = [
    "/projects",
    "/home-projects",
    "/categories",
    "/users",
    "/roles",
    "/genres",
    "/ages",
  ].includes(location.pathname);
  const mainClassName = isNavigationPage ? "content-nav" : "m-0";

  return (
    <div className="layout">
      <Header />
      <div className="flex-body">
        <Navigation />
        <main className={mainClassName}>
          <DataProvider>
              <FeaturedProjectsProvider>
                <Outlet />
              </FeaturedProjectsProvider>
          </DataProvider>
        </main>
      </div>
    </div>
  );
}
