import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import InputUI from "@/components/ui/InputUI";
import { Col, Divider, Row, Space, Switch, Table, Typography } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import cronstrue from "cronstrue";
import { getErrorMsg } from "@/utils/error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const { Text } = Typography;

export default function CrontabGenerator() {
  const { t } = useTranslation("toolList");
  const [cron, setCron] = useState("10 * * * *");
  const [verbose, setVerbose] = useState(true);
  const [dayOfWeekStartIndexZero, setDayOfWeekStartIndexZero] = useState(true);
  const [use24HourTimeFormat, setUse24HourTimeFormat] = useState(true);

  const handleChangeCron = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCron(value);
  };

  const handleChangeVerbose = (checked: boolean) => {
    setVerbose(checked);
  };
  const handleChangeDayOfWeekStartIndexZero = (checked: boolean) => {
    setDayOfWeekStartIndexZero(checked);
  };
  const handleChangeUse24HourTimeFormat = (checked: boolean) => {
    setUse24HourTimeFormat(checked);
  };

  const result = useMemo(() => {
    try {
      const desc = cronstrue.toString(cron, {
        verbose,
        dayOfWeekStartIndexZero,
        use24HourTimeFormat,
        throwExceptionOnParseError: true,
      });
      return {
        isErr: false,
        desc,
      };
    } catch (err) {
      return {
        isErr: true,
        desc: getErrorMsg(err),
      };
    }
  }, [cron, verbose, dayOfWeekStartIndexZero, use24HourTimeFormat]);

  return (
    <>
      <ToolPageHeader
        title={t("crontabGenerator.title")}
        toolName="crontab-generator"
      />
      <Space direction="vertical" size="large" className="w-full">
        <OneColumn>
          <Space direction="vertical" className="w-full">
            <Text>Paste your cron here:</Text>
            {/* TODO: UI */}
            <InputUI
              message={result.desc}
              placeholder="* * * * *"
              size="large"
              value={cron}
              onChange={handleChangeCron}
              status={result.isErr ? "error" : ""}
            />
            <p className="text-2xl">{!result.isErr && result.desc}</p>
            <Divider />
            <Row gutter={8}>
              <Col span={12} className="text-right">
                Verbose
              </Col>
              <Col span={12}>
                <Switch value={verbose} onChange={handleChangeVerbose} />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12} className="text-right">
                Use 24 hour time format
              </Col>
              <Col span={12}>
                <Switch
                  value={use24HourTimeFormat}
                  onChange={handleChangeUse24HourTimeFormat}
                />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12} className="text-right">
                Days start at 0
              </Col>
              <Col span={12}>
                <Switch
                  value={dayOfWeekStartIndexZero}
                  onChange={handleChangeDayOfWeekStartIndexZero}
                />
              </Col>
            </Row>
          </Space>
        </OneColumn>
      </Space>
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
