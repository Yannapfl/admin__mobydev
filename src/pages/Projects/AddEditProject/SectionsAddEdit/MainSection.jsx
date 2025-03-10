import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import MultiSelectDropdown from "../../../../components/MultiSelectDropdown/MultiSelectDropdown";
import NumericStepperInput from "../../../../components/NumericStepperInput/NumericStepperInput";
import DataContext from "../../../../contexts/DataContext";
import PropTypes from "prop-types";
import { checkFilled } from "../../../../utils/checkFilled";

export default function MainSection({
  tempProject,
  setTempProject,
  setIsFilledSection,
}) {
  const { data } = useContext(DataContext);
  const [titleInput, setTitleInput] = useState(tempProject?.title || "");
  const categories = useMemo(() => data.categories?.filter(c => c.name) ?? [], [data]);
  const ages = useMemo(() => data.ages?.filter(a => a.name) ?? [], [data]);
  const genres = useMemo(() => data.genres?.filter(g => g.name) ?? [], [data]);  

const [selectedCategories, setSelectedCategories] = useState(
  tempProject?.categories
    ? tempProject.categories
        .filter((category) => category && category.name) 
        .map((category) => category.name)
    : []
);

const [selectedAges, setSelectedAges] = useState(
  tempProject?.ageCategories
    ? tempProject.ageCategories
        .filter((age) => age && age.name)
        .map((age) => age.name)
    : []
);

const [selectedGenres, setSelectedGenres] = useState(
  tempProject?.genres
    ? tempProject.genres
        .filter((genre) => genre && genre.name)
        .map((genre) => genre.name)
    : []
);
 
  const [selectedYear, setSelectedYear] = useState(tempProject?.releaseYear || null);
  const [selectedDuration, setSelectedDuration] = useState(
    tempProject?.duration || null
  );
  const [keywords, setKeywords] = useState(
    tempProject?.keywords || ''
  );

  const [descriptionInput, setDescriptionInput] = useState(
    tempProject?.description || ""
  );
  const [directorInput, setDirectorInput] = useState(
    tempProject?.director || ""
  );
  const [producerInput, setProducerInput] = useState(
    tempProject?.producer || ""
  );

  const allValues = useMemo(
    () => [
      titleInput,
      selectedCategories,
      selectedAges,
      selectedGenres,
      selectedYear,
      selectedDuration,
      keywords,
      descriptionInput,
      directorInput,
      producerInput,
    ],
    [
      titleInput,
      selectedCategories,
      selectedAges,
      selectedGenres,
      selectedYear,
      selectedDuration,
      keywords,
      descriptionInput,
      directorInput,
      producerInput,
    ]
  );

  const checkIfFilled = useCallback(() => {
    setIsFilledSection(allValues.every(checkFilled));
  }, [allValues, setIsFilledSection]);

  useEffect(() => {
    checkIfFilled();
  }, [checkIfFilled]);


  const updateTempProject = useCallback(() => {
    setTempProject((prev) => ({
      ...prev,
      title: titleInput,
      categories: selectedCategories.map((name) =>
        data.categories.find((c) => c.name === name) || { name, categoryId: null }
      ),
      ageCategories: selectedAges.map((name) =>
        data.ages.find((a) => a.name === name) || { name, ageCategoryId: null }
      ),
      genres: selectedGenres.map((name) =>
        data.genres.find((g) => g.name === name) || { name, genreId: null }
      ),
      releaseYear: selectedYear,
      duration: selectedDuration,
      keywords,
      description: descriptionInput,
      director: directorInput,
      producer: producerInput,
    }));
  }, [
    titleInput, selectedCategories, selectedAges, selectedGenres,
    selectedYear, selectedDuration, keywords, descriptionInput,
    directorInput, producerInput, setTempProject, data.categories, data.ages, data.genres
  ]);
  
  useEffect(() => {
    updateTempProject();
  }, [updateTempProject]);
  


  return (
    <>
      <div className="inputs-block-main-info">
        <div className="input-wrapper-main-info">
          <input
            type="text"
            value={titleInput || ""}
            onChange={(e) => setTitleInput(e.target.value)}
            className={`input-main-info ${!titleInput ? "" : "filled"}`}
            placeholder="Название проекта"
          />
          {titleInput && (
            <p className="input-label-projects">Название проекта</p>
          )}
        </div>
        <div className="input-wrapper-main-info">
          <MultiSelectDropdown
            placeholder="Категория"
            options={categories.map((category) => category.name)}
            selectedValues={selectedCategories}
            setSelectedValues={setSelectedCategories}
          />
        </div>
        <div className="input-double-flex-main-info">
          <div className="multi-select-dropdown">
            <MultiSelectDropdown
              placeholder="Тип проекта"
              options={genres.map((genre) => genre.name)}
              selectedValues={selectedGenres}
              setSelectedValues={setSelectedGenres}
            />
          </div>

          <MultiSelectDropdown
            placeholder="Возрастная категория"
            options={ages.map((age) => age.name)}
            selectedValues={selectedAges}
            setSelectedValues={setSelectedAges}
          />
        </div>

        <div className="input-double-flex-main-info">
          <NumericStepperInput
            placeholder="Год"
            selectedValue={selectedYear}
            setSelectedValue={setSelectedYear}
          />
          <NumericStepperInput
            placeholder="Хронометраж (мин)"
            selectedValue={selectedDuration}
            setSelectedValue={setSelectedDuration}
          />
        </div>

        <div className="main-info-keywords-input">
          <input
            type="text"
            value={keywords}
            placeholder="Ключевые слова"
            className={`input-main-info ${
              keywords.length === 0 ? "" : "filled"
            }`}
            onChange={(e) => setKeywords(e.target.value)}
          />
          {keywords.length === 0 ? (
            <p className="empty-keywords-prompt m-0">
              Например: мультфильм, мультсериал
            </p>
          ) : (
            <p className="input-label-projects">Ключевые слова</p>
          )}
        </div>
        <div className="main-info-description-input">
          <textarea
            value={descriptionInput}
            placeholder="Добавьте описание"
            className={`textarea-main-info-description ${
              descriptionInput === "" ? "" : "filled"
            }`}
            onChange={(e) => setDescriptionInput(e.target.value)}
          ></textarea>
        </div>
        <div className="input-wrapper-main-info">
          <input
            type="text"
            value={directorInput || ""}
            onChange={(e) => setDirectorInput(e.target.value)}
            className={`input-main-info ${!directorInput ? "" : "filled"}`}
            placeholder="Режиссер"
          />
          {directorInput && <p className="input-label-projects">Режиссер</p>}
        </div>
        <div className="input-wrapper-main-info">
          <input
            type="text"
            value={producerInput || ""}
            onChange={(e) => setProducerInput(e.target.value)}
            className={`input-main-info ${!producerInput ? "" : "filled"}`}
            placeholder="Продюссер"
          />
          {producerInput && <p className="input-label-projects">Продюссер</p>}
        </div>
      </div>
    </>
  );
}

MainSection.propTypes = {
  tempProject: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.number,
        name: PropTypes.string.isRequired,
        countOfMovies: PropTypes.number,
      })
    ),    
    ageCategories: PropTypes.arrayOf(
      PropTypes.shape({
        ageCategoryId: PropTypes.number,
        name: PropTypes.string.isRequired,
        countOfMovies: PropTypes.number,
      })
    ),   
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        genreId: PropTypes.number,
        name: PropTypes.string.isRequired,
        countOfMovies: PropTypes.number,
      })
    ),  
    releaseYear: PropTypes.number,
    duration: PropTypes.number,
    keywords: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
    producer: PropTypes.string,
    series: PropTypes.shape({
      seasonCount: PropTypes.number,
    }),
  }),
  setTempProject: PropTypes.func.isRequired,
  setIsFilledSection: PropTypes.func.isRequired,
};
