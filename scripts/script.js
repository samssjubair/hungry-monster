document.getElementById('search-btn').addEventListener('click',()=>{
    const searchedFood= document.getElementById('search-input').value;
    document.getElementById('search-input').value="";
    document.getElementById('result-section').innerHTML="";
    if(searchedFood.length==1){
        
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchedFood}`)
        .then(res=>res.json())
        .then(data=>displayResult(data.meals))
        .catch(err=>noResult())
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedFood}`)
        .then(res=>res.json())
        .then(data=>displayResult(data.meals))
        .catch(()=>noResult())

    }
    
})


// function displayResult(data){
//     const resultSection= document.getElementById('result-section');
//     const foodDiv=document.createElement('div');
//     foodDiv.className='food-div';
//     const divContent=` <img class="thumb-img" src='${data.meals[0].strMealThumb}'>
//     <h2 class="food-title">${data.meals[0].strMeal}</h2>
//     `;
//     foodDiv.innerHTML=divContent;
//     resultSection.appendChild(foodDiv);
    
// }

function noResult(){
    const resultSection= document.getElementById('result-section');
    const foodDiv=document.createElement('div');
    foodDiv.className='nothing-found'
    const divContent=` <p>No search result found</p> `;
    foodDiv.innerHTML=divContent;
    resultSection.appendChild(foodDiv);
}

function displayResult(foods){
    // console.log(foods.meals);

    foods.forEach(food => {
        const resultSection= document.getElementById('result-section');
        const foodDiv=document.createElement('div');
        foodDiv.className='food-div';
        const divContent=` 
        <img class="thumb-img" src='${food.strMealThumb}'>
        <h3 class="food-title">${food.strMeal}</h2>
        `;
        foodDiv.innerHTML=divContent;
        resultSection.appendChild(foodDiv);

        
    });
    foodClickHandler();
}


function foodClickHandler(){
    const allFoods=document.getElementById('result-section');
    allFoods.addEventListener('click',(event)=>{
        document.getElementById('result-section').style.display='none';
        document.getElementById('detail-section').style.display='block';
        if(event.target.tagName=="IMG"||event.target.tagName=="H3"){
            const clickedFoodDiv= event.target.parentNode;
            const clickedFood= clickedFoodDiv.querySelector('h3').innerText;
            
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clickedFood}`)
            .then(res=>res.json())
            .then(data=>{
                data.meals.forEach(element => {
                    if(element.strMeal==clickedFood){
                        document.getElementById('detail-image').setAttribute('src',element.strMealThumb);
                        document.getElementById('detail-header').innerText=clickedFood;
                        
                        for (let i = 1; i < 21; i++) {
                            const list=document.createElement('li');
                            const measure= element['strMeasure'+i];
                            
                            const ingredient= element['strIngredient'+i];
                            if(ingredient==""){
                                break;
                            }
                            const listContent= `${measure} ${ingredient}`;
                            list.innerText=listContent;
                            document.getElementById('ingredients-ul').appendChild(list);
                            
                                                    
                        }
                    }
                });
            })
        }
        else{
            console.log(event.target);
        }
    })
    
}



