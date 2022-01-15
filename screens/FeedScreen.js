import React, { useState, useEffect, useRef } from "react";

import ArticleCard from "../components/ArticleCard";
import FooterFlatList from "../components/FooterFlatList";

import { FlatList, View, StyleSheet } from "react-native";

import axios from "axios";
import LottieView from "lottie-react-native";

export default function FeedScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const animation = useRef(null);

  const fetchData = async () => {
    try {
      if (animation.current) {
        animation.current.play();
      }
      const response = await axios.get(
        "https://bioderma-api.herokuapp.com/articles"
      );
      setData(response.data);
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.animationContainer}>
          <LottieView
            ref={animation}
            style={styles.animation}
            source={require("../assets/feedLoader.json")}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => <ArticleCard item={item} />}
          ListFooterComponent={<FooterFlatList />}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 400,
    height: 400,
  },
});
