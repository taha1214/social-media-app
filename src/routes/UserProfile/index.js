import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/constant";
import { login } from "../../store/userSlice";

const UserProfile = () => {
  const { user } = useSelector((s) => s.userReducer);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user,form]);

  
  const dispatch = useDispatch()
  
  const onFinish = (value) => {
   
    const userId = user._id
    const userDetail = { ...value }

    axios
    .post(`${baseUrl}/auth/updateProfile/${userId}`, userDetail)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(login(res.data.user))
      window.location.reload();
    })
    .catch((err) => {
      console.log(err.message)
    })
    

  };

  return (
    <div className="profile-setting">
      <h1>Profile Setting</h1>
      <Form
        name="basic"
        initialValues={{ name: "", email: "", profile: "", contact: "", age: "", address: "", bio: "", }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div className="field-container">
          <p>Name</p>
          <Form.Item
            name="name"
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
          <p>Email</p>
          <Form.Item name="email">
            <Input disabled={true} />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Profile</p>
          <Form.Item
            name="profile"
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
          <p>Contact</p>
          <Form.Item name="contact">
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Age</p>
          <Form.Item name="age">
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Address</p>
          <Form.Item name="address">
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Bio</p>
          <Form.Item name="bio">
            <Input.TextArea />
          </Form.Item>
        </div>
        <Form.Item className="footer-sec-button">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
