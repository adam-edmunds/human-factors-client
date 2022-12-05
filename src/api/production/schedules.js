export const schedules = {
  date: [
    {
      id: '',
      collector: '',
      status: 'active | delayed | inactive',
      // start time of the route
      time: 'UNIX TIMESTAMP',
      location: '',
      collections: [
        {
          id: '',
          location: {
            city: '',
            postcode: '',
            street: '',
            county: '',
          },
          date: '',
          // start time of collection
          time: '',
          status: '',
          canReschedule: true | false,
        },
      ],
    },
  ],
};
