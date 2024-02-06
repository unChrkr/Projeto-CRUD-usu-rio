import React, { createContext, useState } from 'react';
import { IDefaultProviderProps } from './@types';

export interface IModal {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalUpdate: boolean;
    setModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalContextDefaultValues: IModal = {
    modal: false,
    setModal: () => {},
    modalUpdate: false,
    setModalUpdate: () => {}
};

export const CreateModalContext = createContext<IModal>(modalContextDefaultValues);

export const CreateModalProvider: React.FC<IDefaultProviderProps> = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    return (
        <CreateModalContext.Provider value={{ modal, setModal, modalUpdate, setModalUpdate }}>
            {children}
        </CreateModalContext.Provider>
    );
};
