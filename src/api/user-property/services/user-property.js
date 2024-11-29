'use strict';

/**
 * user-property service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-property.user-property');
