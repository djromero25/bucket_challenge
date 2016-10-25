This is a react and node test app for the bucket challenge algorithm.

cd to this folder and run 'npm install' to get the right node modules.

Then run 'npm run build' to build the react project.

Finally run 'node server.js' to start the server.

You can then navigate to http://localhost:8888/ to run the app.



TODO: There is a lot more that can be done to make this a better app

+ unit testing: (especially the node functions)
  + They are already broken out into testable functions
+ css: the look is pretty basic and could be spiced up
  + ideally there'd be a cool water pour animation as the numbers came in
+ sockets: an open socket would allow for the table to build out as new rows are ready instead of when
  the whole table is complete
+ optimization: the algorithm is slow right now for larger numbers with small bucket increments
  +a better swap algorithm could save time and also searching for patterns based on the factors of the two buckets
+ More?
