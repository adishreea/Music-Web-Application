var api_key = "8285d7b08e6d91a583c6be87d10be10e";
function sendRequest()
{  
    var xhr = new XMLHttpRequest();
    var method = "artist.getInfo"; //api method to be called
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function ()
    {     
        if (this.readyState == 4) 
        {    
            var json = JSON.parse(this.responseText); //to parse json input 
            var str = JSON.stringify(json,undefined,2); //to convert json to string use for debugging
            var imageadd =""; //a random variable defined to hold image url
            for(i=0;i<json.artist.image.length;i++) 
            {
                if(json.artist.image[i].size=="large")
                    imageadd = imageadd+JSON.stringify(json.artist.image[i]['#text'],undefined,2); 
                //syntax to pick up propertites starting with special characters #
            } 
            document.getElementById("output").innerHTML = "<pre>" + "<h2>" + json.artist.name + "</h2>" + "<img src=" + imageadd + "></img>" + "</pre>";		
            document.getElementById("output1").innerHTML = "<p><b>URL:</b>" + json.artist.url.link(json.artist.url) + "<br/></br><b>Biography: </b>" + json.artist.bio.content + "</p>";    
        }
    };
    xhr.send(null);   
}
function sendRequestForTop() 
{    
    var xhr = new XMLHttpRequest();
    var method = "artist.getTopAlbums"; 
    var artist = encodeURI(document.getElementById("form-input-topalbums").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () 
    {   
        if (this.readyState == 4) 
        {        
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var imageadd ="";
            var imageadd1 = "";
            for(i=0;i<json.topalbums.album[0].image.length;i++) 
            {  
                if(json.topalbums.album[0].image[i].size=="large") 
                    imageadd = imageadd+JSON.stringify(json.topalbums.album[0].image[i]['#text'],undefined,2);
            }  
            document.getElementById("output").innerHTML = "<pre>" + "<h3>TOP ALBUMS</h3>" + json.topalbums.album[0].name + "<br/>" + "<img src=" + imageadd + "></img>" + "</pre>"; 
            for(i=0;i<json.topalbums.album[1].image.length;i++) 
            {  
                if(json.topalbums.album[1].image[i].size=="large") 
                    imageadd1 = imageadd1+JSON.stringify(json.topalbums.album[1].image[i]['#text'],undefined,2);
            } 
            document.getElementById("output1").innerHTML = "<pre>" + json.topalbums.album[1].name + "<br/>" + "<img src=" + imageadd1 + "></img>" + "</pre>"; 
        }    
    };  
    xhr.send(null);  
}
function sendRequestForSimilar() 
{  
    var xhr = new XMLHttpRequest();
    var method = "artist.getSimilar";
    var artist = encodeURI(document.getElementById("form-input-similar").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () 
    {      
        if (this.readyState == 4) 
        {       
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var imageadd ="";
            var imageadd1 ="";
            for(i=0;i<json.similarartists.artist[0].image.length;i++)
            {
                if(json.similarartists.artist[0].image[i].size=="large")
                    imageadd = imageadd+JSON.stringify(json.similarartists.artist[0].image[i]['#text'],undefined,2);
            } 
            document.getElementById("output").innerHTML = "<pre>" + "<h3>SIMILAR ARTISTS</h3>" + json.similarartists.artist[0].name + "<br/>" + "<img src=" + imageadd + "></img>" + "</pre>";
            for(i=0;i<json.similarartists.artist[1].image.length;i++)
            {  
                if(json.similarartists.artist[1].image[i].size=="large")
                    imageadd1 = imageadd1+JSON.stringify(json.similarartists.artist[1].image[i]['#text'],undefined,2);
            } 
            document.getElementById("output1").innerHTML = "<pre>" + json.similarartists.artist[1].name + "<br/>" + "<img src=" + imageadd1 + "></img>" + "</pre>";
        }  
    };   
    xhr.send(null);  
}