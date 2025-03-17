import "./Navigation.css"
import { NavLink } from "react-router-dom"
import IconAges from "../../../assets/iconsComponents/IconAges";
import IconMain from "../../../assets/iconsComponents/iconMain";
import IconHome from "../../../assets/iconsComponents/IconHome";
import IconCategory from "../../../assets/iconsComponents/IconCategory";
import IconUsers from "../../../assets/iconsComponents/IconUsers";
import IconRoles from "../../../assets/iconsComponents/IconRoles";
import IconGenre from "../../../assets/iconsComponents/IconGenres";


export default function Navigation() {
  return (
    <nav className="navigation w-250">
      <ul>
        <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconMain className="icon" />
            <span>Проекты</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home-projects" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconHome className="icon" />
            <span>Проекты на главной</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconCategory className="icon" />
            <span>Категории</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconUsers className="icon" />
            <span>Пользователи</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/roles" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconRoles className="icon" />
            <span>Роли</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/genres" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconGenre className="icon"/>
            <span>Жанры</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ages" className={({ isActive }) => (isActive ? "active" : "")}>
            <div className="nav-active-line"></div>
            <IconAges className="icon" />
            <span>Возрасты</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}