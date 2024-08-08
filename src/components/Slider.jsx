"use client";
import React, { useEffect, useRef } from "react";
//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
// import PropertyCard from "./PropertyCard";
import useDeviceView from "@/helpers/useDeviceView";
import ResaleCard from "./ResaleCard";
import CommercialCard from "./CommercialCard";
import PreconstructionCard from "./PreconstructionCard";

// type: resale/commercial
// data: array of json properties
const Slider = ({ data, type }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const { isMobileView } = useDeviceView();
  //business is returned as Sale of business so we need to modify it to Business

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    }
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    } // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="relative flex justify-center">
      {/* <div className="btns flex justify-between">
        <button
          className=" absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} color="black" />
        </button>
        <button
          className=" absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} color="black" />
        </button>
      </div> */}
      <div
        className={`w-full grid grid-rows-1 sm:grid-cols-4 grid-cols-1 overflow-x-hidden grid-nowrap justify-between py-3`}
        id="slider"
        ref={scrollRef}
      >
        {data?.map((curElem, index) => {
          if (curElem.MLS !== "C8446018" && curElem.MLS !== "C8450446") {
            //manual removal, to be removed later
            return (
              <div className="pl-0 pr-6 my-2 sm:my-0" key={index} ref={cardRef}>
                {type === "resale" ? (
                  <ResaleCard curElem={curElem} />
                ) : type === "commercial" ? (
                  <CommercialCard curElem={curElem} />
                ) : type === "preconstruction" ? (
                  <PreconstructionCard curElem={curElem} />
                ) : null}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Slider;
