/* eslint-disable @next/next/no-img-element */
"use client";

import { ISlider } from "@/types";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import Link from "next/link";

type MovieCarouselProps = {
  items: (ISlider | null)[];
};

export const MovieCarousel = ({ items }: MovieCarouselProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={1}
      autoplay
      autoplayDelay={6000}
      autoplayDirection="forward"
      itemsToScroll={1}
      swipeTreshold={100}
      forwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        className: "absolute z-10 right-4 bottom-16",
        children: (
          <span
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" })
            )}
          >
            next
          </span>
        ),
      }}
      backwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        className: "absolute z-10 right-4 bottom-4",
        children: (
          <span
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" })
            )}
          >
            prev
          </span>
        ),
      }}
      responsiveProps={[
        {
          itemsToShow: 1,
          itemsToScroll: 1,
          minWidth: 768,
        },
      ]}
      speed={400}
      infinite
      easing="ease-in-out"
    >
      {items.map((item, index) => (
        <div
          className="min-h-80 max-h-[580px] h-[50vw] w-screen relative before:absolute before:bottom-0 before:left-0 before:h-1/2 before:w-full before:bg-gradient-to-t before:from-white/70 before:to-transparent dark:before:from-black dark:before:to-transparent before:z-20"
          key={item?.title}
        >
          <div className="absolute leading-relaxed max-w-[75%] bottom-6 left-6 z-20">
            <h1 className="text-5xl font-semibold">{item?.title}</h1>
            <p>{item?.description}</p>
            
            <div className="flex gap-x-3">
              <p>{item?.detail.quality}</p>
              <p>{item?.detail.imdb}</p>
              <p>{item?.detail.duration}</p>
            </div>

            <Button>
              <Link href={`/${item?.id}`}>
                Watch Now
              </Link>
            </Button>
          </div>
          <div className="absolute w-full right-0 top-0 before:h-full before:w-[60%] before:bg-gradient-to-r before:from-white before:to-transparent before:absolute">
            <img
              draggable={false}
              src={item?.image}
              alt={item?.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </ReactSimplyCarousel>
  );
};

const CustomNextButton = () => {
  return <button className="z-[999]">Next</button>;
};