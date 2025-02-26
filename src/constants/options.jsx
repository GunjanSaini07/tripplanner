export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:"Affordable trip with budget accommodations.",
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:"Comfortable trip with mid-range hotels.",
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:"Exclusive trip with premium experiences.",
        icon:'💎',
    },
]

export const SelectTravelList = [
    {
      id: 1,
      title: "Just Me",
      desc: "A solo traveler",
      icon: "🙋‍♀️",
      people: "1 person",
    },
    {
      id: 2,
      title: "A Couple",
      desc: "Two travelers",
      icon: "👫🏾",
      people: "2 people",
    },
    {
      id: 3,
      title: "Family",
      desc: "A fun-loving family",
      icon: "🏡",
      people: "3-5 people",
    },
    {
      id: 4,
      title: "Friends",
      desc: "A bunch of thrill-seekers",
      icon: "👩‍👩‍👦‍👦",
      people: "5-12 people",
    },
  ];
  


export const AI_PROMPT='Generate Travel Plan for Location : {destination} for {days} Days for {travelWith} with a {budget} budget, Give me a Hotels options list with HotelName,Hotel address,Price, hotel image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,Place Details,Place Image Url, Geo Coordinates,ticket Pricing,rating,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.'