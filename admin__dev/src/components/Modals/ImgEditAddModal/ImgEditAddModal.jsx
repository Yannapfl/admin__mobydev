import "./ImgEditAddModal.css";
import "../Modals.css";
import close from ".././../../assets/icons/close.svg";

export function ImgEditAddModal({
  mode,
  labelGenetive,
  labelPrepositional,
  text,
  setText,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "add"
      ? `Добавить ${labelGenetive}`
      : `Редактировать ${labelGenetive}`;
  const buttonText = mode === "add" ? "Добавить" : "Сохранить";
  

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-title">
          <h2>{title}</h2>
          <button className="btn-img" onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="border-line m-0"></div>
        <form className="modal-form">
          <input
            type="text"
            placeholder={`Название ${labelPrepositional}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="modal-btn-group">
            <button type="button" onClick={onSubmit}>
              {buttonText}
            </button>
            <button type="button" className="btn-grey" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
