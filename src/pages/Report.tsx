import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ReactEcharts from "echarts-for-react";
import { useStore } from "../stores/index";
import { Link } from "react-router-dom";

import { Checkbox, Card, Row, Col, Form, Button, Select, Input, DatePicker, Radio, Table, Badge, Divider, Breadcrumb, Alert, Modal, Spin } from 'antd';
const { Option } = Select;

const option3 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    orient: 'horizontal',
    x: 'center',
    y: 'bottom',
    data: ['A化工', 'B化工', 'C化工', 'D化工', 'E化工']
  },
  backgroundColor: '#f0f0f0',
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['10-24-00', '10-24-06', '10-24-12', '10-24-18', '10-25-00']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'A化工',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90]
    },
    {
      name: 'B化工',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'C化工',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190]
    },
    {
      name: 'D化工',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'E化工',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290]
    }
  ]
};


const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '测量值1',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '测量值2',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '测量值3',
    key: 'tags',
    dataIndex: 'tags',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    time: '2019年10月08日 00：00：00',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    time: '2019年10月08日 00：00：00',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    time: '2019年10月08日 00：00：00',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const ReportPage = Form.create()(observer(({ form }: any) => {

  const chart3 = React.useRef<any>();

  const {
    report,
  } = useStore();

  useEffect(() => {
    report.getParkList();
    report.getCompanyList();
    report.getAllPMTypeAndCode();

  }, []);

  const { getFieldDecorator, setFieldsValue, getFieldsValue, getFieldValue, validateFields } = form;

  const {
    loading, parkList, companyList, pmList,
  } = report;

  let pmCodeList: any = [];
  if (getFieldValue('pmType')) {
    pmCodeList = pmList.find(item => item.id === getFieldValue('pmType')).pms;
  }

  const doSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      report.getStatisReport(values);
    });
  }

  const doExport = () => {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      report.exportStatisReport(values);
    });
  }


  return (
    <Spin spinning={loading}>
      <div style={{ background: "#fff", marginBottom: 20, border: "1px solid #e8e8e8", borderLeft: 0, borderRight: 0, padding: "20px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>统计报表</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row>
        <Col span={6}>
          <Card size="small" title="统计报表">
            <Form onSubmit={doSubmit}>
              <Form.Item colon={false} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="统计方式">
                {getFieldDecorator("statisType", { initialValue: 1, rules: [{ required: true }] })(
                  <Select placeholder="请选择" size="small">
                    <Option value={2}>按企业</Option>
                    <Option value={1}>按园区</Option>
                  </Select>
                )}
              </Form.Item>
              
              {getFieldValue('statisType') === 1 &&
              <Form.Item colon={false} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="选择园区" >
                {getFieldDecorator("parkId", { initialValue: '', rules: [{ required: true }] })(
                  <Select placeholder="请选择" size="small">
                    {parkList.map(item => <Option key={item.id} value={item.id}>{item.parkName}</Option>)}
                  </Select>
                )}
              </Form.Item>
              }

              {getFieldValue('statisType') === 2 &&
              <Form.Item colon={false} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="选择企业" >
                {getFieldDecorator("companyId", { initialValue: '', rules: [{ required: true }] })(
                  <Select placeholder="请选择" size="small">
                    {companyList.map(item => <Option key={item.id} value={item.id}>{item.companyName}</Option>)}
                  </Select>
                )}
              </Form.Item>
              }
              
              <Form.Item colon={false} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="监测对象">
                {getFieldDecorator("pmType", { initialValue: '', rules: [{ required: true }] })(
                  <Select placeholder="请选择" size="small">
                    {pmList.map(item => <Option key={item.id} value={item.id}>{item.label}</Option>)}
                  </Select>
                )}
              </Form.Item>

              {!!getFieldValue('pmType') && 
              <Form.Item colon={false} labelAlign="left" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} label="" >
                {getFieldDecorator("pmCodes", { initialValue: [], rules: [{ required: true }] })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      {pmCodeList.map(item => <Col span={8} key={item.pmCode}><Checkbox style={{ fontSize: '10px' }} value={item.pmCode}>{item.pmName}</Checkbox></Col>)}
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
              }

            <Divider orientation="left">报表类型</Divider>
            <Form.Item colon={false} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="统计周期">
              {getFieldDecorator("timeCycle", { initialValue: 1, rules: [{ required: true }] })(
                <Radio.Group style={{ width: '100%' }} size="small" buttonStyle="solid">
                  <Radio.Button value={1}>日</Radio.Button>
                  <Radio.Button value={2}>月</Radio.Button>
                  <Radio.Button value={3}>年</Radio.Button>
                  <Radio.Button value={4}>周</Radio.Button>
                  <Radio.Button value={5}>季</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item colon={false} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="统计时间">
              {getFieldDecorator("collectDate", { initialValue: '', rules: [{ required: true }] })(
                <DatePicker size="small" />
              )}
            </Form.Item>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} labelAlign="left" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  <Button type="primary" style={{ width: '100%' }} htmlType="submit">开始统计</Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} labelAlign="left" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  <Button style={{ width: '100%' }} onClick={doExport} >导出</Button>
                </Form.Item>
              </Col>
            </Row>
            </Form>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={6}>
            <Col span={24} style={{ marginBottom: '10px' }}>
              <Card bordered size="small" title="A企业监测日报" extra="2019-10-24">
                <Table bordered size="small" pagination={false} columns={columns} dataSource={data} />
              </Card>
            </Col>
            <Col span={24} style={{ marginBottom: '10px' }}>
              <Card bordered size="small" title="2019年10月08日 气态污染物排放浓度24小时趋势图" extra="2019-10-24">
                <ReactEcharts
                  //@ts-ignore
                  option={option3}
                  ref={chart3}
                  style={{ height: '360px' }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

    </Spin>
  );
}));