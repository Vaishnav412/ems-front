import React, { createContext, useState } from 'react'

export const registerContext=createContext()

function Contextshare({children}) {

   const [resgisterData,setregisterData]=useState("")

  return (
    <>
    
    <registerContext.Provider value={{resgisterData,setregisterData}}>

        {children}

    </registerContext.Provider>
    
    
    
    
    </>
  )
}

export default Contextshare