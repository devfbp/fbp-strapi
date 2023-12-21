'use strict';

module.exports = ({ strapi }) => ({
  async index(ctx) {
    return "test";
  },
  async Propery_Enquiry(ctx) {
    var postdata = ctx.request.body;
    var results = [];
    let fields = ['subject', 'message', 'to'];
    try {
      const email_templates = await strapi.db.query('api::email-template.email-template').findWithCount({
        select: fields,
        where: { "Template_Name": postdata?.template_name }
      });
      if (email_templates) {
        //console.log(email_template);
        var subject = "";
        var to = "";
        var message = "";
        results = await Promise.all(email_templates.map(async (emailTems, index) => {
          //console.log(emailTem)
          var emailTem = emailTems[0];
          if (emailTem?.To != "" && emailTem?.Subject != "" && emailTem?.Message != "") {
            subject = emailTem?.Subject;
            to = emailTem?.To;
            var mixmessage = emailTem?.Message;
            if (mixmessage) {
              mixmessage = mixmessage.replace("$NAME$", postdata.name);
              mixmessage = mixmessage.replace("$EMAIL$", postdata.email);
              mixmessage = mixmessage.replace("$PHONE$", postdata.phonenumber);
              mixmessage = mixmessage.replace("$PROPERTYLINK$", postdata.propert_link);
            }
            message = mixmessage;
            if (subject && to && message) {
              if (subject.length > 0 && postdata?.subject_suffix && postdata?.subject_suffix != "") {
                subject = subject.replace("$PROPERTYNAME$", postdata?.subject_suffix)
              }
              ctx.body = await strapi.plugin('sendemail').service('myService').sendEmail(subject, to, message);
            }
          }
        }));
        return await new Promise(resolve => {
          setTimeout(() => {
            resolve(results)
          }, 100)
        });
      }
    } catch (error) {
      ctx.throw(500, error);
    }
  }
});
