import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";
import { useHistory } from 'react-router-dom';


export default function Featured({ type, setGenre }) {
  const history = useHistory();
  const [content, setContent] = useState({
    img: "",
    imgTitle: "",
    desc: "",
    video: "",
    // Add other properties as needed
  });

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0] || {});
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  const handlePlayClick = () => {
    
    if (content.video) {
      // Navigate to the Watch page with the selected movie information
      history.push({
        pathname: '/watch',
        state: { movie: content },
      });
    } else {
      console.log("No video URL available");
    }
  };
  

  console.log(content);
  
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : ""}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {content.img && (
        <img src={content.img} alt="" />
      )}
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
        <button className="play" onClick={() => handlePlayClick(content)}>
          <PlayArrow />
             <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

