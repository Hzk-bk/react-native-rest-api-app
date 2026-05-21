import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';

export default function App() {

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const [filterUserId, setFilterUserId] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const fetchPosts = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {

    if (!title || !body || !userId) {

      Alert.alert(
        'Validation Error',
        'Please fill all fields'
      );

      return;
    }

    try {

      setSuccessMessage('');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            title: title,
            body: body,
            userId: Number(userId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();

      setSuccessMessage(
        `Post created successfully! New ID: ${data.id}`
      );

      setTitle('');
      setBody('');
      setUserId('');

    } catch (err) {

      Alert.alert(
        'Error',
        err.message
      );
    }
  };

  const filterPosts = () => {

    if (filterUserId.trim() === '') {

      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(
      (post) =>
        String(post.userId) === filterUserId.trim()
    );

    setFilteredPosts(filtered);
  };

  const showPostDetails = (post) => {

    Alert.alert(
      'Post Details',
      `ID: ${post.id}

User ID: ${post.userId}

Title:
${post.title}

Body:
${post.body}`
    );
  };

  const renderItem = ({ item }) => (

    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        }
      ]}
      onPress={() => showPostDetails(item)}
    >

      <View style={styles.card}>

        <Text style={styles.postId}>
          User ID: {item.userId}
        </Text>

        <Text style={styles.postTitle}>
          {item.title}
        </Text>

        <Text style={styles.postBody}>
          {item.body}
        </Text>

        <Text style={styles.tapText}>
          Tap to view details
        </Text>

      </View>

    </Pressable>
  );

  if (loading) {

    return (

      <SafeAreaView style={styles.centered}>

        <ActivityIndicator size="large" />

        <Text style={{ marginTop: 10 }}>
          Loading posts...
        </Text>

      </SafeAreaView>
    );
  }

  if (error) {

    return (

      <SafeAreaView style={styles.centered}>

        <Text style={styles.errorText}>
          Error: {error}
        </Text>

        <Button
          title="TRY AGAIN"
          onPress={fetchPosts}
        />

      </SafeAreaView>
    );
  }

  return (

    <SafeAreaView style={styles.container}>

      <FlatList

        ListHeaderComponent={

          <View>

            <Text style={styles.heading}>
              React Native REST API App
            </Text>

            <Text style={styles.subHeading}>
              Fetching, filtering, and creating posts
            </Text>

            <View style={styles.formContainer}>

              <Text style={styles.formTitle}>
                Create New Post
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={styles.input}
                placeholder="Body"
                value={body}
                onChangeText={setBody}
                multiline
              />

              <TextInput
                style={styles.input}
                placeholder="User ID"
                value={userId}
                onChangeText={setUserId}
                keyboardType="numeric"
              />

              <Button
                title="Submit Post"
                onPress={createPost}
              />

              {successMessage ? (
                <Text style={styles.successText}>
                  {successMessage}
                </Text>
              ) : null}

            </View>

            <View style={styles.formContainer}>

              <Text style={styles.formTitle}>
                Filter Posts
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter User ID"
                value={filterUserId}
                onChangeText={setFilterUserId}
                keyboardType="numeric"
              />

              <Button
                title="Filter"
                onPress={filterPosts}
              />

              <Button
                title="Reset Filter"
                onPress={() => {
                  setFilterUserId('');
                  setFilteredPosts(posts);
                }}
              />

            </View>

            <Text style={styles.listTitle}>
              Posts List
            </Text>

          </View>
        }

        data={filteredPosts}

        keyExtractor={(item) => item.id.toString()}

        renderItem={renderItem}

        showsVerticalScrollIndicator={false}

      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111',
  },

  subHeading: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },

  formContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },

  postId: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  postBody: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
  },

  successText: {
    color: 'green',
    marginTop: 12,
    fontWeight: '600',
  },

  tapText: {
    marginTop: 10,
    color: '#007AFF',
    fontWeight: '600',
  },

});
