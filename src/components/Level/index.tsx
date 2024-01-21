import { useEffect } from "react";
import { GestureResponderEvent, Pressable, PressableProps } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { THEME } from "../../styles/theme";
import { styles } from "./styles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  style,
  onPressIn,
  onPressOut,
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

  function handlePressIn(event: GestureResponderEvent) {
    scale.value = withTiming(1.15);
    onPressIn?.(event);
  }

  function handlePressOut(event: GestureResponderEvent) {
    scale.value = withTiming(1);
    onPressOut?.(event);
  }

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        containerAnimatedStyle,
        { borderColor: color },
        style,
      ]}
    >
      <Animated.Text style={[styles.title, textAnimatedStyle]}>
        {title}
      </Animated.Text>
    </AnimatedPressable>
  );
}
