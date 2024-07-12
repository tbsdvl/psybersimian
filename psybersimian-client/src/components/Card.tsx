import { Children, useEffect, useState } from "react";

export const Card = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const mappedChildren = Children.map(children, child =>
        <div>
            {child}
        </div>
    );
    const [isLoaded, setIsLoaded] = useState(false);
    let animationHasPlayed = false;
    const options = {
        root: document.querySelector("#scrollArea"),
        rootMargin: "0px",
        threshold: 1.0,
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const card = entry.target.querySelector('.card');
          if (card) {
              if (entry.isIntersecting && !animationHasPlayed) {
                card.classList.add('card-animation');
                animationHasPlayed = true;
                card.classList.remove('invisible');
                return;
              }
          }
        });
      }, options);

      useEffect(() => {
        if (!isLoaded) {
            const element = document.querySelector('.card-wrapper');
            if (element) {
                observer.observe(element);
                setIsLoaded(true);
            }
        }
      });

    return (
        <>
            <div className="card-wrapper flex flex-col justify-center items-center">
                <div className="card box-border h-6/12 w-3/4 p-4 shadow-lg m-5 shadow-black invisible">
                    {...mappedChildren}
                </div>
            </div>
        </>
    );
};