import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, AsyncStorage, Pressable } from 'react-native'

const DropDown = (props)=>{
  let newPos= {x:0,y:0}
  if(props.position.x > Dimensions.get('window').width/2)
    newPos = {x:props.position.x-150, y:props.position.y}
  else
    newPos = {x:props.position.x, y:props.position.y}
  if(props.position.y > Dimensions.get('window').height-200)
    newPos.y -= 175
  return(
    <Pressable
    onPress={props.onCancel}
    style={{position: 'absolute',width:'100%',height:'100%', backgroundColor:"#0000"}}>
    <Animated.View style={[styles.dropdownButton, props.style, {left:newPos.x, top:newPos.y}]}>
      <TouchableOpacity onPress={props.onDelete}>
        <View style={styles.entree}>
          <Text>Delete</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
    </Pressable>
  )
}

export default DropDown


const styles = StyleSheet.create({
  dropdownButton:
  {
    position: 'absolute',
    width: 150,
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d1d1d1'
  },
  entree:
  {
    width:'100%',
    height: 40,
    borderBottomWidth:1,
    borderColor: '#d1d1d1',
    justifyContent: 'center',
  }
})
