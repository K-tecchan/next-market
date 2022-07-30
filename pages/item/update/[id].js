import { useState } from 'react';
import useAuth from '../../../utils/useAuth';

const UpdateItem = ({ singleItem }) => {
  const [title, setTitle] = useState(singleItem.title);
  const [price, setPrice] = useState(singleItem.price);
  const [image, setImage] = useState(singleItem.image);
  const [description, setDescription] = useState(singleItem.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://next-market-blond.vercel.app/api/item/update/${singleItem._id}`,
        {
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
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert('アイテム編集失敗');
    }
  };

  const loginUser = useAuth();

  if (loginUser === singleItem.email) {
    return (
      <div>
        <h1>アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            placeholder='title'
            required
          />
          <input
            value={price}
            type='text'
            onChange={(e) => setPrice(e.target.value)}
            name='price'
            placeholder='price'
            required
          />
          <input
            value={image}
            type='text'
            onChange={(e) => setImage(e.target.value)}
            name='image'
            placeholder='image'
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name='description'
            placeholder='description'
            cols='30'
            rows='10'
            required
          ></textarea>
          <button>edit</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `https://next-market-blond.vercel.app/api/item/${context.query.id}`
  );
  const singleItem = await response.json();

  return {
    props: singleItem,
  };
};
