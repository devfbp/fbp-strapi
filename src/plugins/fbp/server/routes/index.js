module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/sendmail/property_enquiry',
    handler: 'myController.Propery_Enquiry',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/property_counts',
    handler: 'myController.Propery_Counts',
    config: {
      policies: [],
      auth: false
    },
  },
];
