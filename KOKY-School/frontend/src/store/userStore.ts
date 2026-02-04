import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  xp: number;
  badges: string[];
  dailyStreak: number;
  lastLogin: string;
  vocabulary: VocabularyWord[];
  grammarProgress: GrammarProgress[];
  pronunciationProgress: PronunciationProgress[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  mastered: boolean;
  lastReviewed: string;
}

export interface GrammarProgress {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  score: number;
  lastPracticed: string;
}

export interface PronunciationProgress {
  word: string;
  accuracy: number;
  attempts: number;
  lastPracticed: string;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  updateProgress: (xp: number, level?: string) => void;
  addBadge: (badge: string) => void;
  updateDailyStreak: () => void;
  addVocabularyWord: (word: VocabularyWord) => void;
  updateVocabularyWord: (wordId: string, updates: Partial<VocabularyWord>) => void;
  addGrammarProgress: (grammar: GrammarProgress) => void;
  updateGrammarProgress: (topic: string, updates: Partial<GrammarProgress>) => void;
  addPronunciationProgress: (pronunciation: PronunciationProgress) => void;
  updatePronunciationProgress: (word: string, updates: Partial<PronunciationProgress>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, isAuthenticated: false }),

      updateProgress: (xp, level) => {
        const currentUser = get().user;
        if (currentUser) {
          const newXP = currentUser.xp + xp;
          const newLevel = level || currentUser.level;
          const newProgress = Math.min(100, (newXP / 1000) * 100);
          
          set({
            user: {
              ...currentUser,
              xp: newXP,
              level: newLevel as any,
              progress: newProgress,
            },
          });
        }
      },

      addBadge: (badge) => {
        const currentUser = get().user;
        if (currentUser && !currentUser.badges.includes(badge)) {
          set({
            user: {
              ...currentUser,
              badges: [...currentUser.badges, badge],
            },
          });
        }
      },

      updateDailyStreak: () => {
        const currentUser = get().user;
        if (currentUser) {
          const today = new Date().toDateString();
          const lastLoginDate = new Date(currentUser.lastLogin).toDateString();
          
          let newStreak = currentUser.dailyStreak;
          
          if (today === lastLoginDate) {
            // Already logged in today
            return;
          } else if (today === new Date(Date.now() - 86400000).toDateString()) {
            // Logged in yesterday, continue streak
            newStreak += 1;
          } else {
            // Break streak, start new one
            newStreak = 1;
          }

          set({
            user: {
              ...currentUser,
              dailyStreak: newStreak,
              lastLogin: new Date().toISOString(),
            },
          });
        }
      },

      addVocabularyWord: (word) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              vocabulary: [...currentUser.vocabulary, word],
            },
          });
        }
      },

      updateVocabularyWord: (wordId, updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedVocabulary = currentUser.vocabulary.map(word =>
            word.id === wordId ? { ...word, ...updates } : word
          );
          
          set({
            user: {
              ...currentUser,
              vocabulary: updatedVocabulary,
            },
          });
        }
      },

      addGrammarProgress: (grammar) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              grammarProgress: [...currentUser.grammarProgress, grammar],
            },
          });
        }
      },

      updateGrammarProgress: (topic, updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedGrammar = currentUser.grammarProgress.map(grammar =>
            grammar.topic === topic ? { ...grammar, ...updates } : grammar
          );
          
          set({
            user: {
              ...currentUser,
              grammarProgress: updatedGrammar,
            },
          });
        }
      },

      addPronunciationProgress: (pronunciation) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              pronunciationProgress: [...currentUser.pronunciationProgress, pronunciation],
            },
          });
        }
      },

      updatePronunciationProgress: (word, updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedPronunciation = currentUser.pronunciationProgress.map(pronunciation =>
            pronunciation.word === word ? { ...pronunciation, ...updates } : pronunciation
          );
          
          set({
            user: {
              ...currentUser,
              pronunciationProgress: updatedPronunciation,
            },
          });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);