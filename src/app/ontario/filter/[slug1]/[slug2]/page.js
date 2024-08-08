import React from "react";
import { houseType, saleLease } from "@/constant/filters";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FiltersWithSalesList from "@/components/FiltersWithSalesList";
import { plural } from "@/constant/plural";

const page = async ({ params }) => {
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = houseType[params.slug1].name;
  } else if (Object.keys(houseType).includes(params.slug2)) {
    type = houseType[params.slug2].name;
  }
  const isValidSlug = saleLeaseValue || type;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <FiltersWithSalesList
          {...{
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
          }}
        />
      </div>
    );
  return <></>;
};

export default page;

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  } else if (Object.keys(houseType).includes(params.slug2)) {
    type = capitalizeFirstLetter(params.slug2);
  }
  return {
    ...parent,
    alternates: {
      canonical: `https://luxehomesbyfara.com/ontario/${type}/${saleLeaseValue}/${type}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `Find ${type} Real Estate ${saleLease[saleLeaseValue]?.name} in ${params.city}`,
    description: `Explore top ${type || "real estate"}${
      plural[capitalizeFirstLetter(type)] || "properties"
    } in ${params.city || "Ontario"} and select the best ones`,
  };
}
