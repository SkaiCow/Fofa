import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'

import ColorBlend from './ColorBlend.js'
import Dots3 from '../files/dots3.svg'


const ActivityButton = (props)=>{
  let colorHexSum = parseInt(props.color.substring(1,3),16) + parseInt(props.color.substring(3,5),16) + parseInt(props.color.substring(5,7),16)
  let borderColor = (colorHexSum > 80)?ColorBlend(-40,props.color):ColorBlend(40,props.color)
  return(
    <TouchableOpacity onPress={()=>{props.onPress(props.name)}}>
      <View style={styles.buttonContainer}>
        <View style={[styles.button,{backgroundColor: props.color, borderColor: borderColor}]}>
          <Text style={[styles.Text, {color: borderColor}]}>{props.name}</Text>
          <TouchableOpacity onPress={(event)=>{props.onOptions(event,props.name)}} style={[styles.dots, {color: borderColor}]}>
            <Dots3 fill='currentColor' width='20' height='20'/>
          </TouchableOpacity>
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
  dots:
  {
    position: 'absolute',
    right: 5,
    bottom: 10,
  }
})
