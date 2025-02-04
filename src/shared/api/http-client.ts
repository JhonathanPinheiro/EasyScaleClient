import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export const platformHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_PLATFORM_API_BASE_URL}/api`,
  withCredentials: true,
})

export const productHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_PRODUCT_API_BASE_URL}`,
  withCredentials: true,
})
export const funnelBuilderHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_FUNNEL_BUILDER_API_BASE_URL}`,
  withCredentials: true,
})
export const crmHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_CRM_API_BASE_URL}`,
  withCredentials: true,
})
export const paymentHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_PAYMENT_API_URL}`,
  withCredentials: true,
})
export const paymentBaseHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_PAYMENT_BASE_URL}`,
  withCredentials: true,
})
export const workflowHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_WORKFLOW_API_BASE_URL}`,
  withCredentials: true,
})
export const affiliatesHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_AFFILIATE_API_BASE_URL}`,
  withCredentials: true,
})
export const igamingHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_IGAMING_API_BASE_URL}`,
  withCredentials: true,
})
export const hermesHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_HERMES_API_BASE_URL}`,
  withCredentials: true,
})

export interface ErrorResponse {
  code: string
  message: string
}

const customInstanceBuilder = <T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = instance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return promise
}

export const productInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(productHttpClient, config, options)
export const funnelBuilderInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(funnelBuilderHttpClient, config, options)
export const crmInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(crmHttpClient, config, options)
export const paymentInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(paymentHttpClient, config, options)
export const paymentBaseInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(paymentBaseHttpClient, config, options)
export const workflowInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(workflowHttpClient, config, options)
export const affiliatesInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(affiliatesHttpClient, config, options)
export const igamingInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(igamingHttpClient, config, options)
export const hermesInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
) => customInstanceBuilder<T>(hermesHttpClient, config, options)
