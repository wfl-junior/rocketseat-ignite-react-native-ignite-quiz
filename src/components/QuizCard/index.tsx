import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { THEME } from "../../styles/theme";
import { styles } from "./styles";

import { QUIZZES } from "../../data/quizzes";
import { LevelBars } from "../LevelBars";

type Props = TouchableOpacityProps & {
  data: (typeof QUIZZES)[0];
};

export function QuizCard({ data, ...rest }: Props) {
  const Icon = data.svg;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GRAY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
}
