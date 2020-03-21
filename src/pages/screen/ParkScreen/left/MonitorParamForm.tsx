import React from "react";
import { useObserver, useLocalStore } from "mobx-react-lite";
import { Form, Select, Button, Table, Icon } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { useStore } from "../../../../stores/index";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";

//@ts-ignore
export const MonitorParamForm = Form.create()(({ form }: { form: WrappedFormUtils }) => {
  const { getFieldDecorator } = form;
  const {
    config,
    screen: { parkScreenMap }
  } = useStore();

  // const [currentPmType, setCurrentType] = useLocalStorage("screen.parkScreen.MonitorParamForm.currentPmType", "0");
  // const [currentPmCode, setCurrentPmCode] = useLocalStorage("screen.parkScreen.MonitorParamForm.currentPmCode", "温度");

  useEffect(() => {
    parkScreenMap.loadConcernSiteData("0");
  }, []);

  const store = useLocalStore(() => ({
    formItemLayout: {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    },
    handleSubmit: e => {
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          parkScreenMap.loadConcernSiteData(values.pmCode);
        }
      });
    }
  }));

  return useObserver(() => (
    <div className="runtim-monitor screenFormStyle primary-text-color pr-6">
      <Form {...store.formItemLayout} onSubmit={store.handleSubmit}>
        <Form.Item label="监测类型">
          {getFieldDecorator("type", { initialValue: parkScreenMap.currentPmType })(
            <Select onChange={parkScreenMap.setCurrentPmType}>
              <Select.Option value="0">全部</Select.Option>
              {Object.values(config.pmTypes).map((item, index) => (
                <Select.Option value={item.id}>{item.label}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="监测因子">
          {getFieldDecorator("pmCode", { initialValue: parkScreenMap.currentPmCode, rules: [{ required: true }] })(
            <Select onChange={parkScreenMap.setCurrentPmCode}>
              <Select.Option value="0">全部</Select.Option>
              {parkScreenMap.currentPmcodes.map((item, index) => (
                <Select.Option value={item.pmCode} key={index}>
                  {item.pmName}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <div className="flex justify-between">
          <div className="primary-text-color flex items-center text-ellipsis">
            <Icon type="clock-circle" theme="filled" />
            <span className="ml-2 text-xs ">更新时间: 14:00:00</span>
          </div>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </div>
        </div>
      </Form>
    </div>
  ));
});
