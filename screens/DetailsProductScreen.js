import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import SuggestProductPanel from "../components/SuggestProductPanel";
import { getDetailProductUrl, getSimilarProductUrl } from "../utils/FullApi";
import { parsingNumberToDateTime } from "../utils/FunctionUtils";
import Footer from "../components/Footer";
import ViewMore from "../components/ViewMore";
import HeaderComponent from "../components/HeaderComponent";
import { NavigationActions } from "react-navigation";

const { width: screenWidth } = Dimensions.get("window");

export default class DetailsProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: this.props.navigation.state.params
        ? this.props.navigation.state.params.itemId
        : "36617361",
      //itemId: "36617361",
      data: {},
      suggestData: []
    };
  }

  fetchSuggestData = ad_id => {
    return fetch(`${getSimilarProductUrl}${ad_id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  };

  fetchData() {
    return fetch(`${getDetailProductUrl}${this.state.itemId}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.fetchData().then(data => {
      this.setState({ data }, () => {
        console.log(data.ad.ad_id);

        console.log(`${getSimilarProductUrl}${data.ad.ad_id}`);
        this.fetchSuggestData(data.ad.ad_id).then(suggestData => {
          this.setState({ suggestData: suggestData }, () => {
            this.setState({ loading: false });
          });
        });
      });
    });
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  }

  sliderProductImage(data) {
    return (
      <View style={styles.sliderProductImage}>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={data}
          renderItem={this._renderItem}
          hasParallaxImages={true}
        />
      </View>
    );
  }

  goBackAction = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { data, itemId, suggestData } = this.state;
    //console.log(suggestData)
    const productDetails = data.ad;
    const layoutDetails = productDetails ? (
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {this.sliderProductImage(productDetails.images)}
        <View style={styles.content}>
          <View style={styles.titleProduct}>
            <Text style={styles.subject}>{productDetails.subject}</Text>
            <View style={styles.subTitle}>
              <View styles={styles.inforProduct}>
                <Text style={styles.price}>{productDetails.price_string}</Text>
                <Text style={{ marginLeft: 6, color: "rgba(0, 0, 0, 0.7)" }}>
                  {productDetails.date}
                </Text>
              </View>
              <View style={styles.markAsLike}>
                <TouchableOpacity style={styles.buttonMarkLike}>
                  <Text style={{ color: "#FF2D55" }}>Lưu tin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.ownerContent}>
            <View style={styles.childOwnerContent}>
              <View style={styles.containerChildOwnerContent}>
                <Image
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                  source={{
                    uri: productDetails.avatar
                  }}
                  resizeMethod="auto"
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.account_name}>
                    {productDetails.account_name}
                  </Text>
                  <Text style={{ color: "#C4C4C4" }}>20 phút trước</Text>
                </View>
              </View>
              <View>
                <View style={styles.markAsLike}>
                  <TouchableOpacity
                    style={[styles.buttonMarkLike, styles.viewPage]}
                  >
                    <Text style={{ color: "#FFB900", fontSize: 8 }}>
                      Xem trang
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 15
              }}
            >
              <View style={styles.itemOwner}>
                <Text style={styles.titleItemOwner}>Cá nhân</Text>
                <MaterialIcons name="person" size={25} color="black" />
              </View>
              <View style={styles.itemOwner}>
                <Text style={styles.titleItemOwner}>Đánh giá</Text>
                <Text style={styles.bodyItemOwner}> - - - </Text>
              </View>
              <View style={styles.itemOwner}>
                <Text style={styles.titleItemOwner}>Phản hồi chat</Text>
                <Text style={styles.bodyItemOwner}> 79% </Text>
              </View>
            </View>
          </View>
          <View style={[styles.ownerContent, { marginTop: 10 }]}>
            <View style={styles.specifications}>
              <Text style={styles.specificationsTitle}>
                Thông số kỹ thuật:{" "}
              </Text>
              <View styles={styles.specificationsDetails}>
                <View style={styles.specificationItem}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "https://st.chotot.com/storage/icons/logos/ad-param/mobile_brand.png"
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <Text style={{ marginLeft: 5 }}> Hãng: Apple </Text>
                </View>
                <View style={styles.specificationItem}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "https://st.chotot.com/storage/icons/logos/ad-param/mobile_brand.png"
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <Text style={{ marginLeft: 5 }}> Dòng máy: Apple </Text>
                </View>
                <View style={styles.specificationItem}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "https://st.chotot.com/storage/icons/logos/ad-param/mobile_brand.png"
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <Text style={{ marginLeft: 5 }}> Tình trạng: Apple </Text>
                </View>
                <View style={styles.specificationItem}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "https://st.chotot.com/storage/icons/logos/ad-param/mobile_brand.png"
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <Text style={{ marginLeft: 5 }}> Tình trạng: Apple </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.ownerContent}>
              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={[styles.specificationsTitle, { marginVertical: 10 }]}
                >
                  Địa điểm:{" "}
                </Text>
                <View style={styles.area}>
                  <MaterialIcons
                    name="my-location"
                    size={25}
                    color="black"
                    style={{ marginHorizontal: 10 }}
                  />
                  <Text style={{ fontSize: 15 }}>
                    {`${productDetails.area_name}, ${productDetails.region_name}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.ownerContent}>
              <View style={styles.directionContent}>
                <ViewMore content={productDetails.body} />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Chia sẻ tin này cho bạn bè
            </Text>
            <View style={styles.imageShareGroup}>
              <Image
                source={require("../assets/shareGroup.png")}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        {suggestData && (
          <SuggestProductPanel
            isCompareIcon={true}
            listSuggestProduct={suggestData}
            suggestProductClick={(list_id) => () => {
              this.props.navigation.navigate("CompareTool", {
                value1: itemId,
                value2: list_id ? list_id : 63642525
              });
            }}
          />
        )}
      </ScrollView>
    ) : (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#FFD700" />
      </View>
    );
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.25 }}>
          <HeaderComponent handleGoBack={this.goBackAction} />
        </View>
        <View style={{ flex: 8 }}>{layoutDetails}</View>
        <View style={{ flex: 1 }}>
          <Footer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  price: {
    color: "#FF0000",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10
  },
  area: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    marginRight: 20,
    marginLeft: 10,
    marginBottom: 10
  },
  account_name: {
    fontWeight: "500",
    fontSize: 17,
    paddingBottom: 7
  },
  imageShareGroup: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8
  },
  subject: {
    fontSize: 21,
    fontWeight: "500",
    marginLeft: 7
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 150
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  specificationsTitle: {
    fontWeight: "500",
    fontSize: 15
  },
  viewPage: {
    marginVertical: 0,
    borderRadius: 20,
    width: 60,
    height: 30,
    borderColor: "#FFB900"
  },
  specificationItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5
  },
  childOwnerContent: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  },
  titleProduct: {},
  subTitle: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between"
  },
  specifications: {
    marginVertical: 5,
    marginHorizontal: 10
  },
  ownerContent: {
    borderWidth: 0.3,
    borderColor: "#E5E5E5",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  content: {
    marginHorizontal: 10
  },
  containerChildOwnerContent: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start"
  },
  buttonMarkLike: {
    borderColor: "#FF2D55",
    borderWidth: 1,
    borderRadius: 30,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18
  },
  itemOwner: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleItemOwner: {
    color: "#C4C4C4"
  },
  bodyItemOwner: {
    fontWeight: "500",
    fontSize: 18
  },
  directionContent: {
    margin: 10
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});
