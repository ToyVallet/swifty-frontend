import {
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Row,
  TimePicker,
} from 'antd';

export default function ConcertCreateForm() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {};
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="ex) 1일차" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dateTime"
            label="DateTime"
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please choose the time' }]}
          >
            <TimePicker.RangePicker
              style={{ width: '100%' }}
              getPopupContainer={(trigger) => trigger.parentElement!}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="ex) 중앙 운동장" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'please enter url description',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="ex) 물 지참" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
