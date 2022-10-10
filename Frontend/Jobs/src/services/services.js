import { BASE_URL } from "../constants/baseURL"

export const post = async (endpoint, headers, body) =>  {

    const request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
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