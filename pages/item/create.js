import { useState } from 'react';
import useAuth from '../../utils/useAuth';
import Head from 'next/head';

const CreateItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://next-market-blond.vercel.app/api/item/create',
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
      alert('アイテム作成失敗');
    }
  };

  const loginUser = useAuth();

  if (loginUser) {
    return (
      <div>
        <Head>
          <title>アイテム作成</title>
        </Head>
        <h1 className='page-title'>アイテム作成</h1>
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
          <button>create</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
