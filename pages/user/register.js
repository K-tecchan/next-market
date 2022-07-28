import { useState } from "react"

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch(err) {
      alert('Failed: user-registration')
    }
  }


  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder="name" required/>
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="email" required/>
        <input value={password} onChange={e => setPassword(e.target.value)} type="text" name="password" placeholder="password" required/>
        <button>register</button>
      </form>
    </div>
  )
}

export default Register