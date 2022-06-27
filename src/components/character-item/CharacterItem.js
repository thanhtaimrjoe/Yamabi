import { Card, Col, Tag, Typography } from "antd";
import React from "react";

const { Title } = Typography;

function CharacterItem(props) {
  var { character } = props;

  const onShowCharacterInfo = () => {
    props.onShowCharacterInfo(character);
  };

  return (
    <Col span={4}>
      <Card
        hoverable
        style={{ width: "auto" }}
        cover={
          <img
            alt="example"
            height={280}
            src={character.image}
            onClick={onShowCharacterInfo}
          />
        }
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
