export default function (context) {
  const $router = context.app.router
  const { $axios, $auth } = context
  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    async function (error) {
      if ($auth.loggedIn) {
        const originalRequest = error.config
        if (
          error.response.status === 401 &&
          error.response.data.message === 'Token has expired' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true
          return await $axios
            .post('api/auth/refresh')
            .then((res) => {
              $auth.setUserToken(res.data.access_token)
              $axios.setToken(res.data.access_token, 'Bearer')
              originalRequest.headers.Authorization =
                'Bearer ' + res.data.access_token
              return $axios.request(originalRequest)
            })
            .catch((err) => {
              alert(err)
            })
        }
      }
      if (
        error.response.status === 500 &&
        (error.response.data.message ===
          'Token has expired and can no longer be refreshed' ||
          error.response.data.message === 'The token has been blacklisted')
      ) {
        await $router.push('/login')
      }
      return Promise.reject(error)
    }
  )
}
