import axios from 'axios'
import { api } from '@/core/constants/api'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: api.BASE_URL
}

const instance: AxiosInstance = axios.create(axiosConfig)

export const API = instance
