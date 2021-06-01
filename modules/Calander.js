import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

const Calander = (props)=>{
  let date = props.date
  //So I need to map calander days to week names. tbh idk what the new date() data is going to look like so what every
  //this is trash
  let calanderList = []
  for (var i = 0; i < 6; i++) {
    let days = []
    for (var j = 0; j < 7; j++) {
      if(i*7+j+1 <= getDayOfWeek(1,date.getMonth(),date.getFullYear()))
      {

        days.push({
          dayNum:getDaysInMonth(date.getMonth()-1,date.getFullYear())-getDayOfWeek(1,date.getMonth(),date.getFullYear())+j,
          style:styles.offDay
        })
      }
      else if(i*7+j+1-getDayOfWeek(1,date.getMonth(),date.getFullYear()) > getDaysInMonth(date.getMonth(),date.getFullYear()))
      {
          days.push({
            dayNum: i*7+j+1 - getDayOfWeek(1,date.getMonth(),date.getFullYear()) - getDaysInMonth(date.getMonth(),date.getFullYear()),
            style:styles.offDay
          })
      }
      else {
        days.push({
          dayNum: i*7+j+1 - getDayOfWeek(1,date.getMonth(),date.getFullYear()),
          style:styles.Day
        })
      }

    }
    calanderList.push(days)
  }
  return(
      <View>
        <View style={styles.labelContainer}>
          <View style={styles.label}><Text style={styles.labelText}>SUN</Text></View>
          <View style={styles.label}><Text style={styles.labelText}>MON</Text></View>
          <View style={styles.label}><Text style={styles.labelText}>TUE</Text></View>
          <View style={styles.label}><Text style={styles.labelText}>WED</Text></View>
          <View style={styles.label}><Text style={styles.labelText}>THU</Text></View>
          <View style={styles.label}><Text style={styles.labelText}>FRI</Text></View>
          <View style={styles.label}><Text style={styles.labelText}>SAT</Text></View>
        </View>
        <View style={styles.calanderContainer}>
        {
            calanderList.map(week=>(<View style={styles.Week}>
              {
                week.map(day=>(<View style={day.style}><Text>{day.dayNum}</Text></View>))
              }
              </View>)
            )
          }
        </View>
      </View>
  )
}

const getDaysInMonth = (month,year)=>
{
  return new Date(year, month+1, 0).getDate()
}

const getDayOfWeek = (day, month, year)=>
{
  return new Date(year,month,day).getDay()
}

export default Calander

const styles = StyleSheet.create({
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
  offDay:
  {
    flex:1,
    backgroundColor: '#aaa5',
    borderColor: '#222',
    borderWidth: .5,
  },
  labelContainer:
  {
    width: '100%',
    height: 15,
    flexDirection: 'row',
  },
  label:
  {
    flex:1,
    borderColor: '#222',
    borderWidth: .5,
  },
  labelText:
  {
    fontSize: 10,
    alignSelf: 'center'
  }
})
