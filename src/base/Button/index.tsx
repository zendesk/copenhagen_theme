import { FC, PropsWithChildren } from "react";

import cn from "classnames";
import { Theme } from "../../utils/storage";
import formatHrefAsMailto from "../../utils/formatHrefAsMailto";
import React from "react";

interface PrimaryButtonProps extends ButtonBaseProps {
  label: string;
  color?: "accent-1" | "accent-2";
  size?: "medium" | "large";
  fullWidth?: boolean;
  theme?: Theme;
}

interface PrimaryLinkProps extends LinkBaseProps {
  label: string;
  color?: "accent-1" | "accent-2" | "surface-3";
  size?: "medium" | "large";
  fullWidth?: boolean;
  theme?: Theme;
}

export const PrimaryButton: FC<PrimaryLinkProps | PrimaryButtonProps> = (
  props
) => {
  const {
    color = "accent-1",
    size = "medium",
    fullWidth = false,
    theme,
  } = props;
  const containerStyle = cn(
    "transition-colors flex flex-row items-center justify-center",
    {
      "bg-light-accent-1 dark:bg-dark-accent-1 hover:bg-light-accent-1-hovered dark:hover:bg-dark-accent-1-hovered":
        !theme && color === "accent-1",
      "bg-light-accent-2 dark:bg-dark-accent-2 hover:bg-light-accent-2-hovered dark:hover:bg-dark-accent-2-hovered":
        !theme && color === "accent-2",
      "bg-light-surface-3 dark:bg-dark-surface-3 hover:bg-light-surface-3-hovered dark:hover:bg-dark-surface-3-hovered":
        !theme && color === "surface-3",
      "bg-dark-accent-1 hover:bg-dark-accent-1-hovered":
        theme === "dark" && color === "accent-1",
      "bg-light-accent-1 hover:bg-light-accent-1-hovered":
        theme === "light" && color === "accent-1",
      "bg-dark-accent-2 hover:bg-dark-accent-2-hovered":
        theme === "dark" && color === "accent-2",
      "bg-light-accent-2 hover:bg-light-accent-2-hovered":
        theme === "light" && color === "accent-2",
      "rounded-small px-padding-small py-padding-small-dense":
        size === "medium",
      "rounded-medium px-padding-large p-padding-medium": size === "large",
    }
  );
  const textStyle = cn({
    "text-white": color === "accent-1",
    "text-light-accent-1 dark:text-dark-accent-1": color === "accent-2",
    "text-light-neutral-1 dark:text-dark-neutral-1": color === "surface-3",
    "button-label-4": size === "medium",
    "button-label-2": size === "large",
  });

  if ("href" in props) {
    const { label, href, ariaLabel, className, onClick } = props;

    return (
      <div
        className={cn("PrimaryButton flex", {
          "w-full": fullWidth,
        })}
      >
        <LinkBase
          href={href}
          className={cn(containerStyle, className, {
            "w-full": fullWidth,
          })}
          ariaLabel={ariaLabel}
          onClick={onClick}
        >
          <span className={textStyle}>{label}</span>
        </LinkBase>
      </div>
    );
  }

  const { label, onClick, ariaLabel, role, className } = props;

  return (
    <div className="PrimaryButton flex">
      <ButtonBase
        onClick={onClick}
        className={cn(containerStyle, className)}
        ariaLabel={ariaLabel}
        role={role}
      >
        <span className={textStyle}>{label}</span>
      </ButtonBase>
    </div>
  );
};

interface TextButtonProps extends ButtonBaseProps {
  label: string;
  textClassName?: string;
}

interface TextLinkProps extends LinkBaseProps {
  label: string;
  textClassName?: string;
}

export const TextButton: FC<TextButtonProps | TextLinkProps> = (props) => {
  const containerStyle = "TextButton group";
  const textStyle = "decoration-inherit";
  const textClassName = props.textClassName;

  if ("href" in props) {
    const { label, href, ariaLabel, className, onClick } = props;

    return (
      <LinkBase
        href={href}
        className={cn(containerStyle, className)}
        ariaLabel={ariaLabel}
        onClick={onClick}
      >
        <span className={cn(textStyle, textClassName)}>{label}</span>
      </LinkBase>
    );
  }

  const { label, onClick, ariaLabel, role, className } = props;

  return (
    <ButtonBase
      onClick={onClick}
      className={cn(containerStyle, className)}
      ariaLabel={ariaLabel}
      role={role}
    >
      <span className={cn(textStyle, textClassName)}>{label}</span>
    </ButtonBase>
  );
};

type ButtonBaseProps = {
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  role?: string;
};

export const ButtonBase: FC<PropsWithChildren<ButtonBaseProps>> = ({
  className,
  onClick,
  children,
  ariaLabel,
  role,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      role={role}
    >
      {children}
    </button>
  );
};

type LinkBaseProps = {
  className?: string;
  href: string;
  ariaLabel?: string;
  onClick?: () => void;
};

const OPEN_IN_NEW_TAB_PROPS = { target: "_blank", rel: "noreferrer noopener" };
const OPEN_IN_CURRENT_TAB_PROPS = { target: "_self" };

export const LinkBase: FC<PropsWithChildren<LinkBaseProps>> = ({
  className,
  href,
  children,
  ariaLabel,
  onClick,
}) => {
  const isInternalLink = href.startsWith("/") || href.startsWith("#");
  const targetProps = isInternalLink
    ? OPEN_IN_CURRENT_TAB_PROPS
    : OPEN_IN_NEW_TAB_PROPS;

  return (
    <a
      className={className}
      href={formatHrefAsMailto(href)}
      aria-label={ariaLabel}
      onClick={onClick}
      {...targetProps}
    >
      {children}
    </a>
  );
};
