let news = [];
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));

const getLatestNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10`);
    console.log(url)
    let header = new Headers({
        'x-api-key': 'YKJZl_zdGEuG32fp8PS8abauyu6RdGRgqpz0XqeqNUI'
    });

    let response = await fetch(url, {
        headers: header
    });
    let data = await response.json();
    // console.log("this is data",data);
    news = data.articles;
    console.log(news);

    render();
};

const getNewsByTopic = async (event) => {
    console.log("클릭됨", event.target.textContent);
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&page_size=10&topic=${topic}`);
    // console.log("uuu",url)

    let header = new Headers({
        'x-api-key': 'YKJZl_zdGEuG32fp8PS8abauyu6RdGRgqpz0XqeqNUI'
    });
    let response = await fetch(url, {
        headers: header
    });
    let data = await response.json();
    news = data.articles;
    render();

    console.log("토픽뉴스", data);
};

const render = () => {
    let newsHTML = ''
    newsHTML = news.map((item) => {
        return ` <div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${item.media}" alt="">
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>
                ${item.summary}
            </p>
            <div>
                ${item.rights} * ${item.published_date}
            </div>
        </div>
    </div>`;
    }).join('');


    document.getElementById("news-board").innerHTML = newsHTML;
}

getLatestNews();