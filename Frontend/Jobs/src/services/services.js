import { BASE_URL } from "../constants/baseURL"

export const post = async (endpoint, headers, body, isFormData) =>  {

    console.log(body)

    const request = {
        method: 'POST',
        headers,
        body: isFormData ? body : JSON.stringify(body)
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, request);    
    const data = await res.json()
    
    return data
}

export const get = async (endpoint, headers) =>  {

    const request = {
        method: 'GET',
        headers,
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, request);

    return await res.json()
}

export const f_delete = async (endpoint, headers) => {

    const request = {
        method: 'DELETE',
        headers
    }
    
    const res = await fetch(`${BASE_URL}${endpoint}`, request)

    return await res.json()
}

export const put = async(endpoint, headers, body, isFormData) => {

    const request = {
        method: 'PUT',
        headers,
        body: isFormData ? body : JSON.stringify(body)
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, request);    
    const data = await res.json()
    
    return data
    
}

export const getCountries = async () => {

    const res = await fetch('https://restcountries.com/v2/all')
    const data = await res.json()
    return data
}