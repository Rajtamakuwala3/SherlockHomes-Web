import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components//cards/AdCard";
import bgvideo from "../images/realvideo.mp4";

export default function Search() {
  const [search, setSearch] = useSearch();

  return (
    <div>
      {/* <h1 className="display-1 bg-primary text-light p-5">Search</h1> */}

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

      <SearchForm />

      <div className="container">
        <div className="row">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center p-5">
              Found {search.results?.length} results
            </div>
          ) : (
            <div className="col-md-12 text-center p-5">No properties found</div>
          )}
        </div>

        <div className="row">
          {search.results?.map((item) => (
            <AdCard ad={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
