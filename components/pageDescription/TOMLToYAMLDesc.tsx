import { HeartTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import Link from "next/link";

const { Paragraph } = Typography;

export default function TOMLToYAMLDesc() {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />,
        using the open-source packages{" "}
        <Link href="https://github.com/unjs/confbox" target="_blank">
          confbox
        </Link>
        ,{" "}
        <Link href="https://github.com/nodeca/js-yaml" target="_blank">
          js-yaml
        </Link>
        .
      </Paragraph>
    </OneColumn>
  );
}
