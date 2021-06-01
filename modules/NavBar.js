import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'
import Bars from '../files/3bar.svg'

const NavButton = (props)=>{
  return(
    <TouchableOpacity onPress={()=>{
    props.changePage(props.goto)
    props.SlideOut()
    }}>
      <View style={styles.MenuButton}><Text style={styles.MenuButtonText}>{props.title}</Text></View>
    </TouchableOpacity>
  )
}

class NavBar extends React.Component
{
  constructor(props) {
    super(props)

    this.state = {menuPos: new Animated.Value(0)}
  }

  SlideIn = ()=>{
    Animated.timing(this.state.menuPos, {
      toValue: menuWidth,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }
  SlideOut = ()=>{
    Animated.timing(this.state.menuPos, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  render()
  {
    return(
      <View>
        <View style={styles.NavBarConatiner}>
          <TouchableOpacity onPress={this.SlideIn}>
            <Bars width = "50" height="50"/>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.MenuContainer,{
          transform: [{translateX: this.state.menuPos}]
        }]}>
          <View style={styles.MenuWindow}>
            <View style={styles.MenuSpacer}/>
            <NavButton goto='Home' SlideOut={this.SlideOut} title='Home' changePage={this.props.changePage}/>
            <NavButton goto='Calander' SlideOut={this.SlideOut} title='Calander' changePage={this.props.changePage}/>
          </View>
          <TouchableWithoutFeedback onPress={this.SlideOut}>
            <View style={styles.MenuSidePanel}/>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    )
  }
}

const menuWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  NavBarConatiner:{
    position: 'relative',
    width: '100%',
    height: 85,
    backgroundColor: '#629677',
    paddingTop: 25,
    paddingLeft: 20,
    zIndex: 100,
    borderColor: "#E1B03D",
    borderBottomWidth: 2
  },
  MenuContainer:
  {
    position: 'absolute',
    top: 0,
    left: menuWidth * -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 100,
    flexDirection: 'row',
  },
  MenuWindow:
  {
    position: "relative",
    backgroundColor: '#629677',
    borderRightWidth: 2,
    borderColor: "#E1B03D",
    flex:4,
    height: '100%',
  },
  MenuSidePanel:{
    position: 'relative',
    height: '100%',
    flex:1,
  },
  MenuSpacer:{
    width: '100%',
    height: 75,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.2)',
  },
  MenuButton:{
    width: '100%',
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.2)',
  },
  MenuButtonText:{
    fontSize: 30,
    color: '#363636',
    fontWeight: '700',
  }
})

export default NavBar
