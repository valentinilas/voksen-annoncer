import React from 'react'
import { DotButton, useDotButton } from './carousel-dots'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './carousel-buttons'
import useEmblaCarousel from 'embla-carousel-react'

import './carousel-styles.css';

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item) => (
            item
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}  />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}  />
        </div>

        <div className="embla__dots">
          {scrollSnaps.length> 1 && scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
