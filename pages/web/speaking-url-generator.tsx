import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ToolPageHeader from "@/components/ToolPageHeader";
import OneColumnWithCard from "@/components/OneColumnWithCard";
import {
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import { useMemo, useState } from "react";
import getSlug from "speakingurl";
import { getErrorMsg } from "@/utils/error";
import TextAreaUI from "@/components/ui/TextAreaUI";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import ErrorMsg from "@/components/ErrorMsg";
import SpeakingUrlGeneratorDesc from "@/components/pageDescription/SpeakingUrlGeneratorDesc";

interface IParams {
  separator: string;
  lang: string;
  symbols: boolean;
  maintainCase: boolean;
  titleCase: boolean;
  truncate: number | undefined;
  uric: boolean;
  uricNoSlash: boolean;
  mark: boolean;
}

export default function SpeakingUrlGenerator() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");
  const [params, setParams] = useState<IParams>({
    separator: "-",
    lang: "en",
    symbols: true,
    maintainCase: false,
    titleCase: false,
    truncate: 0,
    uric: false,
    uricNoSlash: false,
    mark: false,
  });

  const changeParams = (newParams: IParams) => {
    setParams(newParams);
  };

  const output = useMemo(() => {
    try {
      const result = getSlug(input, params);
      return {
        isErr: false,
        result,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [input, params]);

  return (
    <>
      <NextSeo
        title={t("speakingUrlGenerator.title")}
        description={t("speakingUrlGenerator.description")}
      />
      <ToolPageHeader
        title={t("speakingUrlGenerator.title")}
        toolName="speaking-url-generator"
      />
      <OneColumnWithCard>
        <Space direction="vertical" size="middle" className="w-full">
          <Row justify="space-between" align="middle">
            <Col flex="0 1 100px">Your string: </Col>
            <Col flex={1}>
              <Input
                placeholder="eg: Schöner Titel läßt grüßen!? Bel été !"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Row align="middle">
                <Col flex="0 1 69px">Separator:</Col>
                <Col flex={1}>
                  <Input
                    value={params.separator}
                    onChange={(e) => {
                      changeParams({
                        ...params,
                        separator: e.currentTarget.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row align="middle">
                <Col flex="0 1 40px">Lang:</Col>
                <Col flex={1}>
                  <Select
                    className="w-full"
                    value={params.lang}
                    options={langList}
                    onChange={(value) => {
                      changeParams({
                        ...params,
                        lang: value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Row justify="space-between" align="middle">
                <Col flex="0 1 69px">Truncate:</Col>
                <Col flex={1}>
                  <InputNumber
                    className="w-full"
                    value={params.truncate}
                    min={0}
                    onChange={(value) => {
                      changeParams({ ...params, truncate: value ?? undefined });
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Space>
                <Switch
                  value={params.symbols}
                  onChange={(value) => {
                    changeParams({ ...params, symbols: value });
                  }}
                />
                Symbols
              </Space>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col span={11}>
              <Space>
                <Switch
                  value={params.maintainCase}
                  onChange={(value) => {
                    changeParams({ ...params, maintainCase: value });
                  }}
                />
                Maintain Case
              </Space>
            </Col>
            <Col span={11}>
              <Space>
                <Switch
                  value={params.titleCase}
                  onChange={(value) => {
                    changeParams({ ...params, titleCase: value });
                  }}
                />
                Title case
              </Space>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Space>
                <Switch
                  value={params.uric}
                  onChange={(value) => {
                    changeParams({
                      ...params,
                      uric: value,
                    });
                  }}
                />
                Uric
              </Space>
            </Col>
            <Col span={11}>
              <Space>
                <Switch
                  value={params.uricNoSlash}
                  onChange={(value) => {
                    changeParams({
                      ...params,
                      uricNoSlash: value,
                    });
                  }}
                />
                Uric No Slash
              </Space>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={11}>
              <Space>
                <Switch
                  value={params.mark}
                  onChange={(value) => changeParams({ ...params, mark: value })}
                />
                Mark
              </Space>
            </Col>
          </Row>
          {output.isErr && <ErrorMsg errMsg={output.result} />}
        </Space>
        <Divider />
        <TextAreaCopyable
          value={output.result}
          readOnly
          autoSize={{ minRows: 5 }}
        />
      </OneColumnWithCard>
      <SpeakingUrlGeneratorDesc />
    </>
  );
}
export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}

const langList = [
  {
    label: "Arabic",
    value: "ar",
  },
  {
    label: "Azerbaijani",
    value: "az",
  },
  {
    label: "Czech ",
    value: "cs",
  },
  {
    label: "German ",
    value: "de",
  },
  {
    label: "Divehi ",
    value: "dv",
  },
  {
    label: "English ",
    value: "en",
  },
  {
    label: "Spanish ",
    value: "es",
  },
  {
    label: "Persian ",
    value: "fa",
  },
  {
    label: "Finnish ",
    value: "fi",
  },
  {
    label: "French ",
    value: "fr",
  },
  {
    label: "Georgian ",
    value: "ge",
  },
  {
    label: "Greek",
    value: "gr",
  },
  {
    label: "Hungarian ",
    value: "hu",
  },
  {
    label: "Italian ",
    value: "it",
  },
  {
    label: "Lithuanian",
    value: "lt",
  },
  {
    label: "Latvian ",
    value: "lv",
  },
  {
    label: "Burmese ",
    value: "my",
  },
  {
    label: "Macedonian",
    value: "mk",
  },
  {
    label: "Dutch ",
    value: "nl",
  },
  {
    label: "Polish ",
    value: "pl",
  },
  {
    label: "Portuguese ",
    value: "pt",
  },
  {
    label: "Romanian ",
    value: "ro",
  },
  {
    label: "Russian ",
    value: "ru",
  },
  {
    label: "Swedish ",
    value: "sv",
  },
  {
    label: "Slovak ",
    value: "sk",
  },
  {
    label: "Serbian",
    value: "sr",
  },
  {
    label: "Turkish ",
    value: "tr",
  },
  {
    label: "Ukranian ",
    value: "uk",
  },
  {
    label: "Vietnamese  ",
    value: "vn",
  },
];
