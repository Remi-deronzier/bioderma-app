import React from "react";

import { COLORS } from "../assets/ressources/constants";
import { displayStars } from "../assets/helpers/helpers";
import { getAverage } from "../assets/helpers/helpers";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useNavigation } from "@react-navigation/core";

export default function ProductCard({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Product", { id: item._id })}
    >
      <ImageBackground
        source={{ uri: item?.images[0] }}
        style={styles.image}
        backgroundColor={`${COLORS.grayColor}`}
        resizeMode="contain"
      >
        <View style={styles.priceView}>
          <Text style={styles.textPrice}>{item.price} €</Text>
        </View>
      </ImageBackground>
      <View style={styles.roomDetail}>
        <View style={styles.firstCall}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.viewStarsAndReviews}>
            {displayStars(getAverage(item.rating_values))}
            <Text style={styles.textReview}>
              {item.number_of_reviews ?? ""} reviews
            </Text>
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.textCategory}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  image: {
    height: 250,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  priceView: {
    height: 50,
    width: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textPrice: {
    color: "#fff",
    fontSize: 20,
  },
  textTitle: {
    fontSize: 20,
  },
  textCategory: {
    color: "white",
  },
  category: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${COLORS.blueColor}`,
    borderRadius: 10,
  },
  roomDetail: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: `${COLORS.grayColor}`,
    borderBottomWidth: 1,
  },
  firstCall: {
    width: "70%",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  textReview: {
    color: `${COLORS.grayColor}`,
    marginLeft: 10,
  },
  viewStarsAndReviews: {
    flexDirection: "row",
    alignItems: "center",
  },
});
