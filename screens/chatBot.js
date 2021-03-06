import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { DirectLine } from "botframework-directlinejs";

const directLine = new DirectLine({
    secret: "y4utNigYu6g.cwA.uLk.tejbQKMRoxmDWuD99kb4yYopEBL0qtR2hXOL6Yxb6k0"
  });
  const botMessageToGiftedMessage = botMessage => ({
    ...botMessage,
    _id: botMessage.id,
    createdAt: botMessage.timestamp,
    user: {
      _id: 2,
      name: "React Native",
      avatar:
        "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png"
    }
  });
  function giftedMessageToBotMessage(message) {
    return {
      from: { id: 1, name: "John Doe" },
      type: "message",
      text: message.text
    };
  }

class chatBot extends Component {
  state = {
      messages: []
    };
  constructor(props) {
      super(props);
      directLine.activity$.subscribe(botMessage => {
        const newMessage = botMessageToGiftedMessage(botMessage);
        this.setState({ messages: [newMessage, ...this.state.messages] });
      });
    }
  onSend = messages => {
      this.setState({ messages: [...messages, ...this.state.messages] });
      messages.forEach(message => {
        directLine
          .postActivity(giftedMessageToBotMessage(message))
          .subscribe(() => console.log("success"), () => console.log("failed"));
      });
    };
  render() {
      return (
        <View style={styles.container}>
          <GiftedChat
            user={{
              _id: 1
            }}
            messages={this.state.messages}
            onSend={this.onSend}
          />
        </View>
      );
    }
  }

  export default chatBot;

    const styles = StyleSheet.create({
        container: {
          flex: 1
        }
      });