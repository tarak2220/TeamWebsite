
import { useState, type FormEvent } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const services = [
  {
    number: "01",
    title: "Robotics & Automation",
    description:
      "Robotic systems, ROS 2 applications, automation, and intelligent machines.",
    icon: "🤖",
  },
  {
    number: "02",
    title: "Embedded Systems",
    description:
      "Microcontrollers, Raspberry Pi, Arduino, sensors, and hardware integration.",
    icon: "⚡",
  },
  {
    number: "03",
    title: "IoT Solutions",
    description:
      "Connected devices, sensor monitoring, and intelligent IoT applications.",
    icon: "📡",
  },
  {
    number: "04",
    title: "AI & Machine Learning",
    description:
      "AI applications, LLM integration, automation, and intelligent software.",
    icon: "🧠",
  },
  {
    number: "05",
    title: "Websites & Applications",
    description:
      "Responsive websites, dashboards, APIs, and full-stack applications.",
    icon: "💻",
  },
  {
    number: "06",
    title: "Business Software",
    description:
      "Custom software that helps businesses streamline their workflows.",
    icon: "📊",
  },
];

const projects = [
  {
    number: "01",
    title: "AI Emergency Response Assistant",
    category: "ARTIFICIAL INTELLIGENCE",
    description:
      "An AI-powered emergency management system that processes incident reports, classifies emergencies, extracts important details, and supports response coordination.",
    tags: ["Python", "FastAPI", "AI", "SQLite"],
    icon: "🚨",
    color: "from-orange-500/20 to-red-500/5",
    status: "In Development",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "02",
    title: "Voice-Controlled Humanoid Robot",
    category: "ROBOTICS & GENERATIVE AI",
    description:
      "A humanoid robot assistant combining voice interaction, a language model, and robot movement commands using Raspberry Pi and robotics software.",
    tags: ["Raspberry Pi", "LLM", "Python", "ROS 2"],
    icon: "🤖",
    color: "from-cyan-500/20 to-blue-500/5",
    status: "In Development",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "03",
    title: "Hardware-Integrated Quiz Platform",
    category: "WEB & EMBEDDED SYSTEMS",
    description:
      "An interactive quiz application featuring random questions, a countdown timer, score tracking, and physical answer buttons connected to Raspberry Pi.",
    tags: ["React", "JavaScript", "Raspberry Pi", "GPIO"],
    icon: "🎯",
    color: "from-violet-500/20 to-purple-500/5",
    status: "Project",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "04",
    title: "BCI-Controlled Robotic Hand",
    category: "BIOMEDICAL ROBOTICS",
    description:
      "A robotic hand project exploring human-machine interaction, flex sensors, servo actuation, and 3D-printed mechanical components.",
    tags: ["Arduino", "C++", "Flex Sensors", "Servos"],
    icon: "🦾",
    color: "from-emerald-500/20 to-teal-500/5",
    status: "Project",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "05",
    title: "Maze-Solving Robot",
    category: "AUTONOMOUS ROBOTICS",
    description:
      "An autonomous mobile robot designed to navigate a maze using distance sensing, motor control, and programmed navigation logic.",
    tags: ["Arduino", "C++", "Ultrasonic Sensor", "Motors"],
    icon: "🚗",
    color: "from-amber-500/20 to-yellow-500/5",
    status: "Project",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "06",
    title: "Custom Web Applications",
    category: "FULL-STACK DEVELOPMENT",
    description:
      "Custom web applications with responsive user interfaces, API integration, backend processing, and database connectivity.",
    tags: ["React", "TypeScript", "FastAPI", "SQL"],
    icon: "🌐",
    color: "from-pink-500/20 to-rose-500/5",
    status: "Available for Projects",
    image: "",
    github: "",
    demo: "",
  },
  
  {
    number: "07",
    title: "Line-Follower Robot",
    category: "AUTONOMOUS ROBOTICS",
    description:
      "An autonomous mobile robot that follows a predefined line using sensors and motor control. The project focuses on sensor calibration, path tracking, and reliable movement.",
    tags: ["Arduino", "C++", "IR Sensors", "Motor Control"],
    icon: "🚗",
    color: "from-lime-500/20 to-emerald-500/5",
    status: "Project",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "08",
    title: "Duckiebot Autonomous Robotics",
    category: "ROBOTICS & COMPUTER VISION",
    description:
      "Working on a Duckiebot robotics platform to explore autonomous navigation, lane following, camera-based perception, and ROS-based robotics workflows.",
    tags: ["Duckiebot", "ROS", "Computer Vision", "Python"],
    icon: "🦆",
    color: "from-yellow-500/20 to-orange-500/5",
    status: "In Progress",
    image: "",
    github: "",
    demo: "",
  },
  {
    number: "09",
    title: "LiDAR-Based Autonomous Mobile Robot",
    category: "AUTONOMOUS ROBOTICS",
    description:
      "A compact, car-like square mobile robot designed for autonomous navigation using a LiDAR sensor. The robot senses its surroundings, detects obstacles, and supports autonomous movement in its environment.",
    tags: [
      "LiDAR",
      "Mobile Robotics",
      "Autonomous Navigation",
      "Obstacle Detection",
    ],
    icon: "🤖",
    color: "from-blue-500/20 to-violet-500/5",
    status: "In Progress",
    image: "",
    github: "",
    demo: "",
  },
];

type TeamMember = {
  name: string;
  role: string;
  skills: string[];
  initials: string;
  bio: string;
  github: string;
  linkedin: string;
};

const team: TeamMember[] = [
  {
    name: "K. VenuGopal",
    role: "AI & Backend Developer",
    skills: ["Python", "FastAPI", "AI/ML", "SQL"],
    initials: "KV",
    bio: "Building intelligent applications, APIs, and software solutions.",
    github: "",
    linkedin: "",
  },
  {
    name: "P. Taraka Ramudu",
    role: "Robotics Developer",
    skills: ["ROS 2", "Arduino", "Robotics"],
    initials: "TR",
    bio: "Working on robotics, embedded systems, and hardware integration.",
    github: "",
    linkedin: "",
  },
  {
    name: "A. Yeshwini",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "CSS"],
    initials: "AY",
    bio: "Creating responsive, accessible, and engaging user interfaces.",
    github: "",
    linkedin: "",
  },
  {
    name: "P. Vandana",
    role: "IoT & Embedded Developer",
    skills: ["IoT", "Raspberry Pi", "C++"],
    initials: "PV",
    bio: "Connecting physical devices with practical software solutions.",
    github: "",
    linkedin: "",
  },
];

const technologies = [
  "Python",
  "Java",
  "C / C++",
  "React",
  "TypeScript",
  "FastAPI",
  "Artificial Intelligence",
  "Machine Learning",
  "ROS 2",
  "Raspberry Pi",
  "Arduino",
  "IoT",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    project: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          project_details: form.project.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        let errorMessage = "Unable to submit your inquiry.";

        if (Array.isArray(data.detail)) {
          errorMessage = data.detail
            .map((item: { msg?: string; loc?: (string | number)[] }) => {
              const field = item.loc?.at(-1);
              return field
                ? `${String(field)}: ${item.msg || "Invalid value"}`
                : item.msg || "Invalid input";
            })
            .join(". ");
        } else if (typeof data.detail === "string") {
          errorMessage = data.detail;
        } else if (typeof data.message === "string") {
          errorMessage = data.message;
        }

        throw new Error(
          `Request failed (${response.status}): ${errorMessage}`,
        );
      }

      setMessage(
        `Thank you, ${data.name || form.name.trim()}! Your inquiry has been submitted successfully.`,
      );
      setMessageType("success");

      setForm({
        name: "",
        email: "",
        service: "",
        project: "",
      });
    } catch (error) {
      console.error("Inquiry submission error:", error);

      if (error instanceof TypeError) {
        setMessage(
          `Could not connect to the backend at ${API_URL}. Make sure your FastAPI server is running and CORS is configured correctly.`,
        );
      } else {
        setMessage(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        );
      }

      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b14] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-48 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-48 top-[35rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080b14]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#home"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-black text-slate-950">
              T
            </span>
            <span className="text-lg font-bold tracking-tight">
              Tech<span className="text-cyan-400">Studio</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <a className="transition hover:text-cyan-400" href="#home">
              Home
            </a>
            <a className="transition hover:text-cyan-400" href="#services">
              Services
            </a>
            <a className="transition hover:text-cyan-400" href="#projects">
              Projects
            </a>
            <a className="transition hover:text-cyan-400" href="#team">
              Our Team
            </a>
            <a className="transition hover:text-cyan-400" href="#about">
              About
            </a>
          </div>

          <a
            href="#contact"
            className="hidden rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:inline-flex"
          >
            Start a Project ↗
          </a>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 px-3 py-2 lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {menuOpen && (
          <div className="grid gap-1 border-t border-white/10 px-5 py-4 lg:hidden">
            {[
              ["Home", "#home"],
              ["Services", "#services"],
              ["Projects", "#projects"],
              ["Our Team", "#team"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-cyan-400"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          className="mx-auto grid min-h-[660px] max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              ENGINEERING IDEAS INTO REALITY
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              We Build
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Intelligent
              </span>
              <span className="block">Technology.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              We turn ideas into working products with AI, robotics, embedded
              systems, IoT, and custom software built around your needs.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Explore Our Projects ↗
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/15 px-6 py-4 font-semibold transition hover:border-cyan-400/60 hover:bg-white/5"
              >
                Discuss Your Idea
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm text-slate-400">
              <span>✦ Custom Development</span>
              <span>✦ Hardware + Software</span>
              <span>✦ Startup Friendly</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-5 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#101624]/90 p-5 shadow-2xl shadow-cyan-950/20 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Engineering workspace
                  </p>
                  <p className="mt-1 font-semibold">Building the future</p>
                </div>
                <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                  ● Online
                </span>
              </div>

              <div className="my-7 grid grid-cols-2 gap-4">
                {[
                  ["🤖", "Robotics", "Intelligent machines"],
                  ["🧠", "Artificial Intelligence", "Smart applications"],
                  ["⚡", "Embedded", "Hardware systems"],
                  ["🌐", "Software", "Digital products"],
                ].map(([icon, title, subtitle]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-cyan-400/30"
                  >
                    <span className="text-3xl">{icon}</span>
                    <h3 className="mt-4 font-bold">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {subtitle}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Our approach</p>
                    <p className="mt-1 font-semibold">Idea → Design → Build</p>
                  </div>
                  <span className="text-2xl text-cyan-300">↗</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-24 sm:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="What We Do"
              title="Solutions built around you."
              description="From hardware prototypes to production-ready software, we help transform challenging ideas into practical technology."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="group rounded-2xl border border-white/[0.08] bg-[#0d111d] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{service.icon}</span>
                    <span className="text-xs tracking-widest text-slate-600">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Discuss your project ↗
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Our Portfolio"
              title="Projects we're building."
              description="Explore our work across artificial intelligence, robotics, embedded systems, and full-stack development."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.number}
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d111d] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div
                    className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${project.color}`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-7xl transition duration-500 group-hover:scale-110">
                        {project.icon}
                      </span>
                    )}
                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#080b14]/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-cyan-300">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold leading-7">
                        {project.title}
                      </h3>
                      <span className="text-xs text-slate-600">
                        {project.number}
                      </span>
                    </div>
                    <p className="mt-3 min-h-24 text-sm leading-7 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                      <span className="text-xs text-slate-500">
                        {project.status}
                      </span>
                      <div className="flex gap-3 text-sm">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            GitHub ↗
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Have a project idea?{" "}
              <a href="#contact" className="text-cyan-400 hover:underline">
                Let's build it together.
              </a>
            </p>
          </div>
        </section>

        {/* TEAM */}
        <section
          id="team"
          className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-24 sm:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Meet The Team"
              title="People behind the technology."
              description="A multidisciplinary team bringing software, AI, robotics, and embedded engineering together."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="group rounded-2xl border border-white/[0.08] bg-[#0d111d] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-400/30"
                >
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-2xl font-black text-cyan-200 transition group-hover:scale-105">
                    {member.initials}
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{member.name}</h3>
                  <p className="mt-2 text-sm font-medium text-cyan-400">
                    {member.role}
                  </p>
                  <p className="mt-4 min-h-16 text-sm leading-6 text-slate-400">
                    {member.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-white/[0.05] px-2 py-1 text-[11px] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {(member.github || member.linkedin) && (
                    <div className="mt-5 flex justify-center gap-4 text-sm">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0d111d] p-7 text-center sm:p-10">
              <h3 className="text-2xl font-bold">
                Want to collaborate with us?
              </h3>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
                We welcome opportunities to work with businesses, startups,
                and people who want to turn good ideas into useful products.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                Meet Us Through a Project ↗
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                About Our Studio
              </p>
              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
                Small team.
                <span className="block text-slate-400">
                  Big engineering ideas.
                </span>
              </h2>
              <p className="mt-6 leading-8 text-slate-400">
                We are a technology development team focused on designing and
                building practical solutions. Our work connects software with
                the physical world through AI, robotics, electronics, and IoT.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                Whether you're a startup validating an idea or a business
                looking for custom software, we aim to understand your
                requirements and build a solution that fits.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex rounded-xl border border-cyan-400/30 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
              >
                Tell Us About Your Idea ↗
              </a>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#0d111d] p-7 sm:p-9">
              <h3 className="text-xl font-bold">Our Technology Stack</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Tools we use across our projects. Actual technologies depend
                on each project's requirements.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-cyan-400/[0.06] p-4">
                  <p className="font-bold text-cyan-300">Software</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Web, APIs, and AI applications
                  </p>
                </div>
                <div className="rounded-xl bg-violet-400/[0.06] p-4">
                  <p className="font-bold text-violet-300">Hardware</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Robotics, electronics, and IoT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="border-t border-white/[0.06] bg-white/[0.015] px-5 py-24 sm:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Start a Conversation
              </p>
              <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
                Have an idea?
                <span className="mt-2 block text-slate-400">
                  Let's make it real.
                </span>
              </h2>
              <p className="mt-6 max-w-md leading-8 text-slate-400">
                Tell us what you're trying to build. Share your requirements
                and we'll review your inquiry to understand the next steps.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
                    ✉
                  </span>
                  <div>
                    <p className="font-semibold">Project inquiries</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Use the form to describe your requirements.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-xl">
                    ⚙
                  </span>
                  <div>
                    <p className="font-semibold">Custom solutions</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Software, AI, robotics, and embedded systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.08] bg-[#0d111d] p-6 sm:p-9"
            >
              <h3 className="text-2xl font-bold">
                Tell us about your project
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Fields marked with * are required.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Your name *
                  </span>
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-[#080b14] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Email address *
                  </span>
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-[#080b14] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  What do you need? *
                </span>
                <select
                  required
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#080b14] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Project details *
                </span>
                <textarea
                  required
                  minLength={5}
                  maxLength={10000}
                  rows={5}
                  value={form.project}
                  onChange={(e) =>
                    setForm({ ...form, project: e.target.value })
                  }
                  placeholder="Describe your idea, requirements, and goals..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#080b14] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </label>

              {message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${
                    messageType === "success"
                      ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                      : "border-red-400/20 bg-red-400/[0.07] text-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Project Inquiry ↗"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Your inquiry will be sent to our backend and saved in the
                database.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.08] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <a href="#home" className="text-lg font-bold">
            Tech<span className="text-cyan-400">Studio</span>
          </a>
          <p className="text-sm text-slate-500">
            Building practical technology through software, AI, and engineering.
          </p>
          <a
            href="#home"
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            Back to top ↑
          </a>
        </div>
        <p className="mx-auto mt-5 max-w-7xl text-center text-xs text-slate-600">
          © {new Date().getFullYear()} TechStudio. Replace with your official
          team or company name.
        </p>
      </footer>
    </div>
  );
}

export default App;
