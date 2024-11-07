import { Button, Card, } from "antd";
import "./index.css";
import { commentsData } from "../../store/commentSlice"
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios  from "axios";
import { baseUrl } from "../../shared/constant"
import React, { useEffect } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import CommentForm from "../commentForm";
const { confirm } = Modal;


const BlogCard = (props) => {
  const blog = props.blog;
  const { user } = useSelector((s) => s.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(()=>{
    axios
     .get(`${baseUrl}/comment/getAllComment`)
      .then((res) =>{
        const comments = res.data.allComments;
        dispatch(commentsData(comments));
      })
      .catch((err)=>{
        console.log("comment Error", err)
      })
  },[dispatch])

  const handleDelete = (id)=>{
    showConfirm(id);
  }
   
  // const CommentForm = (value) => {
  //   const { user } = useSelector((s) => s.userReducer);

  //   console.log('Form values:', value);
  //   console.log('Comment:', value.comment);
  //   console.log('User ID:', user.id);
  // }




  const showConfirm = (id) => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        axios
        .delete(`${baseUrl}/blog/deleteBlog/${id}`)
        .then((res)=>{
          window.location.reload();
          console.log("blog deleted successfully");
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      onCancel() {
        alert('Cancel');
      },
    });
  };
  

  const handleEdit = () => {

    navigate(`/create-blog?blogId=${blog?._id}`);
  };
  return (
    <Card
      className="blog-card"
      style={{
        width: 500,
      }}
      hoverable
      cover={<img alt="blogImage" src={blog.image} className="image"/>}
    >
      <h2>{blog.title}</h2>
      <p>{blog.description} </p>

      <div className="creator-profile">
        <img alt="profile" src={blog?.author?.profile || "/user-icon.png"} />
        <div>
          <p className="creator-name">{blog?.author?.name}</p>
          <p className="created-at">{moment(blog.createdAt).fromNow()}</p>
        </div>
      </div>

{/* {blog?.author?._id !== user?._id ?( */}
  <CommentForm blogId={blog._id} blog={blog} userId={user._id} />
  {/* //  ) : null } */}

      

      {blog?.author?._id === user?._id ? (
        <div className="action-button">
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={() => handleDelete(blog._id)} type="primary">Delete</Button>
        </div>
      ) : null}

          


    </Card>
  );
};

export default BlogCard;
