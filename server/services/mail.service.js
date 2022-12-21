const nodemailer = require("nodemailer");
const config = require("../config/default.json");

class MailService {
  async send({ to, total, name, _id }) {
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.mail,
        pass: config.mailPass,
      },
    });

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    await transporter.sendMail({
      from: `Spardja Shop <${config.mail}>`,
      to: to,
      subject: "Заказ на сайте www.apushka.spardja.ru",
      html: `<div>
        <h2>${capitalizedName}, здравствуйте</h2>
        <h3>Ваш заказ №${_id} на сумму ${total} BYN успешно сформирован</h3>
        <p>Детали заказа вы можете посмотреть в личном кабинете на сайте www.spardja.ru</p>
      </div>`,
    });
  }
}

module.exports = new MailService();
