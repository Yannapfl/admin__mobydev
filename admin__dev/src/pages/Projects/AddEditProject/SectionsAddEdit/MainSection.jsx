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
  setType,
}) {
  const { data } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const typesProjects = ["Фильм", "Сериал"];
  const [titleInput, setTitleInput] = useState(tempProject?.title || "");
  const categories = data.categories.map((category) => category.label);
  const [selectedCategories, setSelectedCategories] = useState(
    tempProject?.categories || []
  );
  const [selectedType, setSelectedType] = useState(tempProject?.type || "");
  const ages = data.ages.map((age) => age.label);
  const [selectedAges, setSelectedAges] = useState(
    tempProject?.ageCategories || []
  );
  const [selectedYear, setSelectedYear] = useState(tempProject?.year || null);
  const [selectedDuration, setSelectedDuration] = useState(
    tempProject?.duration || null
  );
  const [selectedKeywords, setSelectedKeywords] = useState(
    tempProject?.keywords || []
  );
  const [keywordInput, setKeywordInput] = useState(
    selectedKeywords.join(", ") || ""
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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const allValues = useMemo(
    () => [
      titleInput,
      selectedCategories,
      selectedType,
      selectedAges,
      selectedYear,
      selectedDuration,
      selectedKeywords,
      descriptionInput,
      directorInput,
      producerInput,
    ],
    [
      titleInput,
      selectedCategories,
      selectedType,
      selectedAges,
      selectedYear,
      selectedDuration,
      selectedKeywords,
      descriptionInput,
      directorInput,
      producerInput,
    ]
  );

  const checkIfFilled = useCallback(() => {
    const allFieldsFilled = allValues.every((value) => checkFilled(value));
    setIsFilledSection(allFieldsFilled);
  }, [allValues, setIsFilledSection]);

  const checkType = useCallback(() => {
    setType(selectedType);
  }, [selectedType, setType]);

  useEffect(() => {
    checkIfFilled();
    checkType();
  }, [checkIfFilled, checkType]);

  const handleKeywords = (value) => {
    setKeywordInput(value);

    const keywordsArray = value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword !== "");

    setSelectedKeywords(keywordsArray);
    setTempProject((prev) => ({ ...prev, keywords: keywordsArray }));
  };

  useEffect(() => {
    setTempProject((prev) => ({
      ...prev,
      title: titleInput,
      categories: selectedCategories,
      type: selectedType,
      ageCategories: selectedAges,
      year: selectedYear,
      duration: selectedDuration,
      keywords: selectedKeywords,
      description: descriptionInput,
      director: directorInput,
      producer: producerInput,
    }));
  }, [
    setTempProject,
    titleInput,
    selectedCategories,
    selectedType,
    selectedAges,
    selectedYear,
    selectedDuration,
    selectedKeywords,
    descriptionInput,
    directorInput,
    producerInput,
  ]);

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
            options={categories}
            selectedValues={selectedCategories}
            setSelectedValues={setSelectedCategories}
          />
        </div>
        <div className="input-double-flex-main-info">
          <div className="multi-select-dropdown">
            <input
              type="text"
              value={selectedType}
              placeholder="Тип проекта"
              className={`input-main-info ${
                selectedType.length === 0 ? "" : "filled"
              }`}
              readOnly
            />
            <button
              type="button"
              className="btn-img btn-arrow-multidropdown"
              onClick={toggleDropdown}
            >
              {isOpen ? "⏶" : "⏷"}
            </button>
            {isOpen && (
              <ul className="multidropdown-list m-0">
                {typesProjects.map((type) => (
                  <li
                    key={type}
                    className={`multidropdow-list-item ${
                      selectedType.includes(type) ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedType(type);
                      setIsOpen(false);
                    }}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
            {selectedType.length !== 0 && (
              <p className="input-label-projects">Тип проекта</p>
            )}
          </div>

          <MultiSelectDropdown
            placeholder="Возрастная категория"
            options={ages}
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
            value={keywordInput}
            placeholder="Ключевые слова"
            className={`input-main-info ${
              selectedKeywords.length === 0 ? "" : "filled"
            }`}
            onChange={(e) => handleKeywords(e.target.value)}
          />
          {selectedKeywords.length === 0 ? (
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
    categories: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    ageCategories: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.number,
    duration: PropTypes.number,
    keywords: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    director: PropTypes.string,
    producer: PropTypes.string,
  }),
  setTempProject: PropTypes.func.isRequired,
  setIsFilledSection: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};
