import type {
  TermAccordion,
  TermAction,
} from '@components/signup/terms-of-service/types';

export function reducer(
  state: TermAccordion[],
  action: TermAction,
): TermAccordion[] {
  switch (action.type) {
    case 'singleApprove':
      return state.map((item, index) =>
        index === action.index ? { ...item, approved: !item.approved } : item,
      );
    case 'allApprove':
      return state.map((item) => ({ ...item, approved: true }));
    default:
      return state;
  }
}
