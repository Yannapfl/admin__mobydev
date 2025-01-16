import "./Navigation.css"
import iconProjects from '../../../assets/icons/nav_projects.svg'
import iconHome from '../../../assets/icons/nav_home.svg'
import iconCategories from '../../../assets/icons/nav_categories.svg'
import iconUsers from '../../../assets/icons/nav_users.svg'
import iconRoles from '../../../assets/icons/nav_roles.svg'
import iconGenres from '../../../assets/icons/nav_genres.svg'
import iconAges from '../../../assets/icons/nav_ages.svg'

export default function Navigation() {
  return (
    <nav className="navigation w-250">
      <ul>
        <li>
          <img src={iconProjects} alt="projects" />
          <a href="/dashboard">Проекты</a>
        </li>
        <li>
          <img src={iconHome} alt="home" />
          <a href="/main">Проекты на главной</a>
        </li>
        <li>
          <img src={iconCategories} alt="catiegories" />
          <a href="/categories">Категории</a>
        </li>
        <li>
          <img src={iconUsers} alt="users" />
          <a href="/users">Пользователи</a>
        </li>
        <li>
          <img src={iconRoles} alt="roles" />
          <a href="/roles">Роли</a>
        </li>
        <li>
          <img src={iconGenres} alt="genres" />
          <a href="/genres">Жанры</a>
        </li>
        <li>
          <img src={iconAges} alt="ages" />
          <a href="/ages">Возрасты</a>
        </li>
      </ul>
    </nav>
  );
}
