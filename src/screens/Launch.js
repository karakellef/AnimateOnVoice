import React, { createRef, useEffect } from "react"
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native"

import LottieView from 'lottie-react-native';


const Launch = () => {

  const animationsrc = require('../assets/animation1.json')
  
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.icon} >
        <LottieView 
          ref={ref => {animation = ref;}}
          source={animationsrc} />
      </View >
      <View style={styles.buttons} >
        <Button 
          onPress={() => animation.play()}
          title="Start Animation"/>
        <Button 
          onPress={() => animation.pause()}
          title="Stop Animation"/>
      </View >
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  body: {
      flex: 1,
      backgroundColor: '#fff'
  },
  icon: {
      flex: 0.75,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
  },
  buttons: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff'
  }
});

export default Launch
