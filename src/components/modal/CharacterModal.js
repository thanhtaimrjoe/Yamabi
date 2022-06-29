import React, { useEffect, useState } from "react";
//ant design
import { PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  Space,
  Row,
  Col,
  Upload,
  message,
  Button,
  Typography,
  Select,
} from "antd";
//uuid
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function CharacterModal(props) {
  //props
  var { character, productID, isCharacterModalVisible, modalLoading } = props;

  //state
  const [characterID, setCharacterID] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState({
    previewURL: "",
    previewTitle: "",
  });
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (character && fileList.length === 0) {
      setCharacterID(character.characterID);
      setName(character.name);
      setRole(character.role);
      var imgFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: character.image,
      };
      setFileList([...fileList, imgFile]);
    } else {
      setRole("Main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //close dialog
  const onCloseDialog = () => {
    props.onCloseDialog();
  };

  //generate id
  const onGenerateID = () => {
    setCharacterID(uuidv4());
  };

  const validate = () => {
    var result = false;
    if (!characterID) {
      message.error("Please generate ID");
      result = true;
    }
    if (!name) {
      message.error("Please input name");
      result = true;
    }
    if (!role) {
      message.error("Please select role");
      result = true;
    }
    if (fileList.length === 0) {
      message.error("Please choose an image");
      result = true;
    }
    return result;
  };

  //update or add
  const onCharacterSave = (event) => {
    event.preventDefault();
    const valid = validate();
    if (!valid) {
      if (character) {
        character.characterID = characterID;
        character.name = name;
        character.productID = productID;
        character.role = role;
        props.onCharacterSave(character, file);
      } else {
        var characterInfo = {
          characterID: characterID,
          name: name,
          productID: productID,
          role: role,
        };
        props.onCharacterSave(characterInfo, file);
      }
    }
  };

  //remove or cancel
  const onCharacterRemoveOrCancel = () => {
    if (character) {
      props.onCharacterRemove();
    } else {
      props.onCloseDialog();
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
    var name = target.name;
    var value = target.value;
    if (name === "name") {
      setName(value);
    }
  };

  //role select
  const onRoleChange = (value) => {
    setRole(value);
  };

  return (
    <Modal
      title={character ? "Character Information" : "Create New Character"}
      visible={isCharacterModalVisible}
      onOk={onCharacterSave}
      okText="Update"
      onCancel={onCloseDialog}
      confirmLoading={modalLoading}
      footer={[
        <Button
          key="remove"
          type={character ? "danger" : "default"}
          onClick={onCharacterRemoveOrCancel}
        >
          {character ? "Remove" : "Cancel"}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={modalLoading}
          onClick={onCharacterSave}
        >
          {character ? "Update" : "Create"}
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row>
          <Col flex="80px">
            <Text>ID:</Text>
          </Col>
          <Col flex="auto">
            <Input value={characterID} disabled />
          </Col>
          {!character && (
            <Col>
              <Button type="primary" onClick={onGenerateID}>
                Generate
              </Button>
            </Col>
          )}
        </Row>
        <Row>
          <Col flex="80px">
            <Text>Name:</Text>
          </Col>
          <Col flex="auto">
            <Input name="name" value={name} onChange={onNameChange} />
          </Col>
        </Row>
        <Row>
          <Col flex="80px">
            <Text>Role:</Text>
          </Col>
          <Col flex="auto">
            <Select
              defaultValue={character ? character.role : "Main"}
              onChange={onRoleChange}
              style={{ width: 110 }}
            >
              <Option value="Main">Main</Option>
              <Option value="Supporter">Supporter</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col flex="80px">Image:</Col>
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

export default CharacterModal;
