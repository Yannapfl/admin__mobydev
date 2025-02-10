import "./Projects.css";
import plus from "../../assets/icons/math-plus.svg";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import clock from "../../assets/icons/clock.svg";
import CardProjects from "../../components/CardProjects/CardProjects";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../contexts/DataContext";

const mocksSortFilter = ["Популярные", "Новинки", "По рейтингу", "Все"];
const mocksTypeFilter = ['Фильмы и сериалы', 'Фильмы', 'Сериалы'];

export default function Projects() {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();
  const projects = data.projects;

  const handleAddProject = (e) => {
    e.preventDefault();
    navigate('/projects/add');
  }

  const handleFilterChange = (filterName) => {
    console.log(`Выбран фильтр: ${filterName}`);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-headline">
          <h1>Проекты</h1>
          <p>{projects.length}</p>
        </div>
        <button className="btn btn-headline" onClick={handleAddProject}>
          <div className="btn-items-headline">
            <img src={plus} alt="plus" />
            <p>Добавить</p>
          </div>
        </button>
      </div>
      <div className="filters">
        <div className="dropdown-group">
          <DropdownFilter
            label="Сортировать:"
            options={mocksSortFilter}
            selectedOption={mocksSortFilter[0]}
            onSelect={(selectedOption) => handleFilterChange(selectedOption)}
          />
          <DropdownFilter
            label="Категория"
            options={mocksSortFilter}
            selectedOption={mocksSortFilter[0]}
            onSelect={(selectedOption) => handleFilterChange(selectedOption)}
          />
          <DropdownFilter
            label="Тип:"
            options={mocksTypeFilter}
            selectedOption={mocksTypeFilter[0]}
            onSelect={(selectedOption) => handleFilterChange(selectedOption)}
          />
        </div>
        <div className="dropdown-year">
          <DropdownFilter
            label={<img src={clock} alt="clock" />}
            options={mocksSortFilter}
            selectedOption="Выберете"
            onSelect={(selectedOption) => handleFilterChange(selectedOption)}
          />
        </div>
      </div>
      <div className="cards-projects-group">
        {projects.map((project) => (
          <CardProjects
            key={project.id}
            project={project}
          />
        ))}
  
        </div>
    </>
  );
}
