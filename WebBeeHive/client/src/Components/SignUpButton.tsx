import { Link } from "react-router-dom";
import "../CSS/SignUpButton.css";

function SignUpButton() {
  return (
    <Link to="/SignUp">
      <button className="SignUpButton">Sign Up</button>
    </Link>
  );
}

export default SignUpButton;
