import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import "../BlogCard/index.css";
import axios from 'axios';
import { baseUrl } from '../../shared/constant';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CommentForm = ({ blogId, blog }) => {
  const [ allComments, setAllComments ] = useState([]);
  const [ likeCount, setLikeCount ] = useState(blog?.likes || 0); // Safely access likes
  const { comment } = useSelector((state) => state.commentReducer);
  const { user } = useSelector((state) => state.userReducer);
  // const navigate = useNavigate();

  // Fetch the initial comments and likes
  useEffect(() => {
    setAllComments(Array.isArray(comment) ? comment : []);
    setLikeCount(blog?.likes || 0); // Update only if blog and likes exist
  }, [comment, blog?.likes]);


  const handleLike = () => {
    // Ensure the user object and user ID are defined
    console.log('Blog:', blog._id);
    const userId = user._id;
    console.log("userId", userId)

    if (!user || !user._id) {
      alert("User is not logged in or user ID is missing.");
      return;

    }
  
    axios
      .post(`${baseUrl}/blog/likeBlog/${blog._id}`, { userId: userId })
      .then((res) => {
        if (res.data.likes) {
          console.log("res", res);
          setLikeCount(res.data.likes);
          console.log('Like updated successfully');
        } else {
          alert("You've already liked this post.");
        }
      })
      .catch((err) => {
        console.log('Error updating like:', err);
      });
  };

    // Handle form submission for comments
  const onFinish = (value) => {
    const newComment = {
      ...value,
      author: user._id,
      blogId,
      _id: Math.random().toString(36).substr(2, 9), // Temporary ID for UI update
    };

    // Optimistically update the comments list
    setAllComments([newComment, ...allComments]);

    axios
      .post(`${baseUrl}/comment/createComment`, newComment)
      .then(() => {
        console.log('Comment added successfully');
      })
      .catch((err) => {
        console.log('Error adding comment:', err);
        // Rollback the comment if the request fails
        setAllComments(allComments);
      });
  };

  // Filter comments to only show those related to the current blog post
  const filteredComments = allComments.filter(
    (oneComment) => oneComment.blogId === blogId
  );

  return (
    <div>
      <div className='like'>
        <Button onClick={handleLike}>Like {likeCount}</Button>
        <Form
          name="basic"
          initialValues={{ comment: "" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Please write a comment!" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </Form>
      </div>
      <div>
        {filteredComments.length > 0 ? (
          filteredComments.map((oneComment) => (
            <p key={oneComment._id}>
              {user.name}: {oneComment.comment}
            </p>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
