import { Col, Row } from "antd";
import { ReactNode } from "react";

export default function OneColumn({ children }: { children?: ReactNode }) {
  return (
    <Row>
      <Row className="w-full mt-16" justify="center">
        <Col flex="0 1 600px">{children}</Col>
      </Row>
    </Row>
  );
}
