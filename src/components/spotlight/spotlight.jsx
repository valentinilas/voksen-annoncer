import Button from "../button/button";
import useEmblaCarousel from 'embla-carousel-react'

import './spotlight-carousel.css';

export default function Spotlight() {

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [emblaRef] = useEmblaCarousel({ loop: true })

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Spotlight</h3>
                <Button variant="text">Get promoted</Button>
            </div>
            {/* className="spotlight-items grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 */}
            <div ref={emblaRef} className="embla">
                <div className="embla__container">
                    {items.map(item => {
                        return <a href="/"
                            // className="shadow-sm border border-cherry-100 rounded-lg p-4 hover:bg-cherry-50"
                            className="embla__slide"
                        >
                            <img src="https://placehold.co/600x400" />
                            <h5 className="font-bold">Lorem ipsum dolor sit amet</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </a>
                    })}

                </div>
            </div>
        </section>
    );
}