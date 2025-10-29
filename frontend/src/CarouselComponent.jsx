import React from "react";
import Image1 from "./assets/Image1.png";
import Image2 from "./assets/fur.jpg";
import Image3 from "./assets/furr.webp";

const CarouselComponent = () => {
  return (
    <div
      className="d-flex justify-content-center vh-90" 
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{
          // border: "5px solid black",
          borderRadius: "20px",
          overflow: "hidden",
          height: "500px",
          width: "5000px",
        }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
            style={{ backgroundColor: "black" }}
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" style={{ height: "500px" }}>
          <div className="carousel-item active">
            <img
              src={Image1}
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image2}
              className="d-block w-100"
              alt="Slide 2"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image3}
              className="d-block w-100"
              alt="Slide 3"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
