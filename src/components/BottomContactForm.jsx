"use client";
import { useState } from "react";
// import ContactFormSubmit from "./ContactFormSubmit";
import React from "react";
// import { useUser } from "@clerk/nextjs";
import { sendEmail } from "../../api/resend";

export default function BottomContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const contactType = "contact";
  // const { isLoaded, isSignedIn, user } = useUser();
  // const leadEmail = user?.emailAddresses[0].emailAddress;
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const clearCredentials = () => {};
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({
      content: credentials,
      page: "Bottom Contact Form",
      title: "Inquiry from Contact Form",
    });
    setCredentials({
      name: "",
      phone: "",
      email: "",
      realtor: "No",
      message: props.defaultmessage,
    });
    console.log("EMAIL SENT");
    // ContactFormSubmit(
    //   credentials,
    //   setSubmitbtn,
    //   setCredentials,
    //   contactType,
    //   leadEmail
    // );
  };
  return (
    <form
      method="POST"
      className=""
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="row row-cols-2 g-4 me-0">
        <div className="col mb-2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="fields fff"
          />
        </div>
        <div className="col">
          <div className="mb-2">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-2">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1 ">
        <div className="col">
          <div className="mb-2 ">
            <div className="form-floating ">
              <select
                className="form-select "
                id="realtor"
                aria-label="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <label htmlFor="floatingSelect">
                Are you a first time home buyer??{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-2">
          <textarea
            id="message"
            name="message"
            className="fields fff mess"
            rows="3"
            cols="50"
            placeholder="Enter your message here"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="btn bg-black btn-lg w-100 mb-2 text-white"
        id="subbtn"
      />
    </form>
  );
}
