module.exports = (err, req, res, next) => {
  console.log(err)
  let message
  let status

  switch (err.name) {
    case 'AuthenticationError':
      status = 401
      message = err.message
      break
    case 'ValidationError':
      status = 400
      const arr = []
      if (err.errors) {
        for (const key in err.errors) {
          arr.push(err.errors[key].message)
        }
      } else {
        arr.push(err.message)
      }
      message = arr
      break
    case 'Unauthorized':
      status = 403
      message = err.message
      break
    case 'NotFound':
      status = 404
      message = err.message
      break
    case 'JsonWebTokenError':
      status = 401
      message = 'Authentication required! You must login'
      break
    default:
      status = 500
      message = err.message || 'Internal Server Error'
  }

  res.status(status).json(message)
}
