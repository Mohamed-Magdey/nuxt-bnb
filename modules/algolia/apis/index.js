import user from '../routers/user'
import { getAxiosInstance } from '../helpers'
import userApi from './user'

export default (app, algoliaConfig) => {
  const apiCall = getAxiosInstance(app, algoliaConfig)

  return {
    user: userApi(apiCall)
  }
}