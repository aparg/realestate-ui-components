"use server";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { Resend } from "resend";

const resend = new Resend("re_EwHkJKn7_BqC3Jj57KVoFXeELa5b74Qhd");

export const sendEmail = async ({ content, page = null, title = null }) => {
  const contentArray = [];
  for (const [key, value] of Object.entries(content)) {
    contentArray.push(`${capitalizeFirstLetter(key)} : ${value}`);
  }
  console.log("sending...");
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["faranakforoghi@gmail.com"],
    subject: `Inquiry from ${page || "property"} in luxehomesbyfara.com`,
    html: `<h1>${
      title || `Inquiry from ${page} page`
    }</h1><br/><ul>${contentArray
      .map((val) => `<li>${val}</li>`)
      .join("")}</ul>`,
  });
  if (error) {
    swal("Message Failed", "Cannot send your message", "error");
  } else {
    swal(
      `Thank You, ${content.name || ""}`,
      "Please expect an email or call from us shortly",
      "success"
    );
  }
  // console.log(data, error);
};
