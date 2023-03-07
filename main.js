//https://teachablemachine.withgoogle.com/models/ZyMLGxzvi/

Webcam.set({
    width:350,
    height:300,
    imageFormat : 'png',
    pngQuality:90
});

camera = document.getElementById("camera")

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZyMLGxzvi/model.json', modelLoaded);

function modelLoaded() {
    console.log('Modelo Carregado');
  }
  
  function speak(){
    var synth = window.speechSynthesis;
    speakData1 =  prediction1;
    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
  }

  function check()
{
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}


function gotResult(error, results)
{
  if(error){
    console.error(error);
  }

  else{
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML = results[0].label;

    prediction1 = results[0].label;

    speak();

    if(results[0].label == "Joinha"){
      document.getElementById("updateEmoji").innerHTML = "&#128077;";
    }

    else if(results[0].label == "OK"){
      document.getElementById("updateEmoji").innerHTML = "&#128076;";
    }

    else if(results[0].label == "Suave"){
      document.getElementById("updateEmoji").innerHTML = "&#129305;";
    }

    else if(results[0].label == "Vitória"){
      document.getElementById("updateEmoji").innerHTML = "&#9996;";
    }
  }
}