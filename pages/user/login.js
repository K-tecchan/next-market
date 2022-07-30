import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
      const jsonData = await response.json()
      localStorage.setItem('token', jsonData.token)
      alert(jsonData.message)
    } catch (err) {
      alert('ログイン失敗')
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="email" required/>
        <input value={password} onChange={e => setPassword(e.target.value)} type="text" name="password" placeholder="password" required/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login