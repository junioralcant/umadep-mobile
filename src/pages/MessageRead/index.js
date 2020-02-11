import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import api from '../Services/api';

export default function MessageRead({navigation}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMessages() {
      setLoading(true);
      const response = await api.get('/messags');
      setMessages(response.data);
      setLoading(false);
    }

    loadMessages();
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('@UMADEP:token');
    await AsyncStorage.removeItem('userId');

    navigation.navigate('Home');
  }

  return (
    <LinearGradient
      colors={['#fb404b', '#fe9f06']}
      style={styles.linearGradient}>
      <View style={styles.header}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            navigation.navigate('MessageNotRead');
          }}>
          Não lidas
        </Text>
        <Text style={styles.buttonText} onPress={logout}>
          Sair
        </Text>
        <Text
          style={styles.buttonTextActive}
          onPress={() => {
            navigation.navigate('MessageRead');
          }}>
          Lidas
        </Text>
      </View>

      <ScrollView style={styles.boxMenssage}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          messages.map(message => {
            if (message.read === true) {
              return (
                <View key={message._id} style={styles.boxDadosMessage}>
                  <View style={styles.message}>
                    <Text>De: {message.sentBy}</Text>
                    <Text>Para: {message.receivedBy}</Text>
                    <Text>{message.message}</Text>
                  </View>
                </View>
              );
            }
          })
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
  buttonTextActive: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  boxDadosMessage: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFF',
  },

  boxMenssage: {
    display: 'flex',
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
  },
  message: {
    maxWidth: 330,
  },
});
