import React from "react";
//ant design
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function ProductOverview(props) {
  //props
  const { product } = props;
  return (
    <Typography>
      <Title level={3}>Overview</Title>
      <Paragraph>{product.overview}</Paragraph>
    </Typography>
  );
}

export default ProductOverview;
