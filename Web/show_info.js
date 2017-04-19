var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://iot-backend-metropolia.herokuapp.com/api/data/4", false ); // false for synchronous request
xmlHttp.send(null);
var jObj = JSON.parse(xmlHttp.responseText);
var date = new Date();

var stored1="";
var stored2="";

for(var i=0; i<jObj.length; i++){
	if(jObj[i].readings!=null){
		var uid = jObj[i].readings[0].uid;
		for(var j=0; j<jObj.length; j++){
			if(jObj[j].properties!=null && jObj[j].properties.identifier==uid){
				var userName = jObj[j].properties.userName;
			}
		}
		//Compares Year, Month, Day and Hour and only takes the relevant data
		var todayCourse = date.getUTCFullYear() == jObj[i].timeStamp.slice(0, 4) && date.getUTCMonth()+1 == jObj[i].timeStamp.slice(5, 7) 
		&& date.getUTCDate() == jObj[i].timeStamp.slice(8, 10);

		var onClassroom = document.getElementById("ini1").value <= date.getUTCHours() && date.getUTCHours() < document.getElementById("fin1").value
		&& document.getElementById("ini1").value <= jObj[i].timeStamp.slice(11, 13) && jObj[i].timeStamp.slice(11, 13) < document.getElementById("fin1").value;

		var onClassroom2 = document.getElementById("ini2").value <= date.getUTCHours() && date.getUTCHours() < document.getElementById("fin2").value 
		&& document.getElementById("ini2").value <= jObj[i].timeStamp.slice(11, 13) && jObj[i].timeStamp.slice(11, 13) < document.getElementById("fin2").value;


		if(todayCourse && onClassroom){
			var pos = stored1.search(userName);
			if(pos==-1){
				//stored = stored + jObj[i].readings[0].uid + ", ";
				stored1 = stored1 + userName + ", ";
			}
			else{
				stored1 = stored1.replace(userName + ", ", "");
			}
		}
		else if(todayCourse && onClassroom2){
			var pos = stored2.search(userName);
			if(pos==-1){
				stored2 = stored2 + userName + ", ";
			}
			else{
				stored2 = stored2.replace(userName + ", ", "");
			}
		}
	}
}

document.getElementById("class1").innerHTML = stored1;
document.getElementById("class2").innerHTML = stored2;