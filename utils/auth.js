import jwt from 'jsonwebtoken'

const secret_key = 'gorilla'

// 仮引数handlerはなんでもいい。というかhandlerはauthを挟みたい関数
const auth = (handler) => {
  return async(req, res) => {
    if (req.method === 'get') {
      return handler(req, res)
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvcmlsbGFAZ21haWwuY29tIiwiaWF0IjoxNjU4NDEyMTQwLCJleHAiOjE2NTg0OTQ5NDB9.GiNgStbT0hJsk8bCM0eN9aN1mAhHRYWDTLF3p11AQWY'
    // const token = await req.headers.authorization.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        message: 'トークンがありません'
      })
    }

    try {
      const decoded = jwt.verify(token, secret_key)
      req.body.email = decoded.email
      return handler(req, res)
    } catch(err) {
      return res.status(401).json({
        message: 'トークンが正しくないので、ログインしてください'
      })
    }
  }
}

export default auth