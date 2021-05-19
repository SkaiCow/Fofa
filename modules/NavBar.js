import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native'
import Bars from '../files/3bar.svg'

class NavBar extends React.Component
{
  constructor(props) {
    super(props)

    this.state = {menuPos: new Animated.Value(menuWidth * -1)}
  }

  onPress = ()=>{
    this.SlideIn()
  }

  SlideIn = ()=>{
    Animated.timing(this.state.menuPos, {
      toValue: 0,
      duration: 100
    }).start()
  }

  render()
  {
    return(
      <View>
        <View style={styles.NavBarConatiner}>
          <TouchableOpacity onPress={this.onPress}>
            <Bars width = "50" height="50"/>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.MenuWindow,{
          left: this.state.menuPos
        }]}>
        </Animated.View>
      </View>
    )
  }
}

const menuWidth = Dimensions.get('window').width * .8;

const styles = StyleSheet.create({
  NavBarConatiner:{
    width: '100%',
    height: 85,
    backgroundColor: '#629677',
    paddingTop: 25,
    paddingLeft: 20,
    zIndex: 100,
    borderColor: "#E1B03D",
    borderBottomWidth: 3
  },
  MenuWindow:
  {
    position: "absolute",
    top: 0,
    backgroundColor: '#629677',
    borderRightWidth: 3,
    borderColor: "#E1B03D",
    width: menuWidth,
    height: Dimensions.get('window').height,
    zIndex: 100,
  }
})

export default NavBar
