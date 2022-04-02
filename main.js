let news = [];
let menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));

let searchButton = document.getElementById("search-button");
let url;
// 각 함수에 필요한 url 만든다
// api 호출 함수를 부른다

const getNews = async () => {
    try {
        let header = new Headers({
            'x-api-key': 'YKJZl_zdGEuG32fp8PS8abauyu6RdGRgqpz0XqeqNUI'
        });

        let response = await fetch(url, {
            headers: header
        });
        let data = await response.json();

        if (response.status == 200) {
            if(data.total_hits == 0) {
                throw new Error("검색된 결과값이 없습니다.");
            }
            // console.log("받은 데이터는",data);
            news = data.articles;
            console.log(news);
            render();
        } else {
            throw new Error(data.message);
        }
        // console.log("this is data",data);

        // console.log("response는",response);
        // console.log("data는",data);

    } catch (error) {
        console.log("잡힌 에러는", error.message);
        errorRender(error.message);
    };

};

const getLatestNews = async () => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10`);
    // console.log(url)    
    getNews();
};

const getNewsByTopic = async (event) => {
    console.log("클릭됨", event.target.textContent);
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&page_size=10&topic=${topic}`);
    // console.log("uuu",url)
    // console.log("토픽뉴스", data);
    getNews();
};

const getNewsByKeyword = async () => {
    // 검색 키워드 읽어오기
    // url에 검색 키워드 붙이기
    // 헤더준비
    // url부르기
    // 데이터 가져오기
    // 데이터 보여주기

    let keyword = document.getElementById("search-input").value;
    console.log(keyword);
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    getNews();
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

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger  text-center" role="alert">${message}</div>`
    document.getElementById("news-board").innerHTML = errorHTML;
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();