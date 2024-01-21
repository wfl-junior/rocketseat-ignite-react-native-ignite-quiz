import { Dimensions, Text } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";
import { Option } from "../Option";
import { styles } from "./styles";

const { width: screenWidth } = Dimensions.get("window");

const enteringKeyframe = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateX: screenWidth }, { rotate: "90deg" }],
  },
  70: {
    opacity: 0.3,
  },
  100: {
    opacity: 1,
    transform: [{ translateX: 0 }, { rotate: "0deg" }],
  },
});

const exitingKeyframe = new Keyframe({
  from: {
    opacity: 1,
    transform: [{ translateX: 0 }, { rotate: "0deg" }],
  },
  to: {
    opacity: 0,
    transform: [{ translateX: -screenWidth }, { rotate: "-90deg" }],
  },
});

interface QuestionProps {
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  question: {
    title: string;
    alternatives: string[];
  };
}

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
}: QuestionProps) {
  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyframe}
      exiting={exitingKeyframe}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}
