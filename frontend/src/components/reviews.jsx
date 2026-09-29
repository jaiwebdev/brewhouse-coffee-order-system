const reviews = [
  {
    name: "Arun Kumar",
    role: "Regular Customer",
    review:
      "Amazing coffee and a beautiful atmosphere. The staff are friendly and the service is excellent.",
  },
  {
    name: "Priya S",
    role: "Coffee Lover",
    review:
      "Really loved the cappuccino and desserts. Perfect place to spend time with friends.",
  },
  {
    name: "Rahul M",
    role: "Local Guide",
    review:
      "One of my favourite places for coffee. Great taste, peaceful ambience and quick service.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-stone-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Customer Reviews
          </p>

          <h2 className="text-4xl font-bold text-stone-900 sm:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mt-4 leading-7 text-stone-600">
            We love hearing from the people who visit our cafe.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="mb-5 text-lg text-amber-500">
                ★★★★★
              </div>

              {/* Review */}
              <p className="leading-7 text-stone-600">
                “{review.review}”
              </p>

              {/* Customer */}
              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-700 font-bold text-white">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-stone-900">
                    {review.name}
                  </h3>

                  <p className="text-sm text-stone-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}