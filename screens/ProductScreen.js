import React, { useState, useEffect, useCallback } from "react";

import Header from "../components/Header";

import { COLORS } from "../assets/ressources/constants";
import { TEXT_DESCRIPTION } from "../assets/ressources/constants";
import { displayStars } from "../assets/helpers/helpers";
import { getAverage } from "../assets/helpers/helpers";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [pharmacyData, setPharmacyData] = useState([]);
  const [isRevealedDescription, setIsRevealedDescription] = useState(false);
  const [isDescriptionTooLong, setIsDescriptionTooLong] = useState(false);

  const id = route.params.id;

  const myLayout = useCallback((e) => {
    setIsDescriptionTooLong(
      e.nativeEvent.lines.length > TEXT_DESCRIPTION.numberOfLine
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProduct = await axios.get(
          `https://bioderma-api.herokuapp.com/product/${id}`
        );
        setProductData(responseProduct.data.data);
        const responsePharmacy = await axios.get(
          `https://bioderma-api.herokuapp.com/pharmacies/product/${id}`
        );
        setPharmacyData(responsePharmacy.data.pharmacies);
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <Header goBackButton={true} />
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={`${COLORS.blueColor}`}
            style={styles.containerLoader}
          />
        ) : (
          <>
            <View style={styles.caroussel}>
              <SwiperFlatList
                autoplay={true}
                autoplayDelay={5}
                autoplayLoop={true}
                data={productData.images}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={styles.image}
                    resizeMode="contain"
                    // backgroundColor="#2485C4"
                  />
                )}
              />
              <View style={styles.priceView}>
                <Text style={styles.textPrice}>{productData.price} €</Text>
              </View>
            </View>
            <View style={styles.roomDetail}>
              <View style={styles.firstCall}>
                <View style={styles.rateAndTitle}>
                  <Text style={styles.textTitle} numberOfLines={1}>
                    {productData.name}
                  </Text>
                  <View style={styles.viewStarsAndReviews}>
                    {displayStars(getAverage(productData.rating_values))}
                    <Text style={styles.textReview}>
                      {productData.number_of_reviews} reviews
                    </Text>
                  </View>
                </View>
                <View style={styles.category}>
                  <Text style={styles.textCategory}>
                    {productData.category}
                  </Text>
                </View>
              </View>
              <Text
                onTextLayout={(e) => myLayout(e)}
                numberOfLines={
                  !isRevealedDescription ? TEXT_DESCRIPTION.numberOfLine : null
                }
              >
                {productData.description}
              </Text>
              <View style={styles.containerDescription}>
                {isDescriptionTooLong &&
                  (!isRevealedDescription ? (
                    <TouchableOpacity
                      style={styles.buttonHideAndShow}
                      onPress={() => setIsRevealedDescription(true)}
                    >
                      <Text style={styles.textShowAndHide}>Show More</Text>
                      <MaterialIcons
                        name="expand-more"
                        size={24}
                        color={`${COLORS.grayColor}`}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.buttonHideAndShow}
                      onPress={() => setIsRevealedDescription(false)}
                    >
                      <Text style={styles.textShowAndHide}>Show less</Text>
                      <MaterialIcons
                        name="expand-less"
                        size={24}
                        color={`${COLORS.grayColor}`}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 48.901400579156395,
                longitude: 2.238573805330057,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
            >
              {pharmacyData.map((marker) => {
                return (
                  <Marker
                    key={marker._id}
                    coordinate={{
                      latitude: marker.pharmacy.gps_location.latitude,
                      longitude: marker.pharmacy.gps_location.longitude,
                    }}
                  >
                    <Callout style={styles.test} onPress={() => {}}>
                      <View style={styles.containerTooltip}>
                        <Text style={styles.rentalName}>
                          {marker.pharmacy.name}
                        </Text>
                        <Text numberOfLines={1}>
                          {marker.pharmacy.description}
                        </Text>
                      </View>
                    </Callout>
                  </Marker>
                );
              })}
            </MapView>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    justifyContent: "flex-end",
    width,
    height: 300,
    marginBottom: 10,
  },
  priceView: {
    height: 50,
    width: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "absolute",
    bottom: 10,
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
  textPrice: {
    color: "#fff",
    fontSize: 20,
  },
  rentalName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textTitle: {
    fontSize: 20,
  },
  roomDetail: {
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
  },
  firstCall: {
    marginBottom: 30,
    flexDirection: "row",
  },
  rateAndTitle: {
    width: "70%",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  textReview: {
    color: `${COLORS.grayColor}`,
    marginLeft: 10,
  },
  containerDescription: {
    marginBottom: 30,
  },
  viewStarsAndReviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonHideAndShow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  textShowAndHide: {
    color: `${COLORS.grayColor}`,
  },
  caroussel: {
    position: "relative",
  },
  containerLoader: {
    backgroundColor: "#fff",
    marginTop: Dimensions.get("window").height / 2,
    transform: [
      {
        translateY: -100,
      },
    ],
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
