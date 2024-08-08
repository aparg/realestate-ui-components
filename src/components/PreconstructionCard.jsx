import Link from "next/link";
import Image from "next/image";
import Nformatter from "@/helpers/Nformatter";

const PreconstructionCard = ({ curElem }) => {
  function checkPricing(price) {
    if (parseInt(price) > 0) {
      return `Starting from low $${Nformatter(price, 2)}`;
    } else {
      return `Pricing not available`;
    }
  }

  function daysCount(x) {
    let date_1 = new Date(x);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (TotalDays == 0) {
      return "Today";
    } else {
      return Math.abs(TotalDays) + " day ago ";
    }
  }

  return (
    <>
      <div className="card border-0 shadow-lg rounded-mine my-1 sm:my-3 my-md-0 h-[38rem] rounded-lg mx-2">
        <div className="relative h-[70%]">
          {/* <Link
            href={`/pre-construction-homes/${curElem.city.slug}/${curElem.slug}`}
            className="mylinkk"
            target="_blank"
          > */}
          {curElem.image ? (
            <img
              loading="lazy"
              src={`${curElem.image[0].image}`}
              layout="responsive"
              className="w-full h-full object-cover rounded-t-lg"
              alt={`${curElem.project_name} located at ${curElem.project_address} image`}
              fetchPriority="high"
            />
          ) : (
            <img
              loading="lazy"
              src="/noimage.webp"
              layout="responsive"
              className="w-full h-full object-cover rounded-t-lg"
              alt={`no image available for ${curElem.project_name}`}
              fetchPriority="high"
            />
          )}
          <span className="flex absolute top-2 left-2">
            <span className="shadow-lg p-1 mr-1 bg-white rounded-full m-2 px-3 py-1 text-xs uppercase font-bold">
              {curElem.status}
            </span>
            <span className="shadow-lg p-1 mx-2 bg-white rounded-full m-2 px-3 py-1 text-xs uppercase font-bold ">
              {curElem.project_type}
            </span>
          </span>
          {/* </Link> */}
          {curElem.co_op_available && (
            <span className="shadow-lg p-1 px-2 abs2">Co-op Available</span>
          )}

          <span className="px-2 abs2">
            {curElem.no + 1 ? curElem.no + 1 + " " : " "}
          </span>
        </div>

        <Link
          href={`/pre-construction-homes/${curElem?.city?.slug}/${curElem.slug}`}
          className="text-decoration-none text-dark bg-white shadow-lg rounded-mine"
          target="_blank"
        >
          <div className="p-2">
            <h3 className="mb-1 font-bold mw text-2xl">
              {curElem.project_name}
            </h3>
            <h4 className="mb-1 text-red-700 text-sm font-bold">
              {checkPricing(curElem.price_starting_from)}
            </h4>
            <p className="mb-1 cardd-subtitle flex items-start ">
              <img
                src="/precon-card-img/location.svg"
                className="inline w-4 mt-1 mr-2"
              ></img>
              {curElem.project_address}
            </p>
            <p className="mb-1 cardd-subtitle text-secondary flex">
              <img
                src="/precon-card-img/occupancy.svg"
                className="w-4 items-start mr-2"
              ></img>
              Occupancy: {curElem.occupancy}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PreconstructionCard;
