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
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function ProductModal(props) {
  //state
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);

  //props
  var { productInfo, isModalVisible } = props;

  //redux - state
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (productInfo) {
      setProductID(productInfo.productID);
      setName(productInfo.name);
      setOverview(productInfo.overview);
      setCategoryID(productInfo.categoryID);
      var imgFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: productInfo.image,
      };
      setFileList([...fileList, imgFile]);
    } else {
      setCategoryID(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //close dialog
  const onCloseDialog = () => {
    props.onCloseDialog();
  };

  //generate id
  const onGenerateID = () => {
    setProductID(uuidv4());
  };

  //update or add
  const onSave = (event) => {
    event.preventDefault();
    if (productInfo) {
      console.log("update ne");
      //   productInfo.name = name;
      //   props.onSave(productInfo, file);
    } else {
      var product = {
        productID: productID,
        name: name,
        overview: overview,
        categoryID: categoryID,
      };
      props.onSave(product, file);
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

  //name and overview input
  const onTextChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "name") {
      setName(value);
    }
    if (name === "overview") {
      setOverview(value);
    }
  };

  //select
  const onSelectChange = (value) => {
    setCategoryID(value);
  };

  //show category options
  const showCategoryOptions = () => {
    var result = null;
    result = categories.map((category) => {
      return (
        <Option key={category.id} value={category.id}>
          {category.name}
        </Option>
      );
    });
    return result;
  };

  return (
    <Modal
      title={productInfo ? "Product Information" : "Create New Product"}
      visible={isModalVisible}
      onOk={onSave}
      onCancel={onCloseDialog}
    >
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row>
          <Col flex="80px">
            <Text>Category:</Text>
          </Col>
          <Col flex="auto">
            <Select
              defaultValue={
                productInfo ? productInfo.categoryID : categories[0].id
              }
              onChange={onSelectChange}
              style={{ width: 120 }}
            >
              {showCategoryOptions()}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col flex="80px">
            <Text>ID:</Text>
          </Col>
          <Col flex="auto">
            <Input value={productID} disabled />
          </Col>
          {!productInfo && (
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
            <Input name="name" value={name} onChange={onTextChange} />
          </Col>
        </Row>
        <Row>
          <Col flex="80px">
            <Text>Overview:</Text>
          </Col>
          <Col flex="auto">
            <TextArea
              name="overview"
              rows={4}
              value={overview}
              onChange={onTextChange}
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

export default ProductModal;
