import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Iprops{
    navigation:any
}

interface IState{
    isSplash:boolean,
    isLogin:boolean,
    dummyValue:string
}

const UserData = {
    email:"msraj9664@gmail.com",
    password:"salman",
}


export class Splash extends Component<Iprops,IState> {
    constructor(props:Iprops){
        super(props)
        this.state = {
            isSplash:true,
            isLogin:false,
            dummyValue:""
        }
    }

    componentDidMount() {
        this.StoreData()
      }

    StoreData= async()=>{
       await AsyncStorage.setItem("Email",JSON.stringify(UserData.email))
       await AsyncStorage.setItem("Password",JSON.stringify(UserData.password))
       let result:any=await  AsyncStorage.getItem("Dummy")
       this.setState({dummyValue:result})
        setTimeout(() => {
            this.setState({isLogin:true})
        }, 300);
    }

    isDummy =()=>{
        const {isLogin,dummyValue} = this.state
        if(dummyValue===null){
           return  this.props.navigation.navigate("Login")
        }else{
            return this.props.navigation.navigate("Home")
        }

    }

  render() {
    const {isLogin}=this.state
    return (
      <View>
        {isLogin ? this.isDummy():
                <View style={styles.container}>
                    <View>
                        <Image style={styles.img} source={{uri:"https://res.cloudinary.com/dqvaejele/image/upload/v1675697098/man_b72s9r.png"}} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:13,fontWeight:'400',color:'#000'}}>from</Text>
                        <Text style={{fontSize:15,fontWeight:'900',color:'#000'}}>S A L M A N</Text>
                    </View>
                </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FECD45',
        height:900,
        flexDirection:'column',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around'
    },
    img:{
        height:100,
        width:100,
    },
    textContainer:{
        flexDirection:'column',
        display:'flex',
        alignItems:'center',

    }

})






export default Splash