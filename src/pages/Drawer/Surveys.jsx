import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../../constants";
import { useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import WarningText from "../../components/WarningText";


const Survey = ({ item, onSubmit }) => {

  const [answers, setAnswers] = useState(item.surveyOptions.map(() => false));

  const surveyDate = (new Date(item.date)).toLocaleString("tr-TR");
  const { colors } = useTheme();
  const headerTextStyle = [styles.surveyHeader.text, { color: colors.primaryText }];

  return (
    <View style={[styles.survey, { backgroundColor: colors.secondary }]}>
      <View style={styles.surveyHeader}>
        <Text style={headerTextStyle}>{item.surveySender}</Text>
        <Text style={headerTextStyle}>{surveyDate}</Text>
      </View>
      <View style={[styles.surveyContent, { minHeight: answers.length * 75 }]}>
        <Text style={[styles.surveyContent.text, { color: colors.primaryText }]}>{item.surveyTitle}</Text>
        <FlashList
          estimatedItemSize={10}
          extraData={answers}
          renderItem={({ item, index: i }) => (
            <View key={i} style={styles.surveyOption}>
              <TouchableOpacity
                onPress={() => {
                  setAnswers(ans => {
                    return ans.map((_, si) => si === i);
                  });
                }}
                style={{
                  width: 15, height: 15,
                  backgroundColor: answers[i] === true ? colors.button : null,
                  borderWidth: !answers[i] === true ? 2 : null,
                  marginHorizontal: 10,
                }} />
              <Text style={[styles.surveyOption.text, { color: colors.primaryText }]}>{item.key}</Text>
            </View>
          )}
          data={item.surveyOptions}
        />
        <TouchableOpacity onPress={() => {
          onSubmit({ surveyId: item.surveyId, answers });
        }} style={{
          width: WIDTH / 2,
          height: 45,
          backgroundColor: colors.button,
          alignSelf: "center",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={[styles.surveyOption.text, { color: colors.secondary }]}>Cevabı gönder!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Surveys = () => {

  const authState = useSelector(state => state.auth);
  const [surveys, setSurveys] = useState([]);
  const [message, setMessage] = useState("");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const req = await fetch(`${API_URL}/v1/getSurveys`, {
          method: "POST",
          headers: {
            ...DEFAULT_HEADERS,
            "Authorization": `Bearer ${authState.accessToken}`,
          },
          body: JSON.stringify({
            userId: authState.userId,
          }),
        });
        const data = await req.json();
        switch (data.status) {
          case 1:
            setSurveys(data.data);
            setMessage("");
            break;
          default:
            setMessage(data.message);
        }
      })();
    }, []),
  );

  const surveyOnSubmit =  async (data) => {
    let l = data.answers.length
    let a = data.answers.filter((a) => a !== true)
    if(l === a.length || typeof data.surveyId === "undefined"){
      console.log("cevap yok kardeş")
      return 0
    }
    const req = await fetch(`${API_URL}/v1/applySurvey`, {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        "Authorization": `Bearer ${authState.accessToken}`
      },
      body: JSON.stringify({
        userId: authState.userId,
        surveyId: data.surveyId,
        userAnswers: data.answers
      })
    })
    const rdata = await req.json()
    setMessage(rdata.message)
  };


  return (
    <View style={styles.container}>
      {message && <WarningText>{message}</WarningText>}

      <FlashList
        estimatedItemSize={10}
        renderItem={(props) => (<Survey {...props} onSubmit={surveyOnSubmit} />)}
        data={surveys}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  survey: {
    width: WIDTH,
    marginVertical: 10,
  },
  surveyHeader: {
    flexDirection: "row",
    width: WIDTH,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
    text: {
      fontSize: 15,
      fontFamily: "SecularOne",
    },
  },
  surveyContent: {
    text: {
      fontSize: 20,
      alignSelf: "center",
      fontFamily: "SecularOne",
    },
  },
  surveyOption: {
    width: WIDTH / 1.1,
    height: 50,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    text: {
      fontSize: 16,
      fontFamily: "SecularOne",
    },
  },
});

export default Surveys;
