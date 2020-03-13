import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import { Card, Form, Input, Button, Radio, Breadcrumb, Modal, Table, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStore } from "../../stores/index";
import { APILoader, Map, Polygon, Control } from "@uiw/react-baidu-map";
import { DrawBaiduMap } from "../../components/DrawBaiduMap";

const { Column } = Table;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 10 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 10,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 8,
    },
  },
};

export const ParkEditPage = Form.create()(observer(({ form }: any) => {

  const history = useHistory();

  const { getFieldDecorator, setFieldsValue, getFieldsValue, getFieldValue, validateFields } = form;

  const {
    base: { parkEdit },
    map: { drawMap },
    config
  } = useStore();

  const {
    onSubmit,
    parkName, parkNo, remark, scope, parkStatus,
    updateMapPoints,
  } = parkEdit;

  const doUpdateMapPoints = () => {
    setFieldsValue({ scopeType: 'location' });
    updateMapPoints(toJS(drawMap));
  }

  const doSubmit = (e) => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const param = { ...values, scope: toJS(scope) };
      await onSubmit(param);
      history.replace("/base/park");
    })
  }

  console.log(toJS(scope));
  console.log(toJS(drawMap));

  return(
    <div>
      <div style={{height: 100, background: "#fff", marginBottom: 20, border: "1px solid #e8e8e8", borderLeft: 0, borderRight: 0, padding: "20px"}}>
        <Breadcrumb>
          <Breadcrumb.Item>基础信息</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/base/park">园区管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a>新增园区</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      <div style={{margin: 10, marginLeft: 0, fontWeight: "bold", fontSize: 20}}>新增园区</div>
      </div>
      <Card>
        <Form {...formItemLayout} onSubmit={doSubmit}>
          <Form.Item label="园区代码">
            {getFieldDecorator("parkNo", { initialValue: parkNo, rules: [{ required: true }] })(
              <Input placeholder="请输入园区代码" />
            )}
          </Form.Item>
          <Form.Item label="园区名称" >
            {getFieldDecorator("parkName", { initialValue: parkName, rules: [{ required: true }] })(
              <Input placeholder="请输入园区名称" />
            )}
          </Form.Item>
          <Form.Item label="园区状态" style={{ display: 'none' }} >
            {getFieldDecorator("parkStatus", { initialValue: parkStatus, rules: [{ required: true }] })(
              <Input placeholder="请输入园区状态" />
            )}
          </Form.Item>
          <Form.Item label="园区范围" >
            {getFieldDecorator("scopeType", { initialValue: 'location', rules: [{ required: true }] })(
              <Radio.Group>
                <Radio value="map">地图绘制</Radio>
                <Radio value="location">输入经纬度</Radio>
              </Radio.Group>
            )}
            <Table pagination={false} size="small" bordered dataSource={toJS(scope)}>
              <Column
                title="名称"
                dataIndex="scopeName"
                key="scopeName"
              />
              <Column
                title="精度"
                dataIndex="longitude"
                key="longitude"
              />
              <Column
                title="纬度"
                dataIndex="latitude"
                key="latitude"
              />
            </Table>
          </Form.Item>
          <Modal
            title="地图绘制"
            visible={getFieldValue('scopeType') === 'map'}
            onOk={doUpdateMapPoints}
            onCancel={() => setFieldsValue({ scopeType: 'location' })}
            okText="确认"
            cancelText="取消"
            width={800}
          >
            <div style={{ width: '100%', height: '400px' }}>
              <DrawBaiduMap />
            </div>
          </Modal>
          <Form.Item label="描述" >
            {getFieldDecorator("remark", { initialValue: remark })(
              <TextArea rows={4} placeholder='请输入描述' />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{marginLeft: 5, marginRight: 5}} >保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}));