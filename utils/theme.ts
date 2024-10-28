import { theme } from "antd";

const lightTheme = {
  token: {
    colorPrimary: "#395bc7",
    borderRadius: 4,
    colorPrimaryBorderHover: "#87A5EFFF",
  },
  components: {
    Card: {
      colorBorderSecondary: "#A6BFF9",
    },
  },
};

const darkTheme = {
  token: {
    colorPrimary: "#395bc7",
    borderRadius: 4,
    colorPrimaryBorderHover: "#87A5EFFF",
  },
  components: {
    Menu: {
      controlItemBgActive: "rgba(135, 165, 239, 0.15)",
      itemSelectedColor: "#87a5efff",
    },
  },
  algorithm: theme.darkAlgorithm,
};

export { lightTheme, darkTheme };
