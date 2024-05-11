'use strict';

/**
 * image-size service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::image-size.image-size');
