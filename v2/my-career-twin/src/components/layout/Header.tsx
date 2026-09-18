import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setActiveSection } from '../../store/slices/uiSlice';

export const Header: React.FC = () => {
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
        const sectionIds = [
            'top',
            'about',
            'experience',
            'projects',
            'approach',
            'stack',
            'contact',
        ];

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // When near the top, always select Home ('top')
            if (scrollY < 120) {
                dispatch(setActiveSection('top'));
                return;
            }

            // When at or near the bottom of the page, always select 'contact'
            if (windowHeight + scrollY >= documentHeight - 80) {
                dispatch(setActiveSection('contact'));
                return;
            }

            // Calculate active section based on header offset
            const headerOffset = 140;
            let current = 'top';

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.getBoundingClientRect().top;
                    if (top <= headerOffset) {
                        current = id;
                    }
                }
            }

            dispatch(setActiveSection(current));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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
                <a
                    className="brand"
                    href="#top"
                    onClick={() => dispatch(setActiveSection('top'))}
                >
                    {t.nav.brand || 'Prasanna Raja'}
                </a>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                className={`link ${activeSection === item.id ? 'active' : ''}`}
                                href={`#${item.id}`}
                                onClick={() =>
                                    dispatch(setActiveSection(item.id))
                                }
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <LanguageSwitcher />
                <ThemeToggle />
            </nav>
        </header>
    );
};
