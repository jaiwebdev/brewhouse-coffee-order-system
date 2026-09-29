export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* About */}
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80"
              alt="Coffee shop interior"
              className="h-[450px] w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              About Us
            </p>

            <h2 className="text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
              More Than Just
              <span className="text-amber-700"> Coffee</span>
            </h2>

            <p className="mt-6 leading-8 text-stone-600">
              At BrewHouse, we believe a great cup of coffee can make
              an ordinary day special. Our coffee is freshly prepared
              using carefully selected beans and quality ingredients.
            </p>

            <p className="mt-4 leading-8 text-stone-600">
              Whether you're meeting friends, working on your laptop or
              simply enjoying some quiet time, our cozy space is made
              for you.
            </p>

            <a
              href="#contact"
              className="mt-7 inline-block rounded-full bg-stone-900 px-7 py-3.5 font-semibold text-white transition hover:bg-amber-700"
            >
              Visit Our Cafe
            </a>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">

          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Why Choose Us
            </p>

            <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Made With Passion
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card 1 */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-7 text-center transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
                ☕
              </div>

              <h3 className="text-xl font-bold text-stone-900">
                Fresh Coffee
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Freshly brewed coffee made with quality beans.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-7 text-center transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
                🌿
              </div>

              <h3 className="text-xl font-bold text-stone-900">
                Quality Ingredients
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Carefully selected ingredients for great taste.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-7 text-center transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
                🛋️
              </div>

              <h3 className="text-xl font-bold text-stone-900">
                Cozy Atmosphere
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                A comfortable place to relax, work and meet friends.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-7 text-center transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
                ❤️
              </div>

              <h3 className="text-xl font-bold text-stone-900">
                Made With Love
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Every cup and dish is prepared with care and passion.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}