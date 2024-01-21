import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { QUIZZES } from "../../data/quizzes";
import { THEME } from "../../styles/theme";
import { LevelBars } from "../LevelBars";
import { styles } from "./styles";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface QuizCardProps extends TouchableOpacityProps {
  index: number;
  data: (typeof QUIZZES)[0];
}

export function QuizCard({ data, index, style, ...props }: QuizCardProps) {
  const Icon = data.svg;

  return (
    <AnimatedTouchableOpacity
      {...props}
      style={[styles.container, style]}
      entering={FadeInUp.delay(index * 100)}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GRAY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </AnimatedTouchableOpacity>
  );
}
