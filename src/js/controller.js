import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function(){

  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    
    recipeView.renderSpinner(recipeContainer);

    //load recipe
    await model.loadRecipe(id);

    //render recipe
    recipeView.render(model.state.recipe);

    
  }catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    // get query
    const query = searchView.getQuery();
    if(!query) return;

    //Load search results
    await model.loadSearchResult(query);

    //render results
    resultsView.render(model.state.search.results)


  }catch(err){
    console.log(err);
  }
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();


