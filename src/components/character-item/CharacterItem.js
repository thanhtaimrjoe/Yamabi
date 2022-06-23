import { Card, Col, Tag, Typography } from "antd";
import React from "react";

const { Title } = Typography;

function CharacterItem(props) {
  var { character } = props;
  return (
    <Col span={4} style={{ margin: "0 20px" }}>
      <Card
        hoverable
        style={{ width: "auto" }}
        cover={<img alt="example" src={character.image} />}
      >
        <Title level={5} ellipsis={true}>
          {character.name}
        </Title>
        <Tag color={"magenta"}>Main</Tag>
      </Card>
    </Col>
  );
}

export default CharacterItem;
