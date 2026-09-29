export default function Contact() {
  return (
    <section id="contact" className="bg-stone-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Visit Us
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Come Have a Coffee With Us
          </h2>

          <p className="mt-4 leading-7 text-stone-300">
            Drop by for a fresh cup of coffee, delicious food and a
            relaxing atmosphere.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Contact Details */}
          <div className="space-y-5">

            {/* Address */}
            <div className="rounded-2xl border border-stone-700 bg-stone-800 p-6">
              <div className="flex gap-4">
                <div className="text-2xl">📍</div>

                <div>
                  <h3 className="text-lg font-bold">
                    Our Location
                  </h3>

                  <p className="mt-2 leading-6 text-stone-300">
                    123 Main Road, Salem,
                    <br />
                    Tamil Nadu - 636001
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-stone-700 bg-stone-800 p-6">
              <div className="flex gap-4">
                <div className="text-2xl">📞</div>

                <div>
                  <h3 className="text-lg font-bold">
                    Call Us
                  </h3>

                  <a
                    href="tel:+91 9514127195"
                    className="mt-2 block text-stone-300 transition hover:text-amber-400"
                  >
                    +91 9514127195
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="rounded-2xl border border-stone-700 bg-stone-800 p-6">
              <div className="flex gap-4">
                <div className="text-2xl">🕐</div>

                <div>
                  <h3 className="text-lg font-bold">
                    Opening Hours
                  </h3>

                  <p className="mt-2 text-stone-300">
                    Monday - Sunday
                  </p>

                  <p className="text-amber-400">
                    8:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919514127195?text=Hello%20BrewHouse%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-green-600 px-6 py-4 text-center font-bold transition hover:bg-green-500"
            >
              💬 Order on WhatsApp
            </a>

          </div>

          {/* Google Maps */}
          <div className="min-h-[450px] overflow-hidden rounded-3xl bg-stone-800">
            <iframe
              title="BrewHouse Location"
              src="https://www.google.com/maps?q=Salem,Tamil+Nadu&output=embed"
              className="h-full min-h-[450px] w-full border-0"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}