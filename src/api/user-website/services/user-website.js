'use strict';

/**
 * user-website service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-website.user-website');
