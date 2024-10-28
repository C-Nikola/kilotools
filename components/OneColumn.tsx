import { Card, Col, Row, Space } from "antd";
import { ReactNode } from "react";

export default function OneColumn({ children }: { children?: ReactNode }) {
  return (
    <Row className="w-full" justify="center">
      <Col flex="0 1 600px">
        <Card style={{ width: "100%", margin: "0 auto" }}>{children}</Card>
      </Col>
    </Row>
  );
}
