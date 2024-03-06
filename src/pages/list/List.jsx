import { Link, useLocation } from "react-router-dom";
import "./list.css";
import { Publish } from "@material-ui/icons";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { useContext, useState } from "react";

export default function List() {
  const location = useLocation();
  const [list, setList] = useState(location.list || {});
  const {dispatch} = useContext(ListContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setList((prevList) => ({
      ...prevList,
      [name]: value,
    }));
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    try {
        updateList(list, dispatch);
    } catch (error) {
      console.error("Error updating list:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  console.log(list)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
          {list && <span className="productName">{list.title}</span>}
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              {list && <span className="productInfoValue">{list._id}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              {list && <span className="productInfoValue">{list.genre}</span>}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              {list && <span className="productInfoValue">{list.type}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            {list && <input type="text" placeholder={list.title} name="title" onChange={handleChange} />}
            <label>Type</label>
            {list && <input type="text" placeholder={list.type} name="type" onChange={handleChange} />}
            <label>Genre</label>
            {list && <input type="text" placeholder={list.genre} name="genre" onChange={handleChange} />}
          </div>
          <div className="productFormRight">
            <button className="productButton "  onClick={handleUpdate}>Update </button>
          </div>
        </form>
      </div>
    </div>
  );
}