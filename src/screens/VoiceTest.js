import React, {Component, createRef} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import LottieView from 'lottie-react-native';
import Voice from '@react-native-voice/voice';

const animationsrc = require('../assets/animation1.json');

export default class VoiceTest extends Component {
  state = {
    active: false,
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    this.animation = createRef();
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    this.animation.current.play();
    this.setState({
      started: '√',
    });
  };

  // onSpeechRecognized = e => {
  //   console.log('onSpeechRecognized: ', e);
  //   this.setState({
  //     recognized: '√',
  //   });
  // };

  // onSpeechEnd = e => {
  //   console.log('onSpeechEnd: ', e);
  //   this.setState({
  //     end: '√',
  //   });
  // };

  onSpeechError = e => {
    console.log('errorAnimateOnVoice: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  // onSpeechResults = e => {
  //   console.log('onSpeechResults: ', e);
  //   this.setState({
  //     results: e.value,
  //   });
  // };

  // onSpeechPartialResults = e => {
  //   console.log('onSpeechPartialResults: ', e);
  //   this.setState({
  //     partialResults: e.value,
  //   });
  // };

  onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    if (e.value > 1.8) {
      if (this.state.active) {
        null;
      } else {
        this.animation.current.resume();
        this.setState({
          active: true,
        });
      }
    } else {
      if (this.state.active) {
        this.animation.current.pause();
        this.setState({
          active: false,
        });
      } else {
        null;
      }
    }
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  // _stopRecognizing = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // _cancelRecognizing = async () => {
  //   try {
  //     await Voice.cancel();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      this.animation.current.pause();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.buttons}>
          <Button onPress={() => this._startRecognizing()} title="Start Call" />
          <Button
            onPress={() => {
              this._destroyRecognizer();
            }}
            title="Stop Call"
          />
          <Text>Animation active above: 1.8</Text>
          <Text>Pitch: {this.state.pitch}</Text>
        </View>
        <View style={styles.icon}>
          <LottieView
            ref={this.animation}
            source={animationsrc}
            style={styles.lottie}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: '100%',
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
