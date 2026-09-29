import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  GraduationCap,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import heroImage from "@/assets/agc-sarovar-hero.jpg";
import { Button } from "@/components/ui/button";

const APPLY_URL = "https://agcnest.in/";
const PHONE = "+918872009951";

const schools = [
  {
    name: "Engineering",
    programs: ["B.Tech Computer Science", "B.Tech AI & Machine Learning", "B.Tech Civil", "B.Tech Mechanical", "M.Tech"],
  },
  { name: "Management", programs: ["MBA", "BBA", "B.Com (Hons)", "M.Com"] },
  { name: "Computing", programs: ["BCA", "MCA", "M.Sc Computer Science"] },
  { name: "Health Sciences", programs: ["B.Pharm", "D.Pharm", "M.Pharm", "B.Sc Medical Lab Sciences", "B.Sc Radiology"] },
  { name: "Design & Hospitality", programs: ["B.Sc Fashion Design", "Hotel Management", "Tourism & Travel Management"] },
];

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,16}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  program: z.string().trim().min(1, "Choose a program"),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Admissions 2026 — Amritsar Group of Colleges" },
      { name: "description", content: "Explore 50+ programs, scholarships and admissions at Amritsar Group of Colleges. Register for AGC-NEST 2026." },
      { property: "og:title", content: "Admissions 2026 — Amritsar Group of Colleges" },
      { property: "og:description", content: "Build your future with 50+ industry-aligned programs and scholarship opportunities at AGC Amritsar." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        name: "Amritsar Group of Colleges",
        address: { "@type": "PostalAddress", streetAddress: "12 Km Stone, Amritsar-Jalandhar G.T. Road", addressLocality: "Amritsar", addressRegion: "Punjab", postalCode: "143001", addressCountry: "IN" },
        telephone: "+91 88720 09951",
        email: "admission@acetedu.in",
        url: "https://www.agcamritsar.com/",
      }),
    }],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  const [school, setSchool] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = enquirySchema.safeParse(Object.fromEntries(form));
    if (!result.success) {
      setFormMessage(result.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    const subject = encodeURIComponent(`Admission enquiry — ${result.data.program}`);
    const body = encodeURIComponent(`Name: ${result.data.name}\nPhone: ${result.data.phone}\nEmail: ${result.data.email}\nProgram: ${result.data.program}`);
    window.location.href = `mailto:admission@acetedu.in?subject=${subject}&body=${body}`;
    setFormMessage("Your email app is opening with the enquiry details.");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/15 bg-deep-teal/95 text-primary-foreground backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="AGC home">
            <span className="grid size-10 place-items-center border border-gold font-display text-lg font-bold text-gold">A</span>
            <span className="leading-tight"><strong className="block font-display text-lg">AGC Amritsar</strong><span className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/65">Admissions 2026</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Main navigation">
            <a className="hover:text-gold" href="#programs">Programs</a><a className="hover:text-gold" href="#admissions">Admissions</a><a className="hover:text-gold" href="#campus">Campus</a><a className="hover:text-gold" href="#enquire">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="gold" size="sm"><a href={APPLY_URL} target="_blank" rel="noreferrer">Apply now <ArrowRight size={16} /></a></Button>
            <Button className="lg:hidden" variant="ghost" size="icon" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="grid gap-1 border-t border-primary-foreground/15 px-5 py-4 text-sm lg:hidden">{["programs", "admissions", "campus", "enquire"].map((item) => <a key={item} className="py-2 capitalize" href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative min-h-[760px] bg-deep-teal pt-18 text-primary-foreground lg:min-h-[800px]">
          <img src={heroImage} alt="A contemporary academic campus reflected in calm water at sunrise" width={1920} height={1200} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-deep-teal/55" />
          <div className="absolute inset-0 bg-linear-to-t from-deep-teal via-transparent to-deep-teal/25" />
          <div className="relative mx-auto flex min-h-[690px] max-w-7xl flex-col justify-center px-5 pb-24 pt-20 lg:px-8">
            <div className="hero-enter max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 border border-gold/70 bg-deep-teal/55 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur"><ShieldCheck size={15} /> UGC Autonomous · NAAC Grade A</div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] sm:text-7xl lg:text-8xl">The future<br />looks like you.</h1>
              <div aria-hidden="true" className="ripple-once mt-1 max-w-4xl origin-top scale-y-[-1] overflow-hidden text-5xl font-bold leading-[0.98] opacity-20 blur-[0.5px] sm:text-7xl lg:text-8xl">The future<br />looks like you.</div>
              <p className="mt-2 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">Choose from 50+ industry-aligned programs and shape a career that travels beyond the classroom.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="gold"><a href={APPLY_URL} target="_blank" rel="noreferrer">Apply for 2026 <ArrowRight size={18} /></a></Button><Button asChild variant="outline"><a href={`tel:${PHONE}`}><Phone size={17} /> Call admissions</a></Button></div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-6" aria-label="Recruiters">
          <div className="mx-auto grid max-w-7xl items-center gap-5 px-5 lg:grid-cols-[1fr_3fr] lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Careers with leading teams</p><div className="grid grid-cols-3 gap-4 text-center font-display text-lg font-bold text-foreground/65 sm:grid-cols-6">{["Amazon", "TCS", "Infosys", "Wipro", "Intel", "Bosch"].map((name) => <span key={name}>{name}</span>)}</div></div>
        </section>

        <section id="programs" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Find your direction" title="One campus. Many ways forward." copy="Explore undergraduate and postgraduate programs across high-growth disciplines." />
            <div className="mt-12 border-y border-border">
              <div className="flex gap-1 overflow-x-auto border-b border-border py-3" role="tablist">{schools.map((item, index) => <button key={item.name} role="tab" aria-selected={school === index} onClick={() => setSchool(index)} className={`min-h-11 shrink-0 rounded-sm px-4 text-sm font-semibold transition ${school === index ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{item.name}</button>)}</div>
              <div className="grid gap-8 py-10 lg:grid-cols-[1fr_2fr]"><div><p className="text-sm uppercase tracking-[0.15em] text-magenta">School of</p><h3 className="mt-2 text-3xl font-bold">{schools[school].name}</h3></div><div className="grid gap-px bg-border sm:grid-cols-2">{schools[school].programs.map((program) => <a href={APPLY_URL} target="_blank" rel="noreferrer" key={program} className="group flex min-h-20 items-center justify-between bg-background px-5 font-semibold hover:bg-card">{program}<ArrowRight size={18} className="text-gold transition group-hover:translate-x-1" /></a>)}</div></div>
            </div>
          </div>
        </section>

        <section id="admissions" className="bg-deep-teal py-20 text-primary-foreground sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Admissions" title="Your next chapter, in four steps." copy="AGC-NEST is the official route to admission and scholarship consideration for 2026." inverse />
            <ol className="mt-14 grid gap-px bg-primary-foreground/20 md:grid-cols-4">{[
              ["01", "Register", "Complete the official AGC-NEST registration form."], ["02", "Pay ₹500", "Submit the published online registration fee."], ["03", "Take AGC-NEST", "Appear for the online scholarship entrance test."], ["04", "Confirm admission", "Complete counselling and secure your chosen program."],
            ].map(([number, title, copy]) => <li key={number} className="min-h-64 bg-deep-teal p-7"><span className="font-display text-5xl font-bold text-gold">{number}</span><h3 className="mt-12 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/70">{copy}</p></li>)}</ol>
            <div className="mt-8"><Button asChild variant="gold"><a href={APPLY_URL} target="_blank" rel="noreferrer">Start your application <ArrowRight size={18} /></a></Button></div>
          </div>
        </section>

        <section id="campus" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-2">
              <div><SectionHeading eyebrow="Life at AGC" title="Space to learn. People to grow with." copy="A connected campus experience with academics, accommodation and career support in one place." /><div className="mt-10 grid grid-cols-2 gap-px bg-border">{[["16", "acre campus", Building2], ["50+", "programs", GraduationCap], ["961+", "recruiters", Users], ["₹1.5 Cr", "highest package", ArrowRight]].map(([value, label, Icon]) => { const FactIcon = Icon as typeof Building2; return <div className="bg-background p-5" key={label as string}><FactIcon className="mb-6 text-magenta" size={21} /><strong className="block font-display text-3xl">{value as string}</strong><span className="text-sm text-muted-foreground">{label as string}</span></div>; })}</div></div>
              <div><p className="text-sm font-semibold uppercase tracking-[0.15em] text-magenta">Questions, answered</p><div className="mt-5 divide-y divide-border border-y border-border">{[
                ["Who can apply for AGC-NEST?", "Prospective students seeking admission to AGC programs can register. Program-specific eligibility is confirmed during counselling."],
                ["Are scholarships available?", "AGC publishes scholarship opportunities up to ₹1.5 lakh based on AGC-NEST performance."],
                ["Is hostel accommodation available?", "Yes. AGC publishes on-campus hostel facilities for students."],
                ["Does MBA require the entrance test?", "MBA admission is based on graduation marks. Registration is mandatory, but AGC states no entrance exam is required."],
              ].map(([question, answer]) => <details className="group py-5" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{question}<ChevronDown className="shrink-0 transition group-open:rotate-180" size={19} /></summary><p className="max-w-xl pt-4 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></div>
            </div>
          </div>
        </section>

        <section id="enquire" className="bg-secondary py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div><SectionHeading eyebrow="Talk to admissions" title="Let’s find your program." copy="Share your details and the admissions team can help with eligibility, scholarships and next steps." /><div className="mt-9 space-y-5 text-sm"><a className="flex items-start gap-3" href={`tel:${PHONE}`}><Phone className="text-magenta" size={19} /> +91 88720 09951</a><a className="flex items-start gap-3" href="mailto:admission@acetedu.in"><MessageCircle className="text-magenta" size={19} /> admission@acetedu.in</a><p className="flex items-start gap-3 leading-6"><MapPin className="shrink-0 text-magenta" size={19} /> 12 Km Stone, Amritsar-Jalandhar G.T. Road,<br />Amritsar, Punjab 143001</p></div></div>
            <form onSubmit={submitEnquiry} noValidate className="grid gap-5 bg-card p-6 shadow-sm sm:grid-cols-2 sm:p-8">
              <Field label="Full name" name="name" placeholder="Your name" /><Field label="Phone number" name="phone" type="tel" placeholder="+91 98765 43210" /><Field label="Email address" name="email" type="email" placeholder="you@example.com" /><label className="grid gap-2 text-sm font-semibold">Program interest<select name="program" className="h-12 rounded-sm border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"><option value="">Choose a program</option>{schools.flatMap((item) => item.programs).map((program) => <option key={program}>{program}</option>)}</select></label>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Send enquiry <ArrowRight size={18} /></Button>{formMessage && <p role="status" className="mt-3 text-sm text-muted-foreground">{formMessage}</p>}<p className="mt-4 flex gap-2 text-xs text-muted-foreground"><Check size={15} className="shrink-0 text-magenta" />Your details are used only to respond to this enquiry.</p></div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-deep-teal pb-24 pt-12 text-primary-foreground md:pb-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-end lg:px-8"><div><strong className="font-display text-2xl">Amritsar Group of Colleges</strong><p className="mt-2 max-w-md text-sm text-primary-foreground/60">UGC Autonomous · NAAC Grade A · Building careers from Amritsar.</p></div><div className="flex gap-5 text-sm"><a href="#programs">Programs</a><a href="#admissions">Admissions</a><a href="#enquire">Contact</a></div></div></footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card p-2 shadow-lg md:hidden"><Button asChild size="sm"><a href={APPLY_URL} target="_blank" rel="noreferrer">Apply</a></Button><Button asChild variant="ghost" size="sm"><a href={`tel:${PHONE}`}><Phone size={16} /> Call</a></Button><Button asChild variant="ghost" size="sm"><a href={`https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent("Hello, I would like information about AGC admissions.")}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a></Button></div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, inverse = false }: { eyebrow: string; title: string; copy: string; inverse?: boolean }) {
  return <div className="max-w-2xl"><p className={`text-sm font-semibold uppercase tracking-[0.16em] ${inverse ? "text-gold" : "text-magenta"}`}>{eyebrow}</p><h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h2><p className={`mt-5 max-w-xl leading-7 ${inverse ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{copy}</p></div>;
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} type={type} placeholder={placeholder} className="h-12 rounded-sm border border-input bg-background px-3 font-normal outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" /></label>;
}