import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/nav/Sidebar";
import bgvideo from "../../../images/realvideo.mp4";
import bgsell from "../../../images/sellh.jpg";


export default function AdCreate() {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  const handleRent = () => {
    setRent(true);
    setSell(false);
  };

  return (
    <div>
       <div
        className="position-relative"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Text shadow effect
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Box shadow effect
        }}
      >
        <video
          autoPlay
          muted
          loop
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            zIndex: "-1", // Ensures the video is behind the content
          }}
        >
          <source src={bgvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1
          className="display-1 text-light p-5 position-relative z-index-1"
          style={{
            background: "transparent", // Remove background color
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative", // Ensure relative positioning for child elements
          }}
        >
          Search
        </h1>
      </div>
      <Sidebar />

      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-16%" }}
      >
        <div className="col-lg-6">
          <button
            onClick={handleSell}
            className="btn btn -primary btn-lg col-12 p-5"
          >
            <span className="h2">Sell</span>
          </button>
          {sell && (
            <div className="my-1">
              <button
                onClick={() => navigate("/ad/create/sell/House")}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/sell/Land")}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>

        <div className="col-lg-6">
          <button
            onClick={handleRent}
            className="btn btn -primary btn-lg col-12 p-5"
          >
            <span className="h2">Rent</span>
          </button>
          {rent && (
            <div className="my-1">
              <button
                onClick={() => navigate("/ad/create/rent/House")}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/rent/Land")}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
