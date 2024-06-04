import { cookies } from 'next/headers';

export default async function Page() {
  const cookie = cookies().getAll();
  return (
    <div>
      {cookie.map((item) => (
        <span key={item.name}>
          {item.name} {item.value}
        </span>
      ))}
    </div>
  );
}
