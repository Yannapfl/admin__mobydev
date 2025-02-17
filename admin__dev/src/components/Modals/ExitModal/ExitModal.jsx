import "../Modals.css";
import close from "../../../assets/icons/close.svg";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";

export function ExitModal({ closeModal }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-title">
          <button className="btn-img p-0" onClick={closeModal}>
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="border-line"></div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <p className="modal-delete-text">Вы действительно хотите выйти?</p>
          <div className="modal-btn-group pb-32">
            <button type="submit" className="btn-red">
              Выйти
            </button>
            <button className="btn-grey" onClick={closeModal}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ExitModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
