import React, { useState } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { toJS } from "mobx";
import { Row, Icon, Spin, Card, Form, Input, Button, Radio, Breadcrumb, Modal, Table, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useStore } from "../../stores/index";
import { DrawBaiduMap } from "../../components/DrawBaiduMap";
import { useEffect } from "react";

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

const strlen = (str) => {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
};

export const ParkEditPage = Form.create()(
  observer(({ form }: any) => {
    const { state = {} }: any = useLocation();

    const { id, parkName, parkNo, email, contactPerson, remark, scope: initialScope, parkStatus } = state.park || {};

    const history = useHistory();

    const { getFieldDecorator, setFieldsValue, getFieldsValue, getFieldValue, validateFields } = form;

    const {
      base: { parkEdit },
      map: { drawMap },
      config,
    } = useStore();

    const { onSubmit, updateMapPoints, loading, scope, addScope, setScope, scopeNameInput, longitudeInput, latitudeInput } = parkEdit;

    const store = useLocalStore(() => ({
      doUpdateMapPoints() {
        setFieldsValue({ scopeType: "location" });
        updateMapPoints();
      },
      showMap() {
        drawMap.setPathsByScope(parkEdit.scope);
      },
      doSubmit: (e) => {
        e.preventDefault();
        validateFields(async (err, values) => {
          if (err) {
            return;
          }
          if (parkEdit.scope.length === 0) {
            message.error("请输入园区范围");
            return;
          }

          parkEdit.loading = true;
          try {
            const param = { ...values, scope: parkEdit.scope.map((v, i) => ({ ...v, scopeOrder: i })) };
            await onSubmit(param);
            history.replace("/base/park");
          } catch {}
          parkEdit.loading = false;
        });
      },
    }));

    useEffect(() => {
      if (initialScope && initialScope.length > 0) {
        setScope(initialScope);
      } else {
        setScope([]);
      }
    }, []);

    return (
      <Spin spinning={loading}>
        <div style={{ height: 100, background: "#fff", marginBottom: 20, border: "1px solid #e8e8e8", borderLeft: 0, borderRight: 0, padding: "20px" }}>
          <Breadcrumb>
            <Breadcrumb.Item>基础信息</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/base/park">园区管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>{state.park ? "编辑园区" : "新增园区"}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ margin: 10, marginLeft: 0, fontWeight: "bold", fontSize: 20 }}>{state.park ? "编辑园区" : "新增园区"}</div>
        </div>
        <Card>
          <Form {...formItemLayout} onSubmit={store.doSubmit}>
            <Form.Item label="园区ID" style={{ display: "none" }}>
              {getFieldDecorator("id", { initialValue: id, rules: [{ required: false }] })(<Input placeholder="请输入园区ID" />)}
            </Form.Item>
            <Form.Item label="园区代码">
              {getFieldDecorator("parkNo", {
                initialValue: parkNo,
                rules: [
                  { required: true, message: "请输入园区代码" },
                  {
                    validator: (rule, value = "", callback) => {
                      if (strlen(value) < 30) {
                        callback();
                      } else {
                        callback("园区代码长度超过限制");
                      }
                    },
                  },
                ],
              })(<Input placeholder="请输入园区代码" />)}
            </Form.Item>
            <Form.Item label="园区名称">
              {getFieldDecorator("parkName", {
                initialValue: parkName,
                rules: [
                  { required: true, message: "请输入园区名称" },
                  {
                    validator: (rule, value = "", callback) => {
                      if (strlen(value) < 60) {
                        callback();
                      } else {
                        callback("园区名称长度超过限制");
                      }
                    },
                  },
                ],
              })(<Input placeholder="请输入园区名称" />)}
            </Form.Item>
            <Form.Item label="园区状态" style={{ display: "none" }}>
              {getFieldDecorator("parkStatus", { initialValue: 1, rules: [{ required: true, message: "请输入园区状态" }] })(<Input placeholder="请输入园区状态" />)}
            </Form.Item>
            <Form.Item label="邮箱">{getFieldDecorator("email", { initialValue: email, rules: [{ required: true, message: "请输入邮箱" }] })(<Input placeholder="请输入邮箱" />)}</Form.Item>
            <Form.Item label="联络人">
              {getFieldDecorator("contactPerson", { initialValue: contactPerson, rules: [{ required: true, message: "请输入联络人" }] })(<Input placeholder="请输入联络人" />)}
            </Form.Item>
            <Form.Item label="园区范围">
              {getFieldDecorator("scopeType", { initialValue: "location", rules: [{ required: true }] })(
                <Radio.Group>
                  <Radio value="map" onClick={store.showMap}>
                    地图绘制
                  </Radio>
                  <Radio value="location">输入经纬度</Radio>
                </Radio.Group>
              )}
              <Table pagination={false} size="small" bordered dataSource={toJS(scope)} footer={(_) => <Button onClick={addScope} size="small" shape="circle" icon="plus" />}>
                <Column
                  title="名称"
                  dataIndex="scopeName"
                  key="scopeName"
                  width={100}
                  render={(scopeName, _, index) => <Input size="small" onChange={(e) => scopeNameInput(e.target.value, index)} value={scopeName} />}
                />
                <Column
                  title="经度"
                  dataIndex="longitude"
                  key="longitude"
                  width={100}
                  render={(longitude, _, index) => <Input size="small" onChange={(e) => longitudeInput(e.target.value, index)} value={longitude} />}
                />
                <Column
                  title="纬度"
                  dataIndex="latitude"
                  key="latitude"
                  width={100}
                  render={(latitude, _, index) => <Input size="small" onChange={(e) => latitudeInput(e.target.value, index)} value={latitude} />}
                />
                <Column
                  title="操作"
                  dataIndex="latitude"
                  key="latitude"
                  width={50}
                  render={(latitude, _, index) => {
                    return (
                      <Row type="flex" justify="center">
                        <Button
                          shape="circle"
                          icon="minus"
                          size="small"
                          onClick={() => {
                            parkEdit.scope = parkEdit.scope.filter((_, i) => i !== index);
                          }}
                        />
                      </Row>
                    );
                  }}
                />
              </Table>
            </Form.Item>
            <Modal
              title="地图绘制(请鼠标双击绘制地图区域)"
              visible={getFieldValue("scopeType") === "map"}
              onOk={store.doUpdateMapPoints}
              onCancel={() => setFieldsValue({ scopeType: "location" })}
              okText="确认"
              cancelText="取消"
              width={800}
              destroyOnClose
            >
              <div style={{ width: "100%", height: "400px" }}>{getFieldValue("scopeType") === "map" && <DrawBaiduMap />}</div>
            </Modal>
            {/* <Form.Item label="描述" >
            {getFieldDecorator("remark", { initialValue: remark })(
              <TextArea rows={4} placeholder='请输入描述' />
            )}
          </Form.Item> */}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button style={{ marginLeft: 5, marginRight: 5 }} onClick={() => history.goBack()}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    );
  })
);
