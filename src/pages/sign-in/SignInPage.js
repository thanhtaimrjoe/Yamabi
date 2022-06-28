import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//actions
import { actCheckUserRequest, actClearUser } from "../../actions/user";
//ant design
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Typography,
} from "antd";
import { blue } from "@ant-design/colors";

const { Title } = Typography;

function SignInPage(props) {
  //state
  const [isRemember, setIsRemember] = useState(false);

  //navigate
  const navigate = useNavigate();

  //redux - state
  const user = useSelector((state) => state.user);
  //dispatch
  const dispatch = useDispatch();
  //redux - check user
  const checkUser = (user) => dispatch(actCheckUserRequest(user));
  //redux - clear user
  const clearUser = () => dispatch(actClearUser());

  useEffect(() => {
    if (user.username && user.password) {
      if (isRemember) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/home", { replace: true });
    }
    if (user === "Not Found") {
      message.error("Your username or password was incorrect");
      clearUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //form submit
  const onFinish = (value) => {
    setIsRemember(value.remember);
    var user = {
      username: value.username,
      password: value.password,
    };
    checkUser(user);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", backgroundColor: blue[1] }}
      >
        <Col
          span={10}
          style={{ backgroundColor: "white", padding: "20px 20px 0px 20px" }}
        >
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title level={2} style={{ textAlign: "center" }}>
              Yamabi Admin
            </Title>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 5 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default SignInPage;
