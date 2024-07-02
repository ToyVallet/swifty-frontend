export interface TermAccordion {
  title: string;
  content: string;
  approved: boolean;
  required?: boolean;
}

export type TermAction =
  | { type: 'singleApprove'; index: number }
  | { type: 'allApprove' };
