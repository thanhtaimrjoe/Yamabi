import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actCheckUserRequest, actClearUser } from "../../actions/user";
import {Button, Checkbox, Col, Form, Input, message, Row, Space, Typography} from 'antd';
import {blue} from '@ant-design/colors';

const {Title} = Typography;

function SignInPage(props) {

  const [isRemember, setIsRemember] = useState(false);

  //navigate
  const navigate = useNavigate();

  //redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const checkUser = (user) => dispatch(actCheckUserRequest(user));
  const clearUser = () => dispatch(actClearUser());

  useEffect(() => {
    if (user.username && user.password) {
      if (isRemember) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/home", { replace: true });
    }
    if (user === "Not Found") {
      message.error('Your username or password was incorrect')
      clearUser();
    }
  }, [user]);

  // const onChange = (event) => {
  //   var target = event.target;
  //   var name = target.name;
  //   var value = target.type === "checkbox" ? target.checked : target.value;
  //   if (name === "username") {
  //     setUsername(value);
  //   }
  //   if (name === "password") {
  //     setPassword(value);
  //   }
  // };

  // const onSave = (event) => {
  //   event.preventDefault();
  //   var user = {
  //     username: username,
  //     password: password,
  //   };
  //   checkUser(user);
  // };

  //ant-design
  const onFinish = (value) => {
    setIsRemember(value.remember)
    var user = {
          username: value.username,
          password: value.password,
        };
    checkUser(user);
  }

  const onFinishFailed = (errorInfo) => {
    
  }

  return (
    <>
      <Row justify="center" align="middle" style={{height: '100vh', backgroundColor: blue[1]}}>
        <Col span={10} style={{backgroundColor: 'white', padding: '10px'}}>
        <Form name="basic" labelCol={{span: 5}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        
        <Title level={2} style={{ textAlign: 'center'}}>Yamabi Admin</Title>
          <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!'}]}>
            <Input/>
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!'}]}>
            <Input.Password/>
          </Form.Item>
          <Form.Item name='remember' valuePropName="checked" wrapperCol={{offset: 5}}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 5}}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        </Col>
      </Row>
    </>
    // <div className="vh-100 bg-success bg-opacity-50 bg-gradient d-flex align-items-center justify-content-center">
    //   <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 bg-white p-5">
    //     <h1 className="offset-sm-4">Sign In</h1>
    //     <form onSubmit={onSave}>
    //       <div className="mb-3">
    //         <label className="col-xs-4 col-form-label">Name</label>
    //         <div className="col-xs-8">
    //           <input
    //             type="text"
    //             className="form-control"
    //             name="username"
    //             value={username}
    //             onChange={onChange}
    //             placeholder="Input username"
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div className="mb-5">
    //         <label className="form-label">Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           name="password"
    //           value={password}
    //           onChange={onChange}
    //           placeholder="Input password"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <div className="offset-sm-4">
    //           <button type="submit" className="btn btn-success me-4">
    //             Sign In
    //           </button>
    //           <Button type="primary">Ant Button</Button>
    //           <button type="button" className="btn btn-success">
    //             Reset
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}

export default SignInPage;
