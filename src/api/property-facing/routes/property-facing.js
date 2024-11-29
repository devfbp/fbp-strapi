'use strict';

/**
 * property-facing router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::property-facing.property-facing');
