import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts'

interface Iprops{
  navigation:any

}

interface Istate{
  contacts:any[]
  
}


export class Home extends Component<Iprops,Istate> {
  constructor(props:Iprops){
    super(props)
    this.state={
      contacts:[],
    }
  }


  componentDidMount() {
    this.requestContactsPermission();
  }

  requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll()
            .then(contacts => {
              this.setState({ contacts });
              console.log(contacts[0]);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Contacts permission not required on non-Android platforms');
    }
  };

  logOut=()=>{
    AsyncStorage.removeItem("Dummy")
    this.props.navigation.navigate("Login")
  }

  renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.givenName}</Text>
      {item.phoneNumbers.map((phoneNumber, index) => (
        <Text key={index} style={styles.phoneNumber}>{phoneNumber.number}</Text>
      ))}
    </View>
  );


  render() {
    console.log(this.state.contacts)
    return (
      <View>
          <View style={styles.container}>
            <Text style={{fontSize:20,margin:10,fontWeight:'900',color:"#000"}}>Contacts</Text>
            {/* <Ionicons name="add-circle-outline" size={32} color="#000000" /> */}
            <Ionicons name="exit-outline" size={32} color="#000000" onPress={this.logOut}/>
          </View>
          <View style={styles.contactsContainer}>
            <FlatList
              data={this.state.contacts}
              renderItem={this.renderContact}
              keyExtractor={(item) => item.recordID}
            />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    margin:20
  },
  contactsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
  },

})

export default Home

function then(arg0: Promise<void>) {
  throw new Error('Function not implemented.');
}


function render() {
  throw new Error('Function not implemented.');
}
