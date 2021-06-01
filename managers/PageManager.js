import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//inport mudules
import ButtonHomeView from '../views/ButtonHomeView.js'
import CalanderView from '../views/CalanderView.js'
import NavBar from '../modules/NavBar.js'


class PageManager extends React.Component
{
  constructor(props){
    super(props)
    this.state={currentPage:this.pageSelecter('Home')}

  }
  componentDidMount()
  {
    this.changePage('Home')
  }
  pageSelecter(name)
  {
    switch (name) {
      case 'Home':
        return <ButtonHomeView/>
        break;
      case 'Calander':
        return <CalanderView/>
        break;
    }
  }
  changePage = (name)=>
  {
    //use this as a public method for changing Views
    this.setState({currentPage:this.pageSelecter(name)})
  }
  render()
  {
    return(
    <View style={styles.Container}>
      <NavBar changePage={this.changePage}/>
      {this.state.currentPage}
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
