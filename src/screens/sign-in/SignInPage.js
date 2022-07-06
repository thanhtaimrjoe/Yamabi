import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//style
import "../../styles/SignIn.css";
//ant design
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  Typography,
  Alert,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
//actions
import { actClearUser, actSignInRequest } from "../../redux/actions/user";

const { Content } = Layout;
const { Title } = Typography;

function SignInPage(props) {
  //state
  const [isRemember, setIsRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  //redux - state
  const user = useSelector((state) => state.user);
  //redux - dispatch
  const dispatch = useDispatch();
  //redux - sign in
  const signIn = (user) => dispatch(actSignInRequest(user));
  //redux - clear user
  const clearUser = () => dispatch(actClearUser());
  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username && user.password) {
      if (isRemember) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/home", { replace: true });
    }
    if (user === "Not Found") {
      setErrorMsg(true);
      clearUser();
    }
    // eslint-disable-next-line
  }, [user]);

  const onFinish = (values) => {
    setErrorMsg(false);
    setIsRemember(values.remember);
    const user = {
      username: values.username,
      password: values.password,
    };
    signIn(user);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Row justify="center" align="middle" className="sign-in-background">
        <Col span={7} className="sign-in-form">
          <Title level={2} className="sign-in-form-title">
            YAMABI
          </Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            {errorMsg && (
              <Alert
                message="The Username or Password is incorrect"
                type="error"
                showIcon
                style={{ marginBottom: "10px" }}
              />
            )}

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/#" className="sign-in-form-forgot">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="sign-in-form-button"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <Title level={5} className="sign-in-form-sign-up">
            Don't have account?{" "}
            <Link to={"/sign-up"}>Create a new account</Link>
          </Title>
        </Col>
      </Row>
    </Content>
  );
}

export default SignInPage;
