/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ListView, View, Image, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
});

function hasImage (redditData) {
  return redditData.data.preview.images.length > 0;
}

function previewImg(redditData) {
  const images = redditData.data.preview.images.slice(0);
  const resolutions = images.resolutions.slice(0);
  const urlEncodedString = resolutions.url;
  return urlEncodedString;
}

const Row = props => (
  
  <View style={styles.container}>
    <Text style={styles.text}>
      {`${props.data.title}`}
    </Text>
  </View>
);

class RedditReactReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    return fetch('https://www.reddit.com/top.json')
      .then(response => response.json())
      .then((responseJson) => {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const topReddits = responseJson.data.children;
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(topReddits)
        }, () => {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={data => <Row {...data} />}
        />
      </View>
    );
  }
}

export default RedditReactReader;

AppRegistry.registerComponent('RedditReactReader', () => RedditReactReader);
