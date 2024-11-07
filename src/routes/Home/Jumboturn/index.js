import { Button } from "antd";
import "../index.css"
import { useNavigate } from "react-router-dom";


const Jumboturn = () => {
  const navigate = useNavigate();

  const handleNavigate =()=> {
    navigate("/signup")

  }

  return (
    <div className="jumboturn-container">
      <div className="jumboturn-left">
        <h1>Social Media App</h1>
        <h3>I think so, this is it. </h3>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before the final copy is available{" "}
        </p>
        <Button  type="primary" onClick={handleNavigate} size="large">
          Create Account
        </Button>
      </div>
      <div className="jumboturn-right">
        <img src="\facebook-logo-splash-design-icon-701751695134688bnr4dgaq0y.png" alt="user" />
      </div>
    </div>
  );
};

export default Jumboturn;
