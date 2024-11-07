import { useEffect, useState } from "react";
import { baseUrl } from "../../shared/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import  BlogCard  from "../../components/BlogCard/index"
const MyBlogs = () => {
  const { user } = useSelector((s) => s.userReducer)
  const [blogs, setBlogs] = useState([])


  useEffect(()=> {
    axios
    .get(`${baseUrl}/blog/getAllBlogs`)
    .then((res)=> {
      // const authorId =  res
      console.log("res", res)
      
      const data = res.data.allBlogs;
      console.log("data", data)

      setBlogs(Array.isArray(data) ? data : [])
    })
    .catch((err) => {
      alert("err", err)
    })
  },[])


  const userBlogs = blogs.filter((blog) => blog.author._id === user._id);

  return (
    <div className="blog-list">
      {userBlogs.length > 0 ? (
        userBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <h3>No Blogs Yet</h3>
      )}
    </div>
  );
};

export default MyBlogs;