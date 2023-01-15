const baseURLForDev = import.meta.env.VITE_BASE_URL_DEV
const baseURLFilesForDev = import.meta.env.VITE_BASE_URL_FILES_DEV

const baseURLForProd = import.meta.env.VITE_BASE_URL
const baseURLFilesForProd = import.meta.env.VITE_BASE_URL_FILES

const currentEnv = import.meta.env.VITE_NODE_ENV

export const BASE_URL = currentEnv === "production" ? baseURLForProd : baseURLForDev
export const BASE_URL_FILES = currentEnv === "production" ? baseURLFilesForProd : baseURLFilesForDev