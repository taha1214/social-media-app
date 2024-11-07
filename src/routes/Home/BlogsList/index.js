import { useEffect, useState } from "react";
import BlogCard from "../../../components/BlogCard/index";
import axios from "axios";
import { baseUrl }from "../../../shared/constant"


const BlogsList = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() =>{

    axios
    .get(`${baseUrl}/blog/getAllBlogs`)
    .then((res) =>{

      console.log(res)

      const data = res.data.allBlogs;

      setBlogs(Array.isArray(data) ? data : [])

    //  alert("blog", data)     
    })
    .catch((err) => {
      alert("err", err);
    })
    },[])

  return (
    <div className="blog-list">
      {blogs.length ? (
        blogs.map((blog) => <BlogCard blog={blog} />)
      ) : (
        <h3>No Blogs Yet</h3>
      )}
    </div>
  );
};

export default BlogsList;
