import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Keyboard, AsyncStorage, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button}  from 'native-base'

export default class EditContact extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      address: '',
      skype: ''
    }
  }
  componentDidMount(){
    const { navigation } = this.props
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam('key', '')
  
      //TODO: call a method to use key
      this.getContact(key)
      
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
    .then(contactjsonString => {
      var contact = JSON.parse(contactjsonString)
      // set key in this object
      contact['key'] = key
      this.setState(contact)
  
    })
    .catch( error => {
      console.log(error)
    })
  }

  updateContact = async key => {
    
    if (
      this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.phone !== '' &&
      this.state.email !== '' &&
      this.state.address !== '' &&
      this.state.skype !== ''

    ) {
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        skype:  this.state.skype
      }

      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
      .then( () => {
        this.props.navigation.goBack()
      }

      )
      .catch( error => {
        console.log(error)
      })
    }

  }


  static navigationOptions = {
    title: "Edit Contact"
}
  render(){
  return (

    <ScrollView style={styles.container}>
    <TouchableWithoutFeedback 
    onPress = { () => {
      Keyboard.dismiss()
    }}
    >
    <View style={styles.container}>
      <Form>
        <Item style ={ styles. inputItem}>
          <Label> First Name</Label>
            <Input 
            autoCorrect= {false}
            autoCapitalize = 'none'
            keyboardType = 'default'
            onChangeText = { fname => this.setState(
              {fname}) }
            value ={
              this.state.fname
            }
            />
        </Item>
        <Item style ={ styles. inputItem}>
          <Label> Last Name</Label>
            <Input 
            autoCorrect= {false}
            autoCapitalize = 'none'
            keyboardType = 'default'
            onChangeText = { lname => this.setState(
              {lname}) }
            value ={
              this.state.lname
            }
            />
        </Item>
        <Item style ={ styles. inputItem}>
          <Label>Phone</Label>
            <Input 
            autoCorrect= {false}
            autoCapitalize = 'none'
            keyboardType = 'default'
            onChangeText = { phone => this.setState(
              {phone}) }
            value ={
              this.state.phone
            }
            />
        </Item>
        <Item style ={ styles. inputItem}>
          <Label>Email</Label>
            <Input 
            autoCorrect= {false}
            autoCapitalize = 'none'
            keyboardType = 'default'
            onChangeText = { email => this.setState(
              {email}) }
            value ={
              this.state.email
            }
            />
        </Item>
        <Item style ={ styles. inputItem}>
          <Label>Address</Label>
            <Input 
            autoCorrect= {false}
            autoCapitalize = 'none'
            keyboardType = 'default'
            onChangeText = { address => this.setState(
              {address}) }
            value ={
              this.state.address
            }
            />
        </Item>
        <Item style ={ styles. inputItem}>
          <Label>Skype </Label>
            <Input 
            autoCorrect= {false}
            autoCapitalize = 'none'
            keyboardType = 'default'
            onChangeText = { skype => this.setState(
              {skype}) }
            value ={
              this.state.skype
            }
            />
        </Item>
      </Form>
      <Button
      full
      rounded
      style = {styles.button}
      onPress= { () => {
        this.updateContact(this.state.key)
      }}
      >
        <Text style = { styles.buttonText}> Update </Text>
      </Button>
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
