// import axios from "axios";
// import swal from "sweetalert";



// function  ContactFormSubmit (msgdata, setSubmitbtn, setCredentials, contactType, leadEmail) {
//   let baseUrl = "https://api.homebaba.ca";
//   setSubmitbtn("Submitting...");
//   let form_data = new FormData();
//   form_data.append("name", msgdata.name);
//   form_data.append("email", msgdata.email);
//   form_data.append("phone", msgdata.phone);
//   form_data.append("message", msgdata.message);
//   form_data.append("realtor", msgdata.realtor);
//   let url = `${baseUrl}/api/contact-form-submit/`;
//   axios
//     .post(url, form_data, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//       mode: "no-cors",
//     })
//     .then(() => {
//       // Prepare the data for the second API call
//       let secondApiUrl = `https://crm.homepapa.ca/services`;
//       let secondApiData = {
//         name: contactType,
//         attributes: {
//           ...msgdata,
//         },
//         leadEmail: leadEmail,
//       };
//       delete secondApiData.attributes.name;
//       delete secondApiData.attributes.email;

//       console.log(secondApiData,"secondApiData")

//       return axios.post(secondApiUrl, secondApiData, {
//         headers: {
//           "content-type": "application/json",
//         },
//         mode: "no-cors",
//       });
//     })
//     .then(() => {
//       setSubmitbtn("Sucessfully Submitted");
//       setTimeout(() => {
//         setSubmitbtn("Contact Now");
//       }, 2000);
//       swal(
//         `Thank You, ${msgdata.name}`,
//         "Please expect an email or call from us shortly",
//         "success"
//       );
//       setCredentials({
//         ...msgdata,
//         name: "",
//         phone: "",
//         email: "",
//         message: "",
//       });
//     })
//     .catch((errr) => {
//       console.log(errr);
//       setSubmitbtn("Contact Now");
//       swal("Message Failed", "Cannot send your message", "error");
//     });
// }

// export default ContactFormSubmit;
import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials, contactType, leadEmail) {
  let baseUrl = "https://api.homebaba.ca";
  let crmUrl = "https://backendcrm.homepapa.ca/services";
  setSubmitbtn("Submitting...");

  // Prepare the data for the CRM API call
  let crmData = {
    name: contactType,
    attributes: {
      ...msgdata,
    },
    leadEmail: leadEmail,
  };
  delete crmData.attributes.name;
  delete crmData.attributes.email;

  console.log(crmData, "crmData");

  // First API call to CRM backend
  axios.post(crmUrl, crmData, {
    headers: {
      "content-type": "application/json",
    },
    mode: "no-cors",
  })
    .then(() => {
      // If CRM API call is successful, proceed with the original API call
      let form_data = new FormData();
      form_data.append("name", msgdata.name);
      form_data.append("email", msgdata.email);
      form_data.append("phone", msgdata.phone);
      form_data.append("message", msgdata.message);
      form_data.append("realtor", msgdata.realtor);
      
      let url = `${baseUrl}/api/contact-form-submit/`;
      
      return axios.post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      });
    })
    .then(() => {
      setSubmitbtn("Successfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Contact Now");
      }, 2000);
      swal(
        `Thank You, ${msgdata.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        ...msgdata,
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    })
    .catch((errr) => {
      console.log(errr);
      setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    });
}

export default ContactFormSubmit;