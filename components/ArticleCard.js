import React from "react";

import { COLORS } from "../assets/ressources/constants";
import { format } from "date-fns";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import { Avatar } from "react-native-elements";
import { Divider } from "react-native-elements";

export default function ArticleCard({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ArticleScreen", { id: item._id })}
    >
      <View style={styles.cardContainer}>
        <View style={styles.cardContainerFirstCall}>
          <View style={styles.avatarView}>
            {item.author.account.avatar ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: item.author.account.avatar.secure_url,
                }}
                resizeMode="cover"
              />
            ) : (
              <Avatar
                rounded
                title={item.author.account.username[0].toUpperCase()} // take the inital
                size={30}
                overlayContainerStyle={{
                  backgroundColor: `${COLORS.blueColor}`,
                }}
              />
            )}
            <Text style={styles.author}>{item.author.account.username}</Text>
          </View>
          <View style={styles.containerThumbnail}>
            <View>
              <Text numberOfLines={3} style={styles.textDescription}>
                {item.description}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textDate}>
              {format(Date.parse(item.date), "d MMM yyyy")}
            </Text>
          </View>
          <Text style={styles.textCategory}>{item.category}</Text>
        </View>
        <Image
          style={styles.thumbnail}
          source={{
            uri: item.thumbnail,
          }}
          resizeMode="cover"
        />
      </View>
      <Divider></Divider>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardContainerFirstCall: {
    width: Dimensions.get("window").width * 0.6,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 1000,
  },
  thumbnail: {
    height: "100%",
    borderRadius: 7,
    width: Dimensions.get("window").width * 0.28,
  },
  avatarView: {
    flexDirection: "row",
    alignItems: "center",
  },
  author: {
    marginLeft: 10,
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  containerThumbnail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDescription: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  textDate: {
    color: "#777777",
    fontSize: 14,
    marginTop: 5,
  },
  textCategory: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
    width: 100,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#eee",
    borderRadius: 20,
    textAlign: "center",
  },
});
