import { CommonApi } from "./CommonApi";
import { BASE_URL } from "./baseUrl";




// add employee

export const addUser=async(body,header)=>{
 return await   CommonApi("POST",`${BASE_URL}/add`,body,header)
}

// get employee

export const allUsers=async(search)=>{
    return await CommonApi("GET",`${BASE_URL}/get-all-users?search=${search}`,"")
}

// delete employee

export const deleteUser=async(id)=>{
    return await CommonApi("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}

// edit employee

export const editUser=async(id,body,header)=>{
    return await CommonApi("PUT",`${BASE_URL}/edit-user/${id}`,body,header)
}