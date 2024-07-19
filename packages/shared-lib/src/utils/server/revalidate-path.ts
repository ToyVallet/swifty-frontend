'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidate(
  path: string,
  type: 'layout' | 'page' = 'page',
) {
  try {
    revalidatePath(path, type);
    return true;
  } catch {
    return false;
  }
}
