import ToolPageHeader from "@/components/ToolPageHeader";
import InputCopyable from "@/components/ui/InputCopyable";
import InputUI from "@/components/ui/InputUI";
import { Card, Col, Divider, Row, Select, Space } from "antd";
import {
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  fromUnixTime,
  getTime,
  getUnixTime,
  isDate,
  isValid,
  parseISO,
  toDate as timestampToDate,
} from "date-fns";
import {
  dateToExcelFormat,
  excelFormatToDate,
  isExcelFormat,
  isISO8601DateTimeString,
  isISO9075DateString,
  isMongoObjectId,
  isRFC3339DateString,
  isRFC7231DateString,
  isTimestamp,
  isUTCDateString,
  isUnixTimestamp,
} from "@/utils/components/date-time-converter.utils";
import { useState } from "react";
import { useInterval } from "react-use";
import { withDefaultOnError } from "@/utils/defaults";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type ToDateMapper = (value: string) => Date;

interface DateFormat {
  name: string;
  fromDate: (date: Date) => string;
  toDate: (value: string) => Date;
  formatMatcher: (dateString: string) => boolean;
}

const toDate: ToDateMapper = (date) => new Date(date);

const formats: DateFormat[] = [
  {
    name: "JS locale date string",
    fromDate: (date) => date.toString(),
    toDate,
    formatMatcher: () => false,
  },
  {
    name: "ISO 8601",
    fromDate: formatISO,
    toDate: (value) => {
      return parseISO(value);
    },
    formatMatcher: (date) => isISO8601DateTimeString(date),
  },
  {
    name: "ISO 9075",
    fromDate: formatISO9075,
    toDate: parseISO,
    formatMatcher: (date) => isISO9075DateString(date),
  },
  {
    name: "RFC 3339",
    fromDate: formatRFC3339,
    toDate,
    formatMatcher: (date) => isRFC3339DateString(date),
  },
  {
    name: "RFC 7231",
    fromDate: formatRFC7231,
    toDate,
    formatMatcher: (date) => isRFC7231DateString(date),
  },
  {
    name: "Unix timestamp",
    fromDate: (date) => String(getUnixTime(date)),
    toDate: (sec) => fromUnixTime(+sec),
    formatMatcher: (date) => isUnixTimestamp(date),
  },
  {
    name: "Timestamp",
    fromDate: (date) => String(getTime(date)),
    toDate: (ms) => timestampToDate(parseInt(ms)),
    formatMatcher: (date) => isTimestamp(date),
  },
  {
    name: "UTC format",
    fromDate: (date) => date.toUTCString(),
    toDate,
    formatMatcher: (date) => isUTCDateString(date),
  },
  {
    name: "Mongo ObjectID",
    fromDate: (date) =>
      `${Math.floor(date.getTime() / 1000).toString(16)}0000000000000000`,
    toDate: (objectId) =>
      new Date(Number.parseInt(objectId.substring(0, 8), 16) * 1000),
    formatMatcher: (date) => isMongoObjectId(date),
  },
  {
    name: "Excel date/time",
    fromDate: (date) => dateToExcelFormat(date),
    toDate: excelFormatToDate,
    formatMatcher: isExcelFormat,
  },
];

export default function DateTimeConverter() {
  const { t } = useTranslation("toolList");

  const [inputDate, setInputDate] = useState("");
  const [formatIndex, setFormatIndex] = useState(6);
  const [output, setOutput] = useState({ isErr: false, date: new Date() });

  // get current
  useInterval(
    () => {
      setOutput({ isErr: false, date: new Date() });
    },
    inputDate ? null : 1
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDate(value);
    handleChange(value, formatIndex);
  };

  const handleSelect = (value: number) => {
    setFormatIndex(value);
    handleChange(inputDate, value);
  };

  const handleChange = (value: string, formatIndexParam: number) => {
    if (!value.trim()) {
      setOutput({
        ...output,
        isErr: false,
      });
      return;
    }

    const { toDate } = formats[formatIndexParam];

    try {
      const customDate = toDate(value);
      if (!(isDate(customDate) && isValid(customDate))) {
        setOutput({
          ...output,
          isErr: true,
        });
        return;
      }
      setOutput({
        isErr: false,
        date: customDate,
      });
    } catch (_ignore) {
      setOutput({
        ...output,
        isErr: true,
      });
    }
  };

  function formatDateUsingFormatter(
    formatter: (date: Date) => string,
    date: Date
  ) {
    return withDefaultOnError(() => formatter(date), "");
  }

  return (
    <>
      <ToolPageHeader
        title="Date-time converter"
        toolName="date-time-converter"
      />
      <Row className="w-full" justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <Space direction="vertical" className="w-full">
              <Row gutter={8}>
                <Col flex={1}>
                  <InputUI
                    onChange={handleInputChange}
                    value={inputDate}
                    status={output.isErr ? "error" : ""}
                    message={"This date is invalid for this format"}
                    allowClear
                    placeholder="Paste your date string here..."
                  />
                </Col>
                <Col flex="0 1 170px">
                  <Select
                    onSelect={handleSelect}
                    className="w-full"
                    value={formatIndex}
                    options={formats.map(({ name }, index) => {
                      return {
                        label: name,
                        value: index,
                      };
                    })}
                    defaultValue={6}
                  />
                </Col>
              </Row>
              <Divider />
              {formats.map(({ name, fromDate }, index) => {
                return (
                  <Row key={index}>
                    <Col flex="0 1 150px">{name}</Col>
                    <Col flex={1}>
                      <InputCopyable
                        value={formatDateUsingFormatter(fromDate, output.date)}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Space>
          </Card>
        </Col>
      </Row>
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
