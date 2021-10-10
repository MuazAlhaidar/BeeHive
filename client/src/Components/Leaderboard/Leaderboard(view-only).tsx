import React from "react";
import "../../CSS/Leaderboard.css";
import { getallUsers } from "../../api/User";
import { MemberInfo } from "../../Interfaces";

function Leaderboard() {
  const [allMembers, setMembers] = React.useState(
    Array<MemberInfo>({
      id: "0",
      firstname: "default",
      lastname: "default",
      email: "default",
      points: 0,
      isowner: false,
    })
  );
  const [reload, setReload] = React.useState(false);
  const [sortedList, setSortedList] = React.useState(Array<MemberInfo>());

  React.useEffect(() => {
    getallUsers().then((res) => {
      if (res === undefined || res === null) {
      } else {
        let test = res.data.map((x: any) => {
          let ret = {
            firstname: x.firstname,
            lastname: x.lastname,
            email: x.email,
            points: x.points,
          };
          return ret;
        });
        test = test as MemberInfo[];
        setMembers(test);
        // Sort the users from highest to lowest points
        let list = allMembers.sort((a, b) => (a.points < b.points ? 1 : -1));
        setSortedList(list);
        setReload(true);
      }
    });
  }, [reload]);

  return (
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
                  <div className="Leaderboard-Lastname">{member.lastname}</div>
                  <div className="Leaderboard-Points">{member.points}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Leaderboard;
