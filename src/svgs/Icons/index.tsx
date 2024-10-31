import { FC } from 'react';
import cn from 'classnames';
import React from 'react';

export const Menu: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 6C2 5.448 2.448 5 3 5H21C21.552 5 22 5.448 22 6C22 6.552 21.552 7 21 7H3C2.448 7 2 6.552 2 6ZM21 11H3C2.448 11 2 11.448 2 12C2 12.552 2.448 13 3 13H21C21.552 13 22 12.552 22 12C22 11.448 21.552 11 21 11ZM21 17H3C2.448 17 2 17.448 2 18C2 18.552 2.448 19 3 19H21C21.552 19 22 18.552 22 18C22 17.448 21.552 17 21 17Z"
        className={cn({
          'fill-light-neutral-2 dark:fill-dark-neutral-2': color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const Chevron: FC<{
  className?: string;
  color?: 'neutral-1';
}> = ({ className, color = 'neutral-1' }) => {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.14645 2.64645C3.95118 2.84171 3.95118 3.15829 4.14645 3.35355L6.79289 6L4.14645 8.64645C3.95118 8.84171 3.95118 9.15829 4.14645 9.35355C4.34171 9.54882 4.65829 9.54882 4.85355 9.35355L7.85355 6.35355C8.04882 6.15829 8.04882 5.84171 7.85355 5.64645L4.85355 2.64645C4.65829 2.45118 4.34171 2.45118 4.14645 2.64645Z"
        className={cn({
          'fill-light-neutral-1 dark:fill-dark-neutral-1': color === 'neutral-1',
        })}
      />
    </svg>
  );
};

export const Github: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12C21 15.99 18.4 19.36 14.81 20.55C14.38 20.62 14.23 20.35 14.23 20.12C14.23 19.82 14.24 18.85 14.24 17.65C14.24 16.81 13.95 16.26 13.63 15.98C15.63 15.76 17.74 15 17.74 11.54C17.74 10.56 17.39 9.76 16.81 9.13C16.91 8.9 17.22 7.97999 16.73 6.73999C16.73 6.73999 15.97 6.50001 14.25 7.67001C13.53 7.47001 12.76 7.36999 12 7.35999C11.23 7.36999 10.46 7.47001 9.75 7.67001C8.03 6.50001 7.27002 6.73999 7.27002 6.73999C6.78002 7.97999 7.08999 8.9 7.17999 9.13C6.60999 9.76 6.26001 10.56 6.26001 11.54C6.26001 14.99 8.35999 15.76 10.36 15.99C10.1 16.21 9.86998 16.61 9.78998 17.19C9.26998 17.42 7.96998 17.82 7.16998 16.44C7.16998 16.44 6.68998 15.58 5.78998 15.52C5.78998 15.52 4.90998 15.51 5.72998 16.06C5.72998 16.06 6.31998 16.34 6.72998 17.38C6.72998 17.38 7.25001 18.99 9.76001 18.44C9.76001 19.19 9.77002 19.9 9.77002 20.12C9.77002 20.34 9.61 20.62 9.19 20.55C5.6 19.37 3 15.99 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"
        className={cn('transition-all', {
          'fill-light-neutral-2 group-hover:fill-light-neutral-1 dark:fill-dark-neutral-2 group-hover:dark:fill-dark-neutral-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const X: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.1682 4H19.9268L13.9001 10.8881L20.99 20.2613H15.4386L11.0906 14.5765L6.1155 20.2613H3.35525L9.80139 12.8937L3 4H8.69229L12.6225 9.19611L17.1682 4ZM16.2 18.6102H17.7286L7.86171 5.56442H6.22141L16.2 18.6102Z"
        className={cn('transition-all', {
          'fill-light-neutral-2 group-hover:fill-light-neutral-1 dark:fill-dark-neutral-2 group-hover:dark:fill-dark-neutral-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const Discord: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.95 6.26001C17.65 5.67001 16.26 5.24 14.82 5C14.64 5.31 14.44 5.73 14.3 6.06C12.76 5.84 11.24 5.84 9.72001 6.06C9.58001 5.73 9.37002 5.31 9.20002 5C7.75002 5.24 6.36001 5.67001 5.07001 6.26001C2.45001 10.08 1.74001 13.81 2.10001 17.49C3.84001 18.74 5.52002 19.5 7.17002 20C7.57002 19.46 7.94 18.88 8.25 18.27C7.65 18.05 7.08001 17.78 6.54001 17.46C6.68001 17.36 6.82002 17.25 6.95002 17.14C10.24 18.63 13.82 18.63 17.07 17.14C17.21 17.25 17.34 17.36 17.48 17.46C16.94 17.78 16.37 18.05 15.77 18.27C16.08 18.88 16.45 19.46 16.85 20C18.5 19.5 20.19 18.74 21.92 17.49C22.36 13.23 21.23 9.53001 18.97 6.26001H18.95ZM8.68 15.17C7.69 15.17 6.88001 14.27 6.88001 13.17C6.88001 12.07 7.67 11.17 8.68 11.17C9.69 11.17 10.5 12.07 10.48 13.17C10.48 14.27 9.68 15.17 8.68 15.17ZM15.32 15.17C14.33 15.17 13.52 14.27 13.52 13.17C13.52 12.07 14.31 11.17 15.32 11.17C16.33 11.17 17.14 12.07 17.12 13.17C17.12 14.27 16.33 15.17 15.32 15.17Z"
        className={cn('transition-all', {
          'fill-light-neutral-2 group-hover:fill-light-neutral-1 dark:fill-dark-neutral-2 group-hover:dark:fill-dark-neutral-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const Globe: FC<{
  className?: string;
  color: 'orange-vibrant' | 'brown-vibrant' | 'pink-vibrant' | 'neutral-2';
}> = ({ className, color }) => {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.55351 8.50001C4.65351 10.5533 5.34684 12.6467 6.55351 14.5067C3.72684 13.88 1.57352 11.46 1.35352 8.50001H4.55351ZM6.55351 1.49334C3.72684 2.12 1.57352 4.54001 1.35352 7.50001H4.55351C4.65351 5.44668 5.34684 3.35334 6.55351 1.49334ZM8.13352 1.33334H7.86684L7.66685 1.62001C6.40018 3.42001 5.66017 5.48668 5.55351 7.50001H10.4469C10.3402 5.48668 9.60018 3.42001 8.33352 1.62001L8.13352 1.33334ZM5.55351 8.50001C5.66017 10.5133 6.40018 12.58 7.66685 14.38L7.86684 14.6667H8.13352L8.33352 14.38C9.60018 12.58 10.3402 10.5133 10.4469 8.50001H5.55351ZM11.4469 8.50001C11.3469 10.5533 10.6535 12.6467 9.44686 14.5067C12.2735 13.88 14.4269 11.46 14.6469 8.50001H11.4469ZM14.6469 7.50001C14.4269 4.54001 12.2735 2.12 9.44686 1.49334C10.6535 3.35334 11.3469 5.44668 11.4469 7.50001H14.6469Z"
        className={cn({
          'fill-light-orange-vibrant dark:fill-dark-orange-vibrant': color === 'orange-vibrant',
          'fill-light-brown-vibrant dark:fill-dark-brown-vibrant': color === 'brown-vibrant',
          'fill-light-pink-vibrant dark:fill-dark-pink-vibrant': color === 'pink-vibrant',
          'fill-light-neutral-2 dark:fill-dark-neutral-2': color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const Close: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
        className={cn('transition-all', {
          'fill-light-neutral-2 group-hover:fill-light-neutral-1 dark:fill-dark-neutral-2 group-hover:dark:fill-dark-neutral-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const HelpCircle: FC<{
  className?: string;
  color?: 'orange-vibrant' | 'blue-vibrant' | 'green-base' | 'pink-vibrant';
}> = ({ className, color = 'orange-vibrant' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.02 17.5C11.468 17.5 11.0149 17.052 11.0149 16.5C11.0149 15.948 11.458 15.5 12.01 15.5H12.02C12.573 15.5 13.02 15.948 13.02 16.5C13.02 17.052 12.572 17.5 12.02 17.5ZM13.603 12.5281C12.872 13.0181 12.7359 13.291 12.7109 13.363C12.6059 13.676 12.314 13.874 12 13.874C11.921 13.874 11.841 13.862 11.762 13.835C11.369 13.703 11.1581 13.278 11.2891 12.885C11.4701 12.345 11.9391 11.836 12.7671 11.281C13.7881 10.597 13.657 9.84707 13.614 9.60107C13.501 8.94707 12.95 8.38988 12.303 8.27588C11.811 8.18588 11.3301 8.31488 10.9541 8.62988C10.5761 8.94688 10.3589 9.41391 10.3589 9.90991C10.3589 10.3239 10.0229 10.6599 9.60889 10.6599C9.19489 10.6599 8.85889 10.3239 8.85889 9.90991C8.85889 8.96891 9.27099 8.08396 9.98999 7.48096C10.702 6.88496 11.639 6.63605 12.564 6.80005C13.831 7.02405 14.8701 8.07097 15.0911 9.34497C15.3111 10.607 14.782 11.7381 13.603 12.5281Z"
        className={cn({
          'fill-light-orange-vibrant dark:fill-dark-orange-vibrant': color === 'orange-vibrant',
          'fill-light-blue-vibrant dark:fill-dark-blue-vibrant': color === 'blue-vibrant',
          'fill-light-green-base dark:fill-dark-green-base': color === 'green-base',
          'fill-light-pink-vibrant dark:fill-dark-pink-vibrant': color === 'pink-vibrant',
        })}
      />
    </svg>
  );
};

export const Lightbulb: FC<{
  className?: string;
  color?: 'orange-vibrant' | 'blue-vibrant' | 'green-base' | 'pink-vibrant';
}> = ({ className, color = 'orange-vibrant' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 9.43997C18.03 11.4 17.0701 12.9201 15.8701 14.3101C15.3961 14.8651 14.9731 15.396 14.7271 16.052C14.6831 16.169 14.5769 16.25 14.4529 16.25H12.55C12.384 16.25 12.25 16.116 12.25 15.95V13.3101L14.03 11.5301C14.32 11.2401 14.32 10.76 14.03 10.47C13.74 10.18 13.26 10.18 12.97 10.47L11.5 11.94L10.03 10.47C9.74003 10.18 9.25997 10.18 8.96997 10.47C8.67997 10.76 8.67997 11.2401 8.96997 11.5301L10.75 13.3101V15.95C10.75 16.116 10.616 16.25 10.45 16.25H8.53491C8.41091 16.25 8.30596 16.17 8.26196 16.054C8.00696 15.386 7.57409 14.8451 7.09009 14.2801C6.00009 13.0001 5 11.39 5 9.50003C5 5.85003 8.00994 2.90003 11.6899 3.00003C15.1199 3.10003 17.94 6.01997 18 9.43997ZM14.2 17.75C14.082 17.75 8.91805 17.75 8.80005 17.75C8.50005 17.75 8.5 18 8.5 18C8.5 19 8.83988 19.75 9.37988 20.25C9.91988 20.75 10.67 21 11.5 21C12.33 21 13.0801 20.75 13.6201 20.25C14.1601 19.75 14.5 19 14.5 18C14.5 18 14.5 17.75 14.2 17.75Z"
        className={cn({
          'fill-light-orange-vibrant dark:fill-dark-orange-vibrant': color === 'orange-vibrant',
          'fill-light-blue-vibrant dark:fill-dark-blue-vibrant': color === 'blue-vibrant',
          'fill-light-green-base dark:fill-dark-green-base': color === 'green-base',
          'fill-light-pink-vibrant dark:fill-dark-pink-vibrant': color === 'pink-vibrant',
        })}
      />
    </svg>
  );
};

export const GraduationCap: FC<{
  className?: string;
  color?: 'orange-vibrant' | 'blue-vibrant' | 'green-base' | 'pink-vibrant' | 'neutral-1';
}> = ({ className, color = 'orange-vibrant' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.9995 14.4189V16.6999C17.9995 17.3939 17.6324 18.035 17.0454 18.406C13.6814 20.531 10.3164 20.531 6.95242 18.406C6.36542 18.036 5.99856 17.3939 5.99856 16.6999V14.4189C5.99856 14.3429 6.07951 14.295 6.14651 14.331L9.81863 16.3399C10.4786 16.6999 11.2386 16.89 11.9986 16.89C12.7586 16.89 13.5185 16.6999 14.1785 16.3399L17.8506 14.331C17.9186 14.294 17.9995 14.3429 17.9995 14.4189ZM19.9365 7.90499L13.4656 4.37399C12.5526 3.87599 11.4484 3.87599 10.5344 4.37399L4.0635 7.90499C2.6455 8.67799 2.6455 10.714 4.0635 11.488L10.5344 15.019C11.4474 15.517 12.5516 15.517 13.4656 15.019L19.9365 11.488L19.2495 11.863V16C19.2495 16.414 19.5855 16.75 19.9995 16.75C20.4135 16.75 20.7495 16.414 20.7495 16V10.671C21.2535 9.73899 20.9855 8.47699 19.9365 7.90499Z"
        className={cn({
          'fill-light-orange-vibrant dark:fill-dark-orange-vibrant': color === 'orange-vibrant',
          'fill-light-blue-vibrant dark:fill-dark-blue-vibrant': color === 'blue-vibrant',
          'fill-light-green-base dark:fill-dark-green-base': color === 'green-base',
          'fill-light-pink-vibrant dark:fill-dark-pink-vibrant': color === 'pink-vibrant',
          'fill-light-neutral-1 dark:fill-dark-neutral-1': color === 'neutral-1',
        })}
      />
    </svg>
  );
};

export const BookOpen: FC<{
  className?: string;
  color?: 'neutral-1';
}> = ({ className, color = 'neutral-1' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 5.31967V18.3297C21 18.6597 20.6801 18.8898 20.3501 18.7998C17.9661 18.1208 15.573 18.1177 13.187 19.3077C12.986 19.4077 12.749 19.2717 12.749 19.0467V5.85276C12.749 5.78576 12.7701 5.71877 12.8091 5.66477C13.4321 4.80977 14.396 4.21471 15.519 4.07871C17.331 3.85871 19.0731 4.07879 20.7141 4.86179C20.8891 4.94479 21 5.12667 21 5.31967ZM8.47998 4.07968C6.66798 3.85968 4.92591 4.07976 3.28491 4.86276C3.11091 4.94576 3 5.12777 3 5.32077V18.3308C3 18.6608 3.3199 18.8908 3.6499 18.8008C6.0339 18.1218 8.42699 18.1187 10.813 19.3087C11.014 19.4087 11.251 19.2727 11.251 19.0477V5.85373C11.251 5.78673 11.2299 5.71974 11.1909 5.66574C10.5669 4.81074 9.60398 4.21568 8.47998 4.07968Z"
        className={cn({
          'fill-light-neutral-1 dark:fill-dark-neutral-1': color === 'neutral-1',
        })}
      />
    </svg>
  );
};

export const Layers: FC<{
  className?: string;
  color?: 'neutral-1';
}> = ({ className, color = 'neutral-1' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.19 17.59L13.6 20.65C12.59 21.12 11.41 21.12 10.4 20.65L3.81 17.59C2.73 17.09 2.73 15.55 3.81 15.05L3.95001 14.99L9.76999 17.68C10.47 18.01 11.22 18.18 12 18.18C12.78 18.18 13.53 18.01 14.23 17.68L20.05 14.99L20.19 15.05C21.27 15.55 21.27 17.09 20.19 17.59ZM20.19 10.72L20.06 10.66L15.4 12.83L14.23 13.37C13.53 13.69 12.78 13.86 12 13.86C11.22 13.86 10.47 13.69 9.76999 13.37L8.60001 12.83L3.94 10.66L3.81 10.72C2.73 11.23 2.73 12.77 3.81 13.27L5.73001 14.16L10.4 16.32C10.91 16.56 11.45 16.68 12 16.68C12.55 16.68 13.09 16.56 13.6 16.32L18.27 14.16L20.19 13.27C21.27 12.77 21.27 11.23 20.19 10.72ZM20.19 6.41L13.6 3.35001C13.09 3.12001 12.55 3 12 3C11.45 3 10.91 3.12001 10.4 3.35001L3.81 6.41C2.73 6.91 2.73 8.45001 3.81 8.95001L3.94 9.01001L4.82999 9.42001L5.72 9.84L10.4 12.01C10.91 12.24 11.45 12.36 12 12.36C12.55 12.36 13.09 12.24 13.6 12.01L18.28 9.84L19.17 9.42001L20.06 9.01001L20.19 8.95001C21.27 8.45001 21.27 6.91 20.19 6.41Z"
        className={cn({
          'fill-light-neutral-1 dark:fill-dark-neutral-1': color === 'neutral-1',
        })}
      />
    </svg>
  );
};

export const ArrowRight: FC<{
  className?: string;
  color?: 'accent-1';
}> = ({ className, color = 'accent-1' }) => {
  return (
    <svg className={className} viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.33325 14.0003C3.33325 13.5401 3.70635 13.167 4.16659 13.167L13.8214 13.167L9.41066 8.75625C9.08523 8.43081 9.08523 7.90317 9.41066 7.57774C9.7361 7.2523 10.2637 7.2523 10.5892 7.57774L16.4225 13.4111C16.7479 13.7365 16.7479 14.2641 16.4225 14.5896L10.5892 20.4229C10.2637 20.7484 9.7361 20.7484 9.41066 20.4229C9.08523 20.0975 9.08523 19.5698 9.41066 19.2444L13.8214 14.8337L4.16659 14.8337C3.70635 14.8337 3.33325 14.4606 3.33325 14.0003Z"
        className={cn({
          'fill-light-accent-1 dark:fill-dark-accent-1': color === 'accent-1',
        })}
      />
    </svg>
  );
};

export const MessageQuestion: FC<{
  className?: string;
  color?: 'orange-vibrant' | 'blue-vibrant' | 'green-base' | 'pink-vibrant';
}> = ({ className, color = 'orange-vibrant' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 3H6C4 3 3 4 3 6V21L6 18H18C20 18 21 17 21 15V6C21 4 20 3 18 3ZM12.02 15C11.468 15 11.0149 14.552 11.0149 14C11.0149 13.448 11.458 13 12.01 13H12.02C12.573 13 13.02 13.448 13.02 14C13.02 14.552 12.572 15 12.02 15ZM13.345 11.051C12.789 11.421 12.713 11.608 12.71 11.616C12.597 11.918 12.3051 12.1121 11.9971 12.1121C11.9151 12.1121 11.833 12.098 11.752 12.069C11.367 11.932 11.1581 11.523 11.2891 11.135C11.4921 10.535 12.0849 10.087 12.5149 9.802C13.1509 9.379 13.1579 8.95004 13.1079 8.66504C13.0299 8.22404 12.6529 7.84604 12.2109 7.76904C11.8749 7.70804 11.5381 7.79494 11.2781 8.01294C11.0221 8.22794 10.876 8.542 10.876 8.875C10.876 9.289 10.54 9.625 10.126 9.625C9.71198 9.625 9.37598 9.289 9.37598 8.875C9.37598 8.097 9.71796 7.36401 10.314 6.86401C10.91 6.36401 11.6939 6.15402 12.4709 6.29102C13.5299 6.47702 14.399 7.34603 14.585 8.40503C14.769 9.45803 14.329 10.397 13.345 11.051Z"
        className={cn({
          'fill-light-orange-vibrant dark:fill-dark-orange-vibrant': color === 'orange-vibrant',
          'fill-light-blue-vibrant dark:fill-dark-blue-vibrant': color === 'blue-vibrant',
          'fill-light-green-base dark:fill-dark-green-base': color === 'green-base',
          'fill-light-pink-vibrant dark:fill-dark-pink-vibrant': color === 'pink-vibrant',
        })}
      />
    </svg>
  );
};

export const Chat: FC<{
  className?: string;
  color?: 'brown-vibrant';
}> = ({ className, color = 'brown-vibrant' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.8789 20.394C21.1189 20.594 20.9789 20.994 20.6689 20.994C19.6389 21.034 18.0591 20.894 17.0891 19.864C16.2991 20.144 15.419 20.2841 14.499 20.2841C12.481 20.2841 10.686 19.607 9.49902 18.368C9.31002 18.17 9.35802 17.785 9.79102 17.819C10.024 17.835 10.259 17.844 10.499 17.844C15.119 17.844 18.614 15.143 19.353 11.235C19.403 10.973 19.7291 10.886 19.8931 11.097C20.5931 12.003 20.998 13.1481 20.998 14.5031C20.998 16.0331 20.4679 17.314 19.5879 18.264C19.6989 18.964 20.0889 19.754 20.8789 20.394ZM17.998 9.67102C17.998 9.62402 17.992 9.58103 17.991 9.53503C17.917 5.44903 14.594 3 10.499 3C6.35802 3 3 5.50202 3 9.67102C3 11.439 3.608 12.915 4.625 14.015C4.5 14.816 4.05009 15.733 3.14209 16.467C2.86709 16.7 3.02503 17.159 3.38403 17.167C4.56703 17.209 6.39203 17.05 7.50903 15.858C7.73703 15.937 7.97094 16.006 8.21094 16.066C8.93194 16.247 9.69998 16.3409 10.501 16.3409C14.64 16.3419 17.998 13.84 17.998 9.67102Z"
        className={cn({
          'fill-light-brown-vibrant dark:fill-dark-brown-vibrant': color === 'brown-vibrant',
        })}
      />
    </svg>
  );
};

export const Envlope: FC<{
  className?: string;
  color?: 'pink-vibrant' | 'neutral-2';
}> = ({ className, color = 'pink-vibrant' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 5H6C4 5 3 6 3 8V17C3 19 4 20 6 20H18C20 20 21 19 21 17V8C21 6 20 5 18 5ZM17.9409 9.606L13.0291 13.178C12.7211 13.402 12.36 13.514 12 13.514C11.64 13.514 11.2779 13.402 10.9709 13.179L6.05908 9.606C5.72408 9.363 5.65004 8.893 5.89404 8.558C6.13704 8.224 6.60389 8.14801 6.94189 8.39301L11.854 11.965C11.942 12.028 12.059 12.029 12.147 11.965L17.0591 8.39301C17.3961 8.14801 17.8639 8.224 18.1069 8.558C18.3509 8.894 18.2759 9.363 17.9409 9.606Z"
        className={cn({
          'fill-light-pink-vibrant dark:fill-dark-pink-vibrant': color === 'pink-vibrant',
          'fill-light-neutral-2 dark:fill-dark-neutral-2': color === 'neutral-2',
        })}
      />
    </svg>
  );
};

export const Sun: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={cn({
          'fill-light-neutral-2 dark:fill-dark-neutral-2': color === 'neutral-2',
        })}
        d="M11 8C11 9.654 9.654 11 8 11C6.346 11 5 9.654 5 8C5 6.346 6.346 5 8 5C9.654 5 11 6.346 11 8ZM8.5 3.33333V2C8.5 1.724 8.276 1.5 8 1.5C7.724 1.5 7.5 1.724 7.5 2V3.33333C7.5 3.60933 7.724 3.83333 8 3.83333C8.276 3.83333 8.5 3.60933 8.5 3.33333ZM8.5 14V12.6667C8.5 12.3907 8.276 12.1667 8 12.1667C7.724 12.1667 7.5 12.3907 7.5 12.6667V14C7.5 14.276 7.724 14.5 8 14.5C8.276 14.5 8.5 14.276 8.5 14ZM3.83333 8C3.83333 7.724 3.60933 7.5 3.33333 7.5H2C1.724 7.5 1.5 7.724 1.5 8C1.5 8.276 1.724 8.5 2 8.5H3.33333C3.60933 8.5 3.83333 8.276 3.83333 8ZM14.5 8C14.5 7.724 14.276 7.5 14 7.5H12.6667C12.3907 7.5 12.1667 7.724 12.1667 8C12.1667 8.276 12.3907 8.5 12.6667 8.5H14C14.276 8.5 14.5 8.276 14.5 8ZM5.054 5.054C5.24933 4.85866 5.24933 4.54199 5.054 4.34666L4.11133 3.40399C3.91599 3.20866 3.59933 3.20866 3.40399 3.40399C3.20866 3.59933 3.20866 3.91599 3.40399 4.11133L4.34666 5.054C4.44399 5.15133 4.57199 5.20066 4.69999 5.20066C4.82799 5.20066 4.956 5.15133 5.054 5.054ZM12.596 12.596C12.7913 12.4007 12.7913 12.084 12.596 11.8887L11.6533 10.946C11.458 10.7507 11.1413 10.7507 10.946 10.946C10.7507 11.1413 10.7507 11.458 10.946 11.6533L11.8887 12.596C11.986 12.6933 12.114 12.7427 12.242 12.7427C12.37 12.7427 12.4987 12.694 12.596 12.596ZM4.11133 12.596L5.054 11.6533C5.24933 11.458 5.24933 11.1413 5.054 10.946C4.85866 10.7507 4.54199 10.7507 4.34666 10.946L3.40399 11.8887C3.20866 12.084 3.20866 12.4007 3.40399 12.596C3.50133 12.6933 3.62932 12.7427 3.75732 12.7427C3.88532 12.7427 4.01333 12.694 4.11133 12.596ZM11.6533 5.054L12.596 4.11133C12.7913 3.91599 12.7913 3.59933 12.596 3.40399C12.4007 3.20866 12.084 3.20866 11.8887 3.40399L10.946 4.34666C10.7507 4.54199 10.7507 4.85866 10.946 5.054C11.0433 5.15133 11.1713 5.20066 11.2993 5.20066C11.4273 5.20066 11.5553 5.15133 11.6533 5.054Z"
      />
    </svg>
  );
};

export const Moon: FC<{
  className?: string;
  color?: 'neutral-2';
}> = ({ className, color = 'neutral-2' }) => {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={cn({
          'fill-light-neutral-2 dark:fill-dark-neutral-2': color === 'neutral-2',
        })}
        d="M8.75534 1.33337C8.75734 1.33337 8.76001 1.33337 8.76201 1.33337C8.97468 1.33337 9.06667 1.59538 8.90667 1.73338C7.786 2.69804 7.17002 4.2147 7.48402 5.84937C7.83268 7.66337 9.32535 9.04403 11.182 9.29203C12.3547 9.4487 13.4407 9.15203 14.304 8.55937C14.4793 8.4387 14.712 8.59804 14.6594 8.80204C13.9234 11.6794 11.084 13.73 7.84467 13.268C5.15401 12.884 3.02935 10.7247 2.71068 8.06337C2.54402 6.67537 2.85933 5.36738 3.51333 4.28005C4.57333 2.51605 6.52401 1.33337 8.75534 1.33337Z"
      />
    </svg>
  );
};

export type ThemeIcon = 'sun' | 'moon';

export const ThemeIconMap: FC<{
  icon: ThemeIcon;
  className?: string;
  color?: 'neutral-2';
}> = ({ icon, color, className }) => {
  switch (icon) {
    case 'sun':
      return <Sun color={color} className={className} />;
    case 'moon':
      return <Moon color={color} className={className} />;
    default:
      console.warn(`Icon ${icon} not found`);
      return null;
  }
};

export type ColoredCardsIcon = 'helpCircle' | 'lightbulb' | 'graduationCap' | 'messageQuestion';
export type ColoredCardsIconColor =
  | 'blue-vibrant'
  | 'green-base'
  | 'orange-vibrant'
  | 'pink-vibrant';

export const ColoredCardsIconMap: FC<{
  icon: ColoredCardsIcon;
  className?: string;
  color?: ColoredCardsIconColor;
}> = ({ icon, color, className }) => {
  switch (icon) {
    case 'helpCircle':
      return <HelpCircle color={color} className={className} />;
    case 'lightbulb':
      return <Lightbulb color={color} className={className} />;
    case 'graduationCap':
      return <GraduationCap color={color} className={className} />;
    case 'messageQuestion':
      return <MessageQuestion color={color} className={className} />;
    default:
      console.warn(`Icon ${icon} not found`);
      return null;
  }
};
