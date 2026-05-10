// storage.js - localStorage utilities for game data persistence

const STORAGE_KEY = 'musicalMatchSaga';

export function getHighScore() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.highScore || 0;
    }
  } catch (e) {
    console.error('Error reading from localStorage:', e);
  }
  return 0;
}

export function saveHighScore(score) {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    
    // Only update if new score is higher
    if (score > (parsed.highScore || 0)) {
      parsed.highScore = score;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return true; // Indicates new high score
    }
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
  return false;
}

export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing localStorage:', e);
  }
}
