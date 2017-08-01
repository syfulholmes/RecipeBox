//stylistic elements

//for NewRecipe tab
var newRecipeStyle = {
  paddingTop: 20,
  height: 70,
  width: '40%',
  margin: 'auto',
  borderStyle: 'solid',
  color: 'black',
  borderWidth: 0,
  webkitBoxShadow: '1px 1px 5px rgba(0,0,0,0.5)',
  fontFamily: 'Oleo Script',
  fontSize: 20,
  marginTop: 10
};

//for Recipe Entry tab
var recipeEntryStyle = {
  paddingTop: 20,
  height: 70,
  width: '40%',
  color: 'black',
  margin: 'auto',
  webkitBoxShadow: '1px 1px 5px rgba(0,0,0,0.5)',
  fontFamily: 'Oleo Script',
  fontSize: 20
};

//for View Recipe page
var viewRecipeStyle = {
  padding: 20,
  height: '80%',
  width: '40%',
  color: 'black',
  backgroundColor: 'white',
  margin: 'auto',
  webkitBoxShadow: '1px 1px 5px rgba(0,0,0,0.5)',
  fontFamily: 'garamond',
  textAlign: 'left'
};

const detailsStyle = {
  margin: 20,
  textAlign: 'left'
};

const recipeHeadingStyle = {
  margin: 20,
  textAlign: 'left',
  fontFamily: 'Oleo Script',
};
//end of stylistic settings

//test recipe object
const testRecipe = {
  name: "Asam Pedas Ikan Pari",
  ingr: [["500", "g", "Ikan Pari"], ["2", "cups", "Water"], ["1", "tbsp", "Asam Jawa"]],
  instr: ["Do this.", "Then do that.", "Then do that.", "Then do that.", "Then finally, do this."],
  src: "My mother"
}

//Header for all pages
const Header = (props) => {
  return <h1 id='heading' onClick={props.onClick}>RecipeBox</h1>;
}

//From here onwards we have fields for AddRecipe
//Recipe name
const RecipeNameField = (props) => {
  var out;
  if (props.name != "") {
    out = (<div style={recipeHeadingStyle}><input id='recipe' type='text' name='recipe' onChange={props.onChange} defaultValue={props.name} /></div>)
  } else {
    out = (<div style={recipeHeadingStyle}><input id='recipe' type='text' name='recipe' onChange={props.onChange} placeholder='Recipe name' /></div>)
  }
  return out;
}

//Single Ingredient field
const IngredField = (props) => {
  var n = props.n;
  var qty = props.qty;
  var unit = props.unit;
  var ingr = props.ingr;
  var place = props.place
  
  return (<div>
        <input className='qty' id={'qty'+n} type='text' name='qty' placeholder={props.q} defaultValue={qty} onChange={props.onChange} />
        <input className='unit' id={'unit'+n} type='text' name='unit' placeholder={props.u} defaultValue={unit}  onChange={props.onChange} />
        <input className='ingr' id={'ingr'+n} type='text' name='ingred' placeholder={props.i} defaultValue={ingr} onChange={props.onChange} />
      </div>);
}

//Multiple ingred fields
const IngredientFields = (props) => {
  var ingrArr = props.ingr;
  var out = [];
  for (var i = 0; i < ingrArr.length; i++){
    var ingr = ingrArr[i];
    if (i == 0 && ingr[0] == "" && ingr[0] == "" && ingr[0] == ""){
      out.push(<IngredField n={0} qty={""} unit={""} ingr={""} onChange={props.onChange} q={'Qty'} u={'Unit'} i={'Ingredient'} />)
    } else {
      out.push(<IngredField n={i} qty={ingr[0]} unit={ingr[1]} ingr={ingr[2]} onChange={props.onChange} />);
    }
  }
                       
  return <div>{out}</div>;
}

//Instruction fields
const InstructionFields = (props) => {
  var jsxArr = props.instr.map((ins, i) => <div id="instr">{i+1+"."} <input className="instr" id={"instr"+i} type='text' name='instructions' onChange={props.onChange} defaultValue={ins}></input></div>);
                               
  return <div><h5>Instructions: </h5><div>{jsxArr}</div></div>;
}

//Recipe By field                               
const RecipeByField = (props) => {
    return <div style={detailsStyle}>Recipe by: <input id="src" type="text" name="src" onChange={props.onChange} defaultValue={props.src} /></div>;
  }
 //End of fields
 
  
//Page to add new recipe info or edit existing.
//Stores all info entered by user in state in real time. 
//Upon saving, the data is stored in local storage and one goes to ViewPage
class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    //if no index is passed, it is a new recipe
    if (props.index == undefined) {
      this.state = { //initialize empty recipe
        allInfo: {
          name: "",
          ingr: [["", "", ""], 
                 ["", "", ""]],
          instr: ["", ""],
          src: ""
        } 
      }; 
    } else { //if index is passed, it is an existing recipe to be edited
      this.state = { allInfo: JSON.parse(localStorage.getItem("_saiful_recipes"))[this.props.index] };
    }
    
    this.addIngrLine = this.addIngrLine.bind(this);
    this.addInstrLine = this.addInstrLine.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  
  //stores all user input in this.state.allInfo object
  handleChange(e) {
    var newInfo = this.state.allInfo;
    var id = e.target.id;
    
    if (id == "recipe"){
      newInfo.name = e.target.value;
    } else if (id.match(/qty/)) {
      var i = parseInt(id.charAt(id.length-1));
      newInfo.ingr[i][0] = e.target.value;
    } else if (id.match(/unit/)) {
      var i = parseInt(id.charAt(id.length-1));
      newInfo.ingr[i][1] = e.target.value;
    } else if (id.match(/ingr/)) {
      var i = parseInt(id.charAt(id.length-1));
      newInfo.ingr[i][2] = e.target.value;
    } else if (id.match(/instr/)) {
      var i = parseInt(id.charAt(id.length-1));
      newInfo.instr[i] = e.target.value;
    } else if (id.match(/src/)) {
      newInfo.src = e.target.value;
    }
    //updates state and re-renders
    this.setState({ allInfo: newInfo });
  }
  
  //handle add new ingredient option
  addIngrLine() {
    var shouldAdd = true; //checker
    var ingrArr = this.state.allInfo.ingr; //existing ingredient array
    
    //check if all fields are filled
    for (var i = 0; i < ingrArr.length; i++){
      for (var j = 0; j < 3; j++){
        if (ingrArr[i][j] == ""){shouldAdd = false; break; }
      }
    }
    
    //if some fields are unfilled, display alert
    if (!shouldAdd) { alert("Please fill all fields before adding new ingredient.")}
    else {
      //if all are filled, add new line
      var currIngr = this.state.allInfo.ingr;
      currIngr.push(["", "", ""]);
      
      var newState = this.state.allInfo;
      newState.ingr = currIngr;
      
      //re-render page
      this.setState({ allInfo: newState });
    }
  }
  
  //handle add new instruction
  addInstrLine() {
    var shouldAdd = true; //checker
    var instrArr = this.state.allInfo.instr; //instruction array
    
    //checks if all fields are filled
    for (var i = 0; i < instrArr.length; i++){
      if (instrArr[i] == ""){shouldAdd = false; break;}
    }
    
    //if some fields are unfilled, display alert
    if (!shouldAdd) { alert("Please fill all fields before adding new step."); }
    else {
      //if all fields are filled, add new line
      var currInstr = this.state.allInfo.instr;
      currInstr.push("");
      
      var newState = this.state.allInfo;
      newState.instr = currInstr;
      
      //re-render the page
      this.setState({ allInfo: newState });
    }
  }
  
  handleSave() {
    //all relevant recipe info here
    var allInfo = this.state.allInfo;
    var name = allInfo.name;
    var ingr = allInfo.ingr;
    var instr = allInfo.instr;
    var src = allInfo.src;
    
    var shouldSave = true; //checker
    var warningArr = []; //array of warnings for alert
    
    //checks for any empty field
    if (name == ""){ shouldSave = false; warningArr.push("Recipe name"); }
    if (ingr[0][0] == "" || ingr[0][1] == "" || ingr[0][1] == ""){
        shouldSave = false;
        warningArr.push("Ingredients")
    }
    if (instr[0] == ""){ shouldSave = false; warningArr.push("Instructions"); } 
    if (src == ""){ shouldSave = false; warningArr.push("Recipe source"); }
    
    //if some fields not filled, display error message informing which fields are not filled
    if (!shouldSave){
      var errorMessage = "Please ensure that the following fields are filled properly:\n"
      for (var i = 0; i < warningArr.length; i++){ errorMessage += "\n"+warningArr[i]+"\n"; }
      
      alert(errorMessage);
      
    } else {
      //if all are filled save data in localStorage and go to ViewPage
      var recipeObj = this.state.allInfo;
      
      //if localStorage is initially empty, create new array containing first recipe
      //and save. Go to ViewPage
      if (!localStorage.getItem("_saiful_recipes")){
        var newRecipeArr = [allInfo];
        localStorage.setItem("_saiful_recipes", JSON.stringify(newRecipeArr));
        
      } else {
        //localStorage not empty
        var currArr = JSON.parse(localStorage.getItem("_saiful_recipes"));
        if (this.props.index == undefined){ currArr.push(allInfo); } //push new recipe
        else { currArr[this.props.index] = allInfo; } //edit existing recipe
        
        //update localStorage
        localStorage.setItem("_saiful_recipes", JSON.stringify(currArr));
      }
      //go to ViewPage: note that there are two distince view handlers here,
      //one for adding new recipe, one for editing
      this.props.view();
    }
  }
  
  render() {
    
    var header = "Edit Recipe";
    if (this.props.index == undefined){ header = "Add New Recipe"; }
    
    return (<div>
        <Header onClick={this.props.goHome} />
        
        <div style={viewRecipeStyle}>
          <div id='addRecipeHeader'><h3>{header}</h3></div>
          <RecipeNameField name={this.state.allInfo.name} onChange={this.handleChange}/>
          
          <div style={detailsStyle}>
            <h5>Ingredients:</h5>
            <IngredientFields ingr={this.state.allInfo.ingr} onChange={this.handleChange}/>
            <div className='add' id='addNewIngr' onClick={this.addIngrLine}>Add Ingredient</div>
          </div>
          
          <div style={detailsStyle}>
            <InstructionFields instr={this.state.allInfo.instr} onChange={this.handleChange} />
            <div className='add' id='addNewInstr' onClick={this.addInstrLine}>Add Step</div>
          </div>
          <RecipeByField onChange={this.handleChange} src={this.state.allInfo.src} />
          <div style={detailsStyle} >
            <button id='saveRecipe' onClick={this.handleSave}>Save Recipe!</button>
          </div>
        </div>
      </div>);
  }
}
//End of add new recipe code


//Code for main page/recipe pages begins here
//Recipe view upon clicking recipe entry tab  
class ViewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.view = this.view.bind(this);
  }
  
  //view() is needed for handleEdit()
  view() {
    //Render the view page
    ReactDOM.render(<ViewRecipe goHome={this.props.goHome} index={this.props.index} />, document.getElementById('stuff'));
  }
  
  handleEdit() {
    //Renders the AddRecipe page to edit stuff, view() handler is passed in so one may view
    //changes upon save
    var editPage = <AddRecipe index={this.props.index} goHome={this.props.goHome} view={this.view} />;
    ReactDOM.render(editPage, document.getElementById('stuff'));
  }
  
  handleDelete() {
    //code to show warning
    
    //Obtain index of recipe and remove it from localStorage array
    var i = this.props.index;
    var currArr = JSON.parse(localStorage.getItem("_saiful_recipes"));
    currArr.splice(i, 1);
    
    //reset localStorage
    localStorage.setItem("_saiful_recipes",  JSON.stringify(currArr));
    
    //go to homepage
    this.props.goHome();
  }
  
  render() {
    //render instructions
    const Instructions = (props) => {
      var jsxArr = props.instr.map(ins => <div>{ins}</div>);
      return <div style={detailsStyle}><h5>Instructions: </h5><div>{jsxArr}</div></div>;
    }

    //renders ingredients
    const Ingredients = (props) => {
      var jsxArr = props.ingr.map(ingred => <div>{ingred[0]+" "+ingred[1]+" "+ingred[2]}</div>);
      return (<div style={detailsStyle}><h5>Ingredients:</h5><div>{jsxArr}</div></div>);         
    }
    
    //Recipe object referenced by index
    var allInfo = JSON.parse(localStorage.getItem("_saiful_recipes"))[this.props.index];
    
    //output JSX
    //Name, Ingredients, Instructions, Source, Delete and Edit buttons
    var out = (<div style={viewRecipeStyle}>
        <div style={recipeHeadingStyle}><h4>{allInfo.name}</h4></div> 
        <Ingredients ingr={allInfo.ingr} />
        <Instructions instr={allInfo.instr} />
        <div style={detailsStyle}>Recipe by: {allInfo.src}</div>
        <button id='editRecipe' onClick={this.handleDelete}>Delete</button>
        <button id='editRecipe' onClick={this.handleEdit}>Edit</button>
      </div>);
    
    return (<div>
        <Header onClick={this.props.goHome}/>
        {out}
      </div>);
  }
}

//Recipe entry tab in main page, gives access to ViewRecipe
class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    //On click,  go to View Recipe page. Pass index so we may reference the recipe
    var out = <ViewRecipe goHome={this.props.goHome} index={this.props.index} />;
    ReactDOM.render(out, document.getElementById('stuff'));
  }
  
  render() {
    var allInfo = JSON.parse(localStorage.getItem("_saiful_recipes"))[this.props.index];
    
    //returns a clickable tab with recipe name
    return <div className='h' style={recipeEntryStyle} onClick={this.handleClick}>{allInfo.name}</div>;
  }
}

//Add new recipe tab in main page
class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.view = this.view.bind(this);
  }
  
  //handler to pass into the add recipe page so we may go to ViewRecipe upon
  //saving
  view() {
    //index to reference the recipe
    var i = JSON.parse(localStorage.getItem('_saiful_recipes')).length - 1;
    //render ViewRecipe with index
    ReactDOM.render(<ViewRecipe goHome={this.props.goHome} index={i} />, document.getElementById('stuff'));
  }
  
  handleClick() {
    //goes to AddRecipe page, pass in view() so we may access ViewRecipe
    ReactDOM.render(<AddRecipe goHome={this.props.goHome} view={this.view}/>, document.getElementById('stuff'));
  }
  
  render() {
    return <div id='hoverable' style={newRecipeStyle} onClick={this.handleClick}>Add new recipe</div>;
  }
}
  
//displays main page, retrieves number of recipes from local storage
class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    
    //initialize no. of recipes
    var recipeArr = JSON.parse(localStorage.getItem("_saiful_recipes"));
    if (!recipeArr){ this.state = { "recipes": 0 }; }
    else { this.state = { "recipes": recipeArr.length }; }
    
    this.goHome = this.goHome.bind(this);
  }
  
  //handler for homepage icon
  goHome() {
    ReactDOM.render(<RecipeList />, document.getElementById('stuff'));
  }
  
  render() {
    //Initialize output array
    var outArray = [];

    for (var i = 0; i < this.state.recipes; i++){
      //Each recipe is referenced by their index in the localStorage array
      //Pass in goHome so the homepage button can work
      var currRecipeJSX = <RecipeEntry index={i} goHome={this.goHome}/>; 
      
      outArray.push(currRecipeJSX);
    }
    
    //Push the add new recipe tab
    outArray.push(<NewRecipe goHome={this.goHome}/>);
    
    return (<div>
        <Header onClick={this.goHome} />
        <div>{outArray}</div>
      </div>);
  }
}

//ocalStorage.removeItem("_saiful_recipes");
ReactDOM.render(<RecipeList />, document.getElementById('stuff'));
