import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { api } from "../Sevices/api.tsx"
import { toast } from 'react-toastify';
import { IDefaultProviderProps } from "./@types.ts";
import React from 'react';


export const ContactContext = createContext({} as IContactContext )

export interface IContact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export type IContactUpdate = Partial<IContactCreateData>

export type IContactCreateData = Omit<IContact, 'id'>

export interface IContactContext {
  allContacts: IContact[];
  setAllContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
  contact?: IContact 
  setContact: React.Dispatch<React.SetStateAction<IContact | undefined>>
  createContact: (data: IContactCreateData) => void
  removeContact: (contactId: number) => void
  updateContact: (formData: IContactUpdate, contactId: number) => void
  order: string
  setOrder: Dispatch<SetStateAction<string>>
}

export const ContactContextProvider = ({ children }: IDefaultProviderProps) => {
  
  const [allContacts, setAllContacts] = useState<IContact[]>([]); 
  const [contact, setContact] = useState<IContact>()
  const [order, setOrder] = useState("desc")
  
  useEffect(() => {
    const getUsers = async () => {
        try {
            const response = await api.get(`/users?order=${order}`);
            setAllContacts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    getUsers();
}, [order]);


  const createContact = async (data: IContactCreateData): Promise<void> => {
    try {
      const response = await api.post('/users', data);
      setAllContacts([...allContacts, response.data]);
      toast.success('Contato criado com sucesso.');
    } catch (error) {
      console.log(error)
      toast.error('Erro ao criar contato'); 
    }
  }

  const removeContact = async (contactId: number): Promise<void> => {
    try {
      await api.delete(`/users/${contactId}`, {
      })
      toast.success('Contato deletado com sucesso')
      setAllContacts(previousContacts => previousContacts.filter(contact => contact.id !== contactId))
    } catch (error) {
      console.log(error);
    }
  }

  const updateContact = async (formData: IContactUpdate, contactId: number): Promise<void> => {
    try {
      await api.put(`/users/${contactId}`, formData)
      toast.success('Contato atualizado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ContactContext.Provider value={{ setContact, createContact, removeContact, updateContact, allContacts, setAllContacts, contact, setOrder, order }}>
      {children}
    </ContactContext.Provider>
  )
}


export const Example = () => {
  const [userList, setUserList] = useState([]);
  const [order, setOrder] = useState("desc");

  useEffect(() => {
      async function getUsers(){
          try {
              const request = await fetch(`/users?order=${order}`);
              const json = await request.json();
              setUserList(json);
          } catch (error) {
              console.log(error)
          }
      }   
      getUsers();
  }, [order]);

  return(
      <>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="desc">Mais recente</option>
              <option value="asc">Menos recente</option>             
          </select>
          <ul></ul>
      </> 
   
  )
}