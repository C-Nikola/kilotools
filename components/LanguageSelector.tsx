import { Select } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const options = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "简体中文",
    value: "zh-CN",
  },
  {
    label: "Deutsch",
    value: "de_DE",
  },
  {
    label: "Español",
    value: "es",
  },
  {
    label: "Français",
    value: "fr",
  },
  {
    label: "Italian",
    value: "it",
  },
  {
    label: "Português",
    value: "pt",
  },
  {
    label: "Nederlands",
    value: "nl",
  },
  {
    label: "Polski",
    value: "pl",
  },
  {
    label: "Svenska",
    value: "sv",
  },
  {
    label: "Türkçe",
    value: "tr",
  },
  {
    label: "Русский",
    value: "ru",
  },
  {
    label: "日本語",
    value: "ja",
  },
  {
    label: "한국어",
    value: "ko",
  },
];

export default function LanguageSelector() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [language, setLanguage] = useState(locale);

  const handleChange = (value: string) => {
    setLanguage(value);
    document.cookie = `NEXT_LOCALE=${value}; max-age=31536000; path=/`;
    router.push({ pathname, query }, asPath, { locale: value });
  };

  return <Select value={language} onChange={handleChange} options={options} />;
}
