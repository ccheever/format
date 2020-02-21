import React from 'react';
import { A, B, Header, Footer, Main, BR, H1, H2, P } from '@expo/html-elements';
import { Formik, ErrorMessage, setNestedObjectValues } from 'formik';
import { StyleSheet, TextInput } from 'react-native';

export function LoginForm(props, context) {
  return (
    <Main>
      <H1>Format</H1>
      <H2>Sign Up or Login</H2>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values, formikActions) => {
          console.log('Submitted');
        }}>
        {(props) => {
          return (
            <TextInput
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              value={props.values.name}
              autoFocus
              placeholder="E-mail address"
              style={styles.input}
              onSubmitEditing={() => {
                // What happens when you press enter
                // Maybe
                // this.emailInput.focus();
              }}
            />
          );
        }}
      </Formik>
    </Main>
  );
}

let styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
