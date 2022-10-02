import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from'react-native-maps';
import * as Location from'expo-location';

export default function App() {

const initial = {
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221
};

const [region, setRegion] = useState(initial);
const [address, setAddress] = useState('');

const fetchCoordinates = async (address) => {
  const KEY = "54PPLKB7FdF9fg9z9E8ruZy14MPAPU6S";
  const url = 'http://www.mapquestapi.com/geocoding/v1/address?key='+KEY+'&location='+address;

  try{
    const response = await fetch(url);
    const data = await response.json();

    const { lat, lng } = data.results[0].locations[0].latLng;
    console.log(lat, lng);
    setRegion({...region, latitude: lat, longitude: lng})
  }
  catch (error){
    console.log('haku epäonnistui', error.message);
  }
  keybpard.dismiss();
}

  return (
    <View style={styles.container}>
      <MapView  style={styles.map}
      region={region}>
        <Marker
        coordinate={region}>
        </Marker>
      </MapView>
      <View style={{flex: 1}}>
      <TextInput
      style={styles.input}
      placeholder="Esim. Ratapihantie 13, 00100 Helsinki"
      value={address}
      onChangeText={text => setAddress(text)}
      >
      </TextInput>
      <Button
      style={styles.button}
      title="SHOW"
      onPress={() => fetchCoordinates(address)}>
      </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{

  },
  input: {
    borderBottomWidth:1,
    padding: 10,
    margin: 12,
    width: 300,

  },
  map: {
    flex: 4,
    width: "100%", 
    height: "100%",
  },
});
