import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { cardsData } from "../constants/cardsData";
import { Theme, useTheme } from "@react-navigation/native";
import { shuffle } from "underscore";
import { useMemo } from "react";

type CardData = {
  question: string;
  answer: string;
};

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { height } = useWindowDimensions();

  const cardDataShuffled = useMemo(() => shuffle(cardsData), []);

  return (
    <View style={[styles.container]}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList<CardData>
        data={cardDataShuffled}
        keyExtractor={(item) => item.question}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { height }]}
            onPress={() =>
              router.navigate({
                pathname: "/answer",
                params: { itemId: item.question },
              })
            }
          >
            <Text style={styles.question}>{item.question}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}

const makeStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 10,
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    question: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "bold",
      padding: 20,
      textAlign: "center",
    },
  });
