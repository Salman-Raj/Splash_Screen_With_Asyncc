StoreData = async () => {
  try {
    await AsyncStorage.setItem('Email', JSON.stringify(UserData.email));
    await AsyncStorage.setItem('Password', JSON.stringify(UserData.password));
    
    setTimeout(async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    }, 300);
  } catch (error) {
    console.log('Error storing authentication data:', error);
    // Handle the error appropriately
  }
};








///

const isLoggedIn = async () => {
  try {
    const email = await AsyncStorage.getItem('Email');
    const password = await AsyncStorage.getItem('Password');
    return email && password; // Return true if both email and password exist
  } catch (error) {
    console.log('Error retrieving authentication data:', error);
    return false; // Return false if there's an error or if email or password is missing
  }
};
