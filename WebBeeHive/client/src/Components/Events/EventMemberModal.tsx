import React from "react";
import EditMemberPointsButton from "../EditMemberPointsButton";
import "../../CSS/Events/EventMemberModal.css";
import { memberEventUpdate } from "../../api/Event";
import { store, redux_sign, redux_points} from "../../store"
import { MemberInfo, MemberInfoSign } from "../../Interfaces";

interface IProps {
        showModal: boolean;
        setShowModal: (showModal: boolean) => void;
        members: MemberInfo[] | null;
        eventid: string | null;
        signin: String[] | null;
        reloadPage: boolean;
        setReloadPage: (reloadPage: boolean) => void;
}

function EventMemberModal({
        showModal,
        setShowModal,
        members,
        eventid,
        signin,
        reloadPage,
        setReloadPage,
}: IProps) {
        // let sortedList = Array<MemberInfoSign>();

        const [reload, setReload] = React.useState(false);
        const [startup, setStartup] = React.useState(true);
        const [sortedList, setList]  = React.useState(Array<MemberInfoSign>())
        let attend = Array<boolean>(0);
        let points = Array<number>(0);

        let userid = store.getState().state;
        userid = userid["id"]


        if (showModal && members!=null && members.length-1 !== 0) {
                if(startup){
                        let _members = (members as unknown) as MemberInfo[];
                        // Sort the members from highest points to lowest
                        let ARR = _members
                        .sort((a, b) => (a.points < b.points ? 1 : -1))
                        .map(
                                (member: any, index:number): MemberInfoSign => {
                                        // Sets whether the user is signin or not
                                        let tmp = member;
                                        if (signin != null) {
                                                let issignin = signin.includes(member.id);
                                                tmp["signin"] = issignin;
                                                tmp["inital"] = issignin;
                                                if(member["id"] != userid){
                                                        attend.push( issignin)
                                                        // points.push(member["points"])
                                                }
                                        } else tmp["signin"] = false;

                                        return tmp;
                                }
                        );
                        ARR = ARR.filter((x:any, index:number)=>{
                                return ! (x["id"] == userid)
                        })
                        setList(ARR)
                        setStartup(false)
                }
        }


        const handleSave = () => {
                if (sortedList != null && sortedList.length > 0 && eventid !== null) {
                        memberEventUpdate(sortedList, eventid);
                        setReloadPage(!reloadPage);
                }
                setShowModal(!showModal);
                setStartup(true)
        };

        const handleCancel = () => {
                if (members != null) {
                        members.forEach((member: any) => {
                                member["signin"] = member["inital"];
                        });
                }
                setReloadPage(!reloadPage);
                setShowModal(!showModal);
                setStartup(true)
        };

        return (
                <div>
                        {showModal ? (
                                <div className="EventMemberModal-Background">
                                        <div className="EventMemberModal-Div">
                                                <div className="EventMemberModal-TopBar">
                                                        <div className="EventMemberModal-FirstName">First</div>
                                                        <div className="EventMemberModal-LastName">Last</div>
                                                        <div className="EventMemberModal-Attended">Attended</div>
                                                        <div className="EventMemberModal-Points">Points</div>
                                                </div>
                                                <div className="EventMemberModal-MemberList">
                                                        {/* List all of them members out */}
                                                        {sortedList.map((member, index) => {
                                                                return (
                                                                        <div
                                                                                className={
                                                                                        index % 2 === 0
                                                                                                ? "EventMemberModal-MemberInfo-lightgrey"
                                                                                                : "EventMemberModal-MemberInfo-white"
                                                                                }
                                                                        >
                                                                                <div className="EventMemberModal-FirstName">
                                                                                        {member.firstname}
                                                                                </div>
                                                                                <div className="EventMemberModal-LastName">
                                                                                        {member.lastname}
                                                                                </div>
                                                                                <form className="EventMemberModal-Attended">
                                                                                        <input
                                                                                                type="checkbox"
                                                                                                // checked={sortedList[index].signin}
                                                                                                defaultChecked={sortedList[index].signin}
                                                                                                // checked={sortedList[index].signin}
                                                                                                onChange={() => {
                                                                                                        sortedList[index].signin = !sortedList[index].signin
                                                                                                        let attend = store.getState().state
                                                                                                        attend = attend["sign"]
                                                                                                        let newEntry=true
                                                                                                        // attend.forEach((x:MemberInfoSign, index:number)=>{
                                                                                                        //         if(x.id == sortedList[index].id){
                                                                                                        //                 attend[index] = sortedList[index]
                                                                                                        //                 newEntry=false
                                                                                                        //         }
                                                                                                        //         })




                                                                                                console.log(sortedList.map((x)=>{
                                                                                                        return [x.points, x.signin]
                                                                                                }))
                                                                                                // attend[index] = !attend[index]
                                                                                                // console.log(attend[index])
                                                                                                }}
                                                                                        />
                                                                                </form>
                                                                                <div className="EventMemberModal-Points">
                                                                                        {sortedList[index].points}
                                                                                </div>
                                                                                <EditMemberPointsButton
                                                                                        member={sortedList[index]}
                                                                                        reloadParent={() => {
                                                                                                setReload(!reload);
                                                                                        }}
                                                                                />
                                                                        </div>
                                                                       );
                                                        })
                                                        }
                                                </div>
                                                <div className="EventMemberModal-BottomBar">
                                                        <div className="EventMemberModal-Buttons">
                                                                <button
                                                                        className="EventMemberModal-LightButton"
                                                                        onClick={handleCancel}
                                                                >
                                                                        Cancel
                                                                </button>
                                                                <button
                                                                        className="EventMemberModal-DarkButton"
                                                                        onClick={handleSave}
                                                                >
                                                                        Save
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
        ) : null}
                </div>
        );
}

export default EventMemberModal;
