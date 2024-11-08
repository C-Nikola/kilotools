import { HeartTwoTone } from "@ant-design/icons";
import { List, Table, Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import Link from "next/link";
import { TFunction } from "i18next";
import { withTranslation } from "next-i18next";

const { Paragraph, Title } = Typography;

export function SpeakingUrlGeneratorDesc({ t }: { t: TFunction }) {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        {t("speakingUrlGenerator.description")}
      </Paragraph>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />,
        using the open-source package{" "}
        <Link href="https://github.com/pid/speakingurl" target="_blank">
          speakingurl
        </Link>
        .
      </Paragraph>
      <Title level={3} className="text-center !mt-16">
        Usage
      </Title>
      <Table
        columns={columns}
        dataSource={optionDesc}
        pagination={false}
        bordered
      />
    </OneColumn>
  );
}
export default withTranslation(["toolList"])(SpeakingUrlGeneratorDesc);

const columns = [
  {
    title: "option",
    key: "option",
    dataIndex: "option",
  },
  {
    title: "desc",
    key: "desc",
    dataIndex: "desc",
  },
];

const optionDesc = [
  {
    key: "separator",
    option: "separator",
    desc: `char that replaces the whitespaces`,
  },
  {
    key: "lang",
    option: "lang",
    desc: `language specific transliteration`,
  },
  {
    key: "symbols",
    option: "symbols",
    desc: `false -> don't convert symbols; true -> convert symbols according to the 'lang' setting`,
  },
  {
    key: "maintainCase ",
    option: "maintainCase ",
    desc: `true -> maintain case chars;false -> convert all chars to lower case`,
  },
  {
    key: "titleCase",
    option: "titleCase",
    desc: `true -> convert input string to title-case`,
  },
  {
    key: "truncate",
    option: "truncate",
    desc: `0 -> don't trim length; >= 1 -> trim to max length while not breaking any words`,
  },
  {
    key: "uric",
    option: "uric",
    desc: `true -> additionally allow chars: ";", "?", ":", "@", "&", "=", "+", "$", ",", "/"`,
  },
  {
    key: "uricNoSlash",
    option: "uricNoSlash",
    desc: `true -> additionally allow chars: ";", "?", ":", "@", "&", "=", "+", "$", ","`,
  },
  {
    key: "mark",
    option: "mark",
    desc: `true -> additionally allow chars: "-", "_", ".", "!", "~", "*", "'", "(", ")"`,
  },
];
