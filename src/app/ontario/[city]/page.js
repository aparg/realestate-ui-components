import React from "react";
import dynamic from "next/dynamic";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getSalesData } from "../../../../api/getSalesData";
import Link from "next/link";
import { ImSpinner } from "react-icons/im";
import { plural } from "@/constant/plural";

const FiltersWithSalesList = dynamic(
  () => import("@/components/FiltersWithSalesList"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center align-item-center">
        <ImSpinner size={24} />
      </div>
    ),
  }
);

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);

  const salesListData = await getSalesData(0, INITIAL_LIMIT, formattedSlug);

  return (
    <>
      {/* <div className="fixed-breadcrumbs">
        <div className="container-fluid">
          <div className="">
            <nav
              style={{
                '--bs-breadcrumb-divider':
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
              }}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                  <Link href="/">Dolphy</Link>
                </li>
                <li className="breadcrumb-item ">
                  <Link href="/ontario">ON</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {formattedSlug}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div> */}

      <div className="container-fluid mt-4">
        <div className="">
          <div className="">
            <FiltersWithSalesList {...{ salesListData, INITIAL_LIMIT, city }} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://luxehomesbyfara.com/ontario/${params.city}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `Find Real Estate in ${params.city}`,
    description: `Explore top Real Estate ${"properties"} in ${
      params.city || "Ontario"
    } and select the best ones`,
  };
}

export default page;
