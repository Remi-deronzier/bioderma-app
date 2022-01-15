import { createText, createBox } from "@shopify/restyle";
import { moderateScale } from "react-native-size-matters";

const theme = {
  colors: {
    white: "#fff",
    primary: "#4374A6",
    text: "#28303b",
    button: "#233d57",
    color: "#0C0D34",
    grey: "#BABD98",
    danger: "#ff0055",
    green: "#0BBF29",
    black: "#000",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    title: {
      fontSize: moderateScale(40),
      color: "white",
      fontWeight: "bold",
    },
    body: {
      fontSize: 16,
      lineHeight: 25,
      text: "text",
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 25,
      fontWeight: "bold",
      text: "text",
    },
    button: {
      fontSize: 15,
      color: "text",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
