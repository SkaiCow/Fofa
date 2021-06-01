import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

import Calander from '../modules/Calander.js'

class CalanderView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount()
  {
    
  }
  render()
  {
    let selectedDate = new Date()
    return(
      <View style={styles.pageConatainer}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{monthNames[selectedDate.getMonth()]}</Text>
        </View>
        <Calander date={selectedDate}/>
      </View>
    )
  }
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

const styles = StyleSheet.create({
  pageConatainer:{
    flex: 1,
    overflow: 'hidden',
  },
  calanderContainer:
  {
    width:'100%',
    height: 6*Dimensions.get('window').width/7,
  },
  Week:
  {
    width: '100%',
    flex:1,
    flexDirection: 'row'
  },
  Day:
  {
    flex:1,
    backgroundColor: '#fff5',
    borderColor: '#444',
    borderWidth: .5,
  },
  titleBox:
  {
    width: '100%',
    height: 40,
    backgroundColor: '#629677',
    paddingLeft: 10
  },
  titleText:
  {
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export default CalanderView
