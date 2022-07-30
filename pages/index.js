import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

const ReadAllItems = ({ allItems }) => {
  return (
    <div>
      <Head>
        <title>Next Market</title>
      </Head>
      <div className='grid-container-in'>
        {allItems.map(({ _id, image, price, title, description }) => {
          return (
            <Link href={`/item/${_id}`} key={_id}>
              <a className='card'>
                <Image
                  src={image}
                  width='750px'
                  height='500px'
                  alt='item-image'
                />
                <div className='texts-area'>
                  <h2>\{price}</h2>
                  <h3>{title}</h3>
                  <p>{description.substring(0, 80)}...</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch(
    'https://next-market-blond.vercel.app/api/item/readall'
  );
  const allItems = response.json();

  return {
    props: allItems,
  };
};

export default ReadAllItems;
