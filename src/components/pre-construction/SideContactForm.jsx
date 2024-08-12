"use client";

import { useState } from "react";
// import ContactFormSubmit from "./ContactFormSubmit";
import { useRouter } from "next/navigation";
import { sendEmail } from "../../../api/resend";

export default function SideContactForm(props) {
  const router = useRouter();
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
    proj_name: props.proj_name,
    city: props.city,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // gtag_report_conversion();
    console.log(credentials);
    console.log("send");
    await sendEmail({
      content: credentials,
      page: "Preconstructions Page",
      title: "Inquiry from Contact Form",
    });
    // ContactFormSubmit(credentials, setSubmitbtn, setCredentials)
    // .then((res) => router.push("/thank-you"))
    // .catch((err) => console.log(err));
  };
  return (
    <form
      method="POST"
      className="mb-3"
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="row me-0 row-cols-2 g-1 me-0">
        <div className="col mb-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="w-full px-2 py-3"
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="w-full px-2 py-3"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="w-full px-2 py-3"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <div className="relative">
              <select
                className="form-select block w-full py-[0.375rem] px-[2.25rem] pr-[0.375rem] pl-[0.75rem] text-base font-normal text-[#212529] bg-white bg-[url('data:image/svg+xml,%3csvg xmlns='http://www.w....')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_12px] border border-solid border-[#ced4da] rounded-[0.375rem] transition-[border-color_0.15s_ease-in-out,box-shadow_0.15s_ease-in-out] appearance-none"
                id="realtor"
                aira-label="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <label htmlFor="text-sm translate-x-2">
              Are you a realtor or working with a realtor?{" "}
            </label>
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-3">
          <textarea
            id="message"
            name="message"
            className="w-full px-2 py-3 mess"
            rows="3"
            cols="50"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="btn bg-dark text-white btn-lg w-100 mb-3"
        id="subbtn"
      />
      <div className="d-flex">
        <p className="small-text2 text-[0.5rem] mb-3">
          Luxhomesbyfara is an online pre-construction homes database.
          Luxhomesbyfara curates the list of projects that are publicly
          available on internet Be advised the information provided on this page
          could be outdated or inaccurate. By submitting above form you consent
          the real estate agent Fara Foroghi. to connect with you. We may share
          your info to our brokerage partners and agents to help you with your
          questions. You can unsubscribe at any time by emailing us.
        </p>
      </div>
    </form>
  );
}
