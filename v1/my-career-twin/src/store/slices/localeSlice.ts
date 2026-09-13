import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LocaleKey } from '../../data/locales';

interface LocaleState {
  currentLocale: LocaleKey;
}

const getInitialLocale = (): LocaleKey => {
  if (typeof window === 'undefined') return 'en';
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam === 'de' || langParam === 'fr' || langParam === 'en') {
    return langParam;
  }
  const saved = localStorage.getItem('locale') as LocaleKey | null;
  if (saved && (saved === 'en' || saved === 'de' || saved === 'fr')) {
    return saved;
  }
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === 'de') return 'de';
  if (browserLang === 'fr') return 'fr';
  return 'en';
};

const initialState: LocaleState = {
  currentLocale: getInitialLocale(),
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleKey>) => {
      state.currentLocale = action.payload;
      try {
        localStorage.setItem('locale', action.payload);
        document.documentElement.lang = action.payload;
      } catch (e) {
        console.error('Failed to save locale to localStorage', e);
      }
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
