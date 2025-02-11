import '../Modals.css';
import close from '../../../assets/icons/close.svg'
import successArrow from '../../../assets/icons/success_arrow.svg'
import PropTypes from "prop-types";

export default function SuccessModal({ closeModal, navigate }) {
    const handleClose = () => {
        closeModal();
        navigate("/projects"); 
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header-success'>
                    <button className="btn-img p-0" onClick={closeModal}>
                        <img src={close} alt="close" />
                    </button>
                </div>
                <div className="border-line"></div>
                <div className='modal-content-success'>
                    <img src={successArrow} alt='succuess' />
                    <h1 className='m-0'>Проект добавлен успешно!</h1>
                </div>
                <div className='modal-btn-group pb-32'>
                    <button className="btn" onClick={handleClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    )
}

SuccessModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
}