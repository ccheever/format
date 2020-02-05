import { AsyncStorage } from 'react-native';
import * as AppAuth from 'expo-app-auth';

let config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  /* This is the CLIENT_ID generated from a Firebase project */
  clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
};

let StorageKey = '@PillarValley:GoogleOAuthKey';

export async function signIn() {
  let authState = await AppAuth.authAsync(config);
  await cacheAuth(authState);
  console.log('signInAsync', authState);
  return authState;
}

function cacheAuth(authState) {
  return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuth() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuth', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuth(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuth({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuth(authState);
  return authState;
}

export async function signOut({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}


