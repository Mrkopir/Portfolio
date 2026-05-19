import axios from "axios";

export default async function ContactSender(data: object) {
    return await axios.post("https://partfolio-jeft.onrender.com/api/sendData", data)
    .then(response => {
    console.log("Успіх:", response.data);
    })
    .catch(error => {
    console.error("Помилка:", error.message);
  });
}
