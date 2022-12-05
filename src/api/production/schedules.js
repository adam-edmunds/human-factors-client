export const schedules = {
  date: [
    {
      id: '',
      collector: '',
      status: 'active | delayed | inactive',
      // start time of the route
      time: 'UNIX TIMESTAMP',
      collections: [
        {
          id: 'parentId-<:number>',
          location: {
            city: '',
            postcode: '',
            street: '',
            county: '',
          },
          date: '',
          time: '',
          status: '',
        },
      ],
    },
  ],
};
