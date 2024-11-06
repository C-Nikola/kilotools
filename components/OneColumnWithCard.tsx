import { Card, Col, Row, Space } from "antd";
import { ReactNode } from "react";

export default function OneColumnWithCard({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Row className="w-full" justify="center">
      <Col flex="0 1 600px">
        <Card className="w-full my-0 mx-auto">{children}</Card>
      </Col>
    </Row>
  );
}
