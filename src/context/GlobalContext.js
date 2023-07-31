import React, { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '../Firebase/FireConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const GlobalContext = createContext({})

function GlobalProvider({children}) {
    const [MyImages, setMyImages] = useState([])
    const [getData, setGetData] = useState([])
    const API_KEY = 'EkX_JqCgWyhyb1HTAsK53Ymjt8mx8Y-eMQ2lzm9tStY'
    const API_SECRET = 'xvh3_kgAofyrCSMB8-MpOIAxle2TnYHlRHSDETdhKBc'
    const [inputSearch, setInputSearch] = useState('')
    const [PasswordInput, setPasswordInput] = useState('')
    const [CurrentObject, setCurrentObject] = useState({})
    const [Url, setUrl] = useState("")
    const [labelInput, setLabelInput] = useState("")
    const UploadImage =async(file)=>{
        const filetoUpload = file[0]
        try {
            const storageRef = ref(storage,`files/${filetoUpload.name}`)
            await uploadBytes(storageRef, filetoUpload)
            const downloadUrl = await getDownloadURL(storageRef)
            setUrl(downloadUrl)
            console.log(downloadUrl)

        } catch (error) {
            
        }
    }
    const SaveImage = ()=>{
        if (labelInput !== "" && Url !== "") {
            setMyImages((Prev)=> [...Prev,{urls:{regular:Url},alt_description:labelInput,id:`85as2${labelInput}8421`}])
        }
    }
    const HandleDelete = ()=>{
        if (CurrentObject && PasswordInput !== "") {
            const Filter = MyImages.filter((item)=> item.id !== CurrentObject.id)
            setMyImages(Filter)
        }
    }

    const HandleOnSubmit=(inputSearch)=>{
        const Filter = MyImages.filter((item)=> inputSearch === "" ? item : item.alt_description.toLowerCase().includes(inputSearch.toLowerCase()) )
        setMyImages(Filter)
    }
    useEffect(() => {
        if (inputSearch === "") {
            setMyImages(getData)
        }
    }, [inputSearch])
    useEffect(() => {
        const GetPhotos = async()=>{
            try {
                //const res = await fetch(`https://api.unsplash.com/photos/random?count=30&client_id=${API_KEY}`)
                const res = await fetch(`https://apimocha.com/myunsplashapi/MyUnsplashApi/`)
                const data = await res.json()
                setMyImages(data)
                setGetData(data)
            } catch (error) {
                console.log(error)
            }
        }
        GetPhotos()
    }, [])

  return (
    <GlobalContext.Provider value={{MyImages,inputSearch,labelInput,setLabelInput,setUrl,SaveImage,PasswordInput,Url,UploadImage, setPasswordInput, setInputSearch,HandleOnSubmit,HandleDelete,setCurrentObject}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider

export const UseGlobal = ()=>useContext(GlobalContext)