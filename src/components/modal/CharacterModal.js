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
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;
const { Option } = Select;
function CharacterModal(props) {
  //state
  const [characterID, setCharacterID] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);

  //props
  var { character, productID, isCharacterModalVisible, modalLoading } = props;

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

  //update or add
  const onCharacterSave = (event) => {
    event.preventDefault();
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
  };

  //remove character
  const onCharacterRemoveOrCancel = () => {
    if (character) {
      props.onCharacterRemove();
    } else {
      props.onCloseDialog();
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

export default CharacterModal;
