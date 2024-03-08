import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform, PermissionsAndroid ,ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [constituency, setConstituency] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signup pressed');
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Constituency:', constituency);
    console.log('Mobile Number:', mobileNumber);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Admin ID:', adminId);
    console.log('Profile Image:', profileImage);
    console.log('Aadhar Image:', aadharImage);
    console.log('User Type:', userType);
    // Add your signup/authentication logic here (e.g., API calls, authentication services)
  };

  const pickDocument = async (type) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // Specify allowed document types
      });
  
      setFormData(prevState => ({
        ...prevState,
        [type === 'profile' ? 'profileImage' : 'aadharImage']: result.assets[0].uri
      }));

      setErrors(prevErrors => ({ ...prevErrors, [type === 'profile' ? 'profileImage' : 'aadharImage']: false }));
    }
  };

  const validateFields = () => {
    const { name, age, gender,district, constituency, mobileNumber, email, password, adminId, profileImage, aadharImage, aadharNo } = formData;
    const formErrors = {
      name: !name.trim(),
      age: !age.trim(),
      gender: !gender,
      district:!district,
      constituency: !constituency,
      mobileNumber: !mobileNumber.trim(),
      email: !email.trim(),
      password: !password.trim(),
      adminId: formData.userType === 'admin' && !adminId.trim(),
      profileImage: !profileImage,
      aadharImage: !aadharImage,
      aadharNo: !aadharNo.trim() 
    };

   

    setErrors(formErrors);

    return Object.values(formErrors).every(error => !error);
  };

  const renderAdminFields = () => {
    return (
      <TextInput
        style={[styles.input, errors.adminId && styles.errorInput]}
        placeholder="Admin ID"
        value={formData.adminId}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, adminId: text }))}
        placeholderTextColor="black"
      />
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.userAdminButtons}>
        <TouchableOpacity
          style={[styles.userAdminButton, formData.userType === 'user' && styles.activeButton]}
          onPress={() => setFormData(prevState => ({ ...prevState, userType: 'user' }))}
        >
          <Text style={[styles.buttonText, formData.userType === 'user' && styles.activecolor]}>User Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userAdminButton, formData.userType === 'admin' && styles.activeButton]}
          onPress={() => setFormData(prevState => ({ ...prevState, userType: 'admin' }))}
        >
          <Text style={[styles.buttonText, formData.userType === 'admin' && styles.activecolor]}>Admin Signup</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Signup</Text>

      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, name: text }))}
        placeholderTextColor="black"
      />
      
      {formData.userType !== 'user' ? renderAdminFields() : null}

      <TextInput
        style={[styles.input, errors.age && styles.errorInput]}
        placeholder="Age"
        keyboardType="numeric"
        value={formData.age}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, age: text }))}
        placeholderTextColor="black"
      />

<TextInput
  style={[styles.input]}
  placeholder="Aadhar no"
  keyboardType="numeric"
  value={formData.aadharNo}
  onChangeText={(text) => setFormData(prevState => ({ ...prevState, aadharNo: text }))}
  placeholderTextColor="black"
  autoCompleteType="off"
/>

     

      <View style={styles.border}>
        <Picker
          selectedValue={formData.gender}
          style={[styles.input, errors.gender && styles.errorInput]}
          onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, gender: itemValue }))}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.border}>
      <Picker
        selectedValue={formData.district}
        onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, district: itemValue }))}
        

      >
        <Picker.Item label="Select District" value="" />
        {districtList.map((district, index) => ( // Use districtList here
          <Picker.Item key={index} label={district} value={district} />
        ))}
      </Picker>
      </View>


      

      <View style={[styles.border]}>
      <Picker
        selectedValue={formData.constituency}
        onValueChange={(itemValue) => setFormData(prevState => ({ ...prevState, constituency: itemValue }))}

      >
        <Picker.Item label="Select Constituency" value="" />
        {constituenciesList.map((constituency, index) => (
          <Picker.Item key={index} label={constituency} value={constituency} />
        ))}
      </Picker>
      </View>

      <TextInput
        style={[styles.input, errors.mobileNumber && styles.errorInput]}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={formData.mobileNumber}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, mobileNumber: text }))}
        placeholderTextColor="black"
      />



      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text }))}
        placeholderTextColor="black"
      />

      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData(prevState => ({ ...prevState, password: text }))}
        placeholderTextColor="black"
      />

      <TouchableOpacity style={[styles.uploadButton,formData.profileImage  && {backgroundColor:"red"}]} onPress={() => pickImage('profile')}>
        <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
      </TouchableOpacity>
      {errors.profileImage && <Text style={styles.errorText}>Profile image is required</Text>}

      <TouchableOpacity style={[styles.uploadButton,formData.aadharImage && {backgroundColor:"red"}]} onPress={() => pickImage('aadhar')}>
        <Text style={styles.uploadButtonText}>Upload Aadhar Image</Text>
      </TouchableOpacity>
      {errors.aadharImage && <Text style={styles.errorText}>Aadhar image is required</Text>}

      <TouchableOpacity style={[styles.login, !signClick ? { backgroundColor: '#ccc' } : { backgroundColor: 'transparent' }]}  onPress={handleSignup}>
        {!signClick?<Text>Sign up</Text>:<LottieView
       
       autoPlay
       ref={animation}
       style={{
         width: 200,
         height: 250,
       }}
         source={require('../assets/images/loading.json')} 
       />}
        
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop:60
  },
  userAdminButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAdminButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  login: {
    marginTop:4,
    width: setWidth(20),
    justifyContent:'center',
    alignItems: 'center',
    height: 30, 
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:'black'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 18,
    fontSize: 15,
    color:'black'
  },
  errorInput: {
    borderColor: 'red',
  },
  border:{
    color:'grey',
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 0,
    fontSize: 15,
  },
  uploadButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 25,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',

  },
  uploadButtonText: {
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  activecolor:{
    color:'white'
  }
});

export default SignupScreen;
