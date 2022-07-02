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
import useWindowDimensions from '../../components/dimension/Dimension'

const { Title } = Typography;

function SignInPage(props) {
  //state
  const [isRemember, setIsRemember] = useState(false);

  const { height, width } = useWindowDimensions();

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
      <Row
      justify="center"
        align="middle"
        style={{ height: "100vh", width: '100%', backgroundColor: blue[1] }}
      >
        <Col
          xl={10}
          lg={12}
          md={14}
          sm={20}
          xs={15}
          style={{ backgroundColor: "white", padding: "20px 20px 0px 20px" }}
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
              style={width <= 480 && {width: '85%'}}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              style={width <= 480 && {width: '85%'}}
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
  );
}

export default SignInPage;
