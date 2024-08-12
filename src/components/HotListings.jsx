"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
//CONSTANT
import useDeviceView from "@/helpers/useDeviceView";
import ResaleCard from "./ResaleCard";

const plural = {
  Retail: " Businesses",
  Industrial: " Businesses",
  Office: "",
  Land: "s",
  Business: "es",
};
const HotListings = ({ salesData }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  // const formattedCity = city ? city.toLowerCase() : undefined;
  // const [salesData, setSalesData] = useState([]);
  // const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const scrollAmt = () => {
    if (isMobileView) {
      return 1;
    }
    return 3;
  };
  // useEffect(() => {
  //   fetchFilteredData();
  // }, []);

  return salesData?.length > 0 ? (
    <div
      className={`relative rounded-xl px-2 z-10 ${
        isMobileView ? "mt-3" : "mt-4"
      }`}
      style={{
        backgroundColor: "#FEF7E7",
        // "linear-gradient(90deg, rgb(255,203,171) 0px, rgb(249,194,189))",
      }}
    >
      <div className="w-full flex flex-row justify-between">
        <h3
          className={`text-3xl font-bold mw ${isMobileView ? "pt-3" : "pt-4"}`}
        >
          Listed Today!
        </h3>
      </div>
      {/* <div className="w-full absolute top-[-50px] z-[999]">
        <Image
          src="/hot-listings.png"
          alt="hot listing"
          className="mx-auto z-[20] w-20"
        />
      </div> */}

      <div className="overflow-hidden">
        <div
          className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-x-4 mt-1 mb-4"
          id="slider"
          ref={scrollRef}
        >
          {salesData?.map((curElem, index) => {
            // if (curElem.PhotoCount > 0) {
            return (
              <ResaleCard
                // city={formattedCity}
                key={index}
                curElem={curElem}
                ref={cardRef}
                small={true}
              />
            );
            // }
            // return null
          })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HotListings;
