import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Modal,
  Input,
  Space,
  Row,
  Col,
  Typography,
  Upload,
  message,
  Image,
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
  }, []);

  const onCloseForm = () => {
    props.onCloseForm();
  };

  // const onChange = (event) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.type === "file" ? target.files[0] : target.value;
  //   if (name === "id") {
  //     setID(value);
  //   }
  //   if (name === "name") {
  //     setName(value);
  //   }
  //   if (name === "image") {
  //     setImage(value);
  //   }
  // };

  const onGenerateID = () => {
    setID(uuidv4());
  };

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

  //ant-design
  const beforeUpload = (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
      return Upload.LIST_IGNORE;
    } else {
      return false;
    }
  };
  const onChange = (info) => {
    let newFileList = [...info.fileList];
    setFile(info.file);
    setFileList(newFileList.slice(-1));
  };

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
      onCancel={onCloseForm}
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
          <Col flex="50px"></Col>
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
    // <div
    //   className="modal show fade"
    //   style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    // >
    //   <div className="modal-dialog modal-dialog-centered">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">Category information</h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           onClick={onCloseForm}
    //         ></button>
    //       </div>
    //       <form onSubmit={onSave}>
    //         <div className="modal-body">
    //           <div className="mb-3">
    //             <label className="col-form-label">ID:</label>
    //             <div className="input-group">
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 name="id"
    //                 value={id}
    //                 disabled
    //               />
    //               {!categoryInfo && (
    //                 <button
    //                   className="btn btn-outline-secondary"
    //                   type="button"
    //                   onClick={onGenerateID}
    //                 >
    //                   Generate
    //                 </button>
    //               )}
    //             </div>
    //           </div>
    //           <div className="mb-3">
    //             <label className="col-form-label">Name:</label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               name="name"
    //               value={name}
    //               onChange={onChange}
    //             />
    //           </div>
    //           <div className="mb-3 d-flex flex-column">
    //             <label className="col-form-label">Image:</label>
    //             <input
    //               className="form-control mb-3"
    //               type="file"
    //               name="image"
    //               onChange={onChange}
    //             ></input>
    //             {categoryInfo && !image && (
    //               <img
    //                 src={categoryInfo.image}
    //                 className="img-thumbnail"
    //                 alt="..."
    //                 style={{ width: "200px" }}
    //               />
    //             )}
    //             {image && (
    //               <img
    //                 src={URL.createObjectURL(image)}
    //                 className="img-thumbnail"
    //                 alt="..."
    //                 style={{ width: "200px" }}
    //               />
    //             )}
    //           </div>
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             onClick={onCloseForm}
    //           >
    //             Close
    //           </button>
    //           <button type="submit" className="btn btn-primary">
    //             Save changes
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default CategoryModal;
