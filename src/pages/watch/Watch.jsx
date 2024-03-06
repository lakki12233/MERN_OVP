import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;

  // Check if movie is undefined or null
  if (!movie) {
    return null; // or handle the case when movie is not available
  }

  console.log(movie.video);
  
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      {movie.video && (
        <video className="video" autoPlay progress controls src={movie.video} />
      )}
    </div>
  );
}
