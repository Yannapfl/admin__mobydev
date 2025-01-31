import "./Projects.css";
import plus from "../../assets/icons/math-plus.svg";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import clock from "../../assets/icons/clock.svg";
import CardProjects from "../../components/CardProjects/CardProjects";
import { mocksProjects } from "../../mocks/mocksProjects";
import { useContext } from "react";
import ProjectsContext from "../../contexts/ProjectsContext";

const mocksSortFilter = ["Популярные", "Новинки", "По рейтингу", "Все"];
const mocksTypeFilter = ['Фильмы и сериалы', 'Фильмы', 'Сериалы'];

export default function Projects() {
  const { projects } = useContext(ProjectsContext);
  const handleFilterChange = (filterName) => {
    console.log(`Выбран фильтр: ${filterName}`);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-headline">
          <h1>Проекты</h1>
          <p>{mocksProjects.length}</p>
        </div>
        <button className="btn btn-headline" onClick={() => alert("Add")}>
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
