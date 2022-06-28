import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
const { TextArea } = Input;

function ProductModal(props) {
  //props
  var { product, isProductModalVisible, modalLoading } = props;

  //state
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [file, setFile] = useState();
  const [fileList, setFileList] = useState([]);

  //redux - state
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (product) {
      setProductID(product.productID);
      setName(product.name);
      setOverview(product.overview);
      setCategoryID(product.categoryID);
      var imgFile = {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: product.image,
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
  const onProductSave = (event) => {
    event.preventDefault();
    if (product) {
      product.categoryID = categoryID;
      product.name = name;
      product.overview = overview;
      props.onProductSave(product, file);
    } else {
      var productInfo = {
        productID: productID,
        name: name,
        overview: overview,
        categoryID: categoryID,
      };
      props.onProductSave(productInfo, file);
    }
  };

  //upload image
  const beforeUpload = (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
      return Upload.LIST_IGNORE;
    } else {
      return false;
    }
  };

  //image select
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

  //category select
  const onSelectChange = (value) => {
    setCategoryID(value);
  };

  //show options
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
      title={product ? "Product Information" : "Create New Product"}
      visible={isProductModalVisible}
      onOk={onProductSave}
      onCancel={onCloseDialog}
      confirmLoading={modalLoading}
    >
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row>
          <Col flex="80px">
            <Text>Category:</Text>
          </Col>
          <Col flex="auto">
            <Select
              defaultValue={product ? product.categoryID : categories[0].id}
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
          {!product && (
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
