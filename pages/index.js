import Link from "next/link"
import Image from "next/image"

const ReadAllItems = ({ allItems }) => {
  return (
    <div>
      <div>
        {allItems.map(({ _id, image, price, title, description }) => {
          return (
            <Link href={`/item/${_id}`} key={_id}>
              <a>
                <Image src={image} width='750px' height='500px' alt="item-image"/>
                <div>
                  <h2>\{price}</h2>
                  <h3>{title}</h3>
                  <p>{description.substring(0, 80)}...</p>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async() => {
  const response = await fetch('http://localhost:3000/api/item/readall')
  const allItems = response.json()

  return {
    props: allItems,
  }
}

export default ReadAllItems