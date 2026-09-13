import { useAppSelector } from '../store/hooks';
import { translations } from '../data/locales';
import type { TranslationSchema } from '../data/locales';

export const useTranslation = (): { t: TranslationSchema; locale: 'en' | 'de' | 'fr' } => {
  const currentLocale = useAppSelector((state) => state.locale.currentLocale);
  const t = translations[currentLocale] || translations.en;
  return { t, locale: currentLocale };
};
