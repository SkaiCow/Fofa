import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'

import ColorBlend from './ColorBlend.js'

const ActivityButton = (props)=>{
  let colorHexSum = parseInt(props.color.substring(1,3),16) + parseInt(props.color.substring(3,5),16) + parseInt(props.color.substring(5,7),16)
  console.log("this is a new Button: " + colorHexSum);
  return(
    <TouchableOpacity>
      <View style={styles.buttonContainer}>
        <View style={[styles.button,{backgroundColor: props.color, borderColor: (colorHexSum > 80)?ColorBlend(-40,props.color):ColorBlend(40,props.color)}]}>
          <Text style={[styles.Text, {color: (colorHexSum > 80)?ColorBlend(-40,props.color):ColorBlend(40,props.color)}]}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default ActivityButton

const styles = StyleSheet.create({
  buttonContainer:{
    width: Dimensions.get('window').width * .5,
    height: Dimensions.get('window').width * .5,
  },
  button:{
    margin: 7,
    flex: 1,
    borderRadius: 4,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text:{
    fontWeight: 'bold',
    fontSize: 20,
  },
})
