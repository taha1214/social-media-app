import { Button, Form, Input } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../shared/constant";
import { signup } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (v) => {
    fetch(`${baseUrl}/auth/signup`, {
      method: "post",
      body: JSON.stringify(v),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          dispatch(signup(res.user));
          navigate("/");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="signup-form">
      <p>Welcome At RiseBlog 👋</p>
      <h1>Create your account</h1>

      <Form
        name="basic"
        initialValues={{ name: "", email: "", password: "" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="field-container">
          <p>Name</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Email</p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Signup{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
