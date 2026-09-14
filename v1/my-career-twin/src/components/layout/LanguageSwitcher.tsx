import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLocale } from '../../store/slices/localeSlice';
import type { LocaleKey } from '../../data/locales';

export const LanguageSwitcher: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentLocale = useAppSelector((state) => state.locale.currentLocale);

    const handleSelect = (locale: LocaleKey, e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(setLocale(locale));
        const newPath = locale === 'en' ? '/' : `/${locale}/`;
        if (window.location.pathname !== newPath) {
            window.history.pushState({ locale }, '', newPath);
        }
    };

    return (
        <nav className="lang-switch" aria-label="Language">
            <a
                href="/"
                onClick={(e) => handleSelect('en', e)}
                aria-current={currentLocale === 'en' ? 'true' : undefined}
            >
                EN
            </a>
            <span className="sep">|</span>
            <a
                href="/de/"
                onClick={(e) => handleSelect('de', e)}
                aria-current={currentLocale === 'de' ? 'true' : undefined}
            >
                DE
            </a>
            <span className="sep">|</span>
            <a
                href="/fr/"
                onClick={(e) => handleSelect('fr', e)}
                aria-current={currentLocale === 'fr' ? 'true' : undefined}
            >
                FR
            </a>
        </nav>
    );
};

