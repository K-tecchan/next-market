import jwt from 'jsonwebtoken'

const secret_key = 'gorilla'

// 仮引数handlerはなんでもいい。というかhandlerはauthを挟みたい関数
const auth = (handler) => {
  return async(req, res) => {
    if (req.method === 'get') {
      return handler(req, res)
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im55YW55YSIsImlhdCI6MTY1ODg0MTI3MSwiZXhwIjoxNjU4OTI0MDcxfQ.BflLw3KuC5YD0iSXZrcBfAK_feRyER958rcC3r3k8Z4'
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