import en from './en.json';
import de from './de.json';
import fr from './fr.json';

export type LocaleKey = 'en' | 'de' | 'fr';

export type TranslationSchema = typeof en;

export const translations: Record<LocaleKey, TranslationSchema> = {
  en,
  de,
  fr,
};

