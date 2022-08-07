import { FC } from "react";
import { Card, Select } from "antd";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

const labelOption = {
  show: true,
  position: "insideBottom",
  distance: 10,
  rotate: 90,
  align: "left",
  verticalAlign: "middle",
  formatter: "{c}",
  fontSize: 16,
  rich: {
    name: {},
  },
};
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: [
      "عدد المسابقات",
      "طلاب مشاركين مع مشرفين",
      "طلاب مشاركين بدون مشرفين",
    ],
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "right",
    top: "center",
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar", "stack"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: "category",
      axisTick: { show: false },
      data: ["2022", "2023", "2024", "2025"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "عدد المسابقات",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [33, 45, 55, 32],
    },
    {
      name: "طلاب مشاركين مع مشرفين",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154],
    },
    {
      name: "طلاب مشاركين بدون مشرفين",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [98, 77, 101, 99],
    },
  ],
};

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const FilterByDate = () => {
  return (
    <Select
      defaultValue="yearly"
      style={{ width: 100 }}
      onChange={handleChange}
    >
      <Option value="weekly">أسبوعيا</Option>
      <Option value="monthly">شهريا</Option>
      <Option value="yearly">سنويا</Option>
    </Select>
  );
};

const ContestsChart: FC = (props) => {
  return (
    <Card {...props} title="أخر المسابقات" extra={<FilterByDate />}>
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

export default ContestsChart;
