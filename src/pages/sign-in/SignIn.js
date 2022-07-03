import React from "react";
import { Layout, Form, Input, Row, Col, Button, Checkbox, Typography } from "antd";

const { Content } = Layout;
const {Title} = Typography;

function SignIn(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Row justify="center" align="middle" style={{height: '100vh', backgroundColor: 'pink'}}>
        <Col span={8} style={{ padding: '20px' ,backgroundColor: 'white'}}>
          <Title level={2} style={{textAlign: 'center'}}>YAMABI</Title>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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

            <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/#" style={{float: 'right'}}>
          Forgot password
        </a>
      </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}

export default SignIn;
