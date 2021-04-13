import React from "react";
import EditMemberPointsButton from "../EditMemberPointsButtonLeader";
import "../../CSS/Leaderboard.css";
import { getallUsers } from "../../api/User";
import { MemberInfo } from "../../Interfaces";

function Leaderboard() {
  const [sortedList, setSortedList] = React.useState(
    Array<MemberInfo>({
      id: "",
      firstname: "default",
      lastname: "default",
      email: "default",
      points: 0,
      isowner: false,
    })
  );

  const [reload, setReload] = React.useState(false);
  React.useEffect(() => {
    getallUsers().then((res) => {
      if (res === undefined || res === null) {
      } else {
        // Sort the users from highest to lowest points
        let tmp = res.data.sort((a: MemberInfo, b: MemberInfo) => {
          if (a.points !== b.points) return a.points < b.points ? 1 : -1;
          return a.lastname > b.lastname ? 1 : -1;
        });
        setSortedList(tmp);
        setReload(true);
      }
    });
  }, [reload]);

  return (
    <div>
      <div className="Leaderboard">
        <div className="Leaderboard-Topbar">
          <div className="Leaderboard-Firstname">First Name</div>
          <div className="Leaderboard-Lastname">Last Name</div>
          <div className="Leaderboar-PointsLabel">Points</div>
        </div>
        <div className="Leaderboard-List">
          {reload
            ? sortedList.map((member, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "Leaderboard-MemberInfo-lightgrey"
                        : "Leaderboard-MemberInfo-white"
                    }
                  >
                    <div className="Leaderboard-Firstname">
                      {member.firstname}
                    </div>
                    <div className="Leaderboard-Lastname">
                      {member.lastname}
                    </div>
                    <div className="Leaderboard-Points">{member.points}</div>
                    <EditMemberPointsButton
                      member={member}
                      reloadParent={() => {
                        setReload(false);
                      }}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
