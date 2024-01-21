import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

interface ProgressBarProps {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  const progress = useSharedValue(percentage);

  useEffect(() => {
    progress.value = withTiming(percentage);
  }, [percentage]);

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, progressAnimatedStyle]} />
    </View>
  );
}
