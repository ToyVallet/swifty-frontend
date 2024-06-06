import { customFetch } from "@/app/api";
import { UserApi } from "@/app/types/user";
import { API_CLIENT } from "@/constant";

export default async function Page() {
  const data = await customFetch<UserApi>(API_CLIENT.host(), {cache: "no-cache"})

  return <div></div>;
}
