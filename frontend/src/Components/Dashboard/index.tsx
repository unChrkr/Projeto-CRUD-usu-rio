import { useContext } from "react"
import { DashboardContainer, StyledHeader, StyledHeader_divUpper, StyledHeader_divLower, StyledMain, StyledSpan, StyledUl, StyledLi, StyledClass, StyledDivModal, StyledCloseModalButton } from './styled'
import Modal from 'react-modal'
import { CreateModalContext } from "../../Providers/ModalContext"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { ContactContext, IContactCreateData } from "../../Providers/ContactContext"
import { ModalUpdate } from '../ModalUpdate'
import React from "react"


export const DashboardPage = () => {

    const { modalUpdate, setModal, setModalUpdate, modal } = useContext(CreateModalContext)
    const { createContact, allContacts, setContact, order, setOrder} = useContext(ContactContext)

    const CreateContactForm = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().required()
    })

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(CreateContactForm),
    })

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            padding: '0px',
            border: 'none',
        },
    };

    return (
        <DashboardContainer>
            <StyledHeader>
                <StyledHeader_divUpper>
                    <h1>DataCrazy</h1>
                </StyledHeader_divUpper>
                <StyledHeader_divLower>
                    <h1>Olá, dev!</h1>
                </StyledHeader_divLower>
            </StyledHeader>
            <StyledMain>
                <StyledSpan>
                    <p>Contatos</p>
                    <select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="desc">Mais recente</option>
                        <option value="asc">Menos recente</option>             
                    </select>
                    <button onClick={() => setModal(true)}>Criar contato</button>
                </StyledSpan>
                {allContacts.length > 0 ?
                    <StyledUl>
                        {allContacts.map((contact) => (
                            <StyledLi key={contact.id} onClick={(event) => {
                                event.stopPropagation()
                                setModalUpdate(true)
                                setContact(contact)
                            }}>
                                <p>{contact.name}</p>
                                <StyledClass>
                                    <p>{contact.name}</p>
                                </StyledClass>
                            </StyledLi>
                        ))}
                    </StyledUl>
                    : <p>Nenhum contato cadastrado!</p>
                }
                <Modal
                    isOpen={modal}
                    onRequestClose={() => setModal(false)}
                    overlayClassName='modal-overlay'
                    style={customStyles}>
                    <StyledDivModal>
                        <span>
                            <p>Cadastrar contato</p>
                        </span>
                        <form onSubmit={handleSubmit((data) => createContact(data as IContactCreateData))}>
                            <label htmlFor="">Nome</label>
                            <input type="text" {...register('name')} />
                            <label htmlFor="">Email</label>
                            <input type="text" {...register('email')} />
                            <label htmlFor="">Telefone</label>
                            <input type="text" {...register('phone')} />
                            <button type="submit">Cadastrar contato</button>
                        </form>
                        <StyledCloseModalButton onClick={() => setModal(false)}>x</StyledCloseModalButton>
                    </StyledDivModal>
                </Modal>
                <Modal
                    isOpen={modalUpdate}
                    onRequestClose={() => setModalUpdate(false)}
                    overlayClassName='modal-overlay'
                    style={customStyles}>
                    <ModalUpdate />
                </Modal>
            </StyledMain>
        </DashboardContainer>
    )
}
