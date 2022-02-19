import "./Topbar.css"
import {Search, Person, Message, Notifications, Home, Group} from "@material-ui/icons"


export default function Topbar(){
    return(
        <div className="topbarCantainer">
            <div className="topbarLeft">
                <span className="logo">Our logo</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search/>
                    <input placeholder="Search for something" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                   <span className="topbarLink"> <Home/> </span> 
                   <span className="topbarLink"> <Group/></span> 
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconIndex">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <Message/>
                        <span className="topbarIconIndex">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconIndex">3</span>
                    </div>
                </div>
                <img src="" alt="topbarProfileImg" className="topbarProfileImg" />                
            </div>
        </div>
        )
}