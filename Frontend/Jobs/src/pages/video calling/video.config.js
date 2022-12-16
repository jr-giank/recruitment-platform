const APP_ID = "9c01a7dc56604b15b8a428063b7a4148";
const TOKEN = "007eJxTYNh07JPk+/tntq5avXTqqs9OrocDkxvYfY5zLJzh+0w4/m2DAoOpkXmyqXlSooFZYqKJoblZUqpRYpKhWXKSQYqFkVGa0ZV7k5MbAhkZlgt9Y2FkgEAQn4UhNzEzj4EBAEM2IrA=";
export const CHANNEL = "main"

import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react'

export const config = { mode: "rtc", codec:"vp8", appId: APP_ID, token: TOKEN}

export const useClient =  createClient({mode: "rtc", codec:"vp8"})
export const useMicrophoneAndCamera = createMicrophoneAndCameraTracks()
