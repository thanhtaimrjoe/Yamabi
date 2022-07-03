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
  Layout,
} from "antd";
import { blue } from "@ant-design/colors";
import useWindowDimensions from "../../components/dimension/Dimension";

const { Title } = Typography;
const { Content } = Layout;

function SignInPage(props) {
  //state
  const [isRemember, setIsRemember] = useState(false);

  const { width } = useWindowDimensions();

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
    <Content>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", backgroundColor: blue[1] }}
      >
        <Col
          xxl={10}
          xl={10}
          lg={12}
          md={14}
          sm={20}
          style={
            width >= 1884
              ? {
                  backgroundColor: "white",
                  padding: "30px 50px 0px 50px",
                  maxWidth: "30%",
                }
              : {
                  backgroundColor: "white",
                  padding: "30px 50px 0px 50px",
                }
          }
        >
          <Form
            name="basic"
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
              wrapperCol={width > 480 && { offset: 5 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={width > 480 ? { offset: 5 } : { offset: 9 }}>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}

export default SignInPage;
