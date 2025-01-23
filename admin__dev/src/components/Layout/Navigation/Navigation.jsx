import "./Navigation.css"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navigation() {
    const [icons, setIcons] = useState({});
  
    useEffect(() => {
      const loadIcons = async () => {
        const icons = await Promise.all([
          import("../../../assets/icons/nav_projects.svg?raw"),
          import("../../../assets/icons/nav_home.svg?raw"),
          import("../../../assets/icons/nav_categories.svg?raw"),
          import("../../../assets/icons/nav_users.svg?raw"),
          import("../../../assets/icons/nav_roles.svg?raw"),
          import("../../../assets/icons/nav_genres.svg?raw"),
          import("../../../assets/icons/nav_ages.svg?raw"),
        ]);
  
        setIcons({
          projects: icons[0].default,
          home: icons[1].default,
          categories: icons[2].default,
          users: icons[3].default,
          roles: icons[4].default,
          genres: icons[5].default,
          ages: icons[6].default,
        });
      };
  
      loadIcons();
    }, []);
  
    if (Object.keys(icons).length === 0) {
      return null; 
    }
  
    return (
      <nav className="navigation w-250">
        <ul>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.projects }}
              ></span>
              <span>Проекты</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/home-projects" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.home }}
              ></span>
              <span>Проекты на главной</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.categories }}
              ></span>
              <span>Категории</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.users }}
              ></span>
              <span>Пользователи</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/roles" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.roles }}
              ></span>
              <span>Роли</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/genres" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.genres }}
              ></span>
              <span>Жанры</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ages" className={({ isActive }) => (isActive ? "active" : "")}>
              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: icons.ages }}
              ></span>
              <span>Возрасты</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }