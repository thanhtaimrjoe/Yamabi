import React, { useEffect, useState } from "react";
//ant design
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
//uuid
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function CategoryModal(props) {
  //props
  var { category, isModalVisible } = props;

  //state
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState({
    previewURL: "",
    previewTitle: "",
  });
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (category && fileList.length === 0) {
      setID(category.id);
      setName(category.name);
      var imgFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: category.image,
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

  const validate = () => {
    var result = false;
    if (!id) {
      message.error("Please generate ID");
      result = true;
    }
    if (!name) {
      message.error("Please input name");
      result = true;
    }
    if (fileList.length === 0) {
      message.error("Please choose an image");
      result = true;
    }
    return result;
  };

  //update or add
  const onSave = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      if (category) {
        category.name = name;
        props.onSave(category, file);
      } else {
        var categoryInfo = {
          id: id,
          name: name,
        };
        props.onSave(categoryInfo, file);
      }
    }
  };

  //upload image
  const beforeUpload = (file) => {
    var isPNG = false;
    if (file.type === "image/png") {
      isPNG = true;
    }
    if (file.type === "image/jpeg") {
      isPNG = true;
    }
    if (!isPNG) {
      message.error(
        `${file.name} can not be uploaded. Only accept jpg and png files`
      );
      return Upload.LIST_IGNORE;
    } else {
      return false;
    }
  };

  //preview image
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage({
      previewURL: file.url || file.preview,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
    setPreviewVisible(true);
  };

  //cancel preview image
  const handleCancel = () => setPreviewVisible(false);

  //image select
  const onChange = (info) => {
    let newFileList = [...info.fileList];
    var result = newFileList.slice(-1);
    setFileList(result);
    if (result.length > 0) {
      setFile(info.file);
    } else {
      setFile(null);
    }
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
      okText={category ? "Update" : "Create"}
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
          {!category && (
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
                accept=".png,.jpg"
                beforeUpload={beforeUpload}
                onChange={onChange}
                onPreview={handlePreview}
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
      <Modal
        visible={previewVisible}
        title={previewImage.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={previewImage.previewURL}
        />
      </Modal>
    </Modal>
  );
}

export default CategoryModal;
