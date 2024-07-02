export interface TermAccordion {
  title: string;
  content: string;
  approve: boolean;
  required?: boolean;
}

export type TermAction =
  | { type: 'singleApprove'; index: number }
  | { type: 'allApprove' };
