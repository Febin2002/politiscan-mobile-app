import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Api } from '../constants';

const ProjectListScreen = ({ navigation,route }) => {
  
  
  const {data} = route.params
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(`${Api.API_BACKEND}/getByConstituency`, {
          constituency: data.constituency
        });

        console.log(response)
        if (response.status === 200) {
          const { projects } = response.data;
          if (projects && projects.length > 0) {
            setProjects(projects);
          } else {
            Alert.alert('No Projects', 'No projects found for the specified constituency');
            navigation.goBack();
          }
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        Alert.alert('Error', 'Failed to fetch projects. Please try again.');
      }
    };

    fetchProjects();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.projectId.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.projectItem}
            onPress={() => navigation.navigate('projectdetails', { item:item, data:data })}
          > 
          <Text style={styles.projectTitle}>{item.projectId}</Text>
           <Text style={styles.projectTitle}>{item.projectName.trim()}</Text>
           
         
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    padding: 16,
  },
  projectItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ProjectListScreen;
