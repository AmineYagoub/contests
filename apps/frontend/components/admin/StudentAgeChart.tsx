import { FC } from "react";
import { Button, Card } from "antd";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const option = {
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "shadow",
    },

    formatter: function (params) {
      return `${params.seriesName}<br />
              ${params.name} سنة: ${params.data.value} طالب (${params.percent}%)`;
    },
  },
  legend: {
    top: "top",
    formatter: "{name} سنة",
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "right",
    top: "bottom",
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "سن الطلاب",
      type: "pie",
      radius: [30, 100],
      center: ["50%", "50%"],
      roseType: "area",
      label: {
        formatter: "{c} طالب",
        fontSize: 12,
      },
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: "13" },
        { value: 38, name: "14" },
        { value: 50, name: "15" },
        { value: 30, name: "16" },
        { value: 28, name: "17" },
        { value: 26, name: "18" },
      ],
    },
  ],
};

const StudentAgeChart: FC = (props) => {
  return (
    <Card
      {...props}
      title="عدد الطلاب المسجلين حسب السن"
      extra={<Button>إدارة الطلاب</Button>}
    >
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        style={{
          height: 400,
        }}
      />
    </Card>
  );
};

export default StudentAgeChart;
