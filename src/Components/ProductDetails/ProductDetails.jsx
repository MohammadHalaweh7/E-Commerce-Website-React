import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CartContext } from "../Context/CartStore";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [productImages, setProductImages] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  const { addToCartContext } = useContext(CartContext);
  async function addToCart(productId) {
    const res = await addToCartContext(productId);
    console.log(res);
    if (res.message === "success") {
      toast.success("Prosuct add successfully");
    }
  }

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
        <img
          src={image.secure_url}
          alt="img name"
          style={{ width: "320px", height: "280px" }}
        />
      ))}
      <button
        onClick={() => addToCart(productDetails._id)}
        className="btn btn-success mt-5"
      >
        Add to cart
      </button>
    </>
  );
}
