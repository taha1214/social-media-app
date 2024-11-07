import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWrapper from "../components/Layout";
import Home from "./Home";
import MyBlogs from "./MyBlogs";
import UserProfile from "./UserProfile";
import Login from "./Login";
import Signup from "./Signup";
import CreateBlog from "./CreateBlog";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUserLoggedIn } from "../store/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-blogs",
        element: <MyBlogs />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/create-blog",
        element: <CreateBlog />,
      },
    ],
  },
]);

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("🚀 ~ useEffect ~ user:", user);
    dispatch(isUserLoggedIn(JSON.parse(user)));
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default Routes;
