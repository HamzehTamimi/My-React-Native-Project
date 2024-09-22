import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import containerStyle from '../styles/containerStyle'
import cardStyle from '../styles/cardStyle'
import searchBarStyle from '../styles/searchBarStyle';
import AddButton from '../components/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/user/userSlice';

export default function HomeScreen({ route, navigation }) {

  const {users} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  
  const renderItem = ({ item }) => {
    return (
      <View style={cardStyle.card}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: `https://avatar.iran.liara.run/public/${item.id}` }}></Image>
        <Text style={{ fontSize: 25, textAlign: "center", paddingBottom: 15 }}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(`UserDetails`, {
            userId: `${item.id}`,
            userData: item
          })}
          style={cardStyle.button}
        >
          <Text style={cardStyle.buttonText}>
            More Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = users?.filter(item =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={containerStyle.container}>
      <TextInput
        style={searchBarStyle.search}
        placeholder="Search User"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        selectionColor="black"
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <AddButton onPress={() => navigation.navigate('AddUser')} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
