import { List } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { GaugeChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

import { ContestMeta } from '@/utils/types';
import styled from '@emotion/styled';

import type { EChartsOption } from 'echarts';
echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
  GaugeChart,
]);

const StyledH3 = styled('h3')({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)',
  fontWeight: 800,
  fontSize: '1.1rem',
  color: 'rgb(0, 191, 165)',
});

const StyledBold = styled('strong')({
  color: 'rgb(0, 191, 165)',
});

const TotalResultDetails = ({ contestMeta }: { contestMeta: ContestMeta }) => {
  const contestDetails = [
    {
      title: 'عنوان المسابقة',
      value: contestMeta.title,
    },
    {
      title: 'عدد الأسئلة',
      value: contestMeta.questionsCount,
    },
    {
      title: 'عدد الإجابات الصحيحة',
      value: contestMeta.truthyAnswersCount,
    },
    {
      title: 'عدد الإجابات الخاطئة',
      value: contestMeta.falsyAnswersCount,
    },
  ];
  const gaugeData = [
    {
      value: contestMeta.totalResult,
      name: 'صحيح',
      itemStyle: {
        color: '#00c9a7',
      },
    },
    {
      value: 99.99,
      name: 'خطأ',
      detail: {
        show: false,
      },
      itemStyle: {
        color: '#ff8066',
      },
      progress: {
        show: true,
        width: 30,
      },
    },
  ];
  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -360,
        pointer: {
          show: false,
        },

        progress: {
          show: true,
          overlap: true,
          roundCap: true,
          itemStyle: {
            borderWidth: 0,
            borderColor: '#464646',
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 5,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        title: {
          show: false,
        },

        tooltip: {
          trigger: 'item',
          show: true,
        },

        detail: {
          valueAnimation: true,
          width: '20%',
          lineHeight: 30,
          borderRadius: 8,
          offsetCenter: [0, 0],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value} %',
          color: 'inherit',
        },
      },
    ],
  };
  return (
    <aside>
      <StyledH3>النتيجة النهائية</StyledH3>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: 210, paddingTop: 20 }}
      />
      <List
        style={{ marginTop: 40, padding: '0 20px' }}
        itemLayout="horizontal"
        dataSource={contestDetails}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} />
            <StyledBold>{item.value}</StyledBold>
          </List.Item>
        )}
      />
    </aside>
  );
};

export default TotalResultDetails;
