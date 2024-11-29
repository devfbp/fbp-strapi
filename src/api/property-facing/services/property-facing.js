'use strict';

/**
 * property-facing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::property-facing.property-facing');
