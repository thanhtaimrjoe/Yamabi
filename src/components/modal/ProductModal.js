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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const [previewImage, setPreviewImage] = useState({
    previewURL: "",
    previewTitle: "",
  });
  const [previewVisible, setPreviewVisible] = useState(false);

  //redux - state
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (product && fileList.length === 0) {
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

  const validate = () => {
    var result = false;
    if (!productID) {
      message.error("Please generate ID");
      result = true;
    }
    if (!name) {
      message.error("Please input name");
      result = true;
    }
    if (!overview) {
      message.error("Please input overview");
      result = true;
    }
    if (fileList.length === 0) {
      message.error("Please choose an image");
      result = true;
    }
    return result;
  };

  //update or add
  const onProductSave = (event) => {
    event.preventDefault();
    const valid = validate();
    if (!valid) {
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
      okText={product ? "Update" : "Create"}
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
              maxLength={360}
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

export default ProductModal;
