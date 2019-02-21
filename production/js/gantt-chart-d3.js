/**
 * @author Dimitry Kudrayvtsev
 * @version 2.1
 */

d3.gantt = function() {
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
    var margin = {
        top : 20,
        right : 50,
        bottom : 100,
        left : 120
        };
    var timeDomainStart = d3.time.day.offset(new Date(),-3);
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
    var activities = [];
    var height = document.body.clientHeight - margin.top - margin.bottom-5;
    var width = document.body.clientWidth - margin.right - margin.left-5;

    var colorsArray = ["#75af33", "#f72222", "#7d40a5", "#efec15", "#593030", "#2383dd"];
    var color = d3.scale.ordinal();
    color.range(colorsArray);

    var tickFormat = "%H:%M";

    var keyFunction = function(d) {
        return d.startDate + d.activity + d.endDate;
        };

    var rectTransform = function(d) {
        return "translate(" + x(d.startDate) + "," + y(d.activity) + ")";
        };

    var x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

    var y = d3.scale.ordinal().domain(activities).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3_locale.timeFormat(tickFormat)).tickSubdivide(true)
	    .tickSize(8).tickPadding(8);

    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

    var initTimeDomain = function(tasks) {
        if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
            if (tasks === undefined || tasks.length < 1) {
                timeDomainStart = d3.time.day.offset(new Date(), -3);
                timeDomainEnd = d3.time.hour.offset(new Date(), +3);
                return;
            }
            tasks.sort(function(a, b) {
                return a.endDate - b.endDate;
                });
            timeDomainEnd = tasks[tasks.length - 1].endDate;
            tasks.sort(function(a, b) {
                return a.startDate - b.startDate;
                });
            timeDomainStart = tasks[0].startDate;
        }
    };

    var initAxis = function() {
        x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
	var activitiesTranslated = [];
	activities.forEach(function(act) { activitiesTranslated.push(act); });
        y = d3.scale.ordinal().domain(activitiesTranslated).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
        xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3_locale.timeFormat(tickFormat)).tickSubdivide(true)
            .tickSize(8).tickPadding(8);
        opacity = d3.scale.linear().domain([-4, 10]).range([0.4, 1]);

        yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0).tickFormat(function(d) { return tr(d); });
    };
    
    function gantt(tasks, div) {
	
        initTimeDomain(tasks);
        initAxis();

        var svg = d3.select(div)
            .append("svg")
                .attr("class", "chart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("class", "gantt-chart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        svg.selectAll(".chart")
            .data(tasks, keyFunction).enter()
            .append("rect")
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("opacity", function(d){
                    return opacity(d.score);
                    })
                .style("fill", function(d){
                    return color(d.activity);
                    })
                .attr("transform", rectTransform)
                .attr("height", function(d) { return y.rangeBand(); })
                .attr("width", function(d) { 
                    return (x(d.endDate) - x(d.startDate)); 
                    });


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
            .transition()
            .call(xAxis);

        svg.append("g").attr("class", "y axis").transition().call(yAxis);

        return gantt;

    };
    
    gantt.redraw = function(tasks) {

        initTimeDomain(tasks);
        initAxis();
	
        var svg = d3.select("svg");

        var ganttChartGroup = svg.select(".gantt-chart");
        var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);
        
        rect.enter()
            .insert("rect",":first-child")
            .attr("rx", 5)
            .attr("ry", 5)
            .style("fill", function(d) {
                return color(d.activity);
                })
            .attr("transform", rectTransform)
            .attr("opacity", 0)
            .attr("height", 0)
	    .attr("width", 0)
            .transition()
            .attr("opacity", function(d) {
                return opacity(d.score);
                })
            .attr("y", 0)
            .attr("transform", rectTransform)//*/
            .attr("height", function(d) { return y.rangeBand(); })
            .attr("width", function(d) { 
                return (x(d.endDate) - x(d.startDate)); 
                });

        rect.transition()
            .attr("transform", rectTransform)
            .attr("opacity", function(d) {
                return opacity(d.score);
                })
            .attr("height", function(d) { return y.rangeBand(); })
            .attr("width", function(d) { 
                var width = (x(d.endDate) - x(d.startDate));
		// If an activity is less than min_width wide, widen it to min_width
		var min_width = 5;
		return width < min_width && width > -min_width ? min_width : width;
                });
        
        rect.exit().remove();

        svg.select(".x").transition().call(xAxis);
        svg.select(".y").transition().call(yAxis);
        
        return gantt;
    };

    gantt.margin = function(value) {
        if (!arguments.length)
            return margin;
        margin = value;
        return gantt;
    };

    gantt.timeDomain = function(value) {
        if (!arguments.length)
            return [ timeDomainStart, timeDomainEnd ];
        timeDomainStart = +value[0], timeDomainEnd = +value[1];
        return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
        if (!arguments.length)
            return timeDomainMode;
        timeDomainMode = value;
        return gantt;

    };

    gantt.activities = function(value) {
        if (!arguments.length)
            return activities;
        activities = value;
        return gantt;
    };
    
    gantt.width = function(value) {
        if (!arguments.length)
            return width;
        width = +value;
        return gantt;
    };

    gantt.height = function(value) {
        if (!arguments.length)
            return height;
        height = +value;
        return gantt;
    };

    gantt.tickFormat = function(value) {
        if (!arguments.length)
            return tickFormat;
        tickFormat = value;
        return gantt;
    };


    
    return gantt;
};
