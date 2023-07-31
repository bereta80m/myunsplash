import React, { useEffect } from "react";
import { UseGlobal } from "../context/GlobalContext";

function ModalEnterPassword({ isDeleteOpen,HandleDeleteClose }) {
  const {HandleDelete,PasswordInput, setPasswordInput} = UseGlobal()
  const DeleteAndClose = ()=>{
    HandleDelete()
    HandleDeleteClose()
    setPasswordInput('')
  }
  useEffect(() => {
    const HandleCloseOutside = (e)=>{
      if (isDeleteOpen && e.target.classList.contains('WrapperOutside')) {
        HandleDeleteClose()
      }
    }
    window.addEventListener("click",HandleCloseOutside)
    return ()=>{
      window.removeEventListener("click",HandleCloseOutside)
    }
  }, [isDeleteOpen,HandleDeleteClose])

  if (isDeleteOpen) {
    return (
      <div className="WrapperOutside fixed inset-0 w-full h-screen grid place-items-center z-20 bg-black/50 ">
        <div className="bg-white flex flex-col gap-5 items-center px-10 py-5 rounded-xl lg:w-[30vw] lg:h-[30vh]">
          <p className="text-3xl ">Are you sure ?</p>
          <div className="flex flex-col w-full gap-2">
            <p>Password</p>
            <input type="text" value={PasswordInput} onChange={(e)=>setPasswordInput(e.target.value)} placeholder="*************" className="border outline-none rounded-xl border-black p-2"/>
          </div>
          <div className="flex justify-end w-full gap-5">
            <button onClick={()=>HandleDeleteClose()} className="">Cancel</button>
            <button className="bg-red-500 rounded-xl px-3 py-2 text-white" onClick={()=>DeleteAndClose()}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalEnterPassword;
