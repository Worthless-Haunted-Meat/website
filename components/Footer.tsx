import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-[#111111] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-syne font-extrabold text-2xl text-[#f5f0e8] mb-4">
              Worthless Haunted Meat
            </p>
            <p className="text-[#888888] text-sm leading-relaxed">
              We discover what people love — then we use technology to help them do more
              of it, and teach them to bring others along.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/articles", label: "Articles" },
                { href: "/join", label: "Join the Coalition" },
                { href: "/donate", label: "Donate" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888888] hover:text-[#f5f0e8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#888888] mb-4">
              Contact
            </p>
            <ul className="flex flex-col gap-3 text-sm text-[#888888]" role="list">
              <li>
                <a
                  href="mailto:worthlesshauntedmeat@gmail.com"
                  className="hover:text-[#f5f0e8] transition-colors"
                >
                  worthlesshauntedmeat@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18176017349"
                  className="hover:text-[#f5f0e8] transition-colors"
                >
                  (817) 601-7349
                </a>
              </li>
              <li className="text-[#888888]">
                EIN 99-2244505
              </li>
              <li className="text-[#888888]">
                501(c)(3) Tax-Exempt
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-[#222222] my-12" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-[#888888]">
            © {new Date().getFullYear()} Worthless Haunted Meat. A Texas 501(c)(3) nonprofit corporation.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[#888888] hover:text-[#e74c3c] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/board"
              className="text-xs text-[#888888] hover:text-[#e74c3c] transition-colors"
            >
              Board Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
