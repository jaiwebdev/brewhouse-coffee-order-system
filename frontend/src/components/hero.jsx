export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center bg-gray-950"
    >

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Welcome to BrewHouse
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
            Fresh Coffee.
            <br />
            <span className="text-amber-400">
              Warm Moments.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-200">
            Enjoy freshly brewed coffee, delicious snacks and a cozy
            atmosphere made for relaxing, working and sharing moments.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#menu"
              className="rounded-full bg-amber-500 px-7 py-3.5 font-semibold text-gray-950 transition hover:bg-amber-400"
            >
              Explore Menu
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-gray-950"
            >
              Visit Us
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}