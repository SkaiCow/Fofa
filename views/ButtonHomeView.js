import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, TextInput, Button, AsyncStorage } from 'react-native'
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'

import ActivityButton from '../modules/ActivityButton.js'
import Plus from '../files/plus.svg'
import Exit from '../files/exit.svg'

class ButtonHomeView extends React.Component{
  constructor(props) {
    super(props)
    this.state = {visableAddAct: false, ButtonList: []}
    this.colorPicked = '#ff0000'
    this.namePicked = '';
  }

  actAdded = async (event)=>{
    try {
      let currentList = await JSON.parse(await AsyncStorage.getItem('@Fofa:ActivitiesList'));

      console.log(`${this.colorPicked}, ${this.namePicked}`);
      if(currentList==null)
        currentList = [{id:0,color:this.colorPicked,name:this.namePicked,timeStamp:new Date()}]
      else
        currentList.push({id:currentList.length,color:this.colorPicked,name:this.namePicked,timeStamp:new Date()})
      console.log(currentList);
      await AsyncStorage.setItem('@Fofa:ActivitiesList',await JSON.stringify(currentList))
      this.namePicked = ''
      this.colorPicked = '#ff0000'
      this.setState({visableAddAct:false})
    } catch (e) {
        alert(e)
    }
  }

  componentDidMount()
  {
    this._mounted = true
    AsyncStorage.getItem('@Fofa:ActivitiesList')
      .then(req=>JSON.parse(req))
      .then(json=>{
        if(this._mounted)
          this.setState({ButtonList:json})
      })
      .catch(error=>{console.log(error);})
  }
  componentDidUpdate(prevProps, prevState)
  {
    AsyncStorage.getItem('@Fofa:ActivitiesList')
      .then(req=>JSON.parse(req))
      .then(json=>{
        //WARNING: So Instead of comparing the 2 arrays for differences, I just chacked there length. This could be a bug in some way but IDC for now.
        if(prevState.ButtonList.length != json.length)
        {
          this.setState({ButtonList:json})
        }
      })
      .catch(error=>{console.log(error)})
  }
  componentWillUnmount()
  {
    this._mounted = false
  }

  render()
  {
    return(
      <View style={styles.pageConatainer}>
      <TouchableOpacity onPress={()=>{this.setState({visableAddAct:true})}}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Activities</Text>
          <Plus width='30' height='30' style={styles.plus}/>
        </View>
      </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.ButtonListContainer}>
          {this.state.ButtonList.map(data=>(<ActivityButton color={data.color} name={data.name} key={data.id.toString()}/>))}
        </ScrollView>
        {(this.state.visableAddAct)?(
          <View style={styles.shadeWindow}>
            <View style={styles.AddActivitiesContainer}>
              <View style={styles.titleBox}>
                <Text style={styles.labelText}>Add Activity</Text>
                <TouchableOpacity onPress={()=>{this.setState({visableAddAct:false})}}  style={styles.exit}>
                  <Exit width='30' height='30'/>
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.bodyBox}>
                <TextInput placeholder="Activity Name" style={styles.Input} onChangeText={(name)=>{this.namePicked=name}}/>
                <TriangleColorPicker
                 onColorChange={color => {this.colorPicked = fromHsv({ h: color.h, s: color.s, v:color.v })}}
                 style={styles.colorPicker}
                 />
              </ScrollView>
              <View style={styles.buttonBox}>
                <Button title='Add' color='#E1B03D' onPress={this.actAdded}/>
              </View>
            </View>
          </View>):null}

      </View>
    )
  }
}

export default ButtonHomeView

const styles = StyleSheet.create({
  pageConatainer:{
    flex: 1,
    overflow: 'hidden',
  },
  label:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.25)'
  },
  labelText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#629677'
  },
  ButtonListContainer:{
      flexDirection:'row',
      flexWrap: 'wrap',
      width:'100%',
  },
  plus:{
    position:'absolute',
    right: 10
  },
  shadeWindow:{
    position: 'absolute',
    top:0,
    left:0,
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.8)',
    zIndex: 200,
    justifyContent:'center',
    alignItems: 'center',
  },
  AddActivitiesContainer:
  {
    backgroundColor: "#AFE3C0",
    width: '95%',
    height: '70%',
    borderRadius: 5,
  },
  titleBox:{
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 10
  },
  bodyBox:{
    height: '100%',
    width: '100%',
  },
  buttonBox:{
    height: '10%',
    width: '100%',
    alignSelf: 'flex-end',
  },
  Input:{
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#0002',
    margin:10,
    padding: 5
  },
  colorPicker:{
    width: '75%',
    height: '75%',
    alignSelf: 'center',
  },
  exit:{
    position: 'absolute',
    right: 10,
  },
})
