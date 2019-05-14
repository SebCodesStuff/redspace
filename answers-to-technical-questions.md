Technical Questions
===================

1) I spent 5 hours on the test. If I had more time I would add in redux/actions/reducers etc, I would also conditionally send the user to the mobile/desktop reservation site when clicking on one of the restaurants. Add a sorting for restaurants based on price, rating etc. I'd also spend more time polishing the asthetics of the page, adding hover css and spend more time coming up with more interesting themes, maybe a menu. I'd also prefer to have done this without using create react app to allow a little more flexibility with the project. Lastly I would have liked to gain access to the opentable api and then access it through a search bar.

2) I use destructuring assignment fairly often. I enjoy it because it makes code much more readable. Here's a snipet:

        const { name, price, image_url, phone } = restaurant

3) This Api is pretty straight forward. The one issue I could see performance wise is in returning a massive number of restaurants. It appears as if they already mitigated that by adding pagination (current_page, per_page, total_entries). If I had to track down a performance issue I would view the heroku logs, dashboard and application metrics. I have had to tackle a performance issue before. The project I work on is a 3d modeling software and when users would upload models with a large number of children (parts) the upload would silently fail and the users object would disappear on reload. It was easy to trouble shoot because when checking the logs I saw that the upload was timing out. The upload was batched into a call for each child object so from there I investigated the time each request took to complete and noticed the very last call was timing out. This was because the request was linking all child objects to the parent object. Thus the more objects there was the more likely this request was to fail. To address this I batched the last call so that the server saw progress was occuring. If given more time I would have perferred to do this with sockets but it would have required a large refactor.

4) I was surprised to see that the Api did not contain a customer rating for each restaurant I would absolutley add that to the returned call. I assume this would be drawn from a new table say 'reviews' which has a int value for 'rating' and a foreign key linking to the restaurant table. From there you could sum the rating and divide them by the reviews count to get an average. I was also surprised to see that they did not have a type property ex ('chinese', 'mexican' etc).

5)
{
  seb: {
    coolGuy: true,
    backEnd: true,
    frontEnd: true,
    languages: ['javascript', 'ruby'],
    frameWorks: ['React', 'Redux', 'ThreeJS', 'EJS', 'Bootstrap', 'Material UI', NodeJS', 'Knex', 'SocketIO', 'Passport', 'Rails', 'Active Record'],
    databases: ['PSQL', 'mySQL', 'mongoDB'],
    testFrameworks: ['mocha', 'jest', 'sinon', 'enzyme']
    AWSExperience: true,
    gitExperience: true,
    hobbies: ['guitar', 'drums', 'chess', 'boxing', 'wrestling', 'jiu jitsu']
    likes: ['video games', 'beer', 'cocktails', 'cooking', 'art']
  }

 }
