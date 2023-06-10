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

  const urlImagePrefix = "https://image.tmdb.org/t/p/w500";
  const [categories, setCategories] = useState([]);

  async function getCategory() {
    const { data } = await axios.get(
      //   "https://king-prawn-app-3mgea.ondigitalocean.app/category"
      "https://api.themoviedb.org/3/trending/all/day?api_key=d179b30015a65de52e0cb2b7dcd5bc52"
    );
    setCategories(data.results);
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
            <div className="col-md-3">
              <div className="card">
                <img
                  className="card-img-top"
                  src={urlImagePrefix + category.poster_path}
                  alt={category.title}
                  style={{ width: "320px", height: "280px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate overflow-hidden">
                    {category.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
