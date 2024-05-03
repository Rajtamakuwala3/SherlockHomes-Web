import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
import bgvideo from "../images/realvideo.mp4";



export default function Rent() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-rent");
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <SearchForm /> */}
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
          For Rent
        </h1>
      </div>
      <div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
