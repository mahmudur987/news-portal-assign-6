const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data.news_category))
        .catch(error => console.log(error))
}

const displayNews = (elements) => {
    const catagoryField = document.getElementById('display-catagory');
    elements.forEach(element => {
        const categoriyDiv = document.createElement('div');
        categoriyDiv.innerHTML = `
        <button onclick="loadNewsDetails('${element.category_id}')" class="btn btn-light ">${element.category_name}</button>
        `;
        catagoryField.appendChild(categoriyDiv);
    });
}


const loadNewsDetails = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewses(data.data))
        .catch(error => console.log(error))
}
const displayNewses = (newses) => {
    DisplaySpiner(true);

    // news number area 
    const newsNumberField = document.getElementById('Textarea1');
    newsNumberField.innerText = newses.length + ' ' + 'news are showing';

    // tranding corner
    const condition = newses[0] ? newses[0].others_info.is_todays_pick : 0;
    const todaysPic = document.getElementById('todays-pic');
    const tranding = document.getElementById('Tranding');
    if (condition == true) {
        todaysPic.classList.add('bg-info');
        tranding.classList.remove('bg-info');

    } else {
        tranding.classList.add('bg-info');
        todaysPic.classList.remove('bg-info');

    }
    const displaySection = document.getElementById('displaySection')
    if (newses.length == 0) {

        displaySection.classList.add('d-none')
        return;
    }
    else {
        displaySection.classList.remove('d-none')

    }
    const myarray = newses;
    const moreView = myarray.sort((a, b) => b.total_view - a.total_view);
    // console.log(moreView)


    const displayContainer = document.getElementById('display-details');
    displayContainer.innerHTML = '';
    moreView.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col-12');
        newsDiv.innerHTML = `
      
        <div class="card mb-3 my-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.image_url}" class="img-fluid h-100 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body ">

                    <div class="mb-5">
                        <h4 class="card-title">${news.title}</h4>
                        <p class="card-text">${news.details.length > 300 ? news.details.slice(0, 300) + '. . . . ' : news.details}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-end flex-column flex-sm-column flex-md-row mb-0 mt-5  ">
                        <div class=" d-flex me-2 ">
                         <div class="mx-1 ">   <img style="height: 75%;width:50%;" class="img-fluid mx-5 border rounded-circle" src="${news.author.img ? news.author.img : 'no image'}" alt=""></div>
                            <div class=""> 
                            <h6>authors name ${news.author.name ? news.author.name : 'no name'}</h6>
                            <h6>publishd${news.author.published_date ? news.author.published_date : 'no date'}</h6>
                            </div>
                        </div>

                        <div class="w-100 mx-2"><i class="fa-solid fa-eye"></i>
                        <span> ${news.total_view ? news.total_view : 'no data found'}</span>
                        </div>
                        <div class="w-100  mx-2">
                            <span class="text-warning">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </span>
                            <span>${news.rating.number ? news.rating.number : ''} </span>
                        </div>

                        <div type="button" data-bs-toggle="modal" data-bs-target="#newsModal"
                            class="w-100  fw-bold mx-2 text-end">
                            <button onclick="loadModaldetails('${news._id}')" class="btn btn-light ">
                                <i class="fa-solid fa-arrow-right">

                                </i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
   `;
        displayContainer.appendChild(newsDiv);

    });
    // console.log(newses);
    DisplaySpiner(false);


}
// loadNewsDetails('03');

const loadModaldetails = (news_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalDetails(data.data[0]))
        .catch(error => console.log(error))
}
const displayModalDetails = (objects) => {
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = objects.title;
    const modalBody = document.getElementById('Modal-body');
    modalBody.textContent = '';
    modalBody.innerHTML = `
    <h6>${objects.author.published_date}</h6>
    <p>${objects.details}</p>
    
    
    `;


    // console.log(objects)
}

document.getElementById('navbar-news').addEventListener('click', function () {
    loadNewsDetails('08')

});

document.getElementById('btn-blog').addEventListener('click', function () {
    window.open('answer.html', '_blank')
})

const DisplaySpiner = load => {
    const spinerField = document.getElementById('spiner')
    if (load == true) {
        spinerField.classList.remove('d-none')
    } else {
        spinerField.classList.add('d-none')
    }
}
loadNews();
loadNewsDetails('03')
