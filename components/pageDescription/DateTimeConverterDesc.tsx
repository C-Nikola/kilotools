import { HeartTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import Link from "next/link";

const { Paragraph } = Typography;

export default function DateTimeConverterDesc() {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />,
        using the open-source package{" "}
        <Link href="https://github.com/date-fns/date-fns" target="_blank">
          date-fns
        </Link>
        .
      </Paragraph>
    </OneColumn>
  );
}
