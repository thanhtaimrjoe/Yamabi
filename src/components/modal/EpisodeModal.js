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
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;
function EpisodeModal(props) {
  //state
  const [episodeID, setEpisodeID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);

  //props
  var { episode, productID, isEpisodeModalVisible, modalLoading } = props;

  useEffect(() => {
    if (episode && fileList.length === 0) {
      setEpisodeID(episode.episodeID);
      setName(episode.name);
      setPrice(episode.price);
      var imgFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: episode.image,
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
    setEpisodeID(uuidv4());
  };

  //update or add
  const onEpisodeSave = (event) => {
    event.preventDefault();
    if (episode) {
      console.log("update", episode);
      //   episode.categoryID = categoryID;
      //   episode.name = name;
      //   episode.overview = overview;
      //   props.onSaveEpisode(episode, file);
    } else {
      var episodeInfo = {
        episodeID: episodeID,
        name: name,
        price: price,
        productID: productID,
      };
      props.onEpisodeSave(episodeInfo, file);
    }
  };

  //remove episode
  const onEpisodeRemoveOrCancel = () => {
    if (episode) {
      props.onEpisodeRemove();
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

  //price input
  const onPriceChange = (value) => {
    setPrice(value);
  };

  return (
    <Modal
      title={episode ? "Episode Information" : "Create New Episode"}
      visible={isEpisodeModalVisible}
      onOk={onEpisodeSave}
      okText="Update"
      onCancel={onCloseDialog}
      confirmLoading={modalLoading}
      footer={[
        <Button
          key="remove"
          type={episode ? "danger" : "default"}
          loading={modalLoading}
          onClick={onEpisodeRemoveOrCancel}
        >
          {episode ? "Remove" : "Cancel"}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={modalLoading}
          onClick={onEpisodeSave}
        >
          Update
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row>
          <Col flex="80px">
            <Text>ID:</Text>
          </Col>
          <Col flex="auto">
            <Input value={episodeID} disabled />
          </Col>
          {!episode && (
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
            <Text>Price:</Text>
          </Col>
          <Col flex="auto">
            <InputNumber
              min={0}
              max={10000}
              onChange={onPriceChange}
              addonAfter="$"
            />
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

export default EpisodeModal;
