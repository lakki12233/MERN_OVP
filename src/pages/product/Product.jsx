import { useState, useContext } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext} from "../../context/movieContext/MovieContext";
import storage from "../../firebase";
import "./product.css";

export default function Product() {
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState(location.movie || {});
  const { dispatch } = useContext(MovieContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const storageRef = storage.ref(`/items/${file.name}`);
    await storageRef.put(file);
    const downloadURL = await storageRef.getDownloadURL();

    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: downloadURL,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
        updateMovie(movie, dispatch);
    } catch (error) {
      console.error("Error updating movie:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  console.log(movie)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            {movie && movie.img && <img src={movie.img} alt="" className="productInfoImg" />}
            <span className="productName">{movie && movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              {movie && <span className="productInfoValue">{movie._id}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              {movie && <span className="productInfoValue">{movie.genre}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              {movie && <span className="productInfoValue">{movie.year}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              {movie && <span className="productInfoValue">{movie.limit}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie title</label>
            {movie && <input type="text" placeholder={movie.title} name="title" onChange={handleChange} />}
            <label>Year</label>
            {movie && <input type="text" placeholder={movie.year} name="year" onChange={handleChange} />}
            <label>Genre</label>
            {movie && <input type="text" placeholder={movie.genre} name="genre" onChange={handleChange} />}
            <label>Limit</label>
            {movie && <input type="text" placeholder={movie.limit} name="limit" onChange={handleChange} />}
            <label>Trailer</label>
            {movie && <input type="file" placeholder={movie.trailer} name="trailer" onChange={handleFileChange} />}
            <label>Video</label>
            {movie && <input type="file" placeholder={movie.video} name="video" onChange={handleFileChange} />}
            <label>Title image</label>
        <input
          type="file"
          name="imgTitle"
          onChange={handleFileChange}
        />
        <label>Thumbnail image</label>
        <input
          type="file"
          name="imgSm"
          onChange={handleFileChange}
        />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              {movie && movie.img && <img src={movie.img} alt="" className="productUploadImg" />}
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" name="img" style={{ display: "none" }} onChange={handleFileChange} />
            </div>
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
