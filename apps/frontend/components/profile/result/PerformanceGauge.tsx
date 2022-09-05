import { Col, Row } from 'antd';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { GaugeChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

import { GaugeValues } from '@/utils/types';
import styled from '@emotion/styled';

import type { EChartsOption, GaugeSeriesOption } from 'echarts';
echarts.use([GridComponent, LegendComponent, CanvasRenderer, GaugeChart]);

const StyledCol = styled(Col)({
  position: 'relative',
  h3: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    fontWeight: 800,
    fontSize: '1.1rem',
    color: 'rgb(0, 191, 165)',
  },
});

const seriesOption: GaugeSeriesOption = {
  type: 'gauge',
  center: ['50%', '60%'],
  startAngle: 200,
  endAngle: -20,

  splitNumber: 10,
  itemStyle: {
    color: '#ff8066',
  },
  progress: {
    show: true,
    width: 30,
  },

  pointer: {
    show: false,
  },
  axisLine: {
    lineStyle: {
      width: 30,
    },
  },
  axisTick: {
    distance: -45,
    splitNumber: 5,
    lineStyle: {
      width: 2,
      color: '#999',
    },
  },
  splitLine: {
    show: false,
  },
  axisLabel: {
    show: false,
  },
  anchor: {
    show: false,
  },
  title: {
    show: false,
  },
  detail: {
    valueAnimation: true,
    width: '40%',
    lineHeight: 30,
    borderRadius: 8,
    offsetCenter: [0, '-15%'],
    fontSize: 30,
    fontWeight: 'bolder',
    formatter: '{value} %',
    color: 'inherit',
  },
};

const negativeResult = {
  ...seriesOption,
  detail: {
    show: false,
  },
  max: 100,
  data: [
    {
      value: 99.99,
    },
  ],
};

const PerformanceGauge = ({ values }: { values: GaugeValues }) => {
  const easyOptions: EChartsOption = {
    series: [
      {
        ...seriesOption,
        itemStyle: {
          color: '#00c9a7',
        },
        max: 100,
        data: [
          {
            value: values.EASY,
          },
        ],
      },
      negativeResult,
    ],
  };

  const midOptions: EChartsOption = {
    series: [
      {
        ...seriesOption,
        itemStyle: {
          color: '#00c9a7',
        },
        max: 100,
        data: [
          {
            value: values.MEDIUM,
          },
        ],
      },
      negativeResult,
    ],
  };

  const hardOptions: EChartsOption = {
    series: [
      {
        ...seriesOption,
        itemStyle: {
          color: '#00c9a7',
        },
        max: 100,
        data: [
          {
            value: values.HARD,
          },
        ],
      },
      negativeResult,
    ],
  };
  return (
    <Row>
      <StyledCol span={8}>
        <h3>الأسئلة السهلة</h3>
        <ReactEChartsCore
          echarts={echarts}
          option={easyOptions}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: 250 }}
        />
      </StyledCol>
      <StyledCol span={8}>
        <h3>الأسئلة المتوسطة</h3>
        <ReactEChartsCore
          echarts={echarts}
          option={midOptions}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: 250 }}
        />
      </StyledCol>
      <StyledCol span={8}>
        <h3>الأسئلة الصعبة</h3>
        <ReactEChartsCore
          echarts={echarts}
          option={hardOptions}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: 250 }}
        />
      </StyledCol>
    </Row>
  );
};

export default PerformanceGauge;
