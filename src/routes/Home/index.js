import Jumboturn from "./Jumboturn";
import BlogsList from "./BlogsList";
import "./index.css";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((s) => s.userReducer);

  return (
    <div className="home-page">{user ? <BlogsList /> : <Jumboturn />}</div>
  );
};

export default Home;
