import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

function useLang() {
  const [lang, setLang] = useState("en"); // EN principal

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    setLang(saved || "en");
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, setLang };
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt">
      <div className="mb-3">
        <h2 className="section-title h5 mb-1">{title}</h2>
        {subtitle && <div className="muted small">{subtitle}</div>}
      </div>
      <div className="d-flex flex-column gap-3">{children}</div>
    </section>
  );
}

function clampIndex(i, len) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(lang === "en" ? "pt" : "en");

  // PDFs em /public
  const CV_EN = "/cv-en.pdf";
  const CV_PT = "/cv-pt.pdf";

  const content = useMemo(
    () => ({
      en: {
        name: "Ayla Micheluzzi",
        role: "Software Developer | Full Stack Developer",
        location: "Curitiba, PR — Brazil",
        email: "aylamick@gmail.com",
        phone: "+55 (41) 99215-3799",
        ageLine: "20 years old",

        highlights: [
          "Programming fundamentals + problem-solving",
          "Logic & Algorithms",
          "Automation mindset: faster, cleaner workflows",
        ],

        labels: {
          links: "Links",
          contact: "Contact",
          sections: "Sections",
          updated: "Last updated",
        },
        updatedValue: "Feb/2026",

        sections: {
          about: "About",
          experience: "Professional Experience",
          education: "Education",
          skills: "Technical Skills",
          projects: "Projects",
        },
        subtitles: {
          about: "Professional summary",
          experience: "Recent experience",
          education: "Academic background",
          skills: "Tech stack, tools and platforms",
          projects: "Selected work",
        },

        aboutText:
          "Software Developer pursuing a degree in Information Systems, experienced in automation and productivity-focused solutions. Strong foundation in programming, databases, and APIs, curious about new technologies and always learning. Intermediate English and strong interest in Artificial Intelligence, Software Architecture, and Blockchain.",

        links: [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/ayla-mich/" },
          { label: "GitHub", href: "https://github.com/aylamich" },
          { label: "CV", href: CV_EN, isCv: true, fileName: "Ayla-Micheluzzi-CV.pdf" },
        ],

        experience: [
          {
            title: "IT Intern (Automation Team)",
            company: "Vivo",
            period: "Sep 2025 — Present",
            bullets: [
              "Built and maintained internal automations focused on productivity.",
              "Developed full-stack solutions (front-end and back-end) to support team workflows.",
              "Created Python scripts for automation and data handling.",
              "Supported initiatives involving applied AI in internal processes.",
              "Collaborated on improvements to optimize daily operations.",
            ],
          },
        ],

        education: [
          {
            course: "Bachelor's degree in Information Systems",
            school: "Pontifícia Universidade Católica do Paraná (PUCPR)",
            period: "2024 — Present (5th semester)",
            details: "Focus on programming, databases, APIs and practical projects.",
          },
        ],

        skillsGroups: [
          {
            title: "Languages & Technologies",
            items: [
              "Python",
              "JavaScript",
              "Java",
              "Node.js",
              "React",
              "HTML",
              "CSS",
              "Bootstrap",
              "Tailwind",
              "MySQL",
              "MySQL Workbench",
            ],
          },
          {
            title: "Tools & Platforms",
            items: ["Git/GitHub", "VS Code", "Postman", "Power BI", "Power Apps", "Power Automate", "Excel"],
          },
          {
            title: "Methodologies",
            items: ["Scrum", "Linux"],
          },
        ],

        projects: [
          {
            name: "PetMeet",
            desc:
              "A platform to connect dog owners and help match dogs for meetups. Includes project presentation and full repository.",
            tech: ["Node.js", "MySQL", "React", "Vite", "Tailwind CSS", "JavaScript"],
            links: [
              { label: "Presentation", href: "https://prezi.com/view/Yj8TA8hOdyHYRJYkTEpr/" },
              { label: "GitHub", href: "https://github.com/aylamich/PetMeet" },
            ],
          },
          {
            name: "URLTREE",
            desc:
              "A decentralized Web3 link hub to consolidate all your links in one place. Deployed on mainnet (ICP blockchain).",
            tech: ["Motoko", "React", "Tailwind CSS", "Blockchain ICP"],
            links: [
              { label: "Link Mainnet", href: "https://e5yuu-3aaaa-aaaae-qcuia-cai.icp0.io/" },
              { label: "GitHub", href: "https://github.com/aylamich/urltree" },
            ],
          },
          {
            name: "GameLog",
            desc:
              "A web platform inspired by Letterboxd for games: log played games, rate, favorite, create lists, and follow other players.",
            tech: [
              "Java 17+",
              "Spring Boot 3",
              "Spring Security",
              "JPA (Hibernate)",
              "Maven",
              "React",
              "Tailwind CSS",
              "Vite",
              "MySQL",
            ],
            links: [{ label: "GitHub", href: "https://github.com/aylamich/GameLog" }],
          },
          {
            name: "AIKitchen",
            desc:
              "An AI recipe agent that helps generate recipes and suggestions based on ingredients and user preferences.",
            tech: ["AI Agent", "Python/JS (adjust)", "Prompting (adjust)"],
            links: [{ label: "GitHub", href: "https://github.com/aylamich/agente-receitas" }],
          },
        ],

        footer: "Built with React + Bootstrap",
      },

      pt: {
        name: "Ayla Micheluzzi",
        role: "Software Developer | Full Stack Developer",
        location: "Curitiba, PR — Brasil",
        email: "aylamick@gmail.com",
        phone: "+55 (41) 99215-3799",
        ageLine: "20 anos",

        highlights: [
          "Lógica de programação + resolução de problemas",
          "Curiosidade e Responsabilidade",
          "Mentalidade de automação: processos mais rápidos",
        ],

        labels: {
          links: "Links",
          contact: "Contato",
          sections: "Seções",
          updated: "Última atualização",
        },
        updatedValue: "Fev/2026",

        sections: {
          about: "Sobre",
          experience: "Experiência Profissional",
          education: "Educação",
          skills: "Competências Técnicas",
          projects: "Projetos",
        },
        subtitles: {
          about: "Resumo profissional",
          experience: "Experiência recente",
          education: "Formação acadêmica",
          skills: "Linguagens, ferramentas e plataformas",
          projects: "Trabalhos selecionados",
        },

        aboutText:
          "Desenvolvedora de Software cursando Sistemas de Informação, com experiência em automações e desenvolvimento de soluções com foco em produtividade. Possuo base sólida em programação, bancos de dados e APIs, curiosa por novas tecnologias e sempre buscando novos conhecimentos. Inglês intermediário e forte interesse em Inteligência Artificial, Arquitetura de Software e Blockchain.",

        links: [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/ayla-mich/" },
          { label: "GitHub", href: "https://github.com/aylamich" },
          { label: "CV", href: CV_PT, isCv: true, fileName: "Ayla-Micheluzzi-CV.pdf" },
        ],

        experience: [
          {
            title: "Estagiária em TI (Time de Automações)",
            company: "Vivo",
            period: "Set 2025 — Atualmente",
            bullets: [
              "Construção e manutenção de automações internas com foco em produtividade.",
              "Desenvolvimento de soluções full stack (front-end e back-end) para apoiar fluxos do time.",
              "Criação de scripts e automações utilizando Python.",
              "Apoio em iniciativas envolvendo IA aplicada a processos internos.",
              "Colaboração em melhorias para otimizar o dia a dia do time.",
            ],
          },
        ],

        education: [
          {
            course: "Bacharelado em Sistemas de Informação",
            school: "Pontifícia Universidade Católica do Paraná (PUCPR)",
            period: "2024 — Presente (5º período)",
            details: "Foco em programação, bancos de dados, APIs e projetos práticos.",
          },
        ],

        skillsGroups: [
          {
            title: "Linguagens & Tecnologias",
            items: [
              "Python",
              "JavaScript",
              "Java",
              "Node.js",
              "React",
              "HTML",
              "CSS",
              "Bootstrap",
              "Tailwind",
              "MySQL",
              "MySQL Workbench",
            ],
          },
          {
            title: "Ferramentas & Plataformas",
            items: ["Git/GitHub", "VS Code", "Postman", "Power BI", "Power Apps", "Power Automate", "Excel"],
          },
          {
            title: "Metodologias",
            items: ["Scrum", "Linux"],
          },
        ],

        projects: [
          {
            name: "PetMeet",
            desc:
              "Plataforma para conectar donos e promover encontros de cães. Inclui apresentação do projeto e repositório completo.",
            tech: ["Node.js", "MySQL", "React", "Vite", "Tailwind CSS", "JavaScript"],
            links: [
              { label: "Apresentação", href: "https://prezi.com/view/Yj8TA8hOdyHYRJYkTEpr/" },
              { label: "GitHub", href: "https://github.com/aylamich/PetMeet" },
            ],
          },
          {
            name: "URLTREE",
            desc:
              "Plataforma Web3 descentralizada para consolidar links em um único lugar. Subida na mainnet (blockchain ICP).",
            tech: ["Motoko", "React", "Tailwind CSS", "Blockchain ICP"],
            links: [
              { label: "Projeto", href: "https://e5yuu-3aaaa-aaaae-qcuia-cai.icp0.io/" },
              { label: "GitHub", href: "https://github.com/aylamich/urltree" },
            ],
          },
          {
            name: "GameLog",
            desc:
              "Plataforma web inspirada no Letterboxd para jogos: registrar, avaliar, favoritar, criar listas e seguir outros jogadores.",
            tech: [
              "Java 17+",
              "Spring Boot 3",
              "Spring Security",
              "JPA (Hibernate)",
              "Maven",
              "React",
              "Tailwind CSS",
              "Vite",
              "MySQL",
            ],
            links: [{ label: "GitHub", href: "https://github.com/aylamich/GameLog" }],
          },
          {
            name: "AIKitchen",
            desc:
              "Agente de IA para receitas: sugere receitas com base nos ingredientes e preferências do usuário.",
            tech: ["Agente IA", "Python/JS", "Prompting"],
            links: [{ label: "GitHub", href: "https://github.com/aylamich/agente-receitas" }],
          },
        ],

        footer: "Feito com React + Bootstrap",
      },
    }),
    []
  );

  const t = content[lang];

  const nav = [
    { id: "about", label: t.sections.about },
    { id: "experience", label: t.sections.experience },
    { id: "education", label: t.sections.education },
    { id: "skills", label: t.sections.skills },
    { id: "projects", label: t.sections.projects },
  ];

  // Carrossel de projetos 
  const totalProjects = t.projects.length;
  const [projIndex, setProjIndex] = useState(0);

  useEffect(() => {
    setProjIndex((prev) => clampIndex(prev, t.projects.length));
  }, [lang]);

  const visibleProjects = useMemo(() => {
    if (totalProjects === 0) return [];
    const first = clampIndex(projIndex, totalProjects);
    const second = clampIndex(projIndex + 1, totalProjects);
    if (totalProjects === 1) return [t.projects[first]];
    return [t.projects[first], t.projects[second]];
  }, [projIndex, totalProjects, t.projects]);

  const goPrev = () => setProjIndex((i) => clampIndex(i - 2, totalProjects));
  const goNext = () => setProjIndex((i) => clampIndex(i + 2, totalProjects));

  return (
    <>
      <div className="bg-orbs" />

      {/* TOPBAR */}
      <div className="topbar-blur sticky-top" style={{ zIndex: 1000 }}>
        <div className="container py-3 d-flex align-items-center justify-content-between gap-3">
          <div className="text-truncate">
            <div className="fw-semibold text-truncate d-flex align-items-center gap-2">
              <span>Portfolio pessoal</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
            <button className="btn btn-outline-secondary premium-btn btn-sm" onClick={toggleLang} title="Switch language">
              {lang === "en" ? "PT" : "EN"}
            </button>

            <button className="btn btn-outline-secondary premium-btn btn-sm" onClick={toggleTheme} title="Toggle theme">
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4 py-lg-5">
        <div className="row g-4">
          {/* SIDEBAR */}
          <div className="col-12 col-lg-4">
            <motion.aside
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="sticky-top-soft"
            >
              <div className="premium-card p-4">
                <div className="d-flex gap-3 align-items-start">
                  <img
                    src="/profile.png"
                    alt="Foto de perfil"
                    className="rounded-4 flex-shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      border: "1px solid var(--border)",
                    }}
                  />

                  <div className="flex-grow-1 min-w-0">
                    <h1 className="h4 fw-bold mb-1 text-truncate">{t.name}</h1>

                    <div
                      className="muted small text-break"
                      style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        lineHeight: 1.25,
                      }}
                    >
                      {t.role}
                    </div>

                    <div className="muted small mt-1 text-truncate">
                      {t.location} • {t.ageLine}
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="mb-3">
                  <div className="muted small mb-1">{t.labels.contact}</div>
                  <div className="small">{t.email}</div>
                  <div className="small">{t.phone}</div>
                </div>

                <div className="mb-3">
                  <div className="muted small mb-2">{t.labels.links}</div>
                  <div className="d-flex flex-wrap gap-2">
                    {t.links.map((l) => {
                      const isExternal = l.href?.startsWith("http");
                      const downloadProps = l.isCv ? { download: l.fileName } : {};

                      return (
                        <a
                          key={l.label}
                          href={l.href}
                          className="btn btn-outline-secondary btn-sm premium-btn"
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          {...downloadProps}
                        >
                          {l.label}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="muted small mb-2">{t.labels.sections}</div>
                  <div className="d-grid gap-2">
                    {nav.map((n) => (
                      <a key={n.id} href={`#${n.id}`} className="btn btn-light premium-btn text-start">
                        {n.label}
                      </a>
                    ))}
                  </div>
                </div>

                <hr className="my-4" />
                <div className="muted small">
                  {t.labels.updated}: {t.updatedValue}
                </div>
              </div>
            </motion.aside>
          </div>

          {/* CONTENT */}
          <div className="col-12 col-lg-8">
            {/* Card inicial com highlights */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="premium-card p-4 mb-4"
            >
              <div className="d-flex flex-wrap gap-2">
                {t.highlights.map((h) => (
                  <span key={h} className="chip">
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
              className="premium-card p-4"
            >
              <div className="d-flex flex-column gap-5">
                <Section id="about" title={t.sections.about} subtitle={t.subtitles.about}>
                  <p className="mb-0">{t.aboutText}</p>
                </Section>

                <Section id="experience" title={t.sections.experience} subtitle={t.subtitles.experience}>
                  <div className="d-flex flex-column gap-3">
                    {t.experience.map((e) => (
                      <div key={`${e.title}-${e.company}`} className="border rounded-4 p-3" style={{ borderColor: "var(--border)" }}>
                        <div className="d-flex flex-wrap justify-content-between gap-2">
                          <div className="fw-semibold">{e.title}</div>
                          <div className="muted small">{e.period}</div>
                        </div>
                        <div className="muted">{e.company}</div>
                        <ul className="mt-2 mb-0">
                          {e.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="education" title={t.sections.education} subtitle={t.subtitles.education}>
                  {t.education.map((ed) => (
                    <div key={ed.course} className="border rounded-4 p-3" style={{ borderColor: "var(--border)" }}>
                      <div className="d-flex flex-wrap justify-content-between gap-2">
                        <div className="fw-semibold">{ed.course}</div>
                        <div className="muted small">{ed.period}</div>
                      </div>
                      <div className="muted">{ed.school}</div>
                      <div className="mt-2">{ed.details}</div>
                    </div>
                  ))}
                </Section>

                <Section id="skills" title={t.sections.skills} subtitle={t.subtitles.skills}>
                  <div className="d-flex flex-column gap-3">
                    {t.skillsGroups.map((g) => (
                      <div key={g.title} className="border rounded-4 p-3" style={{ borderColor: "var(--border)" }}>
                        <div className="fw-semibold mb-2">{g.title}</div>
                        <div className="d-flex flex-wrap gap-2">
                          {g.items.map((it) => (
                            <span className="chip" key={it}>
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Projects */}
                <Section id="projects" title={t.sections.projects} subtitle={t.subtitles.projects}>
                  <div className="d-flex align-items-stretch gap-2">
                    {/* seta esquerda */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm premium-btn"
                      onClick={goPrev}
                      aria-label="Previous projects"
                      style={{ alignSelf: "center" }}
                    >
                      ←
                    </button>

                    {/* cards */}
                    <div className="flex-grow-1">
                      <div className="row g-3">
                        {visibleProjects.map((p) => (
                          <div className="col-12 col-md-6" key={p.name}>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="border rounded-4 p-3 h-100"
                              style={{
                                borderColor: "var(--border)",
                                minHeight: 320,
                              }}
                            >
                              <div className="fw-semibold">{p.name}</div>
                              <div
                                className="mt-1"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {p.desc}
                              </div>

                              <div className="d-flex flex-wrap gap-2 mt-3">
                                {p.tech.map((tech) => (
                                  <span className="chip" key={tech}>
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              <div className="d-flex gap-3 mt-3 flex-wrap">
                                {p.links.map((l) => (
                                  <a key={l.label} href={l.href} className="muted" target="_blank" rel="noreferrer">
                                    {l.label}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* seta direita */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm premium-btn"
                      onClick={goNext}
                      aria-label="Next projects"
                      style={{ alignSelf: "center" }}
                    >
                      →
                    </button>
                  </div>
                </Section>
              </div>
            </motion.div>

            <div className="text-center muted small py-4">
              {t.footer} • {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}