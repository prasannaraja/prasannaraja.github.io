import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ApproachSection } from './components/sections/ApproachSection';
import { StackSection } from './components/sections/StackSection';
import { ContactSection } from './components/sections/ContactSection';
import { useTranslation } from './hooks/useTranslation';
import { useAppDispatch } from './store/hooks';
import { setLocale, getPathLocale } from './store/slices/localeSlice';
import './styles/main.css';

export const App: React.FC = () => {
    const { t, locale } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handlePopState = () => {
            const pathLoc = getPathLocale();
            if (pathLoc && pathLoc !== locale) {
                dispatch(setLocale(pathLoc));
            } else if (!pathLoc && locale !== 'en') {
                dispatch(setLocale('en'));
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [dispatch, locale]);

    useEffect(() => {
        // Update document title and description based on current locale
        document.title = t.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', t.meta.description);
        }

        // Trigger GoatCounter pageview on language change in SPA
        const gc = (
            window as unknown as {
                goatcounter?: {
                    count?: (opts: {
                        path: string;
                        title: string;
                        event: boolean;
                    }) => void;
                };
            }
        ).goatcounter;
        if (gc?.count) {
            gc.count({
                path: locale === 'en' ? '/' : `/${locale}/`,
                title: t.meta.title,
                event: false,
            });
        }
    }, [t, locale]);

    useEffect(() => {
        // Intersection observer for reveal animations
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
        );

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el, i) => {
            (el as HTMLElement).style.transitionDelay =
                `${Math.min(i, 4) * 45}ms`;
            io.observe(el);
        });

        return () => io.disconnect();
    }, [locale]);

    return (
        <>
            <a className="skip" href="#main">
                {t.nav.skipToContent || 'Skip to content'}
            </a>
            <Header />
            <main id="main">
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <ProjectsSection />
                <ApproachSection />
                <StackSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};

export default App;
