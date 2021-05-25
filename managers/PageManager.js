import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//inport mudules
import ButtonHomeView from '../views/ButtonHomeView.js'


class PageManager extends React.Component
{
  constructor(props){
    super(props)
    this.state={}
  }
  render()
  {
    return(
    <View style={styles.Container}>
      <ButtonHomeView/>
    </View>
  );
  }
}

export default PageManager

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor: "#AFE3C0",
  },
})
