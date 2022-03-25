const getLatestNews = () => {
    let url = `https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10`
    console.log(url)
}

getLatestNews()