const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="font-semibold text-orange-600 mb-2">
            Shri Mandir
          </h3>
          <p className="text-sm text-gray-600">
            Connecting devotees with divine rituals, pooja services,
            and Vedic guidance.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Pooja Services</li>
            <li>Chadhava</li>
            <li>Instant Solutions</li>
            <li>Vedic Science</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Mandir</li>
            <li>Media</li>
            <li>Live Katha</li>
            <li>About Guru</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-600">
            Email: support@shrismandir.com
          </p>
        </div>
      </div>

      <div className="border-t text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} Shri Mandir. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;