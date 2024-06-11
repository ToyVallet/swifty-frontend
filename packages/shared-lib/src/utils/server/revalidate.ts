'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidate(tag: string) {
  try {
    revalidateTag(tag);
    return true;
  } catch {
    return false;
  }
}
