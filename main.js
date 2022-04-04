let news = [];
let page = 1;
let total_pages = 0;
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
        url.searchParams.set('page', page);
        console.log("url은", url);
        let response = await fetch(url, {
            headers: header
        });
        let data = await response.json();

        if (response.status == 200) {
            if (data.total_hits == 0) {
                throw new Error("검색된 결과값이 없습니다.");
            }
            console.log("받은 데이터는", data);
            news = data.articles;
            total_pages = data.total_pages;
            page = data.page;
            console.log(news);
            render();
            pagenation();
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

const pagenation = () => {
    let pagenationHTML = ``;
    // total_page
    // page
    // page_group
    let pageGroup = Math.ceil(page / 5);
    // last
    let last = pageGroup * 5;
    // first
    let first = last - 4;
    // first_last 페이지 프린트

    // total page 3일 경우 3개의 페이지만 프린트 하는법 last, first
    // <<, >> 버튼 만들어 주기 맨처음, 맨 끝
    //  내가 그룹 1 일때 <<, < 버튼 삭제
    //  내가 마지막 그룹 >>, > 버튼 삭제

    pagenationHTML = ` <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-5})">
        <span aria-hidden="true">&laquo;</span>
    </a>
    </li>`;
    pagenationHTML += ` <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-1})">
        <span aria-hidden="true">&lt;</span>
    </a>
    </li>`;
    for (let i = first; i <= last; i++) {
        pagenationHTML += `<li class="page-item ${
            page==i?"active":""
        }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
    };
    pagenationHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">
        <span aria-hidden="true">&gt;</span>
    </a>
    </li>`;
    pagenationHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+5})">
        <span aria-hidden="true">&raquo;</span>
    </a>
    </li>`;

    document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const moveToPage = (pageNum) => {
    // 1. 이동하고 싶은 페이지 알기
    page = pageNum
    // console.log(page);
    // 2. 이동하고 싶은 페이지 가지고 api 다시 호출하기
    getNews();
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();