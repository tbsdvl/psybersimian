import { Children } from "react";

export const Card = ({ style, children }: { style: string, children: JSX.Element | JSX.Element[] }) => {
    const mappedChildren = Children.map(children, child =>
        <div>
            {child}
        </div>
    );

    return (
        <>
            <div className="card-wrapper flex flex-col justify-center items-center">
                <div className={style}>
                    {...mappedChildren}
                </div>
            </div>
        </>
    );
};