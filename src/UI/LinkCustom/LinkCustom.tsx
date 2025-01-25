import Link, { LinkProps } from "next/link";
import { FC, forwardRef, ReactNode } from "react";
import classes from "./LinkCustom.module.css";

interface LinkCustomProps extends LinkProps {
  children: ReactNode;
}

export const LinkCustom: FC<LinkCustomProps> = forwardRef<
  HTMLAnchorElement,
  LinkCustomProps
>(({ children, ...props }, ref) => {
  return (
    <Link {...props} ref={ref} className={classes.link}>
      {children}
    </Link>
  );
});

LinkCustom.displayName = "LinkCustom";
