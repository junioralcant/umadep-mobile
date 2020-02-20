import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import api from '../../Services/api';

import {Content} from './styles';

export default function Home({navigation}) {
  const [sentBy, setSentBy] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlerSubmit() {
    if (!sentBy || !receivedBy || !message) {
      setError('Preencha todos os campos!');
    } else {
      setLoading(true);
      await api.post('/messags', {
        sentBy,
        receivedBy,
        message,
      });

      setSentBy('');
      setReceivedBy('');
      setMessage('');

      Alert.alert('Recadinho enviado!');
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#fb404b', '#fe9f06']}
      style={styles.linearGradient}>
      <Text
        style={styles.buttonText}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        Deixe seu recado
      </Text>
      {error !== 0 && <Text style={styles.error}>{error}</Text>}
      <Content>
        {loading && <ActivityIndicator color="#650986" />}
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFF"
          placeholder="De"
          value={sentBy}
          onChangeText={setSentBy}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFF"
          placeholder="Para"
          value={receivedBy}
          onChangeText={setReceivedBy}
        />
        <TextInput
          style={styles.inputMessage}
          placeholderTextColor="#FFF"
          multiline={true}
          placeholder="Mensagem"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handlerSubmit} style={styles.button}>
          <Text style={{color: '#FFF'}}>ENVIAR</Text>
        </TouchableOpacity>
      </Content>
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  error: {
    textAlign: 'center',
    color: '#ff99ff',
    fontSize: 18,
    marginHorizontal: 20,
  },

  input: {
    height: 55,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#650986',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
    color: '#FFF',
  },

  inputMessage: {
    height: 100,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#650986',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
    color: '#FFF',
  },

  button: {
    height: 55,
    alignSelf: 'stretch',
    backgroundColor: '#650986',
    borderRadius: 4,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
