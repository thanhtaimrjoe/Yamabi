import { Card, Col, Tag, Typography } from "antd";
import React from "react";

const { Title } = Typography;

function CharacterItem(props) {
  //props
  var { character } = props;

  //show info
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
