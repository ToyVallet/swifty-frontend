import Link from "next/link";
import { Card, CardList } from "@components/festival";
import getFestivalStatus from "@util/getFestivalStatus";
import styles from "./page.module.css";
import { getMockAllFestivals } from "./data";

export default async function Page() {
  const datas = await getMockAllFestivals();
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>축제 관리</h2>
      <CardList className={styles.cardList}>
        {datas.map(({ subId, name, addr, description, startDate, endDate }) =>
          <Link href={`festivals/${subId}`} key={subId}>
            <Card>
              <Card.FestvialDescription
                name={name}
                addr={addr}
                description={description}
                startDate={startDate}
                endDate={endDate}
                status={getFestivalStatus(startDate, endDate)}
              />
            </Card>
          </Link>
        )}
      </CardList>
    </main>
  );
}
