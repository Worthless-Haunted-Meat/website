export type HistoryKind = "filing" | "board" | "governance";

export interface HistoryEntry {
  date: string;
  kind: HistoryKind;
  title: string;
  detail: string;
}

// Each entry is backed by a document in the corporate records binder.
export const ledgerHistory: HistoryEntry[] = [
  {
    date: "2024-03-20",
    kind: "filing",
    title: "Certificate of Formation filed",
    detail: "Texas Secretary of State, File No. 0805483107. Signed March 15, 2024. Three initial directors.",
  },
  {
    date: "2024-07-15",
    kind: "governance",
    title: "Bylaws adopted",
    detail: "Governing bylaws of the Corporation.",
  },
  {
    date: "2024-08-28",
    kind: "filing",
    title: "IRS 501(c)(3) determination letter",
    detail: "Public charity under 170(b)(1)(A)(vi), exempt effective March 20, 2024. EIN 99-2244505.",
  },
  {
    date: "2026-05-14",
    kind: "board",
    title: "Two directors resign",
    detail: "Written resignations of Carri Pluskey and Dylan Vega, sent by certified mail. One director remains in office.",
  },
  {
    date: "2026-09-30",
    kind: "board",
    title: "Joshua Behrenbrinker and David Flesch appointed directors",
    detail: "Action of the Sole Remaining Director fills the two vacancies, following each candidate's signed Consent to Serve.",
  },
  {
    date: "2026-10-01",
    kind: "filing",
    title: "2026 Public Information Report mailed",
    detail: "Sent certified to the Texas Comptroller with a request for tax clearance.",
  },
  {
    date: "2026-10-12",
    kind: "filing",
    title: "Right to transact business in Texas restored",
    detail: "Comptroller record shows the Corporation active, with the 2026 officers.",
  },
  {
    date: "2026-10-13",
    kind: "filing",
    title: "Registered agent change ordered",
    detail: "Northwest Registered Agent, LLC (Austin) replaces the Watauga home address; Northwest files the change with the Secretary of State.",
  },
  {
    date: "2026-10-14",
    kind: "filing",
    title: "Franchise tax exemption application (AP-204) submitted",
    detail: "Emailed to the Comptroller with the IRS determination letter; receipt acknowledged the same day.",
  },
  {
    date: "2026-10-15",
    kind: "governance",
    title: "Credit Union of Texas chosen for the Corporation's account",
    detail: "Under the October 2026 board consent, which names Ricardo A. Vega Jr. primary signer and Joshua Behrenbrinker backup signer.",
  },
  {
    date: "2026-10-16",
    kind: "governance",
    title: "Mission statement and purpose amendment sent to the board",
    detail: "Written consent posted for the directors' signatures; replaces Motion 2026-01.",
  },
];
