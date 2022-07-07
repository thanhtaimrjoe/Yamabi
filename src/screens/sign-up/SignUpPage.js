import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//style
import "../../styles/SignUp.css";
//ant design
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  DatePicker,
  Radio,
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { actSignUpRequest } from "../../redux/actions/user";

const { Content } = Layout;
const { Title } = Typography;

function SignUpPage(props) {
  //state
  const [isMatch, setIsMatch] = useState(true);

  //redux - state
  const user = useSelector((state) => state.user);
  //redux - dispatch
  const dispatch = useDispatch();
  //redux - sign in
  const signUp = (user) => dispatch(actSignUpRequest(user));
  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username && user.password) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home", { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      setIsMatch(false);
    } else {
      setIsMatch(true);
      const newUser = {
        email: values.email,
        username: values.username,
        password: values.password,
        birthday: values.birthday.format("YYYY-MM-DD"),
        gender: values.gender,
      };
      signUp(newUser);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Row justify="center" align="middle" className="sign-up-background">
        <Col span={7} className="sign-up-form">
          <Title level={2} className="sign-up-form-title">
            YAMABI
          </Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true, gender: "male" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Please input valid email" },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
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

            <Form.Item
              name="confirmPassword"
              validateStatus={!isMatch && "error"}
              help={!isMatch && "Password doesn't match!"}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              name="birthday"
              rules={[
                { required: true, message: "Please choose your birthday!" },
              ]}
            >
              <DatePicker size="large" placeholder="Select birthday" />
            </Form.Item>

            <Form.Item name="gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="sign-up-form-button"
              >
                Create new account
              </Button>
            </Form.Item>
          </Form>
          <Title level={5} className="sign-up-form-sign-in">
            Already have an account? <Link to={"/"}>Sign In</Link>
          </Title>
        </Col>
      </Row>
    </Content>
  );
}

export default SignUpPage;
