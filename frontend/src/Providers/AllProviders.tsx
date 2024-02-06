import React from "react";
import { ContactContextProvider } from "./ContactContext";
import { CreateModalProvider } from "./ModalContext";


const Providers = ({ children }) => {
    return (
            <ContactContextProvider>
                <CreateModalProvider>
                    {children}
                </CreateModalProvider>
            </ContactContextProvider>
    )
}

export default Providers