function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            WorldTrip Connect
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Travel smarter. Explore more. Travel better.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 WorldTrip Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;