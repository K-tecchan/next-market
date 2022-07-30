import Image from "next/image"
import Link from "next/link"

const ReadSingleItem = ({ singleItem }) => {
  return (
    <div>
      <div>
        <Image src={singleItem.image} width='750px' height='500px' alt='item-image'/>
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>\{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}><a>アイテム編集</a></Link>
          <Link href={`/item/delete/${singleItem._id}`}><a>アイテム削除</a></Link>
        </div>
      </div>
    </div>
  )
}

export default ReadSingleItem

export const getServerSideProps = async(context) => {
  const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
  const singleItem = await response.json()

  return {
    props: singleItem
  }
}