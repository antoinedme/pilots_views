// Activity vizualisation in Gantt chart
// This viz is based on dk8996's lib (https://github.com/dk8996/Gantt-Chart)

// PARAMETERS
var iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
var activities = ["bedroomActivity", "kitchenActivity", "prepareFood", "goToilet", 
    "bedActivity", "goOut", "sleep"];
var timeDomain = "one_hr"; //default value
var refreshPeriod = "1000"; //ms
var divContainer = "#gantt";


// INIT
var tasks = [];
var nbOfMinutes = 60; //corresponds to default timeDomain value

// create gantt
var tickFormat = "%H:%M";
var gantt = d3.gantt().activities(activities).tickFormat(tickFormat);
gantt.timeDomainMode("fixed");
changeTimeDomain(timeDomain);
gantt(tasks, divContainer);

// update chart regularly
var autoRefreshTimer;
// Automatically start
function startAutoRefresh() {
    if (autoRefreshTimer) clearInterval(autoRefreshTimer); // prevent multiple timers
    autoRefreshTimer = setInterval(updateChartRunning, refreshPeriod);
    $('#isLive')[0].checked = true;
    console.log("Auto refresh timer " + autoRefreshTimer + " set: each " + refreshPeriod + " ms");
}

function stopAutoRefresh() {
    clearInterval(autoRefreshTimer);
    $('#isLive')[0].checked = false;
    autoRefreshTimer = undefined;
}

startAutoRefresh();
console.log("autoRefreshTimer", autoRefreshTimer);

function updateChartRunning() {
    updateChart("/myservices/life/minutesago", {house: house, nbOfMinutes: nbOfMinutes});
}

function updateChart(endpoint, info) {
    // socket query to get activities, fill 'tasks' and redraw the chart
    io.socket.get(endpoint, info, function(json) {
	//if (typeof json === 'undefined') location.reload();
	addTask(json);
	console.log("Updating chart", new Date(), "from:", endpoint, "info:", info, "activities:", json.length);
	//console.log('time domain', timeDomain);
	//console.log('info', info);
	if (info && info.day) {
	    changeTimeDomain(timeDomain, d3.time.day.offset(info.day, 1));
	} else {
	    changeTimeDomain(timeDomain); //which redraws the chart implicitly
	}
    });
}


function changeTimeDomain(timeDomain) {
    // update time domain of the chart
    this.timeDomain = timeDomain;
    var now = autoRefreshTimer ? new Date() : day;

    //console.log("now=",now);
    d3.selectAll("button.selected")
        .attr("class", null);
    d3.select("button#"+timeDomain)
        .attr("class", "selected");

    switch (timeDomain) {
    case "ten_min":
	format = tickFormat;
	nbOfMinutes = 10;
	gantt.timeDomain([ d3.time.minute.offset(now, -10), now ]);
	break;
    case "one_hr":
	format = tickFormat;
	nbOfMinutes = 60;
	gantt.timeDomain([ d3.time.hour.offset(now, -1), now ]);
	break;
    case "three_hr":
	format = tickFormat;
	nbOfMinutes = 3*60;
	gantt.timeDomain([ d3.time.hour.offset(now, -3), now ]);
	break;
    case "six_hr":
	format = tickFormat;
	nbOfMinutes = 6*60;
	gantt.timeDomain([ d3.time.hour.offset(now, -6), now ]);
	break;
    case "one_day":
	format = "%a %d %b %H:%M";
	nbOfMinutes = 24*60;
	gantt.timeDomain([ d3.time.day.offset(now, -1), now ]);
	break;
    case "one_week":
	format = "%a %d %b %Hh";
	nbOfMinutes = 7*24*60;
	gantt.timeDomain([ d3.time.day.offset(now, -7), now ]);
	break;
    }
    gantt.tickFormat(format);
    gantt.redraw(tasks);
}

function updateActivities(task, activities_optional) {
    var activities_ = activities_optional || activities;
    // update list of activities if needed
    if(activities_.indexOf(task['activity']) == -1) {
	    activities_.push(task['activity']);
	    // Update gantt's activities only if we operate on the global activities variable
	    if (!activities_optional) {
	        gantt.activities(activities_);
	    }
    }
    return activities_;
}

function refreshActivities(tasks_optional) {
    // If no tasks_optional specified, use global variable
    var tasks_ = tasks_optional || tasks;
    // No action if tasks is broken
    if (!tasks_ || typeof tasks_.length === 'undefined') return;

    var newActivities = [];
    jQuery.each(tasks_, function(i, task) {
	newActivities = updateActivities(task, newActivities);
    });
    newActivities = newActivities.sort();
    // Make copy of current activities
    var oldActivities = activities.slice();
    var orderedNewActivities = [];
    jQuery.each(oldActivities, function(i, activity){
	if (newActivities.indexOf(activity) != -1) {
	    orderedNewActivities.push(activity);
	}
    });
    activities = orderedNewActivities;
    gantt.activities(activities);
    gantt.redraw(tasks_);
}

function addTask(json) {
    console.log(json, json.length);    // update gantt chart with latest query result
    tasks = [];
    jQuery.each(json, function(i, task){
    	// console.log("Going to update task " + task["activity"]);
        updateActivities(task);
	    tasks.push({
            "startDate" : iso.parse(task['since']),
            "endDate" : iso.parse(task['date']),
            "activity" : task['activity'],
            "score": task['score']
        });
    });
};


var requestDayData = function(day) {
    // Stop automatic update
    stopAutoRefresh();
    updateChart('/myservices/life/dayStats', {house: house, day: day});
};


var requestData = function(date) {
    // Stop automatic update
    stopAutoRefresh();
    // The data must end at specified datetime ("day")
    var since = d3.time.minute.offset(date, -nbOfMinutes);
    var till = date;
    updateChart('/myservices/life/interval', {house: house, since: since, till: till});
};

// init date
var day = new Date();

// Clean activities action
$('#cleanActivities').on( "click", function(e) {
    //console.log("TODO Refreshing activities", 'tasks =', tasks, activities);
    refreshActivities();
    //console.log("DONE Refreshing activities", 'tasks =', tasks, activities);
});

// caroussel
$('#previous_interval').on( "click", function(e) {
    day = d3.time.minute.offset(day, -nbOfMinutes);
    requestData(day);
    return false;
});
$('#next_interval').on( "click", function(e) {
    day = d3.time.minute.offset(day, nbOfMinutes);
    //day = d3.time.day.offset(day, 1);
    requestData(day);
    return false;
});
$('#today').on( "click", function(e) {
    startAutoRefresh();
    return false;
});
$('#reset').on( "click", function(e) {
    day = d3.time.minute.offset(day, -nbOfMinutes);
    requestData(day);
    return false;
});
$('#isLive').on("change", function(e) {
    if(e.target.checked) {
	startAutoRefresh();
    } else {
	stopAutoRefresh();
    }
});
