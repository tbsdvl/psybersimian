import { Children } from "react";

export const Section = ({ style, children }: { style: string, children: JSX.Element[] | JSX.Element }) => {
    const mappedChildren = Children.map(children, child =>
        <section className={style}>
            {child}
        </section>
    );
  return (
    <>
          {...mappedChildren}
    </>
  );
};
