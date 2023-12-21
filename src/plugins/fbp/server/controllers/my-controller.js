'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('fbp')
      .service('myService')
      .getWelcomeMessage();
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
              ctx.body = await strapi.plugin('fbp').service('myService').sendEmail(subject, to, message);
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
  },
  async Propery_Counts(ctx) {
    var results = {}
    var count = 0;
    try {
      const property_types = await strapi.db.query('api::property-type.property-type').findMany({
        select: ['name'],
        where: {}
      });
      if (property_types) {
        property_types.map(async (ptype, idx) => (
          count = await strapi.db.query("api::property.property").count({
            filters: { Type: { Name: ptype?.Name } }
          }),
          results["type_" + ptype?.Name] = count
        ));
      }
      const property_builder = await strapi.db.query('api::builder.builder').findMany({
        select: ['name'],
        where: {}
      });
      if (property_builder) {
        property_builder.map(async (builder, idx) => (
          count = await strapi.db.query("api::property.property").count({
            filters: { Builder: { Name: builder?.Name } }
          }),
          results["builder_" + builder?.Name] = count
        ));
      }

      const property_location = await strapi.db.query('api::property-location.property-location').findMany({
        select: ['name'],
        where: {}
      });
      if (property_location) {
        property_location.map(async (location, idx) => (
          count = await strapi.db.query("api::property.property").count({
            filters: { Area: { Location: { Name: location?.Name } } }
          }),
          results["location_" + location?.Name] = count
        ));
      }
      return await new Promise(resolve => {
        setTimeout(() => {
          //console.log(dashBoard)
          resolve(results)
        }, 300)
      });
    } catch (error) {
      ctx.throw(500, error);
    }
    return results;
  }
});
