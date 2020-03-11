import { observable, action } from "mobx";
import { MyEnterprisePage } from "../pages/basic/MyEnterprise";
import { EnterpriseScreenPage } from "../pages/screen/EnterpriseScreen";
import { ParkScreenPage } from "../pages/screen/ParkScreen";
import { MapMonitorPage } from "../pages/MapMonitor";
import { DynamicSourcePage } from "../pages/DynamicSource";
import { RuntimeDataPage } from "../pages/query/RuntimeData";
import { HistoryDataPage } from "../pages/query/HistoryData";
import { RankAnalysisPage } from "../pages/analysis/RankAnalysis";
import { ComparisonAnalysisPage } from "../pages/analysis/ComparisonAnalysis";
import { AlertManagePage } from "../pages/alert/AlertManage";
import { AlertSettingPage } from "../pages/alert/AlertSetting";
import { DataAuditPage } from "../pages/data/DataAudit";
import { DataManagePage } from "../pages/data/DataManage";
import { DataResolveView } from "../pages/data/DataResolveView";
import { DataRejectView } from "../pages/data/DataRejectView";
import { DataReplenish } from "../pages/data/DataReplenish";

import { ReportPage } from "../pages/Report";
import { Basic } from "../pages/basic/Basic";
import { User } from "../pages/basic/User/User";
import { DrawBaiduMapExample } from "../pages/examples/DrawBaidumap/index";

export class MenuStore {
  @observable collapsed = false;

  @action.bound
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  @observable menus = [
    {
      icon: "dashboard",
      title: "基础信息",
      path: "/base",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "园区管理",
          path: "/base/park",
          component: Basic,
          children: []
        },
        {
          icon: "dashboard",
          title: "企业管理",
          path: "/base/enterprise",
          component: Basic,
          children: []
        },
        {
          icon: "dashboard",
          title: "我的企业",
          path: "/base/my-enterprise",
          component: MyEnterprisePage,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "用户权限",
      path: "/user",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "用户管理",
          path: "/user/userlist",
          component: User,
          children: []
        },
        {
          icon: "dashboard",
          title: "角色管理",
          path: "/user/rolelist",
          component: User,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "系统管理",
      path: "/system",
      children: [
        {
          icon: "dashboard",
          title: "参数配置",
          path: "/system/configration",
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "驾驶舱",
      path: "/screen",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "企业驾驶舱",
          path: "/screen/enterprise",
          component: EnterpriseScreenPage,
          children: []
        },
        {
          icon: "dashboard",
          title: "园区驾驶舱",
          path: "/screen/park",
          component: ParkScreenPage,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "地图监控",
      path: "/map",
      component: MapMonitorPage,
      children: []
    },
    {
      icon: "dashboard",
      title: "动态溯源",
      path: "/dynamic",
      component: DynamicSourcePage,
      children: []
    },
    {
      icon: "dashboard",
      title: "数据查询",
      path: "/query",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "实时数据查询",
          path: "/query/runtime",
          component: RuntimeDataPage,
          children: []
        },
        {
          icon: "dashboard",
          title: "历史数据查询",
          path: "/query/history",
          component: HistoryDataPage,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "统计分析",
      path: "/analysis",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "统计排名",
          path: "/analysis/rank",
          component: RankAnalysisPage,
          children: []
        },
        {
          icon: "dashboard",
          title: "对比分析",
          path: "/analysis/comparison",
          component: ComparisonAnalysisPage,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "告警处理",
      path: "/alert",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "告警管理",
          path: "/alert/manage",
          component: AlertManagePage
        },
        {
          icon: "dashboard",
          title: "告警设置",
          path: "/alert/setting",
          component: AlertSettingPage,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "数据质量",
      path: "/data",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "数据管理",
          path: "/data/manage",
          component: DataManagePage,
          children: []
        },
        {
          icon: "dashboard",
          title: "补录数据",
          path: "/data/manage/replenish",
          isHide: true,
          component: DataReplenish,
          children: []
        },
        {
          icon: "dashboard",
          title: "审核不通过查看",
          path: "/data/manage/reject",
          isHide: true,
          component: DataRejectView,
          children: []
        },
        {
          icon: "dashboard",
          title: "审核通过查看",
          isHide: true,
          path: "/data/manage/resolve",
          component: DataResolveView,
          children: []
        },
        {
          icon: "dashboard",
          title: "数据审核",
          path: "/data/audit",
          component: DataAuditPage,
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "统计报表",
      path: "/report",
      component: ReportPage,
      children: []
    },
    {
      icon: "dashboard",
      title: "示例",
      path: "/exmaple",
      component: "",
      children: [
        {
          icon: "dashboard",
          title: "地图路径绘制",
          path: "/exmaple/drawmap",
          component: DrawBaiduMapExample
        }
      ]
    }
  ];
}
