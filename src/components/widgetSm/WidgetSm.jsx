import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {

  const [newUsers, setNewUsers] = useState([])

  useEffect(() => {
         const getNewUsers = async () => {
           try{
             const res = await axios.get("/users?new=true", {
              headers:{
                token: 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2NiOGQyYTZhMDhmYzc2OWQ0YTk1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTQ0NzQxOCwiZXhwIjoxNzA5ODc5NDE4fQ.B-lKm4G7yXP0B3WX3YRP58v_IOlUYuQG7OyXsnyAggg",
              },
            });
            setNewUsers(res.data)
           } catch(err){
             console.log(err);
           }
         };
         getNewUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user=> (

        <li className="widgetSmListItem">
          <img
            src={user.profilPic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>

          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li> 
        ))}
      </ul>
    </div>
  );
}
