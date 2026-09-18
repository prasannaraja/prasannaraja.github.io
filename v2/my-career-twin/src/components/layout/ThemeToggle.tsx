import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import { useTranslation } from '../../hooks/useTranslation';

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const { t } = useTranslation();

  return (
    <button
      className="toggle"
      id="theme"
      type="button"
      aria-label={t.nav.toggleDarkMode || 'Toggle dark mode'}
      onClick={() => dispatch(toggleTheme())}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path
          d={
            mode === 'dark'
              ? 'M12 4v1m0 14v1m8-8h-1M5 12H4m13.7-5.7-.7.7M7 17l-.7.7m11.4 0-.7-.7M7 7l-.7-.7M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z'
              : 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z'
          }
        />
      </svg>
    </button>
  );
};

