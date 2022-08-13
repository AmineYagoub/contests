import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const TeacherSvg = () => (
  <svg
    viewBox="64 0 512 512"
    focusable="false"
    data-icon="bar-chart"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fill="#171717"
      d="M291.266,85.984c23.74,0,42.984-19.252,42.984-42.992C334.25,19.243,315.006,0,291.266,0
			c-23.738,0-43,19.243-43,42.992C248.266,66.732,267.527,85.984,291.266,85.984z"
    />
    <path
      fill="#171717"
      d="M335.481,93.288h-23.516l-20.707,33.887l-20.621-33.887h-24.48c0,0-56.627-0.741-60.728,48.108
			l0.002,0.008v6.382l-22.121-15.117l-2.584-1.8c-4.726-3.668-8.234-5.134-12.886-5.34L104.377,11.422l-7.459,2.842l42.811,112.395
			c-2.222,0.878-4.29,2.162-6.082,3.971c-7.442,7.391-7.27,19.545,0.259,27.073c0.034,0.035,12.283,8.33,12.283,8.33l17.107,11.431
			l32.526,21.664c2.18,1.345,5.353,2.204,8.418,2.205l0.003,0.01c10.319,0,18.744-8.45,18.744-18.804c0-0.061,0-0.129,0-0.164
			v-33.284h12.249l-0.035,80.107h112.618l-0.035-79.618h11.75v101.272h0.018c-0.018,0.285-0.018,0.621-0.018,0.836
			c0,10.449,8.39,18.839,18.761,18.839c10.354,0,18.778-8.425,18.778-18.839c0-0.215-0.035-0.551-0.035-0.836h0.035V141.379
			C397.089,141.379,399.362,94.468,335.481,93.288z M291.263,208.093l-12.421-63.277l12.421-15.875l14.229,15.875L291.263,208.093z"
    />
    <path
      fill="#171717"
      d="M234.932,242.514l-0.086,226.215c0,13.921,11.335,25.257,25.254,25.257
			c13.868,0,25.083-11.164,25.29-24.963l0.188-0.189V262.723h11.336v205.904c0,13.988,11.389,25.377,25.396,25.377
			c13.953,0,25.358-11.389,25.358-25.377L347.564,242.6L234.932,242.514z"
    />
    <rect x="28.387" y="232.298" fill="#171717" width="21.742" height="7.555" />
  </svg>
);

const TeacherIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={TeacherSvg} {...props} />;
};

export default TeacherIcon;