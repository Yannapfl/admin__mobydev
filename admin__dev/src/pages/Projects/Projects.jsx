import "./Projects.css";
import plus from "../../assets/icons/math-plus.svg";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import clock from "../../assets/icons/clock.svg";
import CardProjects from "../../components/CardProjects/CardProjects";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../contexts/DataContext";
import useRoleAccess from "../../utils/useRoleAccess";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";

const mocksSortFilter = ["Популярные", "Новинки", "Все"];
const mocksTypeFilter = ["Фильмы и сериалы", "Фильмы", "Сериалы"];

export default function Projects() {
  const { data, deleteEntity } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const navigate = useNavigate();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";

  const categories = [
    "Все",
    ...data.categories.map(({ label }) => label).sort(),
  ];
  const years = [
    "Выберите год",
    ...Array.from(new Set(data.projects.map(({ year }) => year))).map(String).sort(
      (a, b) => b - a
    ),
  ];

  const [selectedSort, setSelectedSort] = useState(mocksSortFilter[0]);
  const [selectedType, setSelectedType] = useState(mocksTypeFilter[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleAddProject = (e) => {
    e.preventDefault();
    navigate("/projects/add");
  };

  const handleFilterChange = (filterName, value) => {
    switch (filterName) {
      case "sort":
        setSelectedSort(value);
        break;
      case "type":
        setSelectedType(value);
        break;
      case "category":
        setSelectedCategory(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      default:
        break;
    }
  };

  const filteredProjects = data.projects
    .filter(({ type }) =>
      selectedType === "Фильмы и сериалы"
        ? true
        : selectedType.slice(0, -1) === type
    )
    .filter(({ categories }) =>
      selectedCategory === "Все" ? true : categories.includes(selectedCategory)
    )
    .filter(({ year }) =>
      selectedYear === "Выберите год" ? true : selectedYear === year
    )
    .sort((a, b) => {
      if (selectedSort === "Популярные") return b.stats.views - a.stats.views;
      if (selectedSort === "Новинки") return b.year - a.year;
      return 0;
    });

  return (
    <>
      <div className="page-header">
        <div className="page-headline">
          <h1>Проекты</h1>
          <p>{filteredProjects.length}</p>
        </div>
        <button
          disabled={!canEdit(editKey)}
          style={{ opacity: canEdit(editKey) ? 1 : 0.5 }}
          className="btn btn-headline"
          onClick={handleAddProject}
        >
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
            selectedOption={selectedSort}
            onSelect={(value) => handleFilterChange("sort", value)}
          />
          <DropdownFilter
            label="Категория"
            options={categories}
            selectedOption={selectedCategory}
            onSelect={(value) => handleFilterChange("category", value)}
          />
          <DropdownFilter
            label="Тип:"
            options={mocksTypeFilter}
            selectedOption={selectedType}
            onSelect={(value) => handleFilterChange("type", value)}
          />
        </div>
        <div className="dropdown-year">
          <DropdownFilter
            label={<img src={clock} alt="clock" />}
            options={years}
            selectedOption={selectedYear}
            onSelect={(value) => handleFilterChange("year", value)}
          />
        </div>
      </div>
      <div className="cards-projects-group">
        {filteredProjects.map((project) => (
          <CardProjects
            key={project.id}
            project={project}
            onDelete={
              canEdit(editKey)
                ? (e) => {
                    e.stopPropagation();
                    openModal("delete", {
                      label: "проект",
                      onConfirm: () => {
                        deleteEntity("projects", project.id);
                        closeModal();
                      },
                    });
                  }
                : null
            }
          />
        ))}
      </div>
      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            onDelete: canEdit(editKey)
              ? () => {
                  deleteEntity("projects", modalProps.project?.id);
                  closeModal();
                }
              : null,
            closeModal,
          }}
        />
      )}
    </>
  );
}
