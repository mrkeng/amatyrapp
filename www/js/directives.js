angular.module('starter.directives', [])

// Based on http://www.ng-newsletter.com/posts/d3-on-angular.html

.directive('linechart', function() {
    return {
      restrict: 'EA',
      scope: {
        data: '=' // bi-driectional data-binding
      },
      link: function(scope, element, attrs) {
          var margin = parseInt(attrs.margin) || 20,
              height = parseInt(attrs.height) || 90,
              padding = parseInt(attrs.padding) || 5,
              interpolation = attrs.interpolation || 'basis';

          var svg = d3.select(element[0])
            .append("svg")
            .style('width', '100%')
            .style('height', height);

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
              return scope.render(newVals);
          }, true);

          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.render = function(data) {
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;
            var width = d3.select(element[0]).node().offsetWidth - margin;
            var x = d3.scale.linear().domain([0, data.length]).range([0, width]); 
            var y = d3.scale.linear().domain(d3.extent(data)).range([height, 0]);



            var line = d3.svg.line()
                .x(function(d,i) { return x(i); })
                .y(function(d) { return y(d); })
                .interpolate(interpolation)

/*
            var xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true);
            // Add the x-axis.
            svg.append("svg:g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);
*/

            var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
            // Add the y-axis to the left
            svg.append("svg:g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(30,0)")
                  .call(yAxisLeft);


            svg.append("path")
                .attr("d", line(data))
                    .data([data])
                    .attr("transform", "translate(" + 30 + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value
          }
      }
    }
});
