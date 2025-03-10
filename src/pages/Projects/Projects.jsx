import "./Projects.css";
import plus from "../../assets/icons/math-plus.svg";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import clock from "../../assets/icons/clock.svg";
import CardProjects from "../../components/CardProjects/CardProjects";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRoleAccess from "../../utils/useRoleAccess";
import { ModalFactory } from "../../components/Modals/ModalFactory";
import { useModalManager } from "../../components/Modals/useModalManager";
import DataContext from "../../contexts/DataContext";
import ProjectsContext from "../../contexts/ProjectsContext";
import api from "../../utils/api";

var mocksSortFilter = ["Популярные", "Новинки", "Все"];
export default function Projects() {
  const { removeProject } = useContext(ProjectsContext);
  const { data } = useContext(DataContext);
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const navigate = useNavigate();
  const { canEdit } = useRoleAccess();
  const editKey = "projects";


  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = [
    "Все",
    ...data.categories.map(({ name }) => name).sort(),
  ];

  const types = [
    'Фильмы и сериалы',
    ...data.genres.map(({ name }) => name).sort(),
  ]

  const years = [
    "Выберите год",
    ...Array.from( { length: new Date().getFullYear() - 1970 + 1}, (_, i) => 1970 + i).sort((a, b) => b - a),
  ];

  const [selectedSort, setSelectedSort] = useState(mocksSortFilter[0]);
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const genre = data.genres.find((g) => g.name === selectedType);
      const category = data.categories.find((c) => c.name === selectedCategory);
      const response = await api.get("movies", {
        params: {
          genreId: genre ? genre.genreId : undefined,
          categoryId: category ? category.categoryId : undefined,
          sortBy: selectedSort === "Популярные" ? 1 : selectedSort === "Новинки" ? 2 : undefined,
          year: selectedYear !== "Выберите год" ? selectedYear : undefined,
        },
      });
      setProjects(response.data.result);
    } catch (error) {
      console.error("Ошибка загрузки проекта", error);
    } finally {
      setLoading(false);
    }
  }, [selectedSort, selectedType, selectedCategory, selectedYear, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

const handleRemoveProject = (movieId) => {
  removeProject(movieId);
  fetchData();
}

  const handleAddProject = (e) => {
    e.preventDefault();
    navigate("/projects/add");
  };

  const handleFilterChange = async (filterName, value) => {
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

  if (loading) {
    return <p>Загрузка проекта...</p>; 
  }

  return (
    <>
      <div className="page-header">
        <div className="page-headline">
          <h1>Проекты</h1>
          <p>{projects.length}</p>
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
            options={types}
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
        {projects.map((project) => (
          <CardProjects
            key={project.movieId}
            project={project}
            onDelete={
              canEdit(editKey)
                ? (e) => {
                    e.stopPropagation();
                    openModal("delete", {
                      label: "проект",
                      onConfirm: () => {
                        handleRemoveProject(project.movieId)
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
                  handleRemoveProject(modalProps.project?.movieId);
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
