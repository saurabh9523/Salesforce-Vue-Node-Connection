import axios from 'axios';

const login= async function(credentials){
    return await axios.post('/auth/login',{...credentials})
}

const logout=async function(){
    return await axios.post('/auth/logout',{withCredentials:true})
}

const validateSession=async function(){
    return await axios.post('/auth/validateSession',{withCredentials:true})
}

const navigateToRecord=async function(recordId){
    return await axios.get(`/auth/navigateToRecord/${recordId}`,{withCredentials:true})
}

export  {login,logout,validateSession,navigateToRecord}