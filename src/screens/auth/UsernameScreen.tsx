import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { UsernameCheckResponse } from '../../types/user';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';

const UsernameScreen = () => {
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const checkAvailability = useCallback(async () => {
    if (!username.trim()) return;

    setLoading(true);
    try {
      const response = await api.get<UsernameCheckResponse>('/users/check-username', {
        params: { username },
      });
      setIsAvailable(response.data.available);
      setSuggestions(response.data.suggestions);
    } catch {
      Alert.alert('Error', 'Failed to check username availability');
    } finally {
      setLoading(false);
    }
  }, [username]);

  const saveUsername = async () => {
    if (!user?.id || !isAvailable) return;

    setLoading(true);
    try {
      await api.patch(`/users/${user.id}/username`, { username });
      // Update local user
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.message || 'Failed to save username');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!username.trim()) {
      setIsAvailable(null);
      setSuggestions([]);
      return;
    }

    // Auto-check if changed
    const timer = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timer);
  }, [username, checkAvailability]);

  const selectSuggestion = (sugg: string) => {
    setUsername(sugg);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText type="title">Pick your legendary username!</ThemedText>
        <ThemedText type="default" style={styles.subtitle}>Make it unique - max 20 chars, letters/numbers/underscores only.</ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="your.legendary.username"
            maxLength={20}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.checkButton} onPress={checkAvailability} disabled={loading}>
            <ThemedText>{loading ? 'Checking...' : 'Check Availability'}</ThemedText>
          </TouchableOpacity>
        </View>

        {isAvailable === true && (
          <View style={styles.success}>
            <ThemedText style={styles.successText}>✅ Perfect! This username is available!</ThemedText>
          </View>
        )}

        {isAvailable === false && suggestions.length > 0 && (
          <View style={styles.suggestions}>
            <ThemedText type="default">Try these:</ThemedText>
            {suggestions.map((sugg, i) => (
              <TouchableOpacity key={i} onPress={() => selectSuggestion(sugg)} style={styles.suggButton}>
                <ThemedText>{sugg}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.continueButton, (!isAvailable || !username.trim()) && styles.disabledButton]} 
          onPress={saveUsername}
          disabled={!isAvailable || !username.trim() || loading}
        >
          <ThemedText type="default" style={styles.continueText}>
            {loading ? 'Saving...' : 'Continue to Gracy! 🚀'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    marginTop: 40,
  },
  subtitle: {
    marginBottom: 24,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 16,
  },
  checkButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
  },
  success: {
    padding: 16,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
  },
  successText: {
    color: '#1B7F2A',
  },
  suggestions: {
    marginBottom: 24,
  },
  suggButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
  },
});

export default UsernameScreen;

