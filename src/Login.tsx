import { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";

interface Iprops{
  navigation:any
}

interface IState{
  email:string | null;
  password:string | null;
}


class Login extends Component<Iprops,IState> {
  constructor(props:Iprops){
    super(props)
    this.state ={
        email: '',
        password: ''
      };
  }

  
  handleLogin = async () => {
    const { email, password } = this.state;
  
    try {
      const storedEmail = await AsyncStorage.getItem('Email');
      const storedPassword = await AsyncStorage.getItem('Password');
  
      if (storedEmail && storedPassword) {
        if (email === JSON.parse(storedEmail) && password === JSON.parse(storedPassword)) {
          await AsyncStorage.setItem("Dummy","true")
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert('Invalid credentials');
        }
      } else {
        Alert.alert('No stored credentials found');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('An error occurred');
    }
    this.setState({ email: '', password: '' });
  };
  

  render() {
    const{email,password} = this.state
    console.log(email)
    console.log(password)

    return (
      <View style={styles.mainContainer}>
        <Text style={{textAlign:'center',margin:25,fontSize:25,fontWeight:"900",color:"#000"}}>Login Page</Text>
          <View style={styles.LoginContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#fff"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              style={styles.input}
            />
              <TextInput
              placeholder="Password"
              placeholderTextColor="#fff"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              style={styles.input}
            />
            <View >
                <TouchableOpacity style={styles.button}  onPress={this.handleLogin}>
                  <Text style={{color:'#fff',textAlign:'center'}}>Login</Text>
                </TouchableOpacity>
            </View>
            
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  mainContainer:{
    height:1000,
    padding:55
  },
  LoginContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:60,
    borderRadius:10,
    backgroundColor:'#000'
  },
  input:{
    borderWidth:1,
    borderColor:'#fff',
    width:250,
    margin:10,
    borderRadius:10,
    color:'#fff'
  },
  button:{
    width:250,
    height:40,    
    borderColor:"'#fff",
    borderWidth:1,
    margin:5,
    borderRadius:5,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#4681f4'

  }

})

export default Login