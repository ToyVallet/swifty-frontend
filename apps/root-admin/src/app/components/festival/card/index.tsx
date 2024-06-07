import { Button } from "antd";
import { ConcertUpdateForm, DrawerButton, StatusNotifier } from "@components/festival";
import formatDate from "@/app/util/formatDate";
import styles from './card.module.css';


export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <li className={styles.item}>
      {children}
    </li>
  );

}
function FestivalDescription({ name, addr, description, startDate, endDate }: { name: string, addr: string, description: string, startDate: string, endDate: string }) {
  return (
    <div className={styles.description}>
      <h3 className={styles.heading}>{name}</h3>
      <span className={styles.content}>{addr}</span>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
    </div>
  )
}

function ConcertDescription({ location, startDate, endDate, description, concertStatus }: ConcertsResponse) {
  return (
    <div className={styles.description}>
      <h3 className={styles.heading}>{location}</h3>
      <span className={styles.content}>{description}</span>
      <span className={styles.content}>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
      <StatusNotifier status={concertStatus} />
      <DrawerButton variant="concert-update">
        <ConcertUpdateForm />
      </DrawerButton>
      <Button>삭제</Button>
    </div>
  )
}

FestivalDescription.displayName = 'Festival Description';
Card.FestvialDescription = FestivalDescription;

ConcertDescription.displayName = 'Concert Description';
Card.ConcertDescription = ConcertDescription;
