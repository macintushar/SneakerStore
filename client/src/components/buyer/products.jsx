import React, { useState, useEffect } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Products() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('http://65.1.76.191:5001/data')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    const fetchData = async () => {
      const response = await fetch('http://65.1.76.191:5001/data');
      const dataAsc = await response.json();
      console.log(dataAsc);
      setData(dataAsc);
    }

    const fetchDataAsc = async () => {
      const response = await fetch('http://65.1.76.191:5001/data/asc');
      const dataAsc = await response.json();
      console.log(dataAsc);
      setData(dataAsc);
    }

    const fetchDataDesc = async () => {
      const response = await fetch('http://65.1.76.191:5001/data/desc');
      const dataDesc = await response.json();
      console.log(dataDesc);
      setData(dataDesc);
    }

    if (!data) {
      return <div>Loading data...</div>;
    }

    return (
      <>
      <div className='container mx-auto'>
        <div className="text-center flex items-center h-center justify-center">
          <button className='mr-2' onClick={fetchData}>Featured</button>
          <button className='mr-2' onClick={fetchDataAsc}>Low to High</button>
          <button className='mr-2' onClick={fetchDataDesc}>High to Low</button>
        </div>
      </div>

      <div className="text-center flex items-center h-center justify-center mb-20">
        <section className="py-10 product-cards">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map(item => (
              <article className="rounded-xl bg-white p-3 shadow-lg duration-300" key={item.product_id}>
                <Link to={"/shoe/" + item.sku}>
                  <div className="relative flex items-end overflow-hidden rounded-xl">
                    <img src={item.image} alt={item.product_name} />
                  </div>
          
                  <div className="mt-1 p-2">
                    <h2 className="text-slate-700 font-bold">{item.product_name}</h2>
                    <p className='text-xs text-gray-600'>{item.sex}</p>
                    <p className="mt-3 text-sm text-slate-400">{item.brand}</p>
                    
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-blue-500 dark:text-black-900">₹{item.current_price}</p>
                        <p className="text-lg font-medium text-gray-500 line-through dark:text-gray-300">₹{item.original_price}</p>
                        <p className="ml-auto text-base font-medium text-green-500">{item.discount}% off</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
    );
  }

export default Products;
