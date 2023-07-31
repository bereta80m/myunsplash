import React, { useEffect, useRef, useState } from "react";
import { UseGlobal } from "../context/GlobalContext";
import { GetImages } from "../components/GetImages";
import MyModal from "../components/MyModal";
import {AiOutlineDelete} from "react-icons/ai"
import { UseModal } from "../context/ModalContext";

function Home() {
  const { MyImages,setCurrentObject } = UseGlobal();
  const {isDeleteOpen, setIsDeleteOpen} = UseModal()
  const [morePhotos, setMorePhotos] = useState(15);
  //const Sizes = ["small", "medium", "large","small", "medium", "large","small", "medium", "large","medium","small", "medium", "large","small", "medium", "large","small", "medium", "large","medium"].sort(Randomizer)
  //const NewList = GetImages.map((item,index)=> ({...item,zises:Sizes[index]}))
  const [isBottom, setIsBottom] = useState(false);
  
  const ModalDelete = (item)=>{
    setIsDeleteOpen(true)
    setCurrentObject(item)
  }
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setIsBottom(true);
      setMorePhotos((Prev) =>
        Prev !== MyImages?.length ? Prev + 5 : (Prev = MyImages?.length)
      );
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="WrapperContainer relative lg:columns-5 md:columns-4 sm:columns-3 xs:columns-2 xxs:columns-1">
      {MyImages?.slice(0, morePhotos).map((item, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col px-1 py-1 rounded-lg relative group`}>
            <AiOutlineDelete onClick={()=>ModalDelete(item)} className="group-hover:grid hidden absolute right-3 top-3 text-2xl cursor-pointer z-20 text-white"/>
            <img
              src={item.urls.regular}
              alt={item.alt_description}
              className={`rounded-lg h-full w-full object-cover `}
            />
            <div className="group-hover:grid hidden place-items-center absolute bottom-20  w-[236px] bg-black/40 z-10">
              <p className="absolute text-white text-sm break-words px-10">{item.alt_description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
