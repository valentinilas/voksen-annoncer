import Button from "../button/button";
import EmblaCarousel from '../carousel/carousel';


import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";





export default function Spotlight() {


    

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const OPTIONS = { loop: false, align: 'start', containScroll: 'trimSnaps' };
    const SLIDE_COUNT = 15;

    const SLIDES =
        items.map((item, index) => {
            return <a href="/"
                className="embla__slide"
                key={index}
            >
                <div className="shadow-sm border rounded-md  m-2 p-2">
                <img src="https://placehold.co/600x400" className="mb-2" />
                <h5 className="font-bold">Lorem ipsum dolor sit amet</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                
            </a>
        });



    return (
        <section className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Spotlight</h3>
                <Button variant="secondary" size="s" onClick={()=>alert('Sign up!')}>Get promoted</Button>
            </div>

            <EmblaCarousel slides={SLIDES} options={OPTIONS} />


        </section>
    );
}