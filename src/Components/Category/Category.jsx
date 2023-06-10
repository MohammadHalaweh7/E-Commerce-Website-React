import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Category() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
  };

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  async function getCategory() {
    const { data } = await axios.get(
      "https://king-prawn-app-3mgea.ondigitalocean.app/category"
    );
    setCategories(data.category);
  }

  async function getSubCategories(id) {
    const { data } = await axios.get(
      `https://king-prawn-app-3mgea.ondigitalocean.app/category/${id}/subcategory`
    );
    setSubCategories(data.subcategory);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="mt-5">
        <h2>Category</h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div className="col-md-3" key={category.id}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={category.image.secure_url}
                  alt={category.name}
                  style={{ width: "320px", height: "280px" }}
                  onClick={() => getSubCategories(category.id)}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate overflow-hidden">
                    {category.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="mt-5">
        <div className="row">
          {subCategories.map((subcategory) => (
            <div className="col-md-3" key={subcategory.id}>
              <div className="sub-category">
                <p>{subcategory.name}</p>
                <img
                  className="card-img-top"
                  src={subcategory.image.secure_url}
                  alt={subcategory.name}
                  style={{ width: "320px", height: "280px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
