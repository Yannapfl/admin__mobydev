import PropTypes from "prop-types";
import close from "../../../assets/icons/close.svg";
import "../Modals.css";

export function ModalDelete({ label, onConfirm, closeModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-title">
                    <h2>Удалить {label}?</h2>
                    <button className="btn-img p-0" onClick={closeModal}>
                        <img src={close} alt="close" />
                    </button>
                </div>
                <div className="border-line"></div>
                <p className="modal-delete-text">Вы действительно хотите удалить {label}?</p>
                    <div className="modal-btn-group pb-32">
                        <button onClick={onConfirm}>
                            Да, удалить
                        </button>
                        <button className="btn-grey" onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
            </div>
        </div>
    );
}

ModalDelete.propTypes = {
    label: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
};