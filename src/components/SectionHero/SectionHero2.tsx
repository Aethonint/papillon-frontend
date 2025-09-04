'use client'

import backgroundLineSvg from '@/images/Moon.svg'
import heroImage1 from '@/images/hero-right-1.png'
import heroImage2 from '@/images/hero-right-2.png'
import heroImage3 from '@/images/hero-right-3.png'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useInterval } from 'react-use'

// DEMO DATA
const data = [
  {
    id: 1,
    imageUrl: heroImage1.src,
    heading: 'Exclusive collection <br /> for everyone',
    subHeading: 'In this season, find the best 🔥',
    btnText: 'Explore shop now',
    btnHref: '/collections/all',
  },
  {
    id: 2,
    imageUrl: heroImage2.src,
    heading: 'Exclusive collection <br /> for everyone',
    subHeading: 'In this season, find the best 🔥',
    btnText: 'Explore shop now',
    btnHref: '/collections/all',
  },
  {
    id: 3,
    imageUrl: heroImage3.src,
    heading: 'Exclusive collection <br /> for everyone',
    subHeading: 'In this season, find the best 🔥',
    btnText: 'Explore shop now',
    btnHref: '/collections/all',
  },
]

interface Props {
  className?: string
}

let TIME_OUT: NodeJS.Timeout | null = null
const SectionHero2: FC<Props> = ({ className = '' }) => {
  // =================

  const [isSlided, setIsSlided] = useState(false)
  const [indexActive, setIndexActive] = useState(0)
  const [isRunning, toggleIsRunning] = useState(true)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleClickNext()
    },
    onSwipedRight: () => {
      handleClickPrev()
    },
    trackMouse: true,
  })

  useEffect(() => {
    if (isSlided || !indexActive) {
      return
    }
    setIsSlided(true)
  }, [indexActive, isSlided])

  useInterval(
    () => {
      handleAutoNext()
    },
    isRunning ? 5000 : 999999
  )

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= data.length - 1) {
        return 0
      }
      return state + 1
    })
  }

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= data.length - 1) {
        return 0
      }
      return state + 1
    })
    handleAfterClick()
  }

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return data.length - 1
      }
      return state - 1
    })
    handleAfterClick()
  }

  const handleAfterClick = () => {
    toggleIsRunning(false)
    if (TIME_OUT) {
      clearTimeout(TIME_OUT)
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true)
    }, 1000)
  }

  // ===================================================

  const renderItem = (index: number) => {
    const isActive = indexActive === index
    const item = data[index]

    return (
      <div
        className={clsx(
          'fade--animation relative flex flex-col gap-10 overflow-hidden py-14 pl-container sm:py-20 lg:flex-row lg:items-center',
          isActive ? 'flex' : 'hidden'
        )}
        key={index}
      >
        {/* BG */}
        <div className="absolute inset-0 -z-10 bg-[#E3FFE6]">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="absolute h-full w-full object-contain"
            src={backgroundLineSvg}
            alt="hero"
          />
        </div>

        {/* DOTS */}
        <div className="absolute start-1/2 bottom-4 flex -translate-x-1/2 justify-center rtl:translate-x-1/2">
          {data.map((_, index) => {
            const isActive = indexActive === index
            return (
              <div
                key={index}
                onClick={() => {
                  setIndexActive(index)
                  handleAfterClick()
                }}
                className="relative cursor-pointer px-1 py-1.5"
              >
                <div className="relative h-1 w-20 rounded-md bg-white shadow-xs">
                  {isActive && <div className={`absolute inset-0 rounded-md bg-neutral-900 fade--animation__dot`} />}
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative flex max-w-5xl flex-1/2 flex-col items-start fade--animation__left">
          <span className="block text-base font-medium text-neutral-700 fade--animation__subheading md:text-xl">
            {item.subHeading}
          </span>
          <h2
            className="mt-5 text-4xl font-semibold text-neutral-900 fade--animation__heading sm:mt-6 md:text-5xl xl:text-6xl xl:leading-[1.2] 2xl:text-7xl"
            dangerouslySetInnerHTML={{ __html: item.heading }}
          />

          <ButtonPrimary className="mt-10 fade--animation__button sm:mt-20" href={item.btnHref || '#'}>
            <span className="me-2">{item.btnText}</span>
            <HugeiconsIcon icon={Search01Icon} size={20} />
          </ButtonPrimary>
        </div>

        <div className="relative -z-10 flex-1/2 lg:pr-10">
          <Image
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-auto w-full max-w-[40rem] object-contain fade--animation__image select-none"
            src={item.imageUrl}
            alt={item.heading}
            width={790}
            height={790}
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('relative z-[1]', className)} {...handlers}>
      {data.map((_, index) => renderItem(index))}

      <button
        type="button"
        className="absolute inset-y-px end-0 z-10 hidden items-center justify-center px-10 text-neutral-700 lg:flex"
        onClick={handleClickNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute inset-y-px start-0 z-10 hidden items-center justify-center px-10 text-neutral-700 lg:flex"
        onClick={handleClickPrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>
  )
}

export default SectionHero2
