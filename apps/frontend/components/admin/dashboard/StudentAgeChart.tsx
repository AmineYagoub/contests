import { FC } from 'react';
import { Button, Card } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { DashboardLevelResponse, StudentLevel } from '@/graphql/graphql';
import { AppRoutes } from '@/utils/routes';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const StudentAgeChart: FC<{
  data: DashboardLevelResponse[];
  loading: boolean;
}> = ({ data, loading }) => {
  const getValue = (level: StudentLevel) => {
    if (data) {
      return data?.find((el) => el.level === level)?.value || 0;
    }
  };
  const option = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },

      formatter: function (params) {
        return `${params.seriesName}<br />
                ${params.name} سنة: ${params.data.value} طالب (${params.percent}%)`;
      },
    },
    legend: {
      top: 'top',
      formatter: '{name} سنة',
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'bottom',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'سن الطلاب',
        type: 'pie',
        radius: [30, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          formatter: '{c} طالب',
          fontSize: 12,
        },
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          {
            value: getValue(StudentLevel.Thirteen),
            name: '13',
          },
          { value: getValue(StudentLevel.Fourteen), name: '14' },
          { value: getValue(StudentLevel.Fifteen), name: '15' },
          { value: getValue(StudentLevel.Sixteen), name: '16' },
          { value: getValue(StudentLevel.Seventeen), name: '17' },
          { value: getValue(StudentLevel.Eighteen), name: '18' },
          { value: getValue(StudentLevel.Nineteen), name: '19' },
        ],
      },
    ],
  };

  return (
    <Card
      title="عدد الطلاب المسجلين حسب السن"
      extra={<Button href={AppRoutes.AdminManageStudents}>إدارة الطلاب</Button>}
    >
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        style={{
          height: 400,
        }}
        showLoading={loading}
      />
    </Card>
  );
};

export default StudentAgeChart;
