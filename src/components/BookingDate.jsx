"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
import BookingType from "./BookingType";
const BookingDate = ({ bannerImage }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [phone, setPhone] = useState("");
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    time: "",
    phone: "",
  });
  const slideLeft = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getDaysArrayInMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month + 1,
        year,
        selected: false,
      }); // Month is 0-indexed, so we add 1 to get the correct month
    }
    daysArray.unshift({
      day: "Any",
      month: "",
      dayName: "",
      selected: false,
      time: "",
    });
    return daysArray;
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [daysArray, setDaysArray] = useState(getDaysArrayInMonth(year, month));
  const selectOption = (e, data) => {
    const updatedDaysArray = daysArray.map((day) => {
      if (day.day === data.day) {
        return { ...day, selected: true };
      } else {
        return { ...day, selected: false };
      }
    });
    setDaysArray(updatedDaysArray);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    setTiming((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitData = () => {
    console.log(timing);
  };

  return (
    <div className="relative z-0 w-full rounded-md bg-gray-100 flex items-center mt-24">
      <div className="flex sm:flex-row flex-col w-full overflow-hidden">
        <div className="w-full sm:w-1/2">
          <img
            src={bannerImage}
            alt="property-img"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full sm:w-1/2 sm:mx-2 p-4 flex flex-col justify-center items-center">
          {/**Schedule a viewing form */}
          <h1 className="font-bold text-3xl my-2 text-center">
            Schedule a viewing
          </h1>
          <div className="flex justify-center">
            <span className="tour-type rounded-full bg-light-lime px-1 py-1">
              <BookingType handleChange={handleChange} />
            </span>
          </div>
          <div className="max-w-[300px]">
            <div className="relative my-2">
              <button
                className="absolute w-6 h-6 left-0 border-gray-200 border-2 rounded-full z-[999] translate-y-[-50%] left-[-10px] sm:left-[-20px] top-[50%] flex justify-center items-center bg-white z-10"
                title="scroll left"
                onClick={slideLeft}
              >
                <SlArrowLeft size={8} />
              </button>
              <button
                className="absolute w-6 h-6 right-0 border-gray-200 border-2 rounded-full z-[999] translate-y-[-50%] right-[-10px] sm:right-[-20px] top-[50%] flex justify-center items-center bg-white z-10 flex justify-center"
                title="scroll right"
                onClick={slideRight}
              >
                <SlArrowRight size={8} />
              </button>
              <div className="flex flex-col items-center">
                <div
                  className="flex z-0 scroll-container relative w-full overflow-x-scroll overscroll-x-none no-scrollbar"
                  style={{ transform: `translateX(${scrollPosition}px) z-0` }}
                  id=""
                  ref={scrollRef}
                >
                  {daysArray.map((data) => (
                    <BookingDateOption
                      ref={cardRef}
                      data={data}
                      key={data.day}
                      handleChange={(e) => {
                        selectOption(e, data);
                      }}
                      selected={data.selected}
                      year={year}
                    />
                  ))}
                </div>
              </div>
            </div>
            <TimingList handleChange={handleChange} />
            {/* <div className="text-md text-center my-2 text-gray-700">
              No obligation or purchase necessary, cancel at any time
            </div> */}
            <div className="relative mb-3">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder=""
                value={timing.phone}
                onChange={(e) => handleChange(e)}
                required={true}
                className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none peer/phone placeholder:translate-y-1/2 placeholder:scale-100"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 peer-focus/phone:-translate-y-[0.85] peer-focus/phone:scale-30 peer-placeholder-shown/phone:translate-y-1/4 peer-placeholder-shown/phone:scale-100"
              >
                Phone
              </label>
            </div>
            <input
              type="submit"
              value="Schedule Tour"
              className="px-4 py-2 bg-primary-green text-white px-4 md:py-2 w-full mb-3 rounded-full hover:cursor-pointer"
              id="subbtn"
              onClick={submitData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
