import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  text: {
    marginLeft: 2,
    fontSize: 16
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});

const Row = (props) => {

  console.log(props);

  if (props.thumbnail == null || typeof props.thumbnail === 'undefined') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {`${props.title}`}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: props.thumbnail.width, height: props.thumbnail.height }}
        source={{ uri: props.thumbnail.imageURL }}
      />
      <Text style={styles.text}>
        {`${props.title}`}
      </Text>
    </View>
  );
};

export default Row;
