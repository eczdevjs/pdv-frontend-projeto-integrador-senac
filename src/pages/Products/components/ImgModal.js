import { Modal } from '../../../components/Layout/Modal';


export function ImgModal({ imgsrc, showModal, closeModal}) {

    return (
        <Modal showModal={showModal}  closeModal={closeModal}>
            <img src={imgsrc}></img>
        </Modal>
    );

}