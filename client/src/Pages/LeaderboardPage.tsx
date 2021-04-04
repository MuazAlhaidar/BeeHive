import LeaderboardViewOnly from "../Components/Leaderboard/Leaderboard(view-only)";
import LeaderboardOwner from "../Components/Leaderboard/Leaderboard";
import "../CSS/LeaderboardPage.css";

interface IProps {
  isOwner: boolean;
}

function Leaderboard({ isOwner }: IProps) {
  return (
    <div className="Leaderboard-Module">
      {isOwner ? <LeaderboardOwner /> : <LeaderboardViewOnly />}
    </div>
  );
}

export default Leaderboard;
