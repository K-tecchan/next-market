import Image from 'next/image';
import useAuth from '../../../utils/useAuth';
import Head from 'next/head';

const DeleteItem = ({ singleItem }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://next-market-blond.vercel.app/api/item/delete/${singleItem._id}`,
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert('アイテム削除失敗');
    }
  };

  const loginUser = useAuth();

  if (loginUser === singleItem.email) {
    return (
      <div className='delete-page'>
        <Head>
          <title>アイテム削除</title>
        </Head>
        <h1>アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{singleItem.title}</h2>
          <Image
            src={singleItem.image}
            width='750px'
            height='500px'
            alt='item-image'
          />
          <h3>\{singleItem.price}</h3>
          <p>{singleItem.description}</p>
          <button>delete</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `https://next-market-blond.vercel.app/api/item/${context.query.id}`
  );
  const singleItem = await response.json();

  return {
    props: singleItem,
  };
};
