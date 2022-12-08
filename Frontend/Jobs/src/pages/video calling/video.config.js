const APP_ID = "527c57ba06aa4176be2ab16cb0d822f2";
const APPCERTIFICATE = "e14790d3728b460e819ccad2aacb1368"
const TOKEN = "007eJxTYFD/e9AxJSr6jabGvx1SW6vPN0qrHnySY3g/TsphT+uHz5oKDKZG5smm5kmJBmaJiSaG5mZJqUaJSYZmyUkGKRZGRmlG5qkTkxsCGRn4oz8wMjJAIIjPwpCbmJnHwAAAak0fiQ==";
export const CHANNEL = "main"

import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react'

export const config = { mode: "rtc", codec:"vp8", appId: APP_ID, token: TOKEN}

export const useClient =  createClient(config)
export const useMicrophoneAndCamera = createMicrophoneAndCameraTracks()
