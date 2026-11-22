import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const HeroSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="hero" id="top">
            <span className="avail">
                <span className="pulse"></span> {t.hero.availabilityBadge}
            </span>
            <h1>{t.hero.headline}</h1>
            <div className="hero-certs" aria-label={t.hero.certifiedLabel}>
                <span className="hero-certs-label">{t.hero.certifiedLabel}</span>
                <ul>
                    {t.approach.certifications.items.map((cert) => (
                        <li key={cert.code}>
                            <a
                                className="hero-cert"
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`${cert.name} · ${t.approach.certifications.verifyLabel}`}
                            >
                                <span className="cert-code">{cert.code}</span>
                                <span className="hero-cert-name">{cert.name.replace(/^Microsoft Certified:\s*/, '')}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="lede">{t.hero.paragraph1}</p>
            <p className="lede">
                {t.hero.paragraph2.includes('KPMG Dash') ? (
                    <>
                        {t.hero.paragraph2.split('KPMG Dash')[0]}
                        <a
                            href="https://kpmgdash.co.uk/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            KPMG Dash
                        </a>
                        {t.hero.paragraph2.split('KPMG Dash')[1]}
                    </>
                ) : (
                    t.hero.paragraph2
                )}
            </p>
            <div className="hero-cta">
                <a className="btn primary" href="#experience">
                    {t.hero.ctaExplore}
                </a>
                <a className="btn" href="#projects">
                    {t.hero.ctaProjects}
                </a>
                <a
                    className="btn"
                    href="https://github.com/prasannaraja"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t.hero.ctaGitHub}
                </a>
                <a
                    className="btn"
                    href="https://linkedin.com/in/prasannaraja"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t.hero.ctaLinkedIn}
                </a>
            </div>
            <div className="meta">
                {t.hero.metaTags.map((tag) => (
                    <span key={tag}>
                        <span className="dot"></span> {tag}
                    </span>
                ))}
            </div>
        </section>
    );
};
