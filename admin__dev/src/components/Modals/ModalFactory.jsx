import ImgEditAddModal from "./ImgEditAddModal/ImgEditAddModal";
import { ModalDelete } from "./ModalDelete/ModalDelete";
import { TextEditModal } from "./TextEditModal/TextEditModal";
import PropTypes from "prop-types";

export function ModalFactory({ type, modalProps }) {
    switch (type) {
        case 'text':
            return <TextEditModal {...modalProps} />
        case 'image':
            return <ImgEditAddModal {...modalProps} />
        case 'delete':
            return <ModalDelete {...modalProps} />
        default:
            return null;
    }
}

ModalFactory.propTypes = {
    type: PropTypes.string.isRequired,
    modalProps: PropTypes.array.isRequired,
};