import { Button, Card, Col, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

function EpisodeItem(props) {
  var { episode } = props;
  return (
    // <div className="col mb-3">
    //   <div className="card" style={{ width: "15rem" }}>
    //     <img src={episode.image} className="card-img-top" alt="..." />
    //     <div className="card-body">
    //       <h5 className="card-title">{episode.name}</h5>
    //       <p className="card-text">Price: {episode.price}$</p>
    //       <button type="button" className="btn btn-primary">
    //         Edit episode
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <Col span={6}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={episode.image} />}
      >
        <Title level={3}>{episode.name}</Title>
        <Text>Price: {episode.price}$</Text>
        <br />
        <Button type="primary">Edit episode</Button>
      </Card>
    </Col>
  );
}

export default EpisodeItem;
