$(document).ready(function() {


	//Error.Service
	var errorLogService;

    errorLogService = {};

    // (true) displays logs (false) stops logs 
    // NOTE: always set to false in production enviroment
    errorLogService.debug = true; 

    /*
    * Outputs error messages to console 
    * @param {String, Object, Array} message 
    * @param {String} debugmessage (Optional)
    * @param {String} linenumber (Optional)
    * @param {String} controller (Optional)
    */

    errorLogService.logMessage = function(message, controller) {

      if ((message) && (errorLogService.debug === true)) {       
        console.log("%c <-- DEBUG -->", 'background: #222; color: #bada55');
        console.log(message);
        console.log("%c <-- END DEBUG --> ", 'background: #222; color: #bada55');
      }

      if ((controller) && (errorLogService.debug === true)) {       
        console.log("%c Debug Controller name: " + controller, 'background: #222; color: #bada55');
      }

    };

	//LOGIN
	function login(user, pwd) {
		errorLogService.logMessage(user, 'LOGIN - USER');
		errorLogService.logMessage(pwd, 'LOGIN - PWD');		
	}

	$( document ).on( "click", "#login", function() {
		var user = $("#user").val();
		var pwd = $("#pwd").val();
		if ((user) && (pwd)) {
			login(user,pwd);	
		} else {
			bootbox.alert("Required Username and password", function() {
                console.log("error username/password");
            });
		}		
	});

	$( document ).on( "change", 'input[type=radio]', function() {
		if ($(this).val() == "0") {
			$('#loginPWD').hide('slow');
			$('#recordarPWD').fadeIn('slow');
		} else {
			$('#recordarPWD').hide();
			$('#loginPWD').fadeIn('slow');
		}
	});

	function bar_chart(activity) {
		var color = ['#5C447A','#6C469D','#7B36D1','#8939ED','#964FEF','#B17BF4','#C9A3F7'];
		var myChart = new JSChart('chartcontainer', 'bar', '');
		var json = {
				"JSChart" : {
					"datasets" : [
					{
						"type" : "bar",
						"data" : []
					}
					]
				}
			};

		var arrayAUX = [];
		var i = 0;
		$.each(activity[0], function(key, value) {
			if (key != 'Date') {
				arrayAUX.push([key,value]);
				i++;			
			}
		});
		errorLogService.logMessage(arrayAUX, 'ACTIVITY - arrayAUX');
		//myChart.setDataArray([['E-mail', 60],['Search', 49],['News', 39],['Weather', 30],['Hobby', 29],['For fun', 28],['Social networking', 13]]);
		myChart.setDataArray([[arrayAUX[0][0], parseInt(arrayAUX[0][1])],[arrayAUX[1][0], parseInt(arrayAUX[1][1])]]);		
		myChart.colorize(['#5C447A','#6C469D']);
		myChart.setSize(600, 300);
		myChart.setIntervalEndY(5000);
		myChart.setTitle('Daily activity ('+activity[0].Date+')');
		myChart.setTitleFontSize(10);
		myChart.setBarSpacingRatio(50);
		myChart.setBarOpacity(1);
		myChart.setAxisWidth(1);
		myChart.setAxisNameX('', false);
		myChart.setAxisNameY('', false);
		myChart.set3D(true);
		myChart.setBarValues(false);
		myChart.draw();
	}

	//Construct
	function init(){
		//init
		var oauth = OAuth({
		    consumer: {
		        public: 'd079a740fe0f787f63d18ba409cad16a00ab282a',
		        secret: 'd551f94603'
		    },
		    signature_method: 'PLAINTEXT'
		});
		var request_data = {};
		var BASE_API = 'http://api.fitbug.com/v1_1';
		var params = oauth.deParamUrl(window.location.href);
		errorLogService.logMessage(params, 'Init LOGIN');
		if (jQuery.isEmptyObject(params)) {
			request_data = {
			    url: BASE_API+'/oauth/request_token',
			    method: 'POST',
			   	data: {
				    oauth_callback: 'http://localhost:9000/inicio/'
				}
			};
			$.ajax({
			    url: request_data.url,
			    type: request_data.method,
			    data: oauth.authorize(request_data)
			}).done(function(data) {
				var response = oauth.deParam(data);
				errorLogService.logMessage(response, 'LOGIN request_token - AJAX');
				var token = {
				    public: response.oauth_token,
				    secret: response.oauth_token_secret
				};
				localStorage.setItem("token", JSON.stringify(token));				
				window.location.replace(response.authentification_url+'?oauth_token='+response.oauth_token);							
			});
		} else {
			if(params.Msg) {
				$('#'+params.Msg).show();
			} else {
				var token = JSON.parse(localStorage.getItem("token"));
				request_data = {
					url: BASE_API+'/oauth/access_token',
				    method: 'POST',
				    data : {
				    	oauth_verifier : params.oauth_verifier				
				    }
				};
				$.ajax({
			    	url: request_data.url,
				    type: request_data.method,
				    data: oauth.authorize(request_data, token)
				}).done(function(data) {
					var response = oauth.deParam(data);
					errorLogService.logMessage(response, 'LOGIN access_token - AJAX');				
					request_data = {
						url: BASE_API+'/member/~',
					    method: 'GET'
					};
					var token = {
					    public: response.oauth_token,
					    secret: response.oauth_token_secret
					};
					$.ajax({
				    	url: request_data.url,
					    type: request_data.method,
					    data: oauth.authorize(request_data, token)
					}).done(function(data) {
						errorLogService.logMessage(data, 'AFTER LOGIN - member');
						var nickname = data.MemberInfo.PersonalInfo.titlename + ' ' + data.MemberInfo.PersonalInfo.nickname
						bootbox.alert("Welcome to fitbug app "+nickname, function() {
			                var d = new Date();
							var day = d.getDate();
							if (day<10) day = '0'+day;
							var month = d.getMonth()+1;
							if (month<10) month = '0'+month;
							var year = d.getFullYear();
							var fecha = year + '-' + month + '-' + day;
							request_data = {
								url: BASE_API+'/activity/~/'+fecha+'/1D/',
							    method: 'GET'
							};
							$.ajax({
						    	url: request_data.url,
							    type: 'GET',
							    data: oauth.authorize(request_data,token)
							}).done(function(data) {
								errorLogService.logMessage(data, 'ACTIVITY - 1D');
								bar_chart(data);
							});
			            });
					});					
				});
			}
		}
	}

	init();
	
});