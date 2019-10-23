import jwt from 'jsonwebtoken'

const secret = process.env.VUE_APP_SECRET_JWT

export const verifyToken = token => {
  return jwt.verify(token, secret)
}
