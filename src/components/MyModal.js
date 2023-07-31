import React, { useEffect } from "react";
import { UseGlobal } from "../context/GlobalContext";

function MyModal({ isOpen, HandleClose }) {
  const {Url,setLabelInput,labelInput,setUrl,UploadImage,SaveImage} = UseGlobal()
  const SaveAndClose = ()=>{
    SaveImage()
    HandleClose()
    setUrl('')
    setLabelInput('')
  }
    useEffect(() => {
        const HandleModal = (e)=>{
            if (isOpen && e.target.classList.contains("ContainerRed")) {
                HandleClose()
            }
        }
        window.addEventListener("click", HandleModal)
        return()=>{
            window.removeEventListener("click", HandleModal)
        }
    }, [isOpen,HandleClose])

  if (isOpen) {
    return (
      <div className="ContainerRed fixed w-full h-screen inset-0 flex justify-center items-center bg-black/50 z-20 bg-opacity-50">
        <div className="bg-white flex flex-col gap-3 justify-start px-10 py-10 lg:w-[30vw] lg:h-[45vh] rounded-lg">
            <p className='text-3xl '>Add a new photo </p>
            <div className="flex flex-col w-full gap-2">
            <p>Label</p>
            <input type="text" value={labelInput} onChange={(e)=>setLabelInput(e.target.value)} placeholder="Enter a Label" className="border outline-none rounded-xl border-black p-2"/>
          </div>
          <div className="flex flex-col w-full gap-2">
            <p>Photo URL</p>
            <input type="text" value={Url} onChange={(e)=>setUrl(e.target.value)} placeholder="Enter a photo url" className="border outline-none rounded-xl border-black p-2"/>
          </div>
          <div className="flex items-center justify-end w-full gap-5 py-3">
            <label htmlFor="labelFileID" className="bg-blue-500 cursor-pointer rounded-xl px-3 py-2 text-white">Upload</label>
          <input id="labelFileID" onChange={(e)=>UploadImage(e.target.files)} type="file" className="hidden" />
            <button onClick={()=>HandleClose()} className="">Cancel</button>
            <button onClick={()=>SaveAndClose()} className="bg-green-500 rounded-xl px-3 py-2 text-white" >Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyModal;
