export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <a href="#home" className="text-2xl font-bold text-white">
          Brew<span className="text-amber-400">House</span>
        </a>

        {/* Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-white transition hover:text-amber-400"
          >
            Home
          </a>

          <a
            href="#menu"
            className="text-white transition hover:text-amber-400"
          >
            Menu
          </a>

          <a
            href="#about"
            className="text-white transition hover:text-amber-400"
          >
            About
          </a>

          <a
            href="#gallery"
            className="text-white transition hover:text-amber-400"
          >
            Gallery
          </a>

          <a
            href="#contact"
            className="text-white transition hover:text-amber-400"
          >
            Contact
          </a>
        </div>
   <a
  href="/track-order"
  className="hover:text-amber-400 text-white transition"
>
  Track Order
</a>
        {/* Order Button */}
        <a
          href="#menu"
          className="rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-gray-950 transition hover:bg-amber-400"
        >
          Order Now
        </a>
      </div>
    </nav>
  );
}