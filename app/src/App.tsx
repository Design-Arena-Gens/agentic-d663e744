import { useMemo, useState } from "react";
import { IconCompass, IconFriends, IconSparkles } from "./components/Icons";
import { QuickEntryModal } from "./components/QuickEntryModal";

const highlights = [
  {
    title: "Instant Matching",
    description:
      "Drop in and get paired with someone new in seconds. No installs or registrations required.",
    icon: IconCompass,
  },
  {
    title: "Privacy First",
    description:
      "Stay anonymous until you decide to connect. We never expose your personal information.",
    icon: IconSparkles,
  },
  {
    title: "Build Connections",
    description:
      "Send friend requests during chats and keep the conversation going in your friends list.",
    icon: IconFriends,
  },
];

function App() {
  const [isQuickEntryOpen, setIsQuickEntryOpen] = useState(false);

  const heroStats = useMemo(
    () => [
      { label: "Active now", value: "4,823" },
      { label: "Matches today", value: "12,406" },
      { label: "Friend requests sent", value: "38,217" },
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-40 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 font-semibold text-white">
            ql
          </div>
          <div>
            <p className="text-lg font-semibold text-white">QuickLink</p>
            <p className="text-xs text-slate-400">
              Random Stranger Chat, Reinvented
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#features">
            Features
          </a>
          <a className="transition hover:text-white" href="#subscriptions">
            Premium
          </a>
          <a className="transition hover:text-white" href="#safety">
            Safety
          </a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
            Sign in
          </button>
          <button className="rounded-md bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:shadow-indigo-500/40">
            Join waitlist
          </button>
        </div>
        <button
          className="rounded-md border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white md:hidden"
          onClick={() => setIsQuickEntryOpen(true)}
        >
          Quick entry
        </button>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-10">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-1 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Now matching 4k+ people worldwide
            </div>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              Meet someone new in under 5 seconds.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              QuickLink pairs you with real people in real-time. Jump straight
              into a conversation, send a friend request if you vibe, and keep
              your identity private until you choose otherwise.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
                onClick={() => setIsQuickEntryOpen(true)}
              >
                Start matching
              </button>
              <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition hover:border-slate-500 hover:text-white">
                Explore features
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-300 sm:max-w-xl">
              {heroStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-indigo-900/30">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Live match feed
                </p>
                <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-emerald-950">
                  Online
                </span>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-200">
                <p>
                  <span className="font-semibold text-white">Aria · 22</span>{" "}
                  matched with{" "}
                  <span className="font-semibold text-white">
                    SkyCoder · 21
                  </span>{" "}
                  18 seconds ago
                </p>
                <p>
                  <span className="font-semibold text-white">NovaByte · 19</span>{" "}
                  sent a friend request to{" "}
                  <span className="font-semibold text-white">Liam · 20</span>
                </p>
                <p>
                  <span className="font-semibold text-white">Kai · 24</span>{" "}
                  unlocked gender filters with Premium+
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Quick entry
                </p>
                <p className="mt-2 text-base text-slate-300">
                  Choose a username, pick your vibe, and start meeting new
                  people instantly.
                </p>
                <button
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:shadow-lg hover:shadow-indigo-500/30"
                  onClick={() => setIsQuickEntryOpen(true)}
                >
                  Launch quick entry
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-12">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-400">
              Why QuickLink works
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Built for real conversations — not endless swiping.
            </h2>
            <p className="max-w-3xl text-base text-slate-300">
              We obsess over the details so you can focus on the people. From
              lightning-fast random matching to smart friend suggestions,
              everything is designed to help you connect effortlessly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-indigo-500/60 hover:bg-slate-900/80"
              >
                <div className="absolute inset-0 opacity-0 blur-xl transition group-hover:opacity-100">
                  <div className="absolute -left-12 top-20 h-32 w-32 rounded-full bg-indigo-500/20" />
                </div>
                <div className="relative flex h-full flex-col gap-4">
                  <feature.icon className="h-10 w-10 text-indigo-400" />
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="safety"
          className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-8 sm:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-400">
                Safety & Moderation
              </p>
              <h2 className="text-3xl font-semibold text-white">
                We keep every conversation respectful.
              </h2>
              <p className="text-base text-slate-300">
                Our proactive moderation tools and admin dashboard protect the
                community 24/7. Report inappropriate behavior with one tap and
                let our team handle the rest.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                Live content scanning with instant flags for harmful behavior.
              </li>
              <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                Admin team reviews reports in real-time with advanced tooling.
              </li>
              <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                Transparent community guidelines keep everyone on the same page.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-950/90 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} QuickLink Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a className="transition hover:text-white" href="#">
              Privacy
            </a>
            <a className="transition hover:text-white" href="#">
              Terms
            </a>
            <a className="transition hover:text-white" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>

      <QuickEntryModal
        open={isQuickEntryOpen}
        onClose={() => setIsQuickEntryOpen(false)}
      />
    </div>
  );
}

export default App;
