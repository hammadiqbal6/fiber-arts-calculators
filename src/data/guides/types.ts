export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export type GuideBlock =
  | { type: 'p' | 'h2' | 'takeaway'; content: string }
  | { type: 'ul'; content: string[] }
  | { type: 'table'; content: GuideTable };

export interface Guide {
  slug: string;
  /** Keep alone ≤48 chars so " | FiberCalc" fits in 60 */
  title: string;
  /** Meta description, 120–160 characters */
  description: string;
  primaryKeyword: string;
  datePublished: string;
  dateModified: string;
  relatedTools: string[];
  relatedGuides: string[];
  faqs: GuideFaq[];
  sections: GuideBlock[];
  /** Outbound citations shown in a Sources section */
  sources?: [string, string][];
}
