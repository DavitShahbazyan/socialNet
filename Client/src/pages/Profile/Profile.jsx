import "./Profile.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"

export default function Profile() {
    return (
       <>
       <Topbar/>
       <div className="profile">
         <Sidebar/>
         <div className="profileRight">
             <div className="profileTop">
                 <div className="profileImg">
                    <img className="coverImg" src="" alt="Cover Img" />
                    <img className="userImg" src="" alt="User Img" />
                 </div>
                <div className="profileInfo">
                    <h4 className="user"> Name Surname</h4>
                    <span className="userDescreption">World is beautiful</span>
                </div>
             </div>
             <div className="profileBotton">
             <Rightbar/>
             </div>            
         </div>
       </div>
       
      
       </>
    )
}