import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//inport mudules


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
      <Text>hey</Text>
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
