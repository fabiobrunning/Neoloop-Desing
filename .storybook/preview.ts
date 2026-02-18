import type { Preview, Decorator } from "@storybook/react";
import "../src/styles/globals.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || "dark";
  const root = document.documentElement;

  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }

  return Story();
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme for components",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "light", title: "Light", icon: "sun" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dark",
  },
  decorators: [withTheme],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
