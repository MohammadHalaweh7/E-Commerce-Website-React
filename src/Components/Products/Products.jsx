import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function Products() {

  const[products,setProducts]=useState([]);

  async function getProducts(){
    const {data} =await axios.get('https://king-prawn-app-3mgea.ondigitalocean.app/product');
    setProducts(data.products)
  }

  useEffect(()=>{
    getProducts();
  },[])

  return (
    <div className='row'>
      <div className="col-md-4">
        {
          products.map((product)=>
          <div>
            <Link to={'/product/${product._id}'}>
            <img src={product.mainImage.secure_url} alt={product.name} />
            <p>{product.name}</p>
            </Link>

          </div>
          )
        }
      </div>
    </div>
  )
}
