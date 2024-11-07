import { Button, Form, Input } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { baseUrl } from "../../shared/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (v) => {
    console.log("🚀 ~ onFinish ~ v:", v);

    fetch(`${baseUrl}/auth/login`, {
      method: "post",
      body: JSON.stringify(v),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        if (res.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          dispatch(login(res.user));
          navigate("/");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log("🚀 ~ onFinish ~ err:", err);
        alert();
      });
  };
  return (
    <div className="login-form">
      <p>Welcome back! 👋</p>
      <h1>Login to your account</h1>

      <Form
        name="basic"
        initialValues={{ email: "", password: "" }}
        onFinish={onFinish}
        autoComplete="off"
      >
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
