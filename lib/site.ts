export const site = {
  name: "Worthless Haunted Meat",
  url: "https://worthlesshauntedmeat.org",
  email: "worthlesshauntedmeat@gmail.com",
  phone: "(817) 601-7349",
  phoneHref: "tel:+18176017349",
  ein: "99-2244505",
  mailingAddress: {
    line1: "Worthless Haunted Meat",
    line2: "5473 Blair Rd Ste 100, PMB 424261",
    line3: "Dallas, TX 75231-4227",
  },
  /**
   * Hosted donation checkout (Zeffy, PayPal Giving Fund, Givebutter, etc.).
   * Set NEXT_PUBLIC_DONATE_URL in Vercel. When unset, the Donate page only
   * shows offline giving options so no non-functional buttons are rendered.
   */
  donateUrl: process.env.NEXT_PUBLIC_DONATE_URL?.trim() || null,
};
