import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const ContactSection: React.FC = () => {
    const { t } = useTranslation();

    const renderAvailability = (text: string, email: string) => {
        if (text.includes(email)) {
            const parts = text.split(email);
            return (
                <>
                    {parts[0]}
                    <a href={`mailto:${email}`}>{email}</a>
                    {parts[1]}
                </>
            );
        }
        return text;
    };

    return (
        <section id="contact" className="contact">
            <h2>{t.contact.heading}</h2>
            <p>{t.contact.location}</p>
            <p>{renderAvailability(t.contact.availability, t.contact.email)}</p>

            {t.contact.mobility && (
                <div className="mobility-card">
                    <div className="mobility-title">
                        <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span>{t.contact.mobility.title}</span>
                    </div>
                    <div className="mobility-grid">
                        {t.contact.mobility.items.map((item, idx) => (
                            <div key={idx} className="mobility-item">
                                <span className="mobility-label">
                                    {item.label}
                                </span>
                                <span className="mobility-value">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="links">
                <a className="btn" href={`mailto:${t.contact.email}`}>
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                    >
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z" />
                    </svg>
                    {t.contact.ctaEmail}
                </a>
                <a
                    className="btn"
                    href="/prasanna-resume-senior-engineer.pdf"
                    download="prasanna-resume-senior-engineer.pdf"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z" />
                    </svg>
                    {t.contact.ctaResume}
                </a>
                <a
                    className="btn"
                    href="https://github.com/prasannaraja"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                    >
                        <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                    </svg>
                    {t.contact.ctaGitHub}
                </a>
                <a
                    className="btn"
                    href="https://linkedin.com/in/prasannaraja"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                    >
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
                    </svg>
                    {t.contact.ctaLinkedIn}
                </a>
            </div>
        </section>
    );
};
