import emailjs from "@emailjs/browser"
require("dotenv").config();

// Initialize EmailJS with your public key
export const initEmailJS = () => {
    const Pkey = process.env.EMAILJS_PUBLIC_KEY!; 
    console.log('public key: ', Pkey)
  emailjs.init(Pkey)
}

export type FormData = {
  name?: string;
  email: string;
  subject: string;
  message: string;
}

// Contact form email
export const sendContactEmail = async (formData: FormData) => {
  const service_id = process.env.EMAILJS_SERVICE_ID!;
  const temp_id = process.env.EMAILJS_TEMPLATE_ID!;
  console.log("service ID: ", service_id)
  console.log("temp_ID: ",temp_id)

    try {
    const result = await emailjs.send(
      service_id, 
      temp_id,

      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    )
    console.log("Emailjs resultss ", result)
    return { success: true, result }
  } catch (error) {
    console.error("Error sending contact email:", error)
    return { success: false, error }
  }
}