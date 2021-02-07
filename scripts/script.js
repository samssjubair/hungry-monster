//search button click handler
const searchClickHandler=()=>{
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
}

searchClickHandler();



//if promise is unsuccessful and no data is found
const noResult=()=>{
    const resultSection= document.getElementById('result-section');
    const foodDiv=document.createElement('div');
    foodDiv.className='nothing-found'
    const divContent=` <p>No search result found</p> `;
    foodDiv.innerHTML=divContent;
    resultSection.appendChild(foodDiv);
}


//display all the matched results
const displayResult=(foods)=>{
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


//If any food is clicked(calling DISPLAY DETAIL function in basis where it's clicked)
const foodClickHandler=()=>{
    const allFoods=document.getElementById('result-section');
    allFoods.addEventListener('click',(event)=>{
        if(event.target.tagName=="IMG"||event.target.tagName=="H3"){
            const clickedFoodDiv= event.target.parentNode;
            const clickedFood= clickedFoodDiv.querySelector('h3').innerText;
            loadIngredients(clickedFood);
        }
        else if(event.target.tagName=="DIV"){
            const clickedFoodDiv= event.target;
            const clickedFood= clickedFoodDiv.querySelector('h3').innerText;
            loadIngredients(clickedFood);
        }
    })
    
}


//load all ingredients by fetching from API
const loadIngredients=(clickedFood)=>{
    document.getElementById('result-section').style.display='none';
    document.getElementById('search-div').style.display='none';
    document.getElementById('detail-section').style.display='block';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clickedFood}`)
            .then(res=>res.json())
            .then(data=>displayIngredients(data,clickedFood))
            
}


//display ingredients data
const displayIngredients=(data,clickedFood)=>{
    data.meals.forEach(element => {
        if(element.strMeal==clickedFood){
            document.getElementById('detail-image').setAttribute('src',element.strMealThumb);
            document.getElementById('detail-header').innerText=clickedFood;
            for (let i = 1; i < 21; i++) {
                const list=document.createElement('li');
                const measure= element['strMeasure'+i];
                
                const ingredient= element['strIngredient'+i];
                if(ingredient==""||ingredient==null){
                    break;
                }
                const listContent= `${measure} ${ingredient}`;
                list.innerText=listContent;
                document.getElementById('ingredients-ul').appendChild(list);                         
            }
            document.getElementById('ingredient-title').innerText="Ingredients";
            
        }
    });
}



