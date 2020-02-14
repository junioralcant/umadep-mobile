import React, {useState, useEffect} from 'react';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../Services/api';

import {Content} from './styles';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userId').then(userId => {
      if (userId) {
        navigation.navigate('MessageNotRead', {userId});
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSignInPress() {
    if (email.length === 0 || password.length === 0) {
      setError('Preencha usuário e senha para continuar!');
    } else {
      try {
        const response = await api.post('/sessions', {
          email,
          password,
        });

        await AsyncStorage.setItem('@UMADEP:token', response.data.token);
        await AsyncStorage.setItem('userId', response.data.user._id);
        const resetAction = NavigationActions.navigate({
          routeName: 'MessageNotRead',
        });

        navigation.dispatch(resetAction);
      } catch (_err) {
        setError('Houve um problema com o login, verifique suas credenciais!');
      }
    }
  }

  return (
    <LinearGradient
      colors={['#fb404b', '#fe9f06']}
      style={styles.linearGradient}>
      <Text
        style={styles.buttonText}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        Login
      </Text>
      {error !== 0 && <Text style={styles.error}>{error}</Text>}
      <Content>
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFF"
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFF"
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={handleSignInPress} style={styles.button}>
          <Text style={{color: '#FFF'}}>ENTRAR</Text>
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
    color: '#FFF',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
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

  error: {
    textAlign: 'center',
    color: '#ff99ff',
    fontSize: 18,
    marginHorizontal: 20,
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
