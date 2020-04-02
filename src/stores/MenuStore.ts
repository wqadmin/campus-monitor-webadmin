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
import { DataView } from "../pages/data/DataView";
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
      icon: "appstore",
      title: "基础信息",
      code: "base:manage",
      path: "/base",
      component: "",
      children: [
        {
          title: "园区管理",
          path: "/base/park",
          code: "base:manage:page",
          component: Basic,
          children: []
        },
        {
          title: "企业管理",
          path: "/base/enterprise",
          component: Basic,
          children: []
        },
        {
          title: "我的企业",
          path: "/base/my-enterprise",
          component: MyEnterprisePage,
          children: []
        }
      ]
    },
    {
      icon: "user",
      title: "用户权限",
      path: "/user",
      code: "system:urp",
      component: "",
      children: [
        {
          title: "用户管理",
          path: "/user/userlist",
          component: User,
          code: "urp:user",
          children: []
        },
        {
          title: "角色管理",
          path: "/user/rolelist",
          code: "urp:role",
          component: User,
          children: []
        }
      ]
    },
    {
      icon: "setting",
      title: "系统管理",
      code: "system:manage",
      path: "/system",
      children: [
        {
          title: "参数配置",
          code: "manage:param",
          path: "/system/configration",
          children: []
        }
      ]
    },
    {
      icon: "dashboard",
      title: "驾驶舱",
      path: "/screen",
      code: "system:jsc",
      component: "",
      children: [
        {
          title: "企业驾驶舱",
          path: "/screen/enterprise",
          component: EnterpriseScreenPage,
          children: []
        },
        {
          title: "园区驾驶舱",
          path: "/screen/park",
          component: ParkScreenPage,
          children: []
        }
      ]
    },
    {
      icon: "environment",
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
      icon: "search",
      title: "数据查询",
      path: "/query",
      code: "system:dataQuery",
      component: "",
      children: [
        {
          title: "实时数据查询",
          path: "/query/runtime",
          component: RuntimeDataPage,
          children: []
        },
        {
          title: "历史数据查询",
          path: "/query/history",
          component: HistoryDataPage,
          children: []
        }
      ]
    },
    {
      icon: "bar-chart",
      title: "统计分析",
      path: "/analysis",
      component: "",
      children: [
        {
          title: "统计排名",
          path: "/analysis/rank",
          component: RankAnalysisPage,
          children: []
        },
        {
          title: "对比分析",
          path: "/analysis/comparison",
          component: ComparisonAnalysisPage,
          children: []
        }
      ]
    },
    {
      icon: "info-circle",
      title: "告警处理",
      path: "/alert",
      code: "system:warn",
      component: "",
      children: [
        {
          title: "告警管理",
          code: "warn:manage",
          path: "/alert/manage",
          component: AlertManagePage
        },
        {
          title: "告警设置",
          code: "warn:config",
          path: "/alert/setting",
          component: AlertSettingPage,
          children: []
        }
      ]
    },
    {
      icon: "fund",
      title: "数据质量",
      path: "/data",
      code: "dataAdd:manage",
      component: "",
      children: [
        {
          title: "数据管理",
          path: "/data/manage",
          component: DataManagePage,
          children: []
        },
        {
          title: "补录数据",
          path: "/data/manage/replenish",
          isHide: true,
          component: DataReplenish,
          children: []
        },
        {
          title: "审核页面",
          path: "/data/manage/view/:id",
          isHide: true,
          component: DataView,
          children: []
        },
        {
          title: "数据审核",
          path: "/data/audit",
          component: DataAuditPage,
          children: []
        }
      ]
    },
    {
      icon: "area-chart",
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
          title: "地图路径绘制",
          path: "/exmaple/drawmap",
          component: DrawBaiduMapExample
        }
      ]
    }
  ];
}
