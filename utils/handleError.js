export default (error, app) => {
  const err = {
    statusCode: error.response?.status || 500,
    message: error.response?.statusText || 'Internal Server Error',
    status: error.response?.status || 500,
  }
  app.$nuxt.context.error(err)
  throw err
}