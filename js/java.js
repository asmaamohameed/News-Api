
var news;
var term;
var category = 'general';
var country = 'eg';
var links = document.getElementsByClassName("nav-link");
var searchInp = document.getElementById("searchInp");
var countryLinks = document.getElementsByClassName("country-link");


getNews();

searchInp.addEventListener("click" , function(){
    term = searchInp.value;
    globalSearch();
})

for(var i = 0 ;i<countryLinks.length; i++)
    {
        countryLinks[i].addEventListener("click" , function(e){
            country = this.getAttribute("title");
            getNews();
        })
    }

for(var i=0 ; i<links.length ; i++)
{
    links[i].addEventListener("click" , function(e){
        category = e.target.innerHTML;
        getNews();
    })
}


function getNews()
{
  var req; 

  if(window.XMLHttpRequest)
  {
      req = new XMLHttpRequest();
  }
  else
  {
      req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var url = `https://newsapi.org/v2/top-headlines?country=`+country+`&category=`+category+`&apiKey=232ae55823464c92991f9b323f57790e`
  req.open("GET" , url);

  req.onreadystatechange = function()
  {
      if(req.status == 200 && req.readyState == 4)
          {
              news = JSON.parse(req.response);
              news = news.articles;
              displayNews();
          }
  }
  req.send();
}

function displayNews()
{
  var temp = "";
    for(var i = 0 ; i<news.length ; i++)
        {
            temp+=` 
               <div class="col-md-3">
                      <div class="new">
                          <img src="`+news[i].urlToImage+`" class="img-fluid" width="400px" height=400px/>
                          <h5>`+news[i].title+`</h5>
                          <p class="text-muted">`+news[i].description+`</p>
                      </div>
                  </div>`
        }
document.getElementById("newsRow").innerHTML = temp ;
} 

function globalSearch ()
{
    var req; 

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();
    }
    else
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = `https://newsapi.org/v2/everything?q=`+term+`&from=2019-07-27&sortBy=publishedAt&apiKey=232ae55823464c92991f9b323f57790e`
    
    req.open("GET" , url);
  
    req.onreadystatechange = function()
    {
        if(req.status == 200 && req.readyState == 4)
            {
                news = JSON.parse(req.response);
                news = news.articles;
                displayNews();
            }
    }
    req.send();
  }