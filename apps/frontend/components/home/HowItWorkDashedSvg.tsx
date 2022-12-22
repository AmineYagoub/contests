import React from 'react';

const HowItWorkDashedSvg = () => {
  return (
    <svg
      width="106"
      height="903"
      viewBox="0 0 106 903"
      fill="none"
      className="steps-line"
    >
      <g clipPath="url(#clip02)">
        <mask
          id="mask02"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="-8"
          y="-79"
          width="120"
          height="1038"
        >
          <path
            className="line-mask"
            d="M112 -79H-8V959H112V-79Z"
            fill="url(#paint02_linear)"
          ></path>
        </mask>
        <g mask="url(#mask02)">
          <path
            className="dashed-line"
            opacity="0.323863"
            d="M52.9999 -184C18.9937 -134.611 2.1604 -83.944 2.49991 -32C2.83941 19.944 20.3394 71.2773 54.9999 122C87.3332 174.702 103.5 227.036 103.5 279C103.5 330.964 87.3332 382.631 54.9999 434C19.9999 488.093 2.49991 541.093 2.49991 593C2.49991 644.907 19.9999 695.907 54.9999 746C87.3332 798.444 103.5 851.777 103.5 906C103.5 960.223 87.3332 1015.22 54.9999 1071"
            stroke="url(#paint1_radial)"
            strokeWidth="4"
            strokeDasharray="14 14"
          ></path>
        </g>
      </g>
      <defs>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(53.0012 443) rotate(-90) scale(457.5 70630.6)"
        >
          <stop offset="0.744627" stopColor="#00C1F1"></stop>
          <stop offset="1" stopColor="#00C1F1" stopOpacity="0"></stop>
        </radialGradient>
        <linearGradient
          id="paint02_linear"
          x1="52"
          y1="888.5"
          x2="52"
          y2="959"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white"></stop>
          <stop offset="1" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>
        <clipPath id="clip02">
          <rect width="106" height="903" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default HowItWorkDashedSvg;
