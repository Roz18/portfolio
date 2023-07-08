const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const slideWidth = slider.clientWidth / 3;
let currentIndex = 0;
const totalSlides = slider.childElementCount;

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  slideTo(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  slideTo(currentIndex);
});

function slideTo(index) {
  const translateX = -index * slideWidth;
  slider.style.transform = `translateX(${translateX}px)`;
}

function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const data = {
    name: name,
    email: email,
    message: message,
  };

  fetch("/.netlify/functions/sendEmail", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      alert("Oops! An error occurred while sending the message.");
    });
}

const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  const { name, email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rusanne18@gmail.com",
      pass: "Capetown@12",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "rusanne18@gmail.com",
    subject: "New Message from Portfolio",
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Message sent:", result);
    return {
      statusCode: 200,
      body: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      statusCode: 500,
      body: "Oops! An error occurred while sending the message.",
    };
  }
};
