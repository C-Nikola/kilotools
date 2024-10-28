import { Card, Col, Row, Space } from "antd";
import { ReactNode } from "react";

export default function TowColumns({
  children1,
  children2,
}: {
  children1: ReactNode;
  children2: ReactNode;
}) {
  return (
    <Row className="w-full" gutter={[16, 16]} justify="center">
      <Col flex="0 1 600px">
        <Card style={{ width: "100%", margin: "0 auto" }}>{children1}</Card>
      </Col>
      <Col flex="0 1 600px">
        <Card style={{ width: "100%", margin: "0 auto" }}>{children2}</Card>
      </Col>
    </Row>
  );
}
