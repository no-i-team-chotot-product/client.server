import React, { Component } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { loadingIcon } from "../constants/UrlGetData";
const { width } = Dimensions.get("window");

const url =
  "https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_";

const styles = {
  wrapper: {},

  slide: {
    flex: 1,
    height: 180,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  image: {
    width,
    flex: 1,
    backgroundColor: "transparent",
    alignSelf: "stretch"
  },

  loadingView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.5)"
  },

  loadingImage: {
    width: 60,
    height: 60
  }
};

const Slide = props => {
  return (
    <View style={styles.slide}>
      <Image
        onLoad={props.loadHandle.bind(null, props.i)}
        style={styles.image}
        source={{ uri: props.uri }}
      />
      {!props.loaded && (
        <View style={styles.loadingView}>
          <Image
            style={styles.loadingImage}
            source={{
              uri: loadingIcon
            }}
          />
        </View>
      )}
    </View>
  );
};

export default class SlidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        `${url}1565608867675.jpg`,
        `${url}1566292522063.jpg`,
        `${url}1566293185251.jpg`,
        `${url}1564111472982.jpg`
      ],
      loadQueue: [0, 0, 0, 0]
    };
    this.loadHandle = this.loadHandle.bind(this);
  }
  loadHandle(i) {
    let loadQueue = this.state.loadQueue;
    loadQueue[i] = 1;
    this.setState({
      loadQueue
    });
  }
  render() {
    const { data } = this.props;
    let dataPanel = data ? data : this.state.imgList;
    return (
      <View style={{ flex: 1, height: 130 }}>
        <Swiper
          loadMinimal
          loadMinimalSize={1}
          style={styles.wrapper}
          loop={true}
          dotColor={"grey"}
          autoplay={true}
          autoplayTimeout={3}
          automaticallyAdjustContentInsets={true}
        >
          {dataPanel.map((item, i) => (
            <Slide
              loadHandle={this.loadHandle}
              loaded={!!this.state.loadQueue[i]}
              uri={item.mobileImage}
              i={i}
              key={i}
            />
          ))}
        </Swiper>
      </View>
    );
  }
}
