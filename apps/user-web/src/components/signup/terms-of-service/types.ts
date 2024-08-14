export interface TermAccordion {
  id: string;
  title: string;
  content: string | JSX.Element;
  approved: boolean;
  required?: boolean;
}

export type TermAction =
  | { type: 'singleApprove'; index: number }
  | { type: 'allApprove' };
