import { useEffect, useRef } from "react";

export const useOutsideClick = (ref, callback) => {

    const firstRender = useRef(false)

    useEffect(() => {

        const handler = (event) => {
            if(ref.current && !ref.current.contains(event.target)){
                console.log("Encontrado")
                callback()
                // return
            }
        }

        document.addEventListener("click", handler)
        document.addEventListener("touchstart", handler)
        
        return()=>{
            document.removeEventListener("click", handler)
            document.removeEventListener("touchstart", handler)
        }
    },[ref, callback])
    return null
}