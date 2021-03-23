import React from "react";
import "../../CSS/Leaderboard.css";
import {getall} from "../../api/User"

interface MemberInfo {
  id: number;
  firstname: string;
  lastname: string;
  points: number;
}

function Leaderboard() {
  const [allMembers, setMembers] = React.useState(Array<MemberInfo>(
    { id: 0, firstname: "default", lastname: "default", points: 0 },
  ));

  const [sortedList, setSortedList] = React.useState(
    allMembers.sort((a, b) => (a.points < b.points ? 1 : -1))
  );
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    getall().then((res) => {
            if(res===undefined || res === null){
            }
            else{
                    console.log(res)
                    let test = res.map((x:any) => {
                            let ret={id:x.id, firstname:x.username+"\tAHMED", lastname:x.username+"\tZAKI", points:x.points}
                            return ret;
                    })
                    test = test as MemberInfo[]
                    // setReload(false)
                    setMembers(test)
                    setSortedList(test)
                    setReload(true)
            }
    })
  }, [reload]);

  return (
    <div className="Leaderboard">
      <div className="Leaderboard-Topbar">
        <div className="Leaderboard-Firstname">First Name</div>
        <div className="Leaderboard-Lastname">Last Name</div>
        <div className="Leaderboar-PointsLabel">Points</div>
      </div>
      <div className="Leaderboard-List">
              {reload ? sortedList.map((member, index) => {
          return (
            <div
              className={
                index % 2 === 0
                  ? "Leaderboard-MemberInfo-lightgrey"
                  : "Leaderboard-MemberInfo-white"
              }
            >
              <div className="Leaderboard-Firstname">{member.firstname}</div>
              <div className="Leaderboard-Lastname">{member.lastname}</div>
              <div className="Leaderboard-Points">{member.points}</div>
            </div>
          );
        }) : null}
      </div>
    </div>
  );
}

export default Leaderboard;
