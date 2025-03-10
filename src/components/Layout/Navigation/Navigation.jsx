import "./Navigation.css"
import { NavLink } from "react-router-dom"
import projectIcon from '../../../assets/icons/nav_projects.svg'
import homeIcon from "../../../assets/icons/nav_home.svg?component";
import categoryIcon from "../../../assets/icons/nav_categories.svg?component";
import userIcon from "../../../assets/icons/nav_users.svg?component";
import roleIcon from "../../../assets/icons/nav_roles.svg?component";
import genreIcon from "../../../assets/icons/nav_genres.svg?component";
import ageIcon from "../../../assets/icons/nav_ages.svg?component";


export default function Navigation() {
  return (
    <nav className="navigation w-250">
      <ul>
        <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={projectIcon} className="icon" alt='icon' />
            <span>Проекты</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home-projects" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={homeIcon} className="icon" alt='icon' />
            <span>Проекты на главной</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={categoryIcon} className="icon" alt='icon' />
            <span>Категории</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={userIcon} className="icon" alt='icon' />
            <span>Пользователи</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/roles" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={roleIcon} className="icon" alt='icon' />
            <span>Роли</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/genres" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={genreIcon} className="icon" alt='icon' />
            <span>Жанры</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ages" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <img src={ageIcon} className="icon" alt='icon' />
            <span>Возрасты</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}