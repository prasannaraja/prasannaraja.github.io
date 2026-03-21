import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Database,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Server,
  FileText,
} from 'lucide-react';
import SectionTitle from './components/SectionTitle';
import ProjectCard from './components/ProjectCard';
import ExperienceCard from './components/ExperienceCard';

const skills = [
  'Angular',
  'React',
  'TypeScript',
  'JavaScript',
  '.NET Core',
  'ASP.NET MVC',
  'C#',
  'Entity Framework',
  'Microservices',
  'CQRS',
  'Azure DevOps',
  'CI/CD Pipelines',
  'Qlik Sense',
  'AI-driven Analytics',
  'Tailwind CSS',
  'System Design',
];

const GITHUB_USERNAME = 'prasannaraja';
const LINKEDIN_USERNAME = 'prasannaraja';
const EMAIL_ADDRESS = 'heyprasanna@yahoo.com';
const RESUME_URL = 'https://registry.jsonresume.org/prasannaraja?theme=timeline-fixed#';

const projects = [
  {
    name: 'KART (Analytical Reporting Tool)',
    type: 'Auditing Platform',
    description:
      'Led the design and development of a microservices architecture for auditing purposes using .NET Core and Angular. Established the core development codebase.',
    tags: ['.NET Core', 'Angular', 'Microservices', 'Architecture'],
    link: '#',
  },
  {
    name: 'GEMS Education Platform',
    type: 'Multi-lingual Platform',
    description:
      'Developed a multi-national platform with React and .NET Core. Created API interfaces with Redis caching for seamless, performant integration.',
    tags: ['React', '.NET Core', 'Redis', 'Web API'],
    link: '#',
  },
  {
    name: 'Capital Cost Estimation Tool',
    type: 'Enterprise Tool UI',
    description:
      'Designed and developed the UI from scratch for an international team at Shell India, significantly enhancing the user experience for complex cost estimation workflows.',
    tags: ['UI/UX', 'React', 'Front-End Design'],
    link: '#',
  },
  {
    name: 'Enterprise Qlik Dashboards',
    type: 'BI & Data Visualization',
    description:
      'Developed core application modules integrating the Qlik Sense Mashup API with AngularJS, generating automated client reports at scale via NPrinting.',
    tags: ['Qlik Sense', 'AngularJS', 'Data Analytics', 'Mashup API'],
    link: '#',
  },
  {
    name: 'Banking Regulatory Apps',
    type: 'Financial Systems',
    description:
      'Managed requirements gathering, application development, and maintenance of critical banking regulatory systems, providing comprehensive customer and deployment support.',
    tags: ['Finance', 'Software Packaging', 'Maintenance'],
    link: '#',
  },
];

const experience = [
  {
    years: 'Oct 2021 – Present',
    title: 'Senior Software Engineer',
    company: 'KPMG, Microsoft Business Solutions',
    summary:
      'Leading design and development of enterprise product architectures and AI-driven analytics platforms. Implementing microservices using .NET Core and Angular to transform data into actionable business decisions.',
    projects: ['KART', 'KPMG Dash'],
  },
  {
    years: 'Mar 2021 – Sep 2021',
    title: 'Senior Software Developer',
    company: 'Finesse Global',
    summary:
      'Developed a multi-national, multi-lingual educational platform utilizing React, .NET Core, and Redis. Engineered robust API interfaces for seamless application integration.',
    projects: ['GEMS Education Platform'],
  },
  {
    years: 'Jul 2020 – Feb 2021',
    title: 'Senior .Net Specialist',
    company: 'Randstad India',
    summary:
      'Designed and developed the UI for the Capital Cost Estimation Tool at Shell India, leading front-end UI/UX development within an international team to build the interface from scratch.',
    projects: ['Capital Cost Estimation Tool'],
  },
  {
    years: 'Dec 2014 – Aug 2018',
    title: 'Associate',
    company: 'Cognizant Technology Solutions',
    summary:
      'Developed core application modules bridging JavaScript frameworks to Qlik Sense. Engineered Mashups and configured task-scheduled NPrinting automation for enterprise reporting.',
    projects: ['Enterprise Dashboards', 'NPrinting Automated Reports'],
  },
  {
    years: '2003 – 2014',
    title: 'Senior Software Engineer / Tech Lead',
    company: 'Various (HCL, Inatech, Midas)',
    summary:
      'Gathered requirements, designed, and maintained applications spanning banking, oil domain reporting, and telecom production systems. Managed software packaging, deployments, and customer support.',
    projects: ['Banking Regulatory Apps', 'Report Frameworks', 'Telecom Support'],
  },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_30%)]" />
      <div className="grid-bg absolute inset-0 bg-grid opacity-30" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="section-container flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white transition-colors hover:text-cyan-300">
            <img
              src="/profile.jpg"
              alt="Prasanna Raja"
              className="h-8 w-8 rounded-full border border-white/10 object-cover"
            />
            Prasanna Raja
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-300 transition-colors hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/15"
          >
            Let’s Talk
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="section-container flex min-h-[92vh] items-center py-16 md:py-24">
          <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Senior Software Engineer • Technical Architect
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                Building scalable enterprise platforms & AI-driven analytics.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                I’m Prasanna Raja, a Senior Software Engineer with over 18 years of experience building mission-critical business platforms, clean architecture, automated data pipelines, and bridging the gap between web applications and predictive analytics.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>

                <a
                  href={`https://linkedin.com/in/${LINKEDIN_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Full Resume
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Years of Experience', value: '18+' },
                  { label: 'Core Expertise', value: '.NET & Angular' },
                  { label: 'Domain', value: 'Enterprise & AI' },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-3xl p-5">
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass relative flex flex-col items-center gap-6 rounded-[2rem] p-6 shadow-glow"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200"></div>
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl md:h-64 md:w-64">
                  <img
                    src="/profile.jpg"
                    alt="Prasanna Raja"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400/10 p-3">
                    <Database className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Core Strengths</h3>
                    <p className="text-sm text-slate-400">Enterprise Data & Web Architectures</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    'Frontend: Angular, React, TypeScript',
                    'Backend: .NET Core, Microservices, CQRS',
                    'Data Analytics: Qlik Sense, SQL, AI integration',
                    'Cloud & DevOps: Azure, CI/CD, Key Vault',
                    'System Design, Security, and Scalability',
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-container py-16">
          <SectionTitle
            eyebrow="About"
            title="A senior architect focused on data-driven business impact."
            subtitle="From early telecom systems to modern AI-driven enterprise analytics platforms, my work has consistently centered on scalable architecture, seamless API integration, and empowering decision intelligence."
          />

          <div className="glass rounded-[2rem] p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex rounded-2xl bg-white/5 p-3">
                  <Code2 className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">What I bring</h3>
                <p className="mt-3 leading-8 text-slate-300">
                  I build web and analytics applications with a strong focus on system architecture,
                  maintainability, security, and business impact. My specialty is bridging the gap between front-end UI abstractions, robust .NET backend systems, and predictive AI data modeling.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  'Enterprise Web platforms using .NET Core and Angular/React',
                  'AI-driven analytics and data modeling (Qlik Sense)',
                  'Microservices architecture and CQRS patterns',
                  'Cloud integrations with Azure DevOps and CI/CD',
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-container py-16">
          <SectionTitle
            eyebrow="Skills"
            title="Tech stack & architecture expertise"
            subtitle="Built around .NET Core, Angular, React, and data-driven enterprise delivery."
          />

          <div className="glass rounded-[2rem] p-8">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-container py-16">
          <SectionTitle
            eyebrow="Projects"
            title="Selected enterprise work"
            subtitle="A collection of enterprise-level applications, ranging from AI-driven analytics to multi-lingual educational platforms."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="experience" className="section-container py-16">
          <SectionTitle
            eyebrow="Experience"
            title="18+ years of software development"
            subtitle="A progression from early technical systems engineering into senior-level enterprise platform architecture."
          />

          <div className="space-y-6">
            {experience.map((item, index) => (
              <ExperienceCard key={`${item.company}-${index}`} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="section-container py-16">
          <SectionTitle eyebrow="Education" title="Academic background" />

          <div className="glass rounded-[2rem] p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <GraduationCap className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Bachelor of Engineering, Computer Science
                  </h3>
                  <p className="mt-2 text-slate-300">Anna University</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <GraduationCap className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Diploma in Electronics and Communication Engineering
                  </h3>
                  <p className="mt-2 text-slate-300">Central Polytechnic College</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-container py-16">
          <div className="glass rounded-[2rem] p-8 md:p-12">
            <SectionTitle
              eyebrow="Contact"
              title="Let’s build something impactful."
              subtitle="Open to Enterprise Architecture, Full Stack Lead, and AI-driven Platform engineering opportunities."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="inline-flex items-center rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
              >
                <Mail className="mr-2 h-4 w-4" />
                {EMAIL_ADDRESS}
              </a>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>

              <a
                href={`https://linkedin.com/in/${LINKEDIN_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                <FileText className="mr-2 h-4 w-4" />
                Full Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <a
        href="#about"
        className="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition hover:bg-white/10"
      >
        <ChevronDown className="h-5 w-5 text-cyan-300" />
      </a>
    </div>
  );
}