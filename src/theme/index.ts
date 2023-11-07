import {
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {};

const theme = extendTheme(
  {
    styles: {
      global: {
        "html, body": {
          backgroundColor: "gray.700",
          color: "gray.50",
          lineHeight: "tall",
        },
        a: {
          color: "teal.500",
        },
      },
    },
    colors: {
      brand: {
        100: "#f7fafc",
        // ...
        900: "red",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "purple",
    components: ["Button"],
  })
);

export default theme;
