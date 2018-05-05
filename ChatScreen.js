import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import shortid from 'shortid';
import ChatConst from './ChatConst';

export default class ChatScreen extends React.Component {
  mode = null;
  nickname = null;
  chats = null;
  isMountFlag = false

  componentDidMount() {
    this.isMountFlag = true;
    this.nickname = this.props.navigation.state.params.nickname;
    this.mode = this.props.navigation.state.params.mode;
    this.chats = ChatConst.LOVE_CHAT(this.nickname);
    if (this.mode == "work") {
      this.chats = ChatConst.WORK_CHAT(this.nickname);
    }

    this.speakMessageChat(0);
  }

  componentDidUnmount() {
    this.isMountFlag = false;
  }

  speakMessageChat(index) {
    if (!this.isMountFlag) {
      return;
    }

    const speakMsg = this.chats[index];
    this.speakMessage(speakMsg, () => {
      if (this.chats[index + 1]) {
        this.speakMessageChat(index + 1);
      } else {
        this.speakMessageChat(0);
      }
    });
  }

  speakMessage(speakMessage, finishHandler) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: shortid.generate(),
        text: speakMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      })
    }));
    Expo.Speech.speak(speakMessage, {
      language: "ja",
      onDone: () => {
        finishHandler();
      },
      onError: (error) => {
        console.log("error");
        console.log(error);
      }
    });
  }

  componentWillMount() {
    this.setState({ messages: [] })
  }

  onSend(messages = []) {
    if (messages[0] && messages[0].text) {
      this.speakMessage(messages[0].text, () => { });
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderInputToolbar={(toolbar) => { return null; } }
        placeholder="任意の言葉を喋らせよう(変換は未対応です)"
        locale="ja"
        user={{
          _id: 1,
        }}
      />
    )
  }
}