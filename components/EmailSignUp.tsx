import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

export default function EmailSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password..."
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <TextInput
            style={styles.verificationInput} // Assuming this is styled the same as `input` for simplicity
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity
            style={styles.verificationButton}
            onPress={onPressVerify}
          >
            <Text style={styles.verificationButtonText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.container,
  },
  input: {
    backgroundColor: Colors.lightGray, // Using the lightGray for input background
    marginBottom: 20, // Adds spacing between each input field
    paddingHorizontal: 20, // Inner spacing for the text input
    height: 50, // Fixed height for uniformity
    borderRadius: 8, // Rounded corners for the input fields
    fontSize: 16, // Text size within the input field
    color: Colors.dark, // Text color
  },
  button: {
    ...defaultStyles.pillButton, // Reuse the pillButton for a consistent look
    backgroundColor: Colors.primary, // Button background color
    marginHorizontal: 20, // Horizontal margin for the button
    marginTop: 10, // Space above the button
  },
  buttonText: {
    ...defaultStyles.buttonText, // Reuse buttonText for consistent styling
  },
  verificationInput: {
    // Styles specific to the verification input can go here, if they differ from the `input` style
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10, // Alternatively, you could just reuse the input style
  },
  verificationButton: {
    // Similar to the `button` style, but for the verification button
    ...defaultStyles.pillButton,
  },
  verificationButtonText: {
    ...defaultStyles.buttonText,
  },
});
