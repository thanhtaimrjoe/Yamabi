import { Card, Col, Tag, Typography } from "antd";
import React from "react";

const { Title } = Typography;

function CharacterItem(props) {
  //props
  var { character } = props;

  return (
    <Col lg={4} md={6} sm={8} xs={12}>
      <Card
        hoverable
        style={{ width: "auto" }}
        cover={<img alt="example" src={character.image} />}
      >
        <Title level={5} ellipsis={true}>
          {character.name}
        </Title>
        <Tag color={character.role === "Main" ? "magenta" : "blue"}>
          {character.role}
        </Tag>
      </Card>
    </Col>
  );
}

export default CharacterItem;
