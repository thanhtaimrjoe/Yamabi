import { PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  Space,
  Row,
  Col,
  Typography,
  Upload,
  message,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;

function CategoryModal(props) {
  //state
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);

  //props
  var { categoryInfo, isModalVisible } = props;

  useEffect(() => {
    if (categoryInfo) {
      setID(categoryInfo.id);
      setName(categoryInfo.name);
      var imgFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: categoryInfo.image,
      };
      setFileList([...fileList, imgFile]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //close dialog
  const onCloseDialog = () => {
    props.onCloseDialog();
  };

  //generate id
  const onGenerateID = () => {
    setID(uuidv4());
  };

  //update or add
  const onSave = (event) => {
    event.preventDefault();
    if (categoryInfo) {
      categoryInfo.name = name;
      props.onSave(categoryInfo, file);
    } else {
      var category = {
        id: id,
        name: name,
      };
      props.onSave(category, file);
    }
  };

  //upload props
  const beforeUpload = (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
      return Upload.LIST_IGNORE;
    } else {
      return false;
    }
  };

  //upload props
  const onChange = (info) => {
    let newFileList = [...info.fileList];
    setFile(info.file);
    setFileList(newFileList.slice(-1));
  };

  //name input
  const onNameChange = (event) => {
    var target = event.target;
    var value = target.value;
    setName(value);
  };

  return (
    <Modal
      title="Category Information"
      visible={isModalVisible}
      onOk={onSave}
      onCancel={onCloseDialog}
    >
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row>
          <Col flex="50px">
            <Text>ID:</Text>
          </Col>
          <Col flex="auto">
            <Input value={id} disabled />
          </Col>
          {!categoryInfo && (
            <Col>
              <Button type="primary" onClick={onGenerateID}>
                Generate
              </Button>
            </Col>
          )}
        </Row>
        <Row>
          <Col flex="50px">
            <Text>Name:</Text>
          </Col>
          <Col flex="auto">
            <Input name="name" value={name} onChange={onNameChange} />
          </Col>
        </Row>
        <Row>
          <Col flex="50px">Image</Col>
          <Col flex="auto">
            <Space>
              <Upload
                fileList={fileList}
                multiple={true}
                action="http://localhost:3000/"
                listType="picture-card"
                accept=".png,.jpeg"
                beforeUpload={beforeUpload}
                onChange={onChange}
              >
                <Space direction="vertical">
                  <PlusOutlined />
                  Upload
                </Space>
              </Upload>
            </Space>
          </Col>
        </Row>
      </Space>
    </Modal>
  );
}

export default CategoryModal;
