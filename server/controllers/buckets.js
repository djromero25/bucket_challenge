module.exports = (function() {

  'use strict'

  const isEven = number => {
    return number % 2 === 0;
  };

  const getBucket = (bucketMax) => {
    return {
      current: 0,
      max: bucketMax
    };
  }

  const runCycle = (results, water, state, fillBucketOne, resolve) => {
    console.log(state.one.current, state.two.current);
    //This function was originally done functionally but the call stack grew too big with large numbers so I changed it to a while loop
    setTimeout(function(){
      if(state.used[state.one.current] && state.used[state.one.current][state.two.current]){
        resolve('no solution');
      }
      state.used[state.one.current] = {};
      state.used[state.one.current][state.two.current] = true;

      results.push([state.one.current,state.two.current]);
      if(state.one.current + state.two.current !== water && state.one.current !== water && state.two.current !== water ){
        state = state.next(state, fillBucketOne);
        runCycle(results, water, state, fillBucketOne, resolve);
      } else {
        resolve(results);
      }
    });
  }

  const fill = (state, fillBucketOne) => {
    console.log('fill')
    let bucket = fillBucketOne ? 'one' : 'two';
    state[bucket].current = state[bucket].max;
    state.next = swap;
    return state;
  };

  const swap = (state, fillBucketOne) => {
    console.log('swap')
    let bucket = !fillBucketOne ? 'one' : 'two';
    let other = fillBucketOne ? 'one' : 'two';
    state[bucket].current += state[other].current;
    if(state[bucket].current > state[bucket].max) {
      state[other].current = state[bucket].current - state[bucket].max;
      state[bucket].current = state[bucket].max;
      state.next = empty;
    } else {
      state[other].current = 0;
      state.next = fill;
    }
    return state;
  };

  const empty = (state, fillBucketOne) => {
    console.log('empty')
    let bucket = !fillBucketOne ? 'one' : 'two';
    state[bucket].current = 0;
    state.next = swap;
    return state;
  };

  const buildOrder = (one, two, water) => {
    let order = [];
    let state = {
      one: getBucket(one),
      two: getBucket(two),
      next: fill,
      used: {}
    }

    if(isEven(one) && isEven(two) && !isEven(water)){
      return Promise.resolve('no solution');
    }

    let fillBucketOne = Math.abs(one - water) < Math.abs(two - water);
    
    return new Promise(function(resolve, reject){
      runCycle([], water, state, fillBucketOne, resolve);
    });
    // if(water - one < water - two){

    // }
  };

  return {
    getOrder: function(req, res) {
      let error = false;
      console.log(req.body)
      Object.keys(req.body).forEach(key => {
        req.body[key] = Number(req.body[key]);
        if (!Number.isInteger(req.body[key]) || (req.body[key] < 0 || req.body[key] > 1000000)) {
          res.status(400).send('input ' + key + ' is not a number or it is out of range');
          error = true;
        }
      });
      if (!error) {
        buildOrder(req.body.bucketOne, req.body.bucketTwo, req.body.finalWater)
          .then(function(data){
            res.json({
              solution: data
            });
          });
      }
    }
  }
})();