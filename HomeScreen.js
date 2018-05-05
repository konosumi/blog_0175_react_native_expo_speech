import React from 'react';
import { Keyboard, Platform, StyleSheet, Picker, Text, Button, TextInput, View, Alert } from 'react-native';
import { Constants } from 'expo';

export default class HomeScreen extends React.Component {
  nickname = null;

  render() {
    return (
      <View style={styles.container}>
        <Text>あなたのニックネームを入力してください</Text>
        <Text> </Text>
        <TextInput
          style={{height: 40, width:200, borderColor:"#dddddd", borderWidth:2, borderRadius:10, padding: 10}}
          placeholder=" ニックネームを入力"
          onChangeText={(text) => { this.nickname = text; }}
        />
        <Text> </Text>
        <Text>シチュエーションを選択してください</Text>
        <Text> </Text>
        <View style={styles.loveButton}>
          <Button
            onPress={(e) => this.onPressButton("love", "恋愛")}
            color={ Platform.OS === 'ios' ? "#000000" : '#FFC0CB'}
            title="恋愛"
          />
        </View>
        <Text> </Text>
        <View style={styles.workButton}>
          <Button
            onPress={(e) => this.onPressButton("work", "仕事")}
            color={ Platform.OS === 'ios' ? "#000000" : '#CC2C37'}
            title="仕事"
          />
        </View>
      </View>
    );
  }

  onPressButton(mode, modeName) {
    if (!this.nickname) {
      Alert.alert('ニックネームを入力してください');
      return;
    }
    Keyboard.dismiss();

    const { navigate } = this.props.navigation;
    navigate('ChatScreen', { mode: mode, modeName: modeName, nickname: this.nickname });
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  loveButton: {
    height: 35,
    width:200,
    backgroundColor: '#FFC0CB',
    borderRadius: 15
  },
  workButton: {
    height: 35,
    width: 200,
    backgroundColor: '#CC2C37',
    borderRadius: 15
  },
});
