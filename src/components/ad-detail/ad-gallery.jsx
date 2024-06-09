import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default function SimpleGallery(props) {
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#' + props.galleryID,
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <div className="pswp-gallery grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mt-10" id={props.galleryID}>
            {props.images.map((image, index) => (
                <a
                    className=""
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={props.galleryID + '-' + index}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img className="rounded-md w-full object-cover aspect-square" src={image.thumbnailURL} alt="" />
                </a>
            ))}
        </div>
    );
}


