/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ListView, View, ActivityIndicator } from 'react-native';
import Row from './components/row';

// function hasImage(redditData) {
//     return redditData.data.preview.images.length > 0;
//   }

function previewImg(redditData) {
  const imagePreview = redditData.data.preview;
  if (typeof imagePreview === 'undefined') {
    return null;
  }

  const resolutions = imagePreview.images[0].resolutions;
  if (resolutions.length > 0) {
    const thumbnailResolution = resolutions[0];
    const thumbnailImg = {
      imageURL: thumbnailResolution.url.replace(/&amp;/g, '&'),
      width: thumbnailResolution.width,
      height: thumbnailResolution.height
    };
    return thumbnailImg;
  }
}

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
        const topReddits = responseJson.data.children.map(reddit => ({
          title: reddit.data.title,
          thumbnail: previewImg(reddit)
        }));
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
