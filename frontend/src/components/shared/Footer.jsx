import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyle =
    "text-gray-600 hover:text-red-600 transition-colors duration-200";

  return (
    <footer className="mt-20 border-t-2 border-black bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-14">

          {/* Brand */}
          <div className="col-span-2">
            <Link to="/">
              <h1 className="text-4xl font-black tracking-tight">
                <span className="text-gray-900">khabar</span>
                <span className="text-red-600">Setu</span>
              </h1>
            </Link>

            <p className="mt-5 text-gray-500 leading-7 max-w-sm">
              Stay informed with trusted journalism, breaking news,
              insightful analysis, and stories that matter across India.
            </p>
          </div>

          {/* About */}
          <div>
            <h2 className="font-bold text-lg">About</h2>
            <div className="w-10 h-1 bg-red-600 rounded-full mt-2 mb-5"></div>

            <ul className="space-y-3">
              <li><Link className={linkStyle} to="/about">About Us</Link></li>
              <li><Link className={linkStyle} to="/">Our Team</Link></li>
              <li><Link className={linkStyle} to="/">Careers</Link></li>
              <li><Link className={linkStyle} to="/">Advertise</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="font-bold text-lg">Legal</h2>
            <div className="w-10 h-1 bg-red-600 rounded-full mt-2 mb-5"></div>

            <ul className="space-y-3">
              <li><Link className={linkStyle} to="/">Privacy Policy</Link></li>
              <li><Link className={linkStyle} to="/">Terms of Service</Link></li>
              <li><Link className={linkStyle} to="/">Cookie Policy</Link></li>
              <li><Link className={linkStyle} to="/">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-bold text-lg">Categories</h2>
            <div className="w-10 h-1 bg-red-600 rounded-full mt-2 mb-5"></div>

            <ul className="space-y-3">
              <li><Link className={linkStyle} to="/">Politics</Link></li>
              <li><Link className={linkStyle} to="/">Business</Link></li>
              <li><Link className={linkStyle} to="/">Technology</Link></li>
              <li><Link className={linkStyle} to="/">Sports</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h2 className="font-bold text-lg">Connect</h2>
            <div className="w-10 h-1 bg-red-600 rounded-full mt-2 mb-5"></div>

            <ul className="space-y-3">
              <li><a className={linkStyle} href="/">Instagram</a></li>
              <li><a className={linkStyle} href="/">Twitter</a></li>
              <li><a className={linkStyle} href="/">LinkedIn</a></li>
              <li><a className={linkStyle} href="/">YouTube</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}

        <div className="border-t mt-16 pt-14 text-center">

          <h2 className="text-5xl font-black tracking-tight">
            <span className="text-gray-900">khabar</span>
            <span className="text-red-600">Setu</span>
          </h2>

          <p className="mt-4 text-2xl font-semibold">
            Bridging India With Trusted News
          </p>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-7">
            Delivering accurate, unbiased and timely journalism to keep
            readers informed every day.
          </p>

          <button className="mt-8 rounded-md bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700">
            Subscribe to Newsletter
          </button>

          <div className="mt-12 border-t pt-6">
            <p className="text-sm text-gray-500">
              © 2026 KhabarSetu. All Rights Reserved.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Built with ❤️ for India's curious readers.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;