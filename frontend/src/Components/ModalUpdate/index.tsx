import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyledDivModalUpdate, StyledCloseModalButton, StyledExcludeModalBytton } from './styled'
import { useContext } from 'react'
import { CreateModalContext } from '../../Providers/ModalContext'
import { ContactContext, IContactUpdate } from '../../Providers/ContactContext'
import { MdClose } from "react-icons/md"

export const ModalUpdate = () => {

    const UpdateContactForm = yup.object().shape({
        name: yup.string().required(),
        phone: yup.number().required(),
        email: yup.string().required()
    })

    const { setModalUpdate } = useContext(CreateModalContext)
    const { updateContact, removeContact, contact, setContact } = useContext(ContactContext)

    const { handleSubmit } = useForm({
        resolver: yupResolver(UpdateContactForm),
        defaultValues: { name: contact?.name, phone: contact?.phone, email: contact?.email }
    })

    const submit = async (formData: IContactUpdate) => {
        if (contact && contact.id) {
        await updateContact( formData , contact.id)
        setModalUpdate(false)
    }
}


    return (
        <StyledDivModalUpdate>
            <form onSubmit={handleSubmit(submit)} >
                <label htmlFor="">Nome</label>
                <input type="text" disabled value={contact?.name} />
                <label htmlFor="">email</label>
                <input type="text" disabled value={contact?.email} />
                <label htmlFor="">phone</label>
                <input type="text" disabled value={contact?.phone} />
                <button>Atualizar contato</button>
            </form >
            <StyledCloseModalButton onClick={() => {
                setContact(undefined)
                setModalUpdate(false)
            }}><MdClose size={24} />
            </StyledCloseModalButton>
            <StyledExcludeModalBytton type='button' onClick={() => contact && removeContact(contact.id)}>Excluir</StyledExcludeModalBytton>
        </StyledDivModalUpdate>
    )
}