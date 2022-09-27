import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from'react-native-maps';

export default function App() {

  const [text, setText] = useState('');
  const [map, setMap] = useState([]);
  const [lat, setLat] = useState(60.201373);
  const [lng, setLng] = useState(24.934041);

  const showMap = () => {
    fetch('https://www.mapquestapi.com/geocoding/v1/address?key=54PPLKB7FdF9fg9z9E8ruZy14MPAPU6S&inFormat=kvp&outFormat=json&location=Ratapihantie+13%2C+00100+Helsinki%2C+Finland&thumbMaps=false')
    .then(response => response.json())
    .then(data => setMap(data.results))
    .catch(error => {
      Alert.alert('Error', error);
    });

    Number(setLat(map.locations.latLng.lat));
    Number(setLng(map.locations.latLng.lng));
}


const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
};


  return (
    <View style={styles.container}>
      <MapView  style={styles.map}
      region={region}>
        <Marker
        coordinate={{
          latitude: lat,
          longitude: lng}}
          title={text}>
        </Marker>
      </MapView>
      <View style={{flex: 1}}>
      <TextInput
      style={styles.input}
      placeholder="Esim. Ratapihantie 13, 00100 Helsinki"
      onChangeText={setText}
      value={text}>
      </TextInput>
      <Button
      style={styles.button}
      title="SHOW"
      onPress={showMap}>
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
