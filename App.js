import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

function AddContactScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const contact = {
        [Contacts.Fields.FirstName]: firstName,
        [Contacts.Fields.LastName]: lastName,
        [Contacts.Fields.PhoneNumbers]: [
          {
            label: 'mobile',
            number: phoneNumber,
          },
        ],
      };

      try {
        await Contacts.addContactAsync(contact);
        console.log('Contact added successfully!');
        // You can navigate to another screen or perform further actions here
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    } else {
      console.log('Permission to write contacts denied.');
      // Handle the case where permission is denied
    }
  };

  return (
    <View style={styles.container}>
      {/* User interface elements for input */}
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={text => setLastName(text)}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />

      <Button title="Add Contact" onPress={handleAddContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default AddContactScreen;
