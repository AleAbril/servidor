//https://www.eclipse.org/paho/clients/js/

function Boton_1() {
	//alert("led on");
	console.log("boton 1");
	//document.getElementById("sensor").innerHTML="led on";
	message = new Paho.MQTT.Message("on");
    	message.destinationName = "jaabril.fie@unach.edu.ec/t1";
    	client.send(message);
  
}
function Boton_2(){	
	//alert("led off");
	console.log("boton 2");
	message = new Paho.MQTT.Message("off");
    	message.destinationName = "jaabril.fie@unach.edu.ec/t1";
    	client.send(message);
	//document.getElementById("sensor").innerHTML="led off";
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "jaabril.fie@unach.edu.ec/t1",
    password: "jaa123",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("jaabril.fie@unach.edu.ec/t2");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "jaabril.fie@unach.edu.ec/t2";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("sensor").innerHTML=message.payloadString;
  }
  
