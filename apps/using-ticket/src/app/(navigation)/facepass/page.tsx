import { Title } from '@components';
import { Icon } from '@swifty/assets';

export default function FacepassPage() {
  return (
    <div>
      <Title>
        <Icon
          name="user-web/facepass/title"
          className="fill-black dark:fill-white"
        />
        안면 티켓 입장 시스템
      </Title>
    </div>
  );
}
