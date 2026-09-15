import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActiveSection } from '../../store/slices/uiSlice';

export const Header: React.FC = () => {
interface HeaderProps {
  onOpenChat?: () => void;
  onOpenAnalytics?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChat, onOpenAnalytics }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['top', 'about', 'experience', 'projects', 'approach', 'stack', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection(entry.target.id));
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dispatch]);

  const navItems = [
    { id: 'top', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'approach', label: t.nav.approach },
    { id: 'stack', label: t.nav.stack },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header id="site-header" className={isScrolled ? 'scrolled' : ''}>
      <nav className="nav" aria-label={t.nav.ariaLabel || 'Primary'}>
        <a className="brand" href="#top">
          {t.nav.brand || 'Prasanna Raja'}
        </a>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={`link ${activeSection === item.id ? 'active' : ''}`}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            </li>
          ))}
          {onOpenChat && (
            <li>
              <button
                type="button"
                className="link"
                onClick={onOpenChat}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'var(--accent)', fontWeight: 600 }}
              >
                🤖 AI Twin
              </button>
            </li>
          )}
          {onOpenAnalytics && (
            <li>
              <button
                type="button"
                className="link"
                onClick={onOpenAnalytics}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                title="View Chatbot Telemetry"
              >
                📊 Analytics
              </button>
            </li>
          )}
        </ul>
        <LanguageSwitcher />
        <ThemeToggle />
      </nav>
    </header>
  );
};

