import { defaultStyles } from "@/constants/Styles";
import { View, Text, TextInput, StyleSheet } from "react-native";

import React from "react";
import Colors from "@/constants/Colors";

type Props = {};

const Page = (props: Props) => {
  return (
    <View>
      <Text>Let's get started!</Text>
      <Text>
        Enter your phone number. We will send you a confirmation code there
      </Text>
      <View>
        <TextInput placeholder="Mobile number" keyboardType="numeric" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
});

export default Page;
