import { Outlet } from "react-router-dom";
import Header from "../Header";

const LayoutWrapper = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutWrapper;
