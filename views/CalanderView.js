import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

import Calander from '../modules/Calander.js'
import Key from '../files/key.svg'

class CalanderView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {actionList:[]}
  }
  componentDidMount()
  {
    AsyncStorage.getItem('@Fofa:ActivitiesList')
      .then(req=>JSON.parse(req))
      .then(json=>{
        this.setState({actionList:json})
      })
      .catch(error=>{console.log(error)})
  }
  render()
  {
    let selectedDate = new Date()
    console.log(this.state.actionList);
    return(
      <View style={styles.pageConatainer}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{monthNames[selectedDate.getMonth()]}</Text>
        </View>
        <Calander date={selectedDate} activities={this.state.actionList}/>
        <View style={styles.optionBox}>
          <View style={styles.optionButton}>
            <Key width='35' height='35'/>
          </View>
        </View>
        <View style={styles.bottomWindow}>
        {this.state.actionList.map(data=>(<View style={styles.keyListItem}><View style={[styles.colorBubble,{backgroundColor:data.color}]}/><Text style={styles.keyText}>- {data.name}</Text></View>))}

        </View>
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
  },
  optionBox:{
    width: '100%',
    height: 40,
    backgroundColor: '#629677',
    flexDirection: 'row'
  },
  optionButton:{
    flex:1,
    borderColor: 'rgba(0,0,0,.4)',
    borderLeftWidth:2,
    borderTopLeftRadius:5,
    borderRightWidth:2,
    borderTopRightRadius:5,
    borderTopWidth:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomWindow:{
    flex:1,
  },
  keyListItem:{
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomWidth:1,
    borderColor: 'rgba(0,0,0,.3)'
  },
  keyText:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  colorBubble:{
    height: 40,
    width: 40,
    borderRadius: 25,
    borderColor: 'rgba(0,0,0,.4)',
    borderWidth:1,
  }
})

export default CalanderView
