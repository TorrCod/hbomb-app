import { Button } from "antd";
import { useRef, useState } from "react";
import ModalAntD, { MADhandle } from "./ModalAntD";
import './css/ErrorModal.css';

const ErrorModal = ({children,title}:ErrorModalType) => {
    const modalRef = useRef<MADhandle>(null);
    const [onError, setOnError] = useState(false);

    const handleButton = () => {
        setOnError(false);
        modalRef.current?.handleCancel();
    }

    const showErrorModal = (payload:boolean) => {
        setOnError(payload)
    }

    if(onError) modalRef.current?.showModal();

    return (
        <>
            <ModalAntD className="error-modal" title={title} ref={modalRef} handleCancel={() => {modalRef.current?.handleCancel()}}>
                {children}
                <Button type="primary" onClick={handleButton}>OK</Button>
            </ModalAntD>
        </>
    )
}

type ErrorModalType = {
    children:React.ReactNode;
    title: string;
}
export type ErrorModalRef = {
    showErrorModal: (payload:boolean) => void;
}

export default ErrorModal;