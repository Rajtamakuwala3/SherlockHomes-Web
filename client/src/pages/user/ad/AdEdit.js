import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../../components/nav/Sidebar";
import bgvideo from "../../../images/realvideo.mp4";
import bedroom from "../../../images/bedroom.png";
import price from "../../../images/price.png";
import bathroom from "../../../images/bathroom.png";
import carpark from "../../../images/parking.png";
import title from "../../../images/title.png";
import description from "../../../images/description.png";
import size from "../../../images/size.png";

export default function AdEdit({ action, type }) {
  // state
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });
  const [loaded, setLoaded] = useState(false);

  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const [sold, setSold] = useState(false);

  // onChange={(e) => setAd({ ...ad, sold: e.target.checked })}

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      //   console.log("single ad edit page => ", data);
      setAd(data?.ad);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      // validation
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        // make API put request
        setAd({ ...ad, loading: true });

        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        // console.log("ad create response => ", data);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success("Ad updated successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });

      const { data } = await axios.delete(`/ad/${ad._id}`);
      // console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
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
          Ad Edit
        </h1>
      </div>
      <Sidebar />

      <div className="container">
        <div className="mb-3 form-control">
          <ImageUpload ad={ad} setAd={setAd} />
          {loaded ? (
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions="au"
              selectProps={{
                defaultInputValue: ad?.address,
                placeholder: "Search for address..",
                onChange: ({ value }) => {
                  setAd({ ...ad, address: value.description });
                },
              }}
            />
          ) : (
            ""
          )}
        </div>

        {loaded ? (
          <div style={{ marginTop: "80px" }}>
            <img src={price} alt="Price" />
            <CurrencyInput
              placeholder="Enter price"
              defaultValue={ad.price}
              className="form-control mb-3"
              onValueChange={(value) => setAd({ ...ad, price: value })}
            />
          </div>
        ) : (
          ""
        )}

        {ad.type === "House" ? (
          <>
            <img src={bedroom} alt="BedRoom" />
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many bedrooms"
              value={ad.bedrooms}
              onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
            />
            <img src={bathroom} alt="BathRoom" />
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many bathrooms"
              value={ad.bathrooms}
              onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
            />
            <img src={carpark} alt="CarParking" />
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many carpark"
              value={ad.carpark}
              onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
            />
          </>
        ) : (
          ""
        )}
        <img src={size} alt="LandSize" />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Size of land"
          value={ad.landsize}
          onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
        />
        <img src={title} alt="Title" />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter title"
          value={ad.title}
          onChange={(e) => setAd({ ...ad, title: e.target.value })}
        />
        <img src={description} alt="Description" />
        <textarea
          className="form-control mb-3"
          placeholder="Enter description"
          value={ad.description}
          onChange={(e) => setAd({ ...ad, description: e.target.value })}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            id="sold"
            className="form-control"
            checked={ad.sold}
            onChange={(e) => setAd({ ...ad, sold: e.target.checked })}
            style={{
              marginRight: "5px",
              width: "20px", // Adjust the width of the checkbox
              height: "20px", // Adjust the height of the checkbox
              accentColor: "#3b82f6", // Change the accent color (checked color)
              borderRadius: "4px", // Add border radius if desired
              borderColor: "#d1d5db", // Change the border color
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Add a box shadow if desired
            }}
          />
          <label htmlFor="sold">Mark as Sold</label>
        </div>
        <br></br>

        <div className="d-flex justify-content-between">
          <button
            onClick={handleClick}
            className={`btn btn-primary mb-5 ${ad.loading ? "disabled" : ""}`}
          >
            {ad.loading ? "Saving..." : "Submit"}
          </button>

          <button
            onClick={handleDelete}
            className={`btn btn-danger mb-5 ${ad.loading ? "disabled" : ""}`}
          >
            {ad.loading ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
      </div>
    </div>
  );
}
