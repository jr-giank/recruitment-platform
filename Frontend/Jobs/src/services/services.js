import { BASE_URL } from "../constants/baseURL"

export const postService = async (endpoint, headers, body) =>  {

    const request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }

    const res = await fetch(`${BASE_URL}endpoint`, request);

    return await res.json()
}

export const getService = async (endpoint, headers) =>  {

    const request = {
        method: 'GET',
        headers,
    }

    const res = await fetch(`${BASE_URL}endpoint`, request);

    return await res.json()
}