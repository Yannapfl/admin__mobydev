import "./Layout.css";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { DataProvider } from "../../contexts/DataContext";
import { FeaturedProjectsProvider } from "../../contexts/FeaturedProjectsContext";
import { RolesProvider } from "../../contexts/RolesContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";

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
    "/result",
  ].includes(location.pathname);
  const mainClassName = isNavigationPage ? "content-nav" : "m-0";

  return (
    <div className="layout">
      <Header />
      <div className="flex-body">
        <Navigation />
        <main className={mainClassName}>
          <RolesProvider>
            <DataProvider>
              <ProjectsProvider>
                <FeaturedProjectsProvider>
                  <Outlet />
                </FeaturedProjectsProvider>
              </ProjectsProvider>
            </DataProvider>
          </RolesProvider>
        </main>
      </div>
    </div>
  );
}
