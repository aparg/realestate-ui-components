import Link from "next/link";
import React from "react";

const PropertyDisplaySection = ({
  title,
  subtitle,
  exploreAllLink,
  children,
}) => {
  return (
    <div className="flex flex-col items-center mt-40 sm:mt-40">
      <div className=" my-4 flex flex-col items-center">
        <h1 className="text-5xl font-bold mw">{title}</h1>
        {subtitle && <h5 className="font-md text-md mt-2">{subtitle}</h5>}
      </div>
      {children}
      <Link href={exploreAllLink || "#"}>
        <button className="border-black font-bold border-2 inline px-3 py-2 rounded-md mt-6 ">
          Explore All
        </button>
      </Link>
    </div>
  );
};

export default PropertyDisplaySection;
