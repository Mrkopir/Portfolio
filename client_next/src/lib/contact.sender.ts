import axios from "axios";

export default async function ContactSender(data: object) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

    return await axios.post(`${apiUrl}/api/contact`, data)
    .then(response => {
    console.log("Успіх:", response.data);
    })
    .catch(error => {
    console.error("Помилка:", error.message);
  });
}
