import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import bedroom from "../../images/bedroom.png";
import price from "../../images/price.png";
import bathroom from "../../images/bathroom.png";
import carpark from "../../images/parking.png";
import title from "../../images/title.png";
import description from "../../images/description.png";
import size from "../../images/size.png";

export default function AdForm({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ad, setAd] = useState({
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
  // hooks
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad", ad);
      console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        // data {user, ad}

        // update user in context
        setAuth({ ...auth, user: data.user });
        // update user in local storage
        const fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data.user;
        localStorage.setItem("auth", JSON.stringify(fromLS));

        toast.success("Ad created successfully");
        setAd({ ...ad, loading: false });
        // navigate("/dashboard");

        // reload page on redirect
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <>
      <div className="mb-3 form-control">
        <ImageUpload ad={ad} setAd={setAd} />
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions="in"
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address..*",
            onChange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>

      <div style={{ marginTop: "80px" }}>
      <img src={price} alt="Price" />
        <CurrencyInput
          placeholder="Enter price*"
          defaultValue={ad.price}
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
      </div>

      {type === "House" ? (
        <>
          <img src={bedroom} alt="BedRoom" />
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter how many bedrooms*"
            value={ad.bedrooms}
            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          />
          <img src={bathroom} alt="BathRoom" />
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter how many bathrooms*"
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
        placeholder="Size of land (In sq ft.)*"
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />
      <img src={title} alt="Title" />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter title*"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />
      <img src={description} alt="Description" />
      <textarea
        className="form-control mb-3"
        placeholder="Enter description*"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />

      <button
        onClick={handleClick}
        className={`btn btn-primary mb-5 ${ad.loading ? "disabled" : ""}`}
      >
        {ad.loading ? "Saving..." : "Submit"}
      </button>

      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
}
