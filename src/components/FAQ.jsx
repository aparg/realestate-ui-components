"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

const FAQ = ({ main_data }) => {
  return (
    <>
      <h2 className="font-extrabold pb-3 text-lg sm:text-4xl mb-4">
        Frequently Asked Questions about this property
      </h2>
      <Accordion variant="splitted" className="px-0">
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="What type of property is this?"
        >
          <div className="text-[1rem]">
            This is a {main_data.TypeOwn1Out.toLowerCase()} home.
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="How many bedrooms and bathrooms does this property have ?"
          className="text-md"
        >
          <div className="text-[1rem]">
            This property has {main_data.Bedrooms} bedrooms and{" "}
            {main_data.Washrooms} bathrooms.
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 2"
          title="How many parking spaces are available?"
          className="text-md"
        >
          <div className="text-[1rem]">
            There are {main_data.ParkingSpaces} parking spaces.
          </div>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 3"
          title="Where is this property located?"
          className="text-md"
        >
          <div className="text-[1rem]">
            This property is located in{" "}
            {main_data.Community ? main_data.Community : ""} {main_data?.Street}{" "}
            {main_data?.StreetName} {main_data?.StreetAbbreviation}
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default FAQ;
