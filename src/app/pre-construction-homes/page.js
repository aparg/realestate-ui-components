import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getData(city) {
  const res = await fetch("https://api.luxehomesbyfara.com/api/all-precons", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}
async function getCities() {
  const res = await fetch("https://api.luxehomesbyfara.com/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://luxehomesbyfara.com/pre-construction-homes/`,
    },
    openGraph: {
      images: "/social/precon.webp",
    },
    title: `Be First to Move Into Canada's Most Exciting New Construction Neighborhoods`,
    description: `Lock in pricing and incentives on model homes available for a limited time. Act now before inventory fills up in Canada's most in-demand locales. With prices still accessible compared to resales, find your perfect fit.`,
  };
}

export default async function Home({ params }) {
  let all_data = await getData();
  let cities = await getCities();

  return (
    <>
      <div className="pt-4 position-relative">
        <div>
          <div className="flex justify-center">
            <h1 className="main-title text-center text-3xl font-bold fs-gta pt-5 my-4">
              All Pre Construction Projects in <br /> Canada
            </h1>
          </div>
        </div>
        <div className="py-3"></div>
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-md-1 gy-4">
            {all_data &&
              all_data.length > 0 &&
              all_data.map((item) => (
                <div className="col">
                  <Link
                    href={"/pre-construction-homes/" + item.slug}
                    className="link-black"
                  >
                    <h4 className="fs-m font-bold">{item.name}</h4>
                  </Link>
                  <div className="maxhh">
                    <div className="row row-cols-2 row-cols-md-5">
                      {item.preconstructions &&
                        item.preconstructions.map((precon, no) => (
                          <Link
                            href={`/pre-construction-homes/${item.slug}/${precon.slug}`}
                            className="mb-0 fs-small col"
                            target="_blank"
                          >
                            {precon.project_name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-5 pt-5">
            <h3 className="fs-2">
              <strong>Explore more citites </strong>
            </h3>
            <div>
              {cities &&
                cities.map((item) => (
                  <Link
                    href={"/pre-construction-homes/" + item.slug}
                    className="btn btn-light link-black me-3 mb-3"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className="py-2"></div>
          <div className="pt-5 mt-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/portfolio-img/fara.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Me Today
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="All"
                    city="Preconstruction Homes Page"
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
