import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10">
      {/* Background Effects */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-600/20 via-slate-900 to-indigo-600/20 shadow-2xl">
          <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
                <Sparkles size={16} className="text-amber-400" />
                Travel Updates &amp; Exclusive Offers
              </div>

              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 ring-1 ring-blue-400/20">
                <Mail size={30} />
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Subscribe to Our{" "}
                <span className="text-blue-400">
                  Travel Newsletter
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Get exclusive travel deals, holiday packages, travel tips
                and special offers delivered directly to your inbox.
              </p>

              {/* Form */}
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="h-14 w-full rounded-xl border border-white/10 bg-white px-5 pl-11 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-400"
                  >
                    Subscribe Now
                    <Send
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </form>
              ) : (
                <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 size={20} />
                  You're subscribed! Watch your inbox for our latest travel
                  updates.
                </div>
              )}

              {/* Trust Text */}
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400 sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  No spam
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  Exclusive offers
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  Unsubscribe anytime
                </div>
              </div>
            </div>

            {/* Bottom Benefits */}
            <div className="mx-auto mt-12 grid max-w-4xl gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <p className="text-sm font-bold text-white">
                  Best Travel Deals
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Discover special offers and package deals.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <p className="text-sm font-bold text-white">
                  Travel Inspiration
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Get ideas for your next unforgettable journey.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-center">
                <p className="text-sm font-bold text-white">
                  Expert Tips
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Helpful tips to make your travel easier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Small CTA */}
        <div className="mt-6 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            Need help planning your trip?
            <span className="text-blue-400">Contact our team</span>
            <ArrowRight
              size={15}
              className="text-blue-400 transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;