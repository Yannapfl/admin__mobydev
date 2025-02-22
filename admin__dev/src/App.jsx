import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/Projects/Projects.jsx";
import Layout from "./components/Layout/Layout";
import HomeProjects from "./pages/HomeProjects/HomeProjects.jsx";
import Categories from "./pages/Categories/Categories";
import Users from "./pages/Users/Users";
import Roles from "./pages/Roles/Roles";
import Genres from "./pages/Genres/Genres";
import Ages from "./pages/Ages/Ages";
import ProjectInfo from "./pages/Projects/ProjectInfo/ProjectInfo.jsx";
import AddEditProject from "./pages/Projects/AddEditProject/AddEditProject.jsx";
import SearchResult from "./pages/SearchResult/SearchResult.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectInfo />} />
          <Route path="projects/add" element={<AddEditProject mode="add" />} />
          <Route path="projects/edit/:projectId" element={<AddEditProject mode="edit" />} />
          <Route path="home-projects" element={<HomeProjects />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="genres" element={<Genres />} />
          <Route path="ages" element={<Ages />} />
          <Route path="result" element={<SearchResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
