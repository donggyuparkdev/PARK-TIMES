let news = []
const getLatestNews = async() => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10`);
    console.log(url)
    let header = new Headers({'x-api-key':'YKJZl_zdGEuG32fp8PS8abauyu6RdGRgqpz0XqeqNUI'});
    let response = await fetch(url,{headers:header});
    let data = response.json()
    // console.log("this is data",data);
    news = data.articles
    console.log(news)
}

getLatestNews();