const menuItems = [
  {
    name: "Cappuccino",
    description: "Rich espresso with steamed milk and smooth foam.",
    price: "₹140",
    image:
      "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Classic Latte",
    description: "Smooth espresso blended with creamy steamed milk.",
    price: "₹160",
    image:
      "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Espresso",
    description: "Strong and aromatic freshly brewed espresso.",
    price: "₹100",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cold Coffee",
    description: "Chilled creamy coffee perfect for a refreshing break.",
    price: "₹180",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chocolate Cake",
    description: "Soft chocolate cake with a rich chocolate flavour.",
    price: "₹150",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Club Sandwich",
    description: "Fresh vegetables, cheese and delicious toasted bread.",
    price: "₹190",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="bg-stone-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Our Menu
          </p>

          <h2 className="text-4xl font-bold text-stone-900 sm:text-5xl">
            Our Premium Selection
          </h2>

          <p className="mt-4 leading-7 text-stone-600">
            Freshly prepared coffee, delicious desserts and tasty bites
            made with quality ingredients.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-stone-900">
                    {item.name}
                  </h3>

                  <span className="whitespace-nowrap text-lg font-bold text-amber-700">
                    {item.price}
                  </span>
                </div>

                <p className="mb-5 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>

                <a
                  href="#contact"
                  className="inline-block rounded-full border border-amber-700 px-5 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-700 hover:text-white"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}