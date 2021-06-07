import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'

class Calander extends React.Component
{
  constructor(props)
  {
    super(props)

    let date = props.date
    //So I need to map calander days to week names. tbh idk what the new date() data is going to look like so what every
    //this is trash
    let list = []
    for (var i = 0; i < 6; i++) {
      let days = []
      for (var j = 0; j < 7; j++) {
        if(i*7+j+1 <= getDayOfWeek(1,date.getMonth(),date.getFullYear()))
        {

          days.push({
            timeStamp: new Date(date.getYear(),date.getMonth()-1,getDaysInMonth(date.getMonth()-1,date.getFullYear())-getDayOfWeek(1,date.getMonth(),date.getFullYear())+j),
            dayNum:getDaysInMonth(date.getMonth()-1,date.getFullYear())-getDayOfWeek(1,date.getMonth(),date.getFullYear())+j,
            style:styles.offDay,
            month: date.getMonth()-1,
            action: [],
          })
        }
        else if(i*7+j+1-getDayOfWeek(1,date.getMonth(),date.getFullYear()) > getDaysInMonth(date.getMonth(),date.getFullYear()))
        {
            days.push({
              timeStamp: new Date(date.getYear(),date.getMonth()+1,i*7+j+1 - getDayOfWeek(1,date.getMonth(),date.getFullYear()) - getDaysInMonth(date.getMonth(),date.getFullYear())),
              dayNum: i*7+j+1 - getDayOfWeek(1,date.getMonth(),date.getFullYear()) - getDaysInMonth(date.getMonth(),date.getFullYear()),
              style:styles.offDay,
              month: date.getMonth()+1,
              action: [],
            })
        }
        else {
          days.push({
            timeStamp: new Date(date.getYear(),date.getMonth()+1,i*7+j+1 - getDayOfWeek(1,date.getMonth(),date.getFullYear())),
            dayNum: i*7+j+1 - getDayOfWeek(1,date.getMonth(),date.getFullYear()),
            style:styles.Day,
            month: date.getMonth(),
            action: [],
          })
        }
      }
      list.push(days)
    }
    this.state = {calanderList:list, currentDate:date}
    //END OF CONSTRUCTOR
  }

  componentDidMount()
  {
    this.props.activities.forEach((action, i) => {
      AsyncStorage.getItem(`@Fofa:${action.name}`)
        .then(request=>JSON.parse(request))
        .then(data=>{
          if(data!=null)
          {
            this.setState({calanderList:addActivity(this.state.calanderList,data,this.state.currentDate)})
          }
        })
    })
  }

  render()
  {
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
              this.state.calanderList.map(week=>(<View style={styles.Week}>
                {
                  week.map(day=>(<View style={day.style}>
                    {
                      day.action.map(act=>(<View style={[styles.actionMini, {backgroundColor: act.color}]}/>)
                      )
                    }<Text style={styles.DayNumber}>{day.dayNum}</Text></View>)
                  )
                }
                </View>)
              )
            }
          </View>
        </View>
    )
  }
}

const getDaysInMonth = (month,year)=>
{
  return new Date(year, month+1, 0).getDate()
}

const getDayOfWeek = (day, month, year)=>
{
  return new Date(year,month,day).getDay()
}

const addActivity = (list,action,date)=>
{
  action.forEach((item, i) => {
    let time = new Date(item.timeStamp)
    if(time.getMonth() >= list[0][0].month)
    {
      let num = 0;
      if(time.getMonth() > list[0][0].month)
      {
        num += getDayOfWeek(1,date.getMonth()+1,date.getYear())-1
        if(time.getMonth() > date.getMonth())
          num += getDaysInMonth(date.getMonth(),date.getYear())
        num += time.getDate()
      }
      else
        num = getDaysInMonth(list[0][0].month,date.getYear()) - time.getDate() - getDayOfWeek(0,date.getMonth(),date.getYear())
      list[Math.floor(num/7)][num%7].action.push(item)
    }
  });
  return list
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
  },
  DayNumber:{
    position: 'absolute'
  },
  actionMini:{
    flex:1,
    borderColor: '#222',
    borderWidth: .5,
  },
})
