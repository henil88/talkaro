import type { FC } from "react";

type Props = {
  size?: number;
};

const EmailIcon: FC<Props> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_9_12)">
        <path
          d="M31 7H7C5.35 7 4.015 8.35 4.015 10L4 28C4 29.65 5.35 31 7 31H31C32.65 31 34 29.65 34 28V10C34 8.35 32.65 7 31 7ZM31 28H7V13L19 20.5L31 13V28ZM19 17.5L7 10H31L19 17.5Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_12">
          <rect width="38" height="38" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EmailIcon;
