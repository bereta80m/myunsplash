import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { UseGlobal } from "../context/GlobalContext";
import MyModal from "./MyModal";
import { UseModal } from "../context/ModalContext";
import ModalEnterPassword from "./ModalEnterPassword";

function Header() {
  const { HandleOnSubmit, inputSearch, setInputSearch } = UseGlobal();
  const {isOpen, setIsOpen,HandleClose,isDeleteOpen,HandleDeleteClose} = UseModal()

  const OnSubmitFunc = (e) => {
    e.preventDefault();
    HandleOnSubmit(inputSearch);
  };

  return (
    <div className="flex w-full relative items-center justify-between px-5 py-5">
        <MyModal isOpen={isOpen} HandleClose={HandleClose}/>
        <ModalEnterPassword isDeleteOpen={isDeleteOpen} HandleDeleteClose={HandleDeleteClose}/>
      <div className="flex justify-center gap-3 lg:flex-row  md:flex-row  sm:flex-row  xs:flex-col xxs:flex-col  ">
        <div className="bg-my_unsplash_logo  bg-contain w-44 h-12  bg-no-repeat" />
        <form
          onSubmit={OnSubmitFunc}
          className="flex border items-center gap-2 h-12  rounded-lg px-2"
        >
          <AiOutlineSearch className="text-black/50" />
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className=" text-black/50 border-none outline-none "
            placeholder="Search by name"
          />
        </form>
      </div>
      <div className="absolute top-0 right-0 px-5 py-5">
        <button onClick={()=>setIsOpen(true)} className="bg-[#3db46d] text-white px-5 py-3 rounded-lg ">
          Add a photo
        </button>
      </div>
    </div>
  );
}

export default Header;

/*
        <div className="flex border items-center  ">
        <AiOutlineSearch className='' />
          <input type="text" className="p-2 text-black/50 " placeholder="Search by name"/>
        </div>

*/
