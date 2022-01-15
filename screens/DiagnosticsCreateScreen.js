import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../assets/ressources/constants";
import { StackActions } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";

import axios from "axios";

export default function DiagnosticsCreateScreen({ id, token, navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (title && description && image) {
        setErrorMessage("");
        setUploading(true);
        const response = await axios.post(
          "https://bioderma-api.herokuapp.com/diagnostic/create",
          {
            name: title,
            description,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 200) {
          await handleImagePicked(response.data._id);
          Alert.alert(
            "Your results",
            "It sounds like you should get diagnosed",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () =>
                  navigation.dispatch(StackActions.replace("MyAppointment")),
              },
            ]
          );
          setUploading(false);
        }
      } else {
        setErrorMessage(
          "All the fields must be filled in and at least one picture must be provided"
        );
        setVisible(true);
      }
    } catch (error) {
      setUploading(false);
      setErrorMessage("An error has occured");
      setVisible(true);
    }
  };

  const handleImagePicked = useCallback(async (diagnosticId) => {
    try {
      const uri = image;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append("photo", {
        uri,
        name: `photo.${fileType}`,
      });
      uploadResponse = await axios.put(
        "https://bioderma-api.herokuapp.com/diagnostic/upload-picture/" +
          diagnosticId,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (e) {
      setErrorMessage("An error has occured");
      setVisible(true);
    }
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Send a new diagnosis</Text>
        <TextInput
          onChangeText={(text) => {
            setTitle(text);
          }}
          value={title}
          placeholder="Give your diagnosis a title"
          autoCorrect={false}
          style={styles.textInput}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textArea}
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
          placeholder="Describe your symptoms"
          multiline={true}
          numberOfLines={10}
        />
        <TouchableOpacity
          onPress={async () => {
            const cameraRollPerm =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (cameraRollPerm.status === "granted") {
              const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
              });
              if (!pickerResult.cancelled) {
                setImage(pickerResult.uri);
              }
            }
          }}
          style={styles.button}
        >
          <Text style={styles.textButton}>Pick an image from camera roll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const cameraPerm =
              await ImagePicker.requestCameraPermissionsAsync();
            const cameraRollPerm =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (
              cameraPerm.status === "granted" &&
              cameraRollPerm.status === "granted"
            ) {
              const pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
              });
              if (!pickerResult.cancelled) {
                setImage(pickerResult.uri);
              }
            }
          }}
        >
          <Text style={styles.textButton}>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (title && description && image) {
              setUploading(true);
              setTimeout(() => {
                handleSubmit();
              }, 7000);
            } else {
              setErrorMessage(
                "All the fields must be filled in and at least one picture must be provided"
              );
              setVisible(true);
            }
          }}
          style={styles.buttonSumbit}
        >
          <Text>Send diagnosis</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {uploading && (
          <View style={[StyleSheet.absoluteFill, styles.uploading]}>
            <ActivityIndicator color="#fff" size="large" />
            <Text style={styles.textLoading}>
              AI is working hard to find out if you have atopic dermatitis
            </Text>
          </View>
        )}
      </ScrollView>
      <Snackbar
        visible={visible}
        style={{ backgroundColor: `${COLORS.blueColor}` }}
        onDismiss={() => setVisible(false)}
      >
        <Text>{errorMessage}</Text>
      </Snackbar>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  textLoading: {
    fontSize: 22,
    color: "white",
    marginTop: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  uploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
  },
  textArea: {
    width: "80%",
    borderColor: `${COLORS.blueColor}`,
    borderWidth: 1,
    height: 100,
    marginBottom: 30,
    paddingLeft: 10,
    paddingTop: 5,
    textAlignVertical: "top",
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 10,
    // elevation: 15,
  },
  textInput: {
    borderBottomColor: `${COLORS.blueColor}`,
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 40,
  },
  text: {
    color: "gray",
  },
  button: {
    backgroundColor: `${COLORS.blueColor}`,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonSumbit: {
    borderWidth: 3,
    borderColor: `${COLORS.blueColor}`,
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
  },
  textButton: {
    color: "white",
  },
  textError: {
    color: `${COLORS.blueColor}`,
    marginBottom: 10,
  },
  loader: {
    marginBottom: 16,
  },
});
