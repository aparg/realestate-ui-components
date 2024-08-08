"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "@/helpers/TimeAgo";
import { residential } from "../../api/routes/fetchRoutes";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";
import useDeviceView from "@/helpers/useDeviceView";
import MobileCityResoCard from "./MobileCityResoCard";
import { priceFormatter } from "@/helpers/priceFormatter";
import Image from "next/image";

const ResaleCard = ({ curElem, small = false, showDecreasedPrice = false }) => {
  // const [address, setAddress] = useState("");
  const { isMobileView, isTabletView } = useDeviceView();

  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const imgSrc = residential.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  // const streetAndMLS = curElem.StreetName
  //   ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
  //       curElem.StreetAbbreviation
  //     }-${curElem.MLS}`
  //   : curElem.MLS;

  const streetAndMLS = (() => {
    const parts = [];

    if (curElem.Street) {
      parts.push(curElem.Street);
    }

    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElem.StreetAbbreviation) {
      parts.push(curElem.StreetAbbreviation);
    }

    if (curElem.MLS) {
      parts.push(curElem.MLS);
    }

    return parts.filter(Boolean).join("-");
  })();
  return isMobileView || isTabletView ? (
    <MobileCityResoCard
      streetAndMLS={streetAndMLS}
      small={small}
      handleImageError={handleImageError}
      imgSrc={imgSrc}
      curElem={curElem}
      price={price}
      showDecreasedPrice={showDecreasedPrice}
    />
  ) : (
    <section className="">
      <Link
        href={generateURL({
          cityVal: curElem.Municipality,
          listingIDVal: streetAndMLS,
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative">
            <div
              className={`${small ? "h-44" : "h-52"} overflow-hidden relative`}
            >
              <div className="h-80 relative">
                <Image
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                  src={imgSrc}
                  width="900"
                  height="800"
                  alt="property image"
                  onError={handleImageError}
                />
                {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
              </div>

              <div className="absolute bottom-3 left-2 flex flex-row">
                <div className="text-black text-[0.8rem] p-[2px] px-1 rounded-md mx-1 bg-white flex items-center">
                  {curElem.TypeOwn1Out}{" "}
                </div>
                <div className="text-black text-xs p-[2px] px-1 rounded-md mx-1 bg-white flex items-center">
                  <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                </div>
              </div>
            </div>
            <div className="flex-1 sm:px-3 py-2 px-2">
              {showDecreasedPrice && (
                <span className="text-gray-600">
                  <s>${curElem.MaxListPrice}</s>
                </span>
              )}
              <h2 className="font-bold text-3xl items-center justify-start my-2">
                <div className="flex flex-row items-center">
                  {price}
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                  {showDecreasedPrice && (
                    <div className="ml-2 flex items-center">
                      <span className="text-green-700 text-sm text-md">
                        {showDecreasedPrice &&
                          "$" +
                            priceFormatter(
                              parseFloat(curElem.MaxListPrice) -
                                parseFloat(curElem.ListPrice)
                            )}
                        {curElem.SaleLease === saleLease.lease.value && (
                          <span>/mo</span>
                        )}
                      </span>
                      <img
                        className="w-4 h-4"
                        src="/card-img/price-reduced.png"
                        alt="reduced"
                      ></img>
                    </div>
                  )}
                </div>
              </h2>
              {/* <p className="mb-0 fs-mine text-limit font-md pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p> */}
              <span className={`text-black text-xs ${small && "hidden"}`}>
                <div className="flex flex-row justify-start">
                  {curElem.Bedrooms && (
                    <div className="flex items-center mr-2">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>{Math.floor(curElem.Bedrooms)}</span>
                    </div>
                  )}
                  {curElem.Washrooms && (
                    <div className="flex items-center mr-2">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>{Math.floor(curElem.Washrooms)}</span>
                    </div>
                  )}
                  {curElem.GarageSpaces && (
                    <div className="flex items-center mr-2">
                      <img
                        src="/resale-card-img/garage.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>{Math.floor(curElem.GarageSpaces)}</span>
                    </div>
                  )}
                  {curElem.ApproxSquareFootage && (
                    <div className="flex items-center mr-2">
                      <img
                        src="/resale-card-img/ruler.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>{curElem.ApproxSquareFootage} Sq.Ft.</span>
                    </div>
                  )}
                </div>
              </span>
              <div className="flex flex-row justify-between mt-2">
                <div className="text-black truncate text-ellipsis">
                  <div className="text-dark bva">
                    {curElem.StreetName ? (
                      `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation} ${
                        curElem.Municipality
                      }, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ResaleCard;
