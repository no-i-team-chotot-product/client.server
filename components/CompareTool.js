import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { fetchDataAPI } from "../utils/GetAPIFunction";
const widthHeaderLayout = Dimensions.get("window").width / 2;

export default class CompareTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fValue: {},
      sValue: {},
      data: []
    };
  }

  mappingPropertyData = (data1, data2) => {
    const data = [];
    Object.keys(data1.ad_params).forEach(function(key, index) {
      if (key !== "ward" && key !== "area") {
        const value1 = data1.ad_params[key].value
          ? data1.ad_params[key].value
          : "NaN";
        const value2 = data2.ad_params[key].value
          ? data2.ad_params[key].value
          : "NaN";
        data.push({
          id: `${index}${index + 1}`,
          header: key === "region" ? "Khu vực" : data1.ad_params[key].label
        });
        data.push({
          id: `${index}`,
          value1:
            key === "region"
              ? `${data1.ad_params.area.value} ${data1.ad_params.region.value}`
              : value1,
          value2:
            key === "region"
              ? `${data2.ad_params.area.value} ${data2.ad_params.region.value}`
              : value2
        });
      }
    });
    const fData = data1.ad;
    const sData = data2.ad;
    const fValue = {};
    const sValue = {};
    this.setState({
      data: data,
      headerData: [
        {
          id: fData.list_id,
          image: fData.images[0],
          subject: fData.subject,
          price_string: fData.price_string,
          location: `${fData.area_name}, ${fData.region_name}`
        },
        {
          id: sData.list_id,
          image: sData.images[0],
          subject: sData.subject,
          price_string: sData.price_string,
          location: `${sData.area_name}, ${sData.region_name}`
        }
      ]
    });
  };

  async componentDidMount() {
    const { idItem1, idItem2 } = this.props;
    const fValue = await fetchDataAPI(
      `https://gateway.chotot.com/v1/public/ad-listing/${idItem1}`
    );
    const sValue = await fetchDataAPI(
      `https://gateway.chotot.com/v1/public/ad-listing/${idItem2}`
    );
    this.mappingPropertyData(fValue, sValue);
  }

  render() {
    const { data, headerData } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 350 }}>
          <View
            style={{
              width: widthHeaderLayout * 2,
              flexDirection: "row",
              flex: 1
            }}
          >
            {headerData &&
              headerData.map(item => (
                <View
                  style={[
                    styles.imageContent,
                    { borderLeftWidth: 0.5, borderLeftColor: "#DADADA" }
                  ]}
                  key={item.id}
                >
                  <Image
                    source={{
                      uri: item.image
                    }}
                    style={{
                      width: widthHeaderLayout,
                      height: "100%"
                    }}
                  ></Image>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginVertical: 15,
                        textAlign: "center"
                      }}
                      numberOfLines={2}
                    >
                      {item.subject}
                    </Text>
                    <Text
                      style={{
                        color: "#FF0000",
                        fontSize: 19,
                        fontWeight: "600",
                        textAlign: "center"
                      }}
                    >
                      {item.price_string}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.table}>
          <Grid style={styles.grid}>
            <Row style={[styles.center, styles.tableHeader]}>
              <Text>Chi Tiết Sản Phẩm</Text>
            </Row>
            {data &&
              data.map(item => (
                <View key={item.id}>
                  {item.header ? (
                    <Row
                      style={[
                        styles.center,
                        styles.borderRow,
                        {
                          height: 35
                        }
                      ]}
                    >
                      <Text style={styles.headerStyle}>{item.header}</Text>
                    </Row>
                  ) : (
                    <Row style={styles.rowHeight}>
                      <Col
                        style={[
                          styles.center,
                          styles.borderRow,
                          styles.borderRight
                        ]}
                      >
                        <Text
                          style={{
                            marginHorizontal: 5,
                            textAlign: "center"
                          }}
                          numberOfLines={2}
                        >
                          {item.value1}
                        </Text>
                      </Col>
                      <Col style={[styles.center, styles.borderRow]}>
                        <Text
                          style={{
                            marginHorizontal: 5,
                            textAlign: "center"
                          }}
                          numberOfLines={2}
                        >
                          {item.value2}
                        </Text>
                      </Col>
                    </Row>
                  )}
                </View>
              ))}
          </Grid>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rowHeight: {
    height: 45
  },
  headerStyle: {
    color: "#8A8A8A",
    fontWeight: "600",
    fontSize: 16
  },
  imageContent: {
    width: widthHeaderLayout,
    alignItems: "center"
  },
  tableHeader: {
    height: 50,
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  table: {
    marginTop: 100,
    marginHorizontal: 10,
    paddingVertical: 25,
    width: widthHeaderLayout * 2 - 20
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  borderRight: {
    borderRightColor: "#E5E5E5",
    borderRightWidth: 1
  },
  borderRow: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5"
  },
  grid: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    borderRadius: 20,
    shadowOpacity: 0.8
  }
});
