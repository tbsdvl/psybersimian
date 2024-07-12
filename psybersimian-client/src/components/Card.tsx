import { useEffect, useState } from "react";

export const Card = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const square = entry.target.querySelector('.card');

          if (square) {
              if (entry.isIntersecting) {
                square.classList.add('card-animation');
                return; // if we added the class, exit the function
              }

              // We're not intersecting, so remove the class!
              square.classList.remove('card-animation');
          }

        });
      });

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
            <div className="card-wrapper">
                <div className="card">
                    {/* <p>Test</p> */}
                </div>
            </div>
        </>
    );
};