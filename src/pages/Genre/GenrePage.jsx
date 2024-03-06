import React, { useEffect, useState } from "react";
import axios from "axios";

const GenrePage = ({ match }) => {
  const [genre, setGenre] = useState("");
  const [genreContent, setGenreContent] = useState([]);

  useEffect(() => {
    const { genre } = match.params;
    console.log("Current Genre:", genre);

    const fetchGenreContent = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user ? user.accessToken : null;

        const config = {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        };

        const res = await axios.get(`/movies/${genre.toLowerCase()}`, config);

        console.log("API Response:", res.data);
        setGenreContent(res.data);
      } catch (error) {
        console.error("Error fetching genre content:", error);
      }
    };

    fetchGenreContent();
  }, [match.params.genre]);

  return (
    <div>
      <h2>{genre} Movies and Series</h2>
      {genreContent.length === 0 ? (
        <p>No movies found for this genre.</p>
      ) : (
        <ul>
          {genreContent.map((content) => (
            <li key={content._id}>{content.title}</li>
            // Adjust the property (e.g., title) based on your API response structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenrePage;
