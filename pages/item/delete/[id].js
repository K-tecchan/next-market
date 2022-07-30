import Image from "next/image"

const DeleteItem = ({ singleItem }) => {

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/item/delete/${singleItem._id}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch (err) {
      alert('アイテム削除失敗')
    }
  }

  return (
    <div>
      <h1>アイテム削除</h1>
      <form onSubmit={handleSubmit}>
        <h2>{singleItem.title}</h2>
        <Image src={singleItem.image} width='750px' height='500px' alt="item-image"/>
        <h3>\{singleItem.price}</h3>
        <p>{singleItem.description}</p>
        <button>delete</button>
      </form>
    </div>
  )
}

export default DeleteItem

export const getServerSideProps = async(context) => {
  const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
  const singleItem = await response.json()

  return {
    props: singleItem
  }
}