import React, { createContext, useContext, useEffect, useState } from 'react'

const ModalContext = createContext({})



function ModalProvider({children}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const HandleDeleteClose = ()=>{
      if (isDeleteOpen) {
        setIsDeleteOpen(false)
      }
    }
    const HandleClose = ()=>{
        if (isOpen) {
            setIsOpen(false)
        }
    }
  return (
    <ModalContext.Provider value={{isOpen, setIsOpen,HandleClose,isDeleteOpen, setIsDeleteOpen,HandleDeleteClose}}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider

export const UseModal = ()=>useContext(ModalContext)