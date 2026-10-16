export type StatusLevel = "good" | "pending" | "action";

export interface StatusItem {
  label: string;
  level: StatusLevel;
  value: string;
  detail: string;
}

export interface OpenItem {
  title: string;
  owner: string;
  due?: string;
  detail: string;
}

export interface Deadline {
  date: string;
  title: string;
  detail: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  detail: string;
}

export interface Person {
  name: string;
  roles: string;
}

export const boardStatus = {
  updated: "October 16, 2026",

  standing: [
    {
      label: "Right to do business in Texas",
      level: "good",
      value: "Active",
      detail:
        "Restored. The Comptroller's record dated October 12, 2026 shows WHM active again after the 2026 Public Information Report was mailed October 1.",
    },
    {
      label: "Texas Secretary of State",
      level: "good",
      value: "Active",
      detail: "File No. 0805483107, formed March 20, 2024.",
    },
    {
      label: "IRS 501(c)(3)",
      level: "good",
      value: "Exempt",
      detail:
        "Public charity under 170(b)(1)(A)(vi). Determination letter dated August 28, 2024. The 2025 990-N e-Postcard is filed.",
    },
    {
      label: "Registered agent",
      level: "pending",
      value: "Changing",
      detail:
        "Northwest Registered Agent, LLC (Austin) was hired October 13. Northwest files the change with the Secretary of State; expected done by October 21, 2026.",
    },
    {
      label: "Texas franchise tax exemption",
      level: "pending",
      value: "Submitted",
      detail:
        "Form AP-204 was emailed to the Comptroller on October 14, 2026. Once the Comptroller approves it, WHM no longer files the yearly franchise tax report that caused this year's forfeiture.",
    },
    {
      label: "Board quorum",
      level: "action",
      value: "Needs consent",
      detail:
        "The bylaws still say 7 people make a quorum on a 3-seat board, so no meeting can act yet. The October 2026 board consent fixes this once all three directors sign it.",
    },
  ] satisfies StatusItem[],

  board: [
    { name: "Ricardo A. Vega Jr.", roles: "Director · Chair of the Board · President" },
    { name: "Joshua Behrenbrinker", roles: "Director · Secretary · Treasurer" },
    { name: "David Flesch", roles: "Director" },
  ] satisfies Person[],

  boardNote:
    "These are the officers on the 2026 Public Information Report now on file with the Comptroller. The October 2026 board consent elects the same slate.",

  openItems: [
    {
      title: "Sign the mission statement and purpose amendment",
      owner: "All three directors",
      detail:
        "Adopts the mission statement, broadens Article 5 of the Certificate of Formation (keeping the original surplus-food and recovery purposes and adding technology education), and updates the bylaws to match. Sign it in the Documents tab.",
    },
    {
      title: "File the Certificate of Amendment (Form 424)",
      owner: "Ricardo",
      due: "After all three sign",
      detail: "File with the Texas Secretary of State ($25) and keep the file-stamped copy in the records.",
    },
    {
      title: "Sign the October 2026 board consent",
      owner: "All three directors",
      detail:
        "Elects officers, authorizes the Credit Union of Texas account with Ricardo as primary signer and Josh as backup (both sign anything over $1,000), and fixes the quorum. Sign it in the Documents tab. Until it is signed, every board decision needs all three directors in writing.",
    },
    {
      title: "Open the CUTX account",
      owner: "Ricardo and Josh",
      detail:
        "Credit Union of Texas Non-Profit Business Checking (no monthly fee). After the consent is signed, apply online or at the Castle Hills branch in Lewisville with both signers, then report the account to the board.",
    },
    {
      title: "Confirm the registered agent change",
      owner: "Ricardo",
      due: "After October 21, 2026",
      detail:
        "Check the state record shows Northwest Registered Agent, LLC at 5900 Balcones Drive, STE 100, Austin, TX 78731.",
    },
  ] satisfies OpenItem[],

  deadlines: [
    {
      date: "May 15, 2027",
      title: "IRS 990-N e-Postcard (tax year 2026)",
      detail: "Every year. Takes a few minutes online.",
    },
    {
      date: "May 15, 2027",
      title: "Texas franchise tax report and Public Information Report",
      detail: "Only until the AP-204 exemption is approved. Missing it is what forfeited WHM in 2026.",
    },
    {
      date: "October 12, 2027",
      title: "Registered agent renewal",
      detail: "Northwest invoices about a year after signup ($125/yr).",
    },
  ] satisfies Deadline[],

  timeline: [
    {
      date: "Oct 16, 2026",
      title: "Mission and purpose amendment sent to the board",
      detail: "Written consent posted for signature; once signed, Form 424 is filed with the Secretary of State.",
    },
    {
      date: "Oct 15, 2026",
      title: "Credit union chosen",
      detail: "Credit Union of Texas (CUTX), Non-Profit Business Checking.",
    },
    {
      date: "Oct 14, 2026",
      title: "Board consent revised",
      detail: "Credit union instead of Chase, Josh added as backup signer, both signers required over $1,000.",
    },
    {
      date: "Oct 14, 2026",
      title: "AP-204 submitted",
      detail: "Exemption application and IRS determination letter emailed to the Comptroller.",
    },
    {
      date: "Oct 13, 2026",
      title: "Registered agent hired; AP-204 prepared",
      detail:
        "Northwest Registered Agent replaces the Watauga home address as WHM's registered office. Change filing is underway.",
    },
    {
      date: "Oct 12, 2026",
      title: "Right to do business restored",
      detail: "Comptroller record shows WHM active, with the 2026 officers and the Dallas mailing address.",
    },
    {
      date: "Oct 1, 2026",
      title: "2026 Public Information Report mailed",
      detail: "Sent certified to the Comptroller with a tax clearance letter request.",
    },
  ] satisfies TimelineEntry[],

  addresses: {
    mailing: "5473 Blair Rd Ste 100, PMB 424261, Dallas, TX 75231-4227",
    registeredOffice: "5900 Balcones Drive, STE 100, Austin, TX 78731 (Northwest Registered Agent, LLC)",
  },
};
