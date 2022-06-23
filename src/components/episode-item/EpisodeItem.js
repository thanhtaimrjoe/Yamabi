import { Card, Col, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

function EpisodeItem(props) {
  var { episode } = props;
  return (
    <Col span={4}>
      <Card
        hoverable
        style={{ width: "auto" }}
        cover={<img alt="example" src={episode.image} />}
      >
        <Title level={4}>{episode.name}</Title>
        <Text>Price: {episode.price}$</Text>
      </Card>
    </Col>
  );
}

export default EpisodeItem;
