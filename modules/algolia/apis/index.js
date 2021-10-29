import { getAxiosInstance } from '../helpers'
import userApi from './user'
import homesApi from './homes'

export default (app, algoliaConfig) => {
  const apiCall = getAxiosInstance(app, algoliaConfig)

  return {
    user: userApi(apiCall),
    homes: homesApi(apiCall)
  }
}