import { getDatabase } from '@/lib/notion';
import ProjectCard from '@/components/ProjectCard';
import { Reveal } from '@/hooks/useScrollReveal';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  let projects: any[] = [];

  if (databaseId) {
    try {
      projects = await getDatabase(databaseId);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }

  const capabilities = [
    { title: 'Product Design', desc: 'Crafting intuitive interfaces that solve real-world problems.' },
    { title: 'System Architecture', desc: 'Building scalable, high-performance digital foundations.' },
    { title: 'Brand Identity', desc: 'Defining unique visual languages for modern companies.' },
    { title: 'Motion Direction', desc: 'Bringing interfaces to life with purposeful interaction.' },
    { title: 'AI Implementation', desc: 'Integrating cutting-edge intelligence into products.' },
    { title: 'Content Strategy', desc: 'Telling compelling stories through digital mediums.' },
  ];

  const partners = ['Supa Blox', 'Hype Blox', 'Frame Blox', 'Ultra Blox'];

  return (
    <div className="bg-black text-white selection:bg-orange-500/30">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full px-6 py-8 sm:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tighter">NAM SUJI</Link>
          <div className="hidden space-x-10 text-sm font-medium tracking-wide text-zinc-400 sm:flex">
            <Link href="#work" className="hover:text-white transition-colors">Work</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#contact" className="hover:text-white transition-colors font-bold text-white">Get in touch →</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center px-6 pt-20 sm:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-60 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <Reveal>
            <span className="mb-4 block text-sm font-bold tracking-widest text-orange-500 uppercase">Hey, I'm Suji</span>
          </Reveal>
          <Reveal className="delay-100">
            <h1 className="mb-8 text-6xl font-black leading-[0.9] tracking-tighter sm:text-9xl">
              Creative <br /> <span className="text-glow">Director</span>
            </h1>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal className="delay-300">
              <p className="max-w-md text-lg leading-relaxed text-zinc-400">
                Great design should feel <span className="text-white font-bold">invisible</span>.
                I help brands connect with their audience through purposeful, motion-driven design solutions.
              </p>
            </Reveal>

            <div className="flex items-end justify-start lg:justify-end">
              <Reveal className="delay-500">
                <Link href="#work" className="group flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-black transition-transform hover:scale-110 active:scale-95">
                  <svg className="h-6 w-6 transform transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Mini Services Overlay */}
        <div className="absolute bottom-12 left-6 right-6 z-10 hidden sm:block">
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4 border-t border-white/10 pt-8">
            {['Brand Architecture', 'Interface Design', 'Motion Narrative', 'System Logic'].map((s, i) => (
              <div key={s} className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500">#0{i + 1}</span>
                <p className="text-xs font-bold tracking-wide text-zinc-300 uppercase">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-zinc-900 px-6 py-12 sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 opacity-40 grayscale">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Trusted by Brands</span>
          {partners.map(p => (
            <div key={p} className="flex items-center gap-2 font-black text-lg">{p}</div>
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-6 py-32 sm:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="mb-4 block text-sm font-bold text-orange-500 uppercase tracking-widest">About the Vision</span>
              </Reveal>
              <Reveal className="delay-100">
                <h2 className="text-4xl font-black leading-tight sm:text-6xl tracking-tighter">
                  Shaping Experiences <br /> That Make Life Simpler
                </h2>
              </Reveal>
            </div>
            <div className="flex flex-col justify-end">
              <Reveal className="delay-300">
                <p className="mb-8 max-w-md text-zinc-400 leading-relaxed text-lg">
                  I'm a product designer focused on building clean, intuitive interfaces that solve real-world problems. Let's build something meaningful together.
                </p>
                <Link href="#contact" className="inline-flex items-center space-x-3 text-sm font-bold uppercase tracking-widest text-white hover:text-orange-500 transition-colors">
                  <span>Get in touch</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 tracking-normal group-hover:bg-zinc-700">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Grid */}
      <section id="work" className="bg-white text-black px-6 py-32 sm:px-12 rounded-t-[3rem]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex items-end justify-between">
            <Reveal>
              <h2 className="text-4xl font-black tracking-tighter sm:text-6xl">Featured Work</h2>
            </Reveal>
            <Reveal className="hidden sm:block">
              <Link href="#all" className="text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">All Work ↗</Link>
            </Reveal>
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            {!databaseId ? (
              <div className="col-span-full border-2 border-dashed border-zinc-200 p-20 text-center rounded-3xl">
                <p className="text-zinc-400 font-bold uppercase tracking-widest">Configuration Required</p>
              </div>
            ) : projects.filter(p => !!p.cover).map((project, i) => (
              <Reveal key={project.id} className={i % 2 === 1 ? 'sm:mt-24' : ''}>
                <ProjectCard
                  id={project.id}
                  title={project.properties.Name.title[0]?.plain_text || 'Untitled'}
                  description={project.properties.Description?.rich_text[0]?.plain_text || ''}
                  thumbnail={project.cover?.external?.url || project.cover?.file?.url}
                  tags={project.properties.Tag?.select ? [project.properties.Tag.select.name] : (project.properties.Tag?.multi_select?.map((t: any) => t.name) || [])}
                  date={project.properties.Date?.date?.start}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section id="about" className="bg-black text-white px-6 py-32 sm:px-12 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex items-end justify-between">
            <Reveal>
              <h2 className="text-4xl font-black tracking-tighter sm:text-6xl">Evolution</h2>
            </Reveal>
            <Reveal className="hidden sm:block">
              <Link href="#all" className="text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">All Milestones ↗</Link>
            </Reveal>
          </div>
          <div className="relative space-y-24 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {projects.filter(p => p.properties.Date?.date?.start).map((item, index) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black text-white absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 group-hover:border-orange-500 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,77,0,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-white group-hover:bg-orange-500 transition-colors" />
                </div>
                <Reveal className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all hover:bg-white/[0.07] cursor-default hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(255,77,0,0.1)]`}>
                  <div className="flex items-center justify-between mb-4">
                    <time className="font-bold text-orange-400 text-lg leading-none">{item.properties.Date?.date?.start.split('-')[0] || 'Present'}</time>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400 ring-1 ring-white/10 group-hover:ring-orange-500/30 transition-all">
                      {item.properties.Tag?.select?.name || item.properties.Tag?.multi_select?.[0]?.name || 'Project'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight leading-tight">
                    {item.properties.Name.title[0]?.plain_text}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {item.properties.Description?.rich_text[0]?.plain_text}
                  </p>
                </Reveal>
              </div>
            ))}
            {/* Fallback if no items with dates in Notion */}
            {projects.filter(p => p.properties.Date?.date?.start).length === 0 && (
              <div className="text-center text-zinc-500 italic">No evolution items found. Add items with a 'Date' in Notion.</div>
            )}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section id="contact" className="bg-black px-6 py-48 text-center">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-12 text-5xl font-black tracking-tighter sm:text-8xl">Let's work <br /> together.</h2>
          </Reveal>
          <Reveal className="delay-200">
            <a href="mailto:hello@example.com" className="text-3xl font-bold text-orange-500 hover:text-orange-400 transition-colors sm:text-5xl">hello@nesuji.com</a>
          </Reveal>

          <div className="mt-20 flex justify-center space-x-12 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">Dribbble</a>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/5 px-6 py-12 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
        <p>&copy; {new Date().getFullYear()} Nam Suji. All rights reserved.</p>
      </footer>
    </div>
  );
}
