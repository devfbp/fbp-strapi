'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  async sendEmail(subject, to, message) {
    var site_config = await strapi.db.query('api::site-configuration.site-configuration').findOne();
    var header = "";
    var footer = "";
    if (site_config) {
      header = site_config?.Mail_Template_Header;
      footer = site_config?.Mail_Template_Footer;
    }
    var htmlmessage = header + message + footer;
    //console.log(header)
    var result = "not connect";
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'devs@fullbasketproperty.com',
        pass: 'uiouJy7JHkb@as'
      }
    });
    var mailOptions = {
      from: 'devs@fullbasketproperty.com',
      to: to,
      subject: subject,
      html: htmlmessage
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
	console.log("to:"+to+" message:"+message+ " sbuject"+subject)
        console.log("Email sent failed" + error);
        result = "failed";
      } else {
        console.log('Email sent: ' + info.response);
        result = "success";
      }
    });
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(result)
      }, 1000)
    });
  }
});
