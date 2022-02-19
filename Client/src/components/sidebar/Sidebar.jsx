import "./Sidebar.css"
import {CastForEducation, Work, Place, Event, Info, Photo, People} from '@material-ui/icons'

export default function Sudebar(){
    return (
        <div className="sidebar">
            <div className="sidebarCont">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <CastForEducation className="itemIcon"/>
                        <span className="itemText">Education</span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className="itemIcon"/>
                        <span className="itemText">Work</span>
                    </li>
                    <li className="sidebarListItem">
                        <Place className="itemIcon"/>
                        <span className="itemText">Places lived</span>
                    </li>
                    <li className="sidebarListItem">
                        <Place className="itemIcon"/>
                        <span className="itemText">Places lived</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="itemIcon"/>
                        <span className="itemText">Life events</span>
                    </li>
                    <li className="sidebarListItem">
                        <Info className="itemIcon"/>
                        <span className="itemText">About User</span>
                    </li>
                    <li className="sidebarListItem">
                        <Photo className="itemIcon"/>
                        <span className="itemText">Photos</span>
                    </li>
                    <li className="sidebarListItem">
                        <People className="itemIcon"/>
                        <span className="itemText">Friends</span>
                    </li>
                </ul>

            </div>
        </div>
    )
}
