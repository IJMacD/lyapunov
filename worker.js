const InitX = 0.5;

self.addEventListener("message", function (e) {
  const { startX, endX, width, height, config, jobID } = e.data;

  const data = new ArrayBuffer((endX - startX) * height * 4);   // Float 32 is 4 bytes!!!
  const array = new Float32Array(data);

  for(let currX = startX; currX < endX; currX++) {
    for(let currY = 0; currY < height; currY++) {

      let a = ((config.ymax - config.ymin) / height) * (currY + InitX) + config.ymin;
      let b = ((config.xmax - config.xmin) /  width) * (currX + InitX) + config.xmin;
      let x = InitX;
      //Debugger.Log(0, "", "currY: " + currY.ToString() + " a: " + a.ToString() + " b: " + b.ToString() + "\n");

      let r = 0;
      for (let i = 0; i < config.pattern.length; i++)
      {
          //r = _config.Pattern[i] ? a : b;
          switch (config.pattern[i])
          {
              case 'a':
                  r = a;
                  break;
              case 'b':
                  r = b;
                  break;
          }
          x *= r * (1 - x);

      }

      let  sum_of_log_of_derived = 0;
      for (let n = 0; n < config.iterations; n++)
      {
          let  derived = 1;
          for (let m = 0; m < config.pattern.length; m++)
          {
              //r = _config.Pattern[m] ? a : b;
              switch (config.pattern[m])
              {
                  case 'a':
                      r = a;
                      break;
                  case 'b':
                      r = b;
                      break;
              }
              x *= r * (1 - x);
              derived *= r * (1 - 2 * x);
              //if (derived < 0) Debugger.Log(0, "", "< 0");
          }
          let  log_of_derived = Math.log(Math.abs(derived));
          sum_of_log_of_derived += log_of_derived;

          if (!isFinite(derived)) break;
          //|| log_of_derived > 5.541263545158425) break;
          //if (n >= 50 && log_of_derived * n == sum_of_log_of_derived) break;
      }


      let value = sum_of_log_of_derived / (config.iterations + config.pattern.length);
      array[(currX - startX) * height + currY] = value;
    }
  }

  self.postMessage({startX, data, jobID}, [data]);
});
