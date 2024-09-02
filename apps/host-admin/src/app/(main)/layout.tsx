import { Resizable } from '@components';
import { getCookie, http } from '@swifty/shared-lib';
import type { universityApi } from '@type';
import type { PropsWithChildren, ReactNode } from 'react';

async function fetchUniversityName() {
  const token = await getCookie('accessToken');
  if (!token) return '';

  const { universityName } = await http.get<universityApi>('/host/admin/user');
  return universityName;
}

export default async function MainLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  const universityName = await fetchUniversityName();
  return (
    <Resizable>
      <div className="w-full h-full">
        <header className="h-[100px] flex items-center justify-between bg-white px-10">
          <h1 className="text-32 font-bold">인증 관리</h1>
          <h6 className="text-20 font-semibold text-swifty-color-900">
            {universityName || ''}
          </h6>
        </header>
        {children}
        {modal}
      </div>
    </Resizable>
  );
}
