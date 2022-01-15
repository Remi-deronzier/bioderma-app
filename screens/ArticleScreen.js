import React, { useState, useEffect } from "react";

import { COLORS } from "../assets/ressources/constants";
import { format } from "date-fns";

import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export default function ArticleScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bioderma-api.herokuapp.com/article/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  buildArticle = () => {
    if (data.content) {
      return data.content.map((section, index) => {
        return (
          <View key={index}>
            <Text style={styles.subtitle}>{section.subtitle}</Text>
            {section.paragraphs.map((paragraph, indexParagraph) => {
              return (
                <Text key={indexParagraph + 1000} style={styles.paragraphs}>
                  {paragraph}
                </Text>
              );
            })}
            {section.image && (
              <Image
                style={styles.imageInline}
                source={{
                  uri: section.image,
                }}
                resizeMode="cover"
              />
            )}
          </View>
        );
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <ScrollView contentContainerStyle={styles.loading}>
          <ActivityIndicator
            size="large"
            color={`${COLORS.blueColor}`}
            style={styles.containerLoader}
          />
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          stickyHeaderIndices={[0]}
        >
          {
            <View style={styles.header}>
              <View style={styles.avatarView}>
                {data.author.account.avatar ? (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: data.author.account.avatar.secure_url,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Avatar
                    rounded
                    title={data.author.account.username[0].toUpperCase()} // take the inital
                    size={22}
                    overlayContainerStyle={{
                      backgroundColor: `${COLORS.blueColor}`,
                    }}
                  />
                )}
                <View style={styles.articleDetails}>
                  <Text style={styles.author}>
                    {data.author.account.username}
                  </Text>
                  <Text style={styles.textDate}>
                    {format(Date.parse(data.date), "d MMM yyyy")}
                  </Text>
                </View>
              </View>
              <View style={styles.closeButton}>
                <Ionicons
                  name="close-circle"
                  size={40}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          }
          {
            <>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.description}>{data.description}</Text>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: data.thumbnail,
                }}
                resizeMode="cover"
              />
              <Divider></Divider>
              <View style={styles.articleContent}>{buildArticle()}</View>
              <View style={styles.endDots}>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
              </View>
            </>
          }
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingTop: 10,
  },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  endDots: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  dot: {
    backgroundColor: "black",
    width: 5,
    height: 5,
    borderRadius: 1000,
  },
  articleContent: {
    marginTop: 15,
    marginBottom: 30,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textDate: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  avatar: {
    height: 22,
    width: 22,
    borderRadius: 1000,
  },
  thumbnail: {
    height: 200,
    width: "100%",
    marginBottom: 30,
  },
  imageInline: {
    height: 150,
    width: "100%",
    marginTop: 10,
  },
  avatarView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: `${COLORS.grayColor}`,
    borderRadius: 70,
  },
  scrollView: {
    backgroundColor: "#fff",
    padding: 20,
  },
  articleDetails: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginTop: 5,
    lineHeight: 24,
    marginBottom: 10,
    color: "#777",
  },
  paragraphs: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 24,
    marginBottom: 5,
    color: "#777",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
});
