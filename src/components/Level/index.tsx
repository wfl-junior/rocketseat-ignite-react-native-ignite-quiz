import { Pressable, PressableProps, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = 1.15;
  }

  function handlePressOut() {
    scale.value = 1;
  }

  const color = TYPE_COLORS[type];

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
      <Animated.View
        style={[
          styles.container,
          containerAnimatedStyle,
          {
            borderColor: color,
            backgroundColor: isChecked ? color : "transparent",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isChecked ? THEME.COLORS.GRAY_100 : color },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
