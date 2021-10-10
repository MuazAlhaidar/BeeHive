import LeaderboardViewOnly from "../Components/Leaderboard/Leaderboard(view-only)";
import LeaderboardOwner from "../Components/Leaderboard/Leaderboard";
import "../CSS/LeaderboardPage.css";

interface IProps {
  isOwner: boolean;
}

function Leaderboard({ isOwner }: IProps) {
  return (
    <div className="Leaderboard-Module">
      {/* If the user is an owner, show the 
          leaderboard with editable points
          else show the view only leaderboard */}
      {isOwner ? <LeaderboardOwner /> : <LeaderboardViewOnly />}
    </div>
  );
}

export default Leaderboard;
