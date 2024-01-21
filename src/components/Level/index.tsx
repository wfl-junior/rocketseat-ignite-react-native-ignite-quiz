import { useEffect } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

interface LevelProps extends PressableProps {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({
  title,
  type = "EASY",
  isChecked = false,
  ...props
}: LevelProps) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  }, [isChecked]);

  const color = TYPE_COLORS[type];

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      checked.value,
      [0, 1],
      ["transparent", color],
    ),
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      checked.value,
      [0, 1],
      [color, THEME.COLORS.GRAY_100],
    ),
  }));

  function handlePressIn() {
    scale.value = withTiming(1.15);
  }

  function handlePressOut() {
    scale.value = withTiming(1);
  }

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
      <Animated.View
        style={[
          styles.container,
          containerAnimatedStyle,
          { borderColor: color },
        ]}
      >
        <Animated.Text style={[styles.title, textAnimatedStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
