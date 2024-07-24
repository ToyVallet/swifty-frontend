import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import TestBG from '@images/mypage/b0b857c3f53e145baf443f7c1a5441d8.png';

import Card from './card';

const schedule = ['축제 일정', '완료된 일정'] as const;

export default function ScheduleCard() {
  return (
    <section className="w-full">
      <Tabs defaultValue={schedule[0]}>
        <TabsList>
          {schedule.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={schedule[0]}>
          <Card
            title="DANFESTA 2024"
            date="2024년 05월 04일 - 05일"
            enterAt={new Date()}
            backgroundImage={TestBG}
            lineups={[
              {
                id: '1',
                title: '아이유',
                description: '아이유의 노래를 들으며 행복한 시간을 보내세요.',
                lineupImage: '/images/line-up/1.jpg',
                performanceTime: '2024년 05월 04일 20:00',
              },
            ]}
          />
        </TabsContent>
        <TabsContent value={schedule[1]}></TabsContent>
      </Tabs>
    </section>
  );
}
