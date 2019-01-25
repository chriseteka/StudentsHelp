import React, { Component } from "react";
import { View, Text, Button } from "react-native";
// import app from "../App";

export class home extends Component {

  botScreen = () => this.props.navigation.navigate("ChatBot");


  render() {
    return (
      <View>
        <Text>This is the Home screen</Text>
        <Button onPress={this.botScreen} title="Assistant_Dru"/>
      </View>
    )
  }
}

export default home;