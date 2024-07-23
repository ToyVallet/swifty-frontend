'use client';

import {
  type ClientErrorLog,
  type ErrorLogResponse,
  type ServerErrorLog,
  isClientLog,
  isServerLog,
} from '@swifty/shared-lib';
import { Col, Divider, Drawer, Row } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import styles from './log-detail-drawer.module.css';

dayjs.locale('ko');

type Props = {
  open: boolean;
  onClose: () => void;
  detailLogInfo: ErrorLogResponse | undefined;
};

type DescriptionItemProps = {
  title: string;
  content: React.ReactNode;
};

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className={styles.wrapper}>
    <p className={styles.label}>{title}:</p>
    {content}
  </div>
);

export default function LogDetailDrawer({
  open,
  onClose,
  detailLogInfo,
}: Props) {
  return (
    <Drawer
      width={840}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      className={styles.container}
    >
      <h1 className={styles.title} style={{ marginBottom: 24 }}>
        Detail Log
      </h1>
      {!detailLogInfo && (
        <div className={styles.fail}>
          <h1>데이터를 불러오는 것에 실패했습니다.</h1>
        </div>
      )}
      {isServerLog(detailLogInfo) && <ServerLog {...detailLogInfo} />}
      {isClientLog(detailLogInfo) && <ClientLog {...detailLogInfo} />}
    </Drawer>
  );
}

const ServerLog = ({ ...props }: ServerErrorLog) => {
  const {
    trackingId,
    time,
    path,
    message,
    host,
    statusCode,
    status,
    code,
    traceLog,
  } = props;

  const url = `${host}${path}`;
  const korDate = dayjs(time).format('YYYY. MM. DD ddd HH:mm:ss');
  return (
    <div>
      <p className={styles.subTitle}>공통요소</p>
      <Row>
        <Col span={24}>
          <DescriptionItem title="발생위치" content={url} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="시각" content={korDate} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="트래킹 아이디" content={trackingId} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="메시지" content={message} />
        </Col>
      </Row>
      <Divider />
      <p className={styles.subTitle}>STATUS</p>
      <Row>
        <Col span={24}>
          <DescriptionItem title="STATUS" content={status} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="STATUS CODE" content={statusCode} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="CODE" content={code} />
        </Col>
      </Row>

      <Divider />
      <p className={styles.subTitle}>TRACE LOG</p>
      <Row>
        <Col span={24}>
          <DescriptionItem title="ERROR POINT" content={traceLog.errorPoint} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="ERROR CODE" content={traceLog.errorCode} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="CAUSED BY" content={traceLog.causedBy} />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="SERVICE POINT"
            content={traceLog.servicePoint}
          />
        </Col>
      </Row>
    </div>
  );
};

const ClientLog = ({ ...props }: ClientErrorLog) => {
  const { trackingId, time, path, message, host, userAgent } = props;

  const url = `${host}${path}`;
  const korDate = dayjs(time).format('YYYY. MM. DD ddd HH:mm:ss');
  return (
    <div>
      <p className={styles.subTitle}>공통요소</p>
      <Row>
        <Col span={24}>
          <DescriptionItem title="발생위치" content={url} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="시각" content={korDate} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="트래킹 아이디" content={trackingId} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="메시지" content={message} />
        </Col>
      </Row>
      <Divider />
      <p className={styles.subTitle}>USER AGENT</p>
      <Row>
        <Col span={24}>
          <DescriptionItem title="USER AGENT" content={userAgent} />
        </Col>
      </Row>

      <Divider />
    </div>
  );
};
