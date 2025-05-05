"use server" // Server Actions

// const mailchimp = require("@mailchimp/mailchimp_marketing");
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  // apiKey: "cb1c873fa2ce300d96d0360cb2a9ccfc-us1",
  // server: "us1",
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const addSubscriber = async (formData) => {
  const email = formData.get("email")

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
    return {successMessage: `Success! ${email} was successfully subscribed to our newsletter!`}
  } catch (error) {
    console.log(error.response.body.title)
    if(error.response.body.title === "Member Exists") {
      return {errorMessage: `Ooops! It looks like the email ${email} is already subscribed to our newsletter!`}
    } else {
      return {errorMessage: `Ooops! There was a problem subscribing ${email} to our newsletter!`}
    }
  }
}

// async function run() {
//   const response = await mailchimp.ping.get();
// }

// run();

// RUN : node app/actions.js