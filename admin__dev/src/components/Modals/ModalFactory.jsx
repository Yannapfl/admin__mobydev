import AddEditHomeModal from "./AddEditHomeModal/AddEditHomeModal";
import ImgEditAddModal from "./ImgEditAddModal/ImgEditAddModal";
import { ModalDelete } from "./ModalDelete/ModalDelete";
import SuccessModal from "./SuccessModal/SuccessModal";
import { TextEditModal } from "./TextEditModal/TextEditModal";
import PropTypes from "prop-types";

export function ModalFactory({ type, modalProps }) {
    switch (type) {
        case 'text':
            return <TextEditModal {...modalProps} />
        case 'image':
            return <ImgEditAddModal {...modalProps} />
        case 'dropdown':
            return <AddEditHomeModal {...modalProps} />
        case 'delete':
            return <ModalDelete {...modalProps} />
        case 'success':
            return <SuccessModal {...modalProps}/>
        default:
            return null;
    }
}

ModalFactory.propTypes = {
    type: PropTypes.string.isRequired,
    modalProps: PropTypes.object.isRequired
};