import { useState } from "react"

const UpdateItem = ({ singleItem }) => {
  const [title, setTitle] = useState(singleItem.title)
  const [price, setPrice] = useState(singleItem.price)
  const [image, setImage] = useState(singleItem.image)
  const [description, setDescription] = useState(singleItem.description)

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/item/update/${singleItem._id}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          image,
          description,
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch (err) {
      alert('アイテム編集失敗')
    }
  }

  return (
    <div>
      <h1>アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} type="text" onChange={e => setTitle(e.target.value)} name='title' placeholder="title" required/>
        <input value={price} type="text" onChange={e => setPrice(e.target.value)} name="price" placeholder="price" required/>
        <input value={image} type="text" onChange={e => setImage(e.target.value)} name="image" placeholder="image" required/>
        <textarea value={description} onChange={e => setDescription(e.target.value)} name="description" placeholder="description" cols="30" rows="10" required></textarea>
        <button>edit</button>
      </form>
    </div>
  )
}

export default UpdateItem

export const getServerSideProps = async(context) => {
  const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
  const singleItem = await response.json()

  return {
    props: singleItem
  }
}