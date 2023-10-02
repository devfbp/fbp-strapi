'use strict';

/**
 * site-configuration service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site-configuration.site-configuration');
