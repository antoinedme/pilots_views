Plotly.d3.csv('https://raw.githubusercontent.com/antoinedme/SurveyPulseView1/master/PULSEDATAVIEWIMT.csv', function(err, rows){   
function unpack(rows, key) {
    return rows.map(function(row) { 
        return row[key]; });}

    var data = [{
        type: 'parcoords',
        pad: [80,80,80,80],
        line: {
            color: unpack(rows, 'age_group'),
            colorscale: [[0, '#00cc66'], [0.5, '#00ffff'], [1, '#0066ff']]
        },

        dimensions: [{
            range: [20, 55],
            label: 'Age Group',
            values: unpack(rows, 'age_group')
        }, {
            range: [15, 40],
            label: 'BMI Score',
            values: unpack(rows, 'bmi_score')
        }, {
            range: [0, 30],
            label: 'Framingham (%)',
            values: unpack(rows, 'framingham')
        }, {
            range: [0, 3],
            label: 'Risk Score',
            values: unpack(rows, 'score')
        }, {
            range: [0, 15000],
            label: 'Montlhy Steps',
            values: unpack(rows, 'monthly_steps')
        }]
    }];

    var layout = {
        annotations: [
            {showarrow: false,
            text: '',
            x: 0, y: 1, xref: 'paper', yref: 'paper'},
            {showarrow: false,
            text: '',
            x: 0.9, y: .25, xref: 'paper', yref: 'paper'
            }]
    };

    Plotly.plot('graphDiv', data, layout);

});

function init_chart_doughnut(){
				
		if( typeof (Chart) === 'undefined'){ return; }
		
		console.log('init_chart_doughnut');
	 
		if ($('.canvasDoughnut').length){
			
		var chart_doughnut_settings = {
				type: 'doughnut',
				tooltipFillColor: "rgba(51, 51, 51, 0.55)",
				data: {
					labels: [
						"Symbian",
						"Blackberry",
						"Other",
						"Android",
						"IOS"
					],
					datasets: [{
						data: [15, 20, 30, 10, 30],
						backgroundColor: [
							"#BDC3C7",
							"#9B59B6",
							"#E74C3C",
							"#26B99A",
							"#3498DB"
						],
						hoverBackgroundColor: [
							"#CFD4D8",
							"#B370CF",
							"#E95E4F",
							"#36CAAB",
							"#49A9EA"
						]
					}]
				},
				options: { 
					legend: false, 
                    responsive: false
				}
			}
		
			$('.canvasDoughnut').each(function(){
				
				var chart_element = $(this);
				var chart_doughnut = new Chart( chart_element, chart_doughnut_settings);
				
			});			
		
		}  
	   
	}

function isNumeric(val) {
    var pattern = /^\d+.?\d*$/;
    if (pattern.test(val)) {
        return true;
    } else {
        return false;
    }
}

function isInteger(val) {
    var pattern = /^\d+$/;
    if (pattern.test(val)) {
            return true;
    } else {
        return false;
    }
}

function checkAge(theValue) {
    var error="Age: enter an integer between 25 and 84\n";
    if (!isInteger(theValue)) {
        return error;
    }
    var i = parseInt(theValue);
    if (i < 25 || i > 84) {
        return error;
    }
    return "";
}

function checkWeightAndHeight(weight, height) {
    var weightError="Weight: enter a value between 40.0 and 180.0\n";
    var heightError="Height: enter a value between 140.0 and 210.0\n";
    var onlyOneError="You have not entered one of height and weight:\nPlease enter both.";
    var error="";
    var weightErrorSet = false;
    var heightErrorSet = false;

    if (weight=="" || height=="") {
        return onlyOneError;
    }
    if (!isNumeric(weight)) {
        if(!isInteger(weight)) {
            weightErrorSet = true;
        }
    }
    if (!isNumeric(height)) {
        if(!isInteger(height)) {
            heightErrorSet = true;
        }
    }
    if (!weightErrorSet) {
        var i = parseInt(weight);
        if (i < 40 || i > 180) {
            weightErrorSet = true;
        }
    }
    if (!heightErrorSet) {
        var i = parseInt(height);
        if (i < 140 || i > 210) {
            heightErrorSet = true;
        }
    }
    if (heightErrorSet) {
        error += heightError;
    }
    if (weightErrorSet) {
        error += weightError;
    }
    return error;
}

var checkParameters = function(form, age, height, weight) {

    if(form == 'diabetes') {
        var ageChecked = checkAge(age);
        if(ageChecked != "") {
            $ERR_D.text(ageChecked).css('color', 'red');
            return false;
        }

        var hwChecked = checkWeightAndHeight(weight, height);
        if(hwChecked != "") {
            if(hwChecked == "Height: enter a value between 140.0 and 210.0\n") {
                $ERR_D.text(hwChecked).css('color', 'red');
            }
            else {
                $ERR_D.text(hwChecked).css('color', 'red');
            }
            return false;
        }
        return true;
    }
    else {
        var ageChecked = checkAge(age);
        if(ageChecked != "") {
            $AGE_ERR_A.text(ageChecked).css('color', 'red');
            return false;
        }

        var hwChecked = checkWeightAndHeight(weight, height);
        if(hwChecked != "") {
            if(hwChecked == "Height: enter a value between 140.0 and 210.0\n") {
                $HEIGHT_ERR_A.text(hwChecked).css('color', 'red');
            }
            else {
                $WEIGHT_ERR_A.text(hwChecked).css('color', 'red');
            }
            return false;
        }
        return true;
    }
};

function getScore(gender, age, b_cvd, b_learning, b_treatedhyp, bmi, ethrisk, fh_diab, smoke_cat) {

    if(gender == 'male') {
        var surv = 10;
        var survivor = [0,0,0,0,0,0,0,0,0,0,0.978732228279114];
        var Iethrisk = [0,0,1.1000230829124793000000000,1.2903840126147210000000000,1.6740908848727458000000000,1.1400446789147816000000000,0.4682468169065580600000000,0.6990564996301544800000000,0.6894365712711156800000000,0.4172222846773820900000000];
        var Ismoke = [0,0.1638740910548557300000000,0.3185144911395897900000000,0.3220726656778343200000000,0.4505243716340953100000000];

        var dage = age;
        dage = dage / 10;
        var age_2 = Math.pow(dage,3);
        var age_1 = Math.log(dage);
        var dbmi = bmi;
        dbmi=dbmi/10;
        var bmi_2 = Math.pow(dbmi, 3);
        var bmi_1 = Math.pow(dbmi, 2);

        age_1 = age_1 - 1.496392488479614;
        age_2 = age_2 - 89.048171997070313;
        bmi_1 = bmi_1 - 6.817805767059326;
        bmi_2 = bmi_2 - 17.801923751831055;

        var a = 0;

        a += Iethrisk[ethrisk];
        a += Ismoke[smoke_cat];

        a += age_1 * 4.4642324388691348000000000;
        a += age_2 * -0.0040750108019255568000000;
        a += bmi_1 * 0.9512902786712067500000000;
        a += bmi_2 * -0.1435248827788547500000000;

        a += b_cvd * 0.2026960575629002100000000;
        a += b_learning * 0.2331532140798696100000000;
        a += b_treatedhyp * 0.3337939218350107800000000;
        a += fh_diab * 0.6479928489936953600000000;

        a += age_1 * b_learning * -0.9384237552649983300000000;
        a += age_1 * bmi_1 * 0.4514759924187976600000000;
        a += age_1 * bmi_2 * -0.1079548126277638100000000;
        a += age_1 * fh_diab * -0.6011853042930119800000000;
        a += age_2 * b_learning * 0.0007102643855968814100000;
        a += age_2 * bmi_1 * -0.0011797722394560309000000;
        a += age_2 * bmi_2 * 0.0002147150913931929100000;
        a += age_2 * fh_diab * 0.0004914185594087803400000;

        var score = 100.0 * (1 - Math.pow(survivor[surv], Math.exp(a)) )
        return score
    }
    else {
        var surv = 10
        var survivor = [0,0,0,0,0,0,0,0,0,0,0.986227273941040];
        var Iethrisk = [0,0,1.0695857881565456000000000,1.3430172097414006000000000,1.8029022579794518000000000,1.1274654517708020000000000,0.4214631490239910100000000,0.2850919645908353000000000,0.8815108797589199500000000,0.3660573343168487300000000];
        var Ismoke = [0,0.0656016901750590550000000,0.2845098867369837400000000,0.3567664381700702000000000,0.5359517110678775300000000];

        var dage = age;
        dage = dage/10;
        var age_2 = Math.pow(dage,3);
        var age_1 = Math.pow(dage,.5);
        var dbmi = bmi;
        dbmi = dbmi/10;
        var bmi_1 = dbmi;
        var bmi_2 = Math.pow(dbmi,3);

        age_1 = age_1 - 2.123332023620606;
        age_2 = age_2 - 91.644744873046875;
        bmi_1 = bmi_1 - 2.571253299713135;
        bmi_2 = bmi_2 - 16.999439239501953;

        var a=0;

        a += Iethrisk[ethrisk];
        a += Ismoke[smoke_cat];

        a += age_1 * 4.3400852699139278000000000;
        a += age_2 * -0.0048771702696158879000000;
        a += bmi_1 * 2.9320361259524925000000000;
        a += bmi_2 * -0.0474002058748434900000000;

        a += b_cvd * 0.1779722905458669100000000;
        a += b_learning * 0.2783514358717271700000000;
        a += b_treatedhyp * 0.4394758285813711900000000;
        a += fh_diab * 0.5313359456558733900000000;

        a += age_1 * b_learning * -0.8641596002882057100000000;
        a += age_1 * bmi_1 * 0.6553138757562945200000000;
        a += age_1 * bmi_2 * -0.0362096572016301770000000;
        a += age_1 * fh_diab * -0.2641171450558896200000000;
        a += age_2 * b_learning * 0.0006724968808953360200000;
        a += age_2 * bmi_1 * -0.0044719662445263054000000;
        a += age_2 * bmi_2 * 0.0001185479967753342000000;
        a += age_2 * fh_diab * 0.0004161025828904768300000;

        var score = 100.0 * (1 - Math.pow(survivor[surv], Math.exp(a)) );
        return score;
    }
}

