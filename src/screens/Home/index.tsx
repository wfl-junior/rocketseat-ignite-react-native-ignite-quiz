import { useNavigation } from "@react-navigation/native";
import { Trophy } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Header } from "../../components/Header";
import { Level } from "../../components/Level";
import { QuizCard } from "../../components/QuizCard";
import { QUIZZES } from "../../data/quizzes";
import { styles } from "./styles";

export function Home() {
  const { navigate } = useNavigation();
  const [levels, setLevels] = useState([1, 2, 3]);
  const [quizzes, setQuizzes] = useState(QUIZZES);

  function handleLevelFilter(level: number) {
    const levelAlreadySelected = levels.includes(level);

    if (levelAlreadySelected) {
      if (levels.length > 1) {
        setLevels(prevState => prevState.filter(item => item !== level));
      }
    } else {
      setLevels(prevState => [...prevState, level]);
    }
  }

  useEffect(() => {
    setQuizzes(QUIZZES.filter(quiz => levels.includes(quiz.level)));
  }, [levels]);

  return (
    <View style={styles.container}>
      <Header
        icon={Trophy}
        title="Vamos estudar"
        subtitle="Treine seus conhecimento"
        onPress={() => navigate("history")}
      />

      <View style={styles.levels}>
        <Level
          title="Fácil"
          type="EASY"
          onPress={() => handleLevelFilter(1)}
          isChecked={levels.includes(1)}
        />

        <Level
          title="Médio"
          type="MEDIUM"
          onPress={() => handleLevelFilter(2)}
          isChecked={levels.includes(2)}
        />

        <Level
          title="Difícil"
          type="HARD"
          onPress={() => handleLevelFilter(3)}
          isChecked={levels.includes(3)}
        />
      </View>

      <FlatList
        data={quizzes}
        numColumns={2}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cards}
        renderItem={({ item, index }) => (
          <QuizCard
            data={item}
            index={index}
            onPress={() => navigate("quiz", { id: item.id })}
          />
        )}
      />
    </View>
  );
}
