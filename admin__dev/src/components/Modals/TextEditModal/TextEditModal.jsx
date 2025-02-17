import "./TextEditModal.css";
import "../Modals.css";
import close from "../../../assets/icons/close.svg";
import PropTypes from "prop-types";
import { useState } from "react";

export function TextEditModal({
  mode,
  entity,
  onAdd,
  onUpdate,
  closeModal,
  labelPrepositional,
  labelGenetive,
}) {
  const [label, setLabel] = useState(entity?.label || "");

  const title =
    mode === "add"
      ? `Добавить ${labelGenetive}`
      : `Редактировать ${labelGenetive}`;
  const buttonText = mode === "add" ? "Добавить" : "Сохранить";

  const handleSave = () => {
    if (!label.trim()) {
      alert("Название не может быть пустым");
      return;
    }

    const newEntity = { id: entity?.id || Date.now(), label };
    mode === "edit" ? onUpdate(newEntity) : onAdd(newEntity);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-title">
          <h2>{title}</h2>
          <button className="btn-img" onClick={closeModal}>
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="border-line m-0"></div>
        <form className="modal-form" onSubmit={handleSave}>
          <input
            type="text"
            placeholder={`Название ${labelPrepositional}`}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <div className="modal-btn-group">
            <button type="submit">
              {buttonText}
            </button>
            <button type="button" className="btn-grey" onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

TextEditModal.propTypes = {
  labelGenetive: PropTypes.string.isRequired,
  labelPrepositional: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
  entity: PropTypes.object,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
