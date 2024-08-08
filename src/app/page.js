import Slider from "@/components/Slider";
import Image from "next/image";
import { getFilteredRetsData } from "../../api/getSalesData";
import { saleLease } from "@/constant";
import Link from "next/link";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import { getPreconData } from "../../api/getPreconData";

export default async function Home() {
  const residentialData = await getFilteredRetsData({
    saleLease: "Sale",
    limit: 4,
    skip: 0,
  });
  {
    /* pass property propertyType:"commercial" only for commercial card slider, default is residential */
  }
  const commercialData = await getFilteredRetsData({
    saleLease: "Sale",
    limit: 4,
    propertyType: "commercial",
  });

  const preconData = await getPreconData();
  return (
    <>
      <PropertyDisplaySection
        title="Hot Resale Listings"
        subtitle="Explore our resale properties"
        exploreAllLink="#"
      >
        <Slider data={residentialData} type="resale" />
      </PropertyDisplaySection>

      <PropertyDisplaySection
        title="Hot Commercial Listings"
        subtitle="Explore our commercial properties"
        exploreAllLink="#"
      >
        <Slider data={commercialData} type="commercial" />
      </PropertyDisplaySection>

      <PropertyDisplaySection
        title="Must-See Upcoming Projects"
        subtitle="Explore our pre-construction properties"
        exploreAllLink="#"
      >
        <Slider data={preconData} type="preconstruction" />
      </PropertyDisplaySection>

      <PropertyDisplaySection
        title="Move-in Ready Homes"
        subtitle="Explore our resale properties"
        exploreAllLink="#"
      >
        <Slider data={residentialData} type="resale" />
      </PropertyDisplaySection>

      <div className="flex flex-col items-center mt-40 sm:mt-40"></div>
      {/* pass props type="commercial" only for commercial card slider, default is residential */}
    </>
  );
}
