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
    path: '/property_enquiry',
    handler: 'myController.Propery_Enquiry',
    config: {
      policies: [],
      auth: false
    },
  },
];
