"use client";
import React, { useState } from "react";
import Link from "next/link";
import { generateURL } from "@/helpers/generateURL";
import { usePathname } from "next/navigation";
import TimeAgo from "@/helpers/TimeAgo";
import { saleLease } from "@/constant";
const MobileCityResoCard = React.forwardRef(
  (
    {
      curElem,
      streetAndMLS,
      small,
      handleImageError,
      imgSrc,
      price,
      // showFallbackImage,
    },
    ref
  ) => {
    const pathname = usePathname();
    return (
      <section className="mb-2" ref={ref}>
        <Link
          href={generateURL({
            cityVal: curElem.Municipality,
            listingIDVal: streetAndMLS,
            embeddedSite: pathname.includes("embedded-site"),
          })}
          className="text-black"
        >
          <div className="lg:px-0 h-36 w-full">
            <div
              className={`flex h-full items-center sm:flex-col flex-row overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 relative`}
            >
              <div
                className={`flex flex-col items-center h-full min-w-28 max-w-24 overflow-hidden relative`}
              >
                <div className="relative h-full w-full">
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-l-md"
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                  {/* {showFallbackImage ? (
                    <Image
                      fill={true}
                      className="object-cover rounded-md w-full h-full transition-all duration-200 transform group-hover:scale-110 "
                      src="/noimage.webp"
                      alt="property image"
                      sizes="30vw"
                    />
                  ) : (
                    <Image
                      fill={true}
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-md"
                      src={imgSrc}
                      alt="property image"
                      onError={handleImageError}
                      loading="lazy"
                      sizes="30vw"
                    />
                  )} */}
                  {/* <div className="absolute inset-0  rounded-md bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
                </div>
              </div>
              <div className="mx-2 w-full my-auto text-ellipsis overflow-hidden">
                {/* <div className="text-xs">{`For ${
                  curElem.saleLease || "Sale"
                }`}</div> */}
                <div className="flex flex-col w-full justify-between">
                  <h2 className="price font-bold mb-1 fs-5 font-bold flex align-items-center justify-start">
                    {price}
                    {""}
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span> /mo</span>
                    )}
                    <span
                      className={`shadow-lg p-1 ms-1 text-black text-xs card-data`}
                    >
                      {Math.floor(curElem.TotalArea)} ft<sup>2</sup>
                    </span>
                  </h2>

                  <div className="text-xs">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva text-ellipsis text-sm">
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
                <div className="flex justify-between">
                  <div className="text-black text-sm rounded-md">
                    {curElem.TypeOwn1Out}{" "}
                  </div>
                </div>
                <div className="inline-flex justify-center items-center mt-2">
                  <div
                    className={`min-w-[50px] inline-flex item-center justify-center bg-[#3a88ef]/[0.08] hover:bg-[#3a88ef]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <img
                      className="pr-1 w-5"
                      src="/mailOutline.svg"
                      alt="Email"
                    />
                    Email
                  </div>
                  <div
                    className={`min-w-[70px] inline-flex item-center justify-center bg-[#ffedea]/[0.5] hover:bg-[#ffdad4]/[0.8] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <img className="pr-1 w-5" src="/phone.svg" alt="Phone" />
                    Phone
                  </div>
                  <div
                    className={`min-w-[70px] inline-flex item-center justify-center bg-[#43bb3f]/[0.1] hover:bg-[#43bb3f]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <img
                      className="pr-1 w-5"
                      src="/whatsapp.svg"
                      alt="whatsapp"
                    />
                    Whatsapp
                  </div>
                  {/* <ColoredBadge
                    icon="./phone.svg"
                    text="Phone"
                    // color="rgba(255, 237, 234, 0.5)"
                    color="#ffedea"
                    opacity="0.5"
                    hoverColor="#ffdad4"
                    hoverOpacity="0.8"
                    // hoverColor="rgba(255, 218, 212, 0.8)"
                  />
                  <ColoredBadge
                    icon="./whatsapp.svg"
                    text="Whatsapp"
                    // color="rgba(67, 187, 63, 0.1)"
                    color="#43bb3f"
                    opacity="0.1"
                    // hoverColor="rgba(67, 187, 63, 0.2)"
                    hoverColor="#43bb3f"
                    hoverOpacity="0.2"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
  }
);

export default MobileCityResoCard;
