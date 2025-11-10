import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Theme, SentimentData, SearchFilters } from '@/types';

interface Store extends AppState {
  // Theme actions
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // Data actions
  setLoading: (isLoading: boolean) => void;
  setSentimentData: (data: SentimentData | null) => void;
  setCurrentTicker: (ticker: string) => void;
  setError: (error: string | null) => void;
  
  // Search actions
  addRecentSearch: (ticker: string) => void;
  clearRecentSearches: () => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  
  // Reset
  reset: () => void;
}

const initialFilters: SearchFilters = {
  dateRange: '7d',
  sources: [],
  minConfidence: 0,
};

const initialState: AppState = {
  theme: 'dark',
  isLoading: false,
  currentTicker: '',
  sentimentData: null,
  recentSearches: [],
  filters: initialFilters,
  error: null,
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      
      setTheme: (theme) => set({ theme }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setSentimentData: (data) => set({ sentimentData: data, error: null }),
      
      setCurrentTicker: (ticker) => set({ currentTicker: ticker }),
      
      setError: (error) => set({ error, isLoading: false }),
      
      addRecentSearch: (ticker) =>
        set((state) => {
          const searches = [ticker, ...state.recentSearches.filter((s) => s !== ticker)].slice(0, 5);
          return { recentSearches: searches };
        }),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      
      reset: () => set(initialState),
    }),
    {
      name: 'finsentiment-storage',
      partialize: (state) => ({
        theme: state.theme,
        recentSearches: state.recentSearches,
      }),
    }
  )
);
