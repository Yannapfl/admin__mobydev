import '../Modals.css';
import './UserModal.css'
import close from '../../../assets/icons/close.svg'
import smile from '../../../assets/icons/smile.svg'
import { formatDateBirth } from '../../../utils/formateDateBirth'
import PropTypes from "prop-types";

export default function UserModal({ closeModal, user }) {
    return (
        <div className="modal user-modal">
            <div className="modal-content">
                <div className="modal-title">
                    <h2>Данные пользователя</h2>
                    <button className="btn-img p-0" onClick={closeModal}>
                        <img src={close} alt="close" />
                    </button>
                </div>
                <div className="border-line"></div>
                <div className='modal-form user-modal-form'>
                    <img src={smile} alt='smile' />
                    <div className='user-modal-text-block'>
                        <h1 className='m-0'>{user.name}</h1>
                        <h4>{user.telephone}</h4>
                        <h4>{user.email}</h4>
                        <h4>{`Дата рождения: ${formatDateBirth(user.dateBirth)}`}</h4>
                    </div>
                </div>
                <div className='modal-btn-group pb-32'>
                    <button onClick={closeModal}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    )
}

UserModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        telephone: PropTypes.string,
        email: PropTypes.string,
        dateBirth: PropTypes.string,
    }).isRequired,
}