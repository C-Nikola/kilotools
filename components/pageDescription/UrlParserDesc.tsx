import { HeartTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import Link from "next/link";

const { Paragraph } = Typography;

export default function UrlParserDesc() {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />
      </Paragraph>
    </OneColumn>
  );
}
