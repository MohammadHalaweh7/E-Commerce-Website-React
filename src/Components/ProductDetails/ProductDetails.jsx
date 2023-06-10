import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [productImages, setProductImages] = useState([]);

  async function getProductDetails() {
    const { data } = await axios.get(
      `https://king-prawn-app-3mgea.ondigitalocean.app/product/${id}`
    );
    setProductDetails(data.product);
    setProductImages(data.product.subImages);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <div>{productDetails.name}</div>
      <h2>All images</h2>
      {productImages.map((image) => (
        <img src={image.secure_url} alt="img name" />
      ))}
    </>
  );
}
