const nodemailer = require("nodemailer");

class MailService {
  async send({ to, total, name, _id }) {
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ex-centric@yandex.ru",
        pass: "iaudsphkblepstnl",
      },
    });

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    let info = await transporter.sendMail({
      from: "Spardja Shop <ex-centric@yandex.ru>",
      to: to,
      subject: "Заказ на сайте www.spardja.ru",
      html: `<div>
        <h2>${capitalizedName}, здравствуйте</h2>
        <h3>Ваш заказ №${_id} на сумму ${total} BYN успешно сформирован</h3>
        <p>Детали заказа вы можете посмотреть в личном кабинете на сайте www.spardja.ru</p>
      </div>`,
    });
  }
}

module.exports = new MailService();
