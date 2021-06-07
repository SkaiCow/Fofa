import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, Button, AsyncStorage, Picker } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

class DataEntryView extends React.Component {
  constructor(props) {
      super(props)
      this.state = {selectedAct:'Activity', selectedDate: new Date(), showDate:false}

  }

  changeDate = (event, date)=>{
    if(event.type == 'set')
      this.setState({selectedDate: date,showDate:false})
    else
      this.setState({showDate:false})
  }

  submit = ()=>{
    console.log("submit the new data");
  }

  render()
  {
    return (
      <View style={styles.pageConatainer}>
        <View style={styles.entryContainer}>
          {this.state.showDate && (<DateTimePicker value={this.state.selectedDate} onChange={this.changeDate}/>)}
          <View style={styles.selecterContainer}>
            <Picker style={styles.selecter}
              itemStyle={styles.items}
              selectedValue={this.state.selectedAct}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedAct:itemValue})
              }}
            >
              {
                this.props.activityList.map(data=>(<Picker.Item label={data.name} value={data.name} />))
              }
            </Picker>
          </View>
          <View style={styles.dateContainer}>
            <View style={{flex:1, padding:5}}>
              <TouchableOpacity onPress={()=>{this.setState({showDate:true})}}>
                <View style={styles.dateButton}><Text style={styles.dateButtonText}>Select Date</Text></View>
              </TouchableOpacity>
            </View>
            <View style={styles.dateDisplay}><Text>{this.state.selectedDate.toDateString()}</Text></View>
          </View>
          <View style={styles.dateContainer}>
          <View style={{flex:1, padding:5}}>
            <TouchableOpacity onPress={this.submit}>
              <View style={styles.dateButton}><Text style={styles.dateButtonText}>Submit!</Text></View>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
    )
  }
}
export default DataEntryView

const styles = StyleSheet.create({
  pageConatainer:{
    flex: 1,
    overflow: 'hidden',
  },
  entryContainer:{
    flex:1,
    margin: 20,
    backgroundColor: '#629677',
    borderColor: '#E1B03D',
    borderWidth: 2,
    borderRadius: 5,
  },
  selecterContainer:{
    width: '50%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,.3)',
    margin: 20,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth:2,
    borderColor: 'black'
  },
  dateContainer:{
    width: '100%',
    height: 60,
    flexDirection: 'row',
    },
  dateButton:{
    width: '100%',
    height: '100%',
    backgroundColor: '#c4801a',
    borderRadius: 5,
    borderColor: '#E1B03D',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateDisplay:{
    flex:2,
    justifyContent: 'center'
  },
  dateButtonText:{
    fontWeight:'bold',
    color: '#E1B03D'
  }
})
