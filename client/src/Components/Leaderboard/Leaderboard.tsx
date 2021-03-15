import React from "react";
import EditMemberPointsButton from "../EditMemberPointsButton";
import "../../CSS/Leaderboard.css";

interface MemberInfo {
  id: number;
  firstname: string;
  lastname: string;
  points: number;
}

function Leaderboard() {
  const fakeMembers = Array<MemberInfo>(
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 }
  );

  const [sortedList, setSortedList] = React.useState(
    fakeMembers.sort((a, b) => (a.points < b.points ? 1 : -1))
  );

  return (
    <div className="Leaderboard">
      <div className="Leaderboard-Topbar">
        <div className="Leaderboard-Firstname">First Name</div>
        <div className="Leaderboard-Lastname">Last Name</div>
        <div className="Leaderboar-PointsLabel">Points</div>
      </div>
      <div className="Leaderboard-List">
        {sortedList.map((member, index) => {
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
              <EditMemberPointsButton />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
