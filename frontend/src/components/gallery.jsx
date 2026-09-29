const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    title: "Fresh Coffee",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    title: "Coffee House",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    title: "Cozy Interior",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80",
    title: "Morning Coffee",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    title: "Coffee & Dessert",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    title: "Relax & Enjoy",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-stone-950 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Our Gallery
          </p>

          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            A Taste of BrewHouse
          </h2>

          <p className="mt-4 leading-7 text-stone-400">
            Take a look at our coffee, food and cozy cafe atmosphere.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <div
              key={item.title}
              className="group relative h-72 overflow-hidden rounded-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 opacity-0 transition duration-300 group-hover:opacity-100">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}