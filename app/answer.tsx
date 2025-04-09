import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { cardsData } from "../constants/cardsData";
import { ScrollView } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";
import { Theme, useTheme } from "@react-navigation/native";

type Params = {
  itemId: string;
};

export default function Answer() {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { itemId } = useLocalSearchParams<Params>();
  const cardData = cardsData.find(({ question }) => question == itemId);
  const router = useRouter();
  const { width } = useWindowDimensions();

  if (!cardData) {
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: cardData?.question, headerBackTitle: "Назад" }}
      />
      <ScrollView style={styles.scrollView}>
        <Markdown
          style={{
            body: {
              fontSize: 16,
              lineHeight: 24,
              color: theme.colors.text,
            },
            strong: { fontWeight: "bold" },
            code_inline: {
              color: "#f00",
              backgroundColor: theme.dark ? "#1f1f1f" : "#f2f2f2",
            },
            fence: {
              color: "#f00",
              fontSize: 14,
              backgroundColor: theme.dark ? "#1f1f1f" : "#f2f2f2",
            },
          }}
        >
          {cardData?.answer}
        </Markdown>
      </ScrollView>
    </View>
  );
}

const makeStyles = ({ dark }: Theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: dark ? "#1f1f1f" : "#f2f2f2" },
    scrollView: { padding: 10 },
  });
