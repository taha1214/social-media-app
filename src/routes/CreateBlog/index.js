import {Button, Form, Input, Select, Upload } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/constant";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";


const categories = [
  { value: "TECH", name: "Technology" },
  { value: "HEALTH", name: "Health" },
  { value: "LIFE", name: "Lifestyle" },
  { value: "BUSINESS", name: "Business" },
  { value: "EDU", name: "Education" },
];

const CreateBlog = () => {
  const navigate = useNavigate();
  const [ form ] = Form.useForm();

  const { user } = useSelector((s) => s.userReducer);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");
  
  const [image, setImage] = useState("");

  useEffect(() => {
    if (blogId) {
      axios
      .get(`${baseUrl}/blog/getBlog/${blogId}`)
      .then((res)=>{
        if(res.data){
          form.setFieldsValue({ 
            title: res.data.blog.title,
            image: res.data.blog.image,
            category: res.data.blog.category,
            description: res.data.blog.description,
          });
        }
        else{
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
    }

  },[blogId, form])

  const onFinish = (value) => {
    console.log("🚀 ~ value:", value);
    setLoading(true);
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("category", value.category);
    formData.append("authorId", user?._id);

    const file = value?.image?.file

    if (file.uid)  {
      formData.append("image", file);

    console.log("🚀 ~ image:", file);
    }
    console.log("FormData Entries:", [...formData.entries()]);

    if (blogId) {
      formData.append("id", blogId);

      axios
        .put(`${baseUrl}/blog/updateBlog`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          setLoading(false);
          // navigate("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      // const blogDetail = { ...value, authorId: user?._id };

       axios
        .post(`${baseUrl}/blog/createBlog`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  
  const handleCancel = () => {
    navigate("/");
  };
  const onSelectImage = (e) => {
    console.log("🚀 ~ onSelectImage ~ e:", e);
    const url = URL.createObjectURL(e);
    console.log("🚀 ~ url:", url);
    form.setFieldValue("image", e);
    setImage(url);
    return false;
  };


  
  return (
    <div className="create-blog-form">
      <h1>Create Blog</h1>
      <Form
        form={form}
        name="basic"
        initialValues={{ title: "", image: "", category: "", description: "" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="field-container">
          <p>Title</p>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Category</p>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Select>
              {categories.map((cat) => (
                <Select.Option value={cat.value}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Description</p>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </div>
        
        <div className="field-container">
          <p>Select Image</p>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Upload
              showUploadList={false}
              beforeUpload={onSelectImage}
              previewFile={false}
              maxCount={1}
              multiple={false}
            >
              <Button>Upload</Button>
            </Upload>
            {image ? (
              <div>
                <img alt="post" src={image} className="selected-image" />
              </div>
            ) : null}
          </Form.Item>
        </div>
        <div className="footer-sec">
          <Button
            type="default"
            className="footer-sec-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Form.Item className="footer-sec-button">
            <Button type="primary" htmlType="submit" loading={loading}>
              {blogId ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );

};

export default CreateBlog;
