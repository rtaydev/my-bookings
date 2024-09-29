/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#000";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    secondaryBackground: "#0030831A",
    tint: tintColorLight,
    icon: "#003083",
    tabIconDefault: "#4dd0e1",
    tabIconSelected: tintColorLight,
    buttonBackground: "#003083",
    buttonText: "#fff",
    border: "#003083",
    headingTextColor: "#003083",
  },
  dark: {
    text: "#fff",
    background: "#003083",
    secondaryBackground: "#fff",
    tint: tintColorDark,
    icon: "#000",
    tabIconDefault: "#26a69a",
    tabIconSelected: tintColorDark,
    buttonBackground: "#fff",
    buttonText: "#003083",
    border: "#efefef",
    headingTextColor: "#fff",
  },
};
