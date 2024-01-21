import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ConfirmButton } from "../../components/ConfirmButton";
import { Loading } from "../../components/Loading";
import { OutlineButton } from "../../components/OutlineButton";
import { Question } from "../../components/Question";
import { QuizHeader } from "../../components/QuizHeader";
import { QUIZ } from "../../data/quiz";
import { historyAdd } from "../../storage/quizHistoryStorage";
import { styles } from "./styles";

interface QuizParams {
  id: string;
}

type QuizProps = (typeof QUIZ)[number];

export function Quiz() {
  const route = useRoute();
  const shake = useSharedValue(0);
  const { navigate } = useNavigation();
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null,
  );

  const { id } = route.params as QuizParams;

  function handleSkipConfirm() {
    Alert.alert("Pular", "Deseja realmente pular a questão?", [
      { text: "Sim", onPress: () => handleNextQuestion() },
      { text: "Não", onPress: () => {} },
    ]);
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length,
    });

    navigate("finish", {
      points: String(points),
      total: String(quiz.questions.length),
    });
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prevState => prevState + 1);
    } else {
      handleFinished();
    }
  }

  function shakeAnimation() {
    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, { duration: 400, easing: Easing.bounce }),
    );
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (quiz.questions[currentQuestionIndex].correct === alternativeSelected) {
      setPoints(currentPoints => currentPoints + 1);
    } else {
      shakeAnimation();
    }

    setAlternativeSelected(null);
  }

  function handleStop() {
    Alert.alert("Parar", "Deseja parar agora?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => navigate("home"),
      },
    ]);

    return true;
  }

  useEffect(() => {
    const quizSelected = QUIZ.filter(item => item.id === id)[0];
    setQuiz(quizSelected);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion();
    }
  }, [points]);

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shake.value,
          [0, 0.5, 1, 1.5, 2, 2.5, 3],
          [0, -15, 0, 15, 0, -15, 0],
        ),
      },
    ],
  }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestionIndex + 1}
          totalOfQuestions={quiz.questions.length}
        />

        <Animated.View style={animatedShakeStyle}>
          <Question
            key={quiz.questions[currentQuestionIndex].title}
            question={quiz.questions[currentQuestionIndex]}
            alternativeSelected={alternativeSelected}
            setAlternativeSelected={setAlternativeSelected}
          />
        </Animated.View>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </ScrollView>
    </View>
  );
}
