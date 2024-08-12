"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const Gallery = ({ data }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <>
      {LightGallery ? (
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-rows-2 grid-cols-4 gap-2"
        >
          <>
            {data?.length > 0 ? (
              data.map((url, index) => (
                <a
                  href={`${url}`}
                  key={index}
                  className={`gallery-item ${
                    index === 0 ? "row-span-2 col-span-2" : ""
                  } ${index >= 5 ? "hidden" : ""}`}
                >
                  <Image
                    loader={() => url}
                    src={url}
                    width={500}
                    height={index === 0 ? 800 : 207}
                    className={`w-full ${
                      index === 0 ? "h-[600px]" : "h-[295px]"
                    } object-cover object-center rounded-[10px]`}
                    alt={`Image ${index + 1}`}
                  />
                </a>
              ))
            ) : (
              <p>NO Image</p>
            )}
          </>
        </LightGallery>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Gallery;
