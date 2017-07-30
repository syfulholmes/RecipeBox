//stylistic elements
//for NewRecipe slot
var newRecipeStyle = {
  paddingTop: 20,
  height: 70,
  width: '60%',
  backgroundColor: '#FFF056',
  margin: 'auto',
  borderStyle: 'solid',
  color: 'black',
  borderWidth: 0,
  webkitBoxShadow: '1px 1px 5px rgba(0,0,0,0.5)',
  fontFamily: 'Oleo Script',
  fontSize: 20,
  marginTop: 10
};

//for Recipe Entry slot
var recipeEntryStyle = {
  paddingTop: 20,
  height: 70,
  width: '60%',
  color: 'black',
  backgroundColor: 'white',
  margin: 'auto',
  webkitBoxShadow: '1px 1px 5px rgba(0,0,0,0.5)',
  fontFamily: 'Oleo Script',
  fontSize: 20
};

//for View Recipe 
var viewRecipeStyle = {
  padding: 20,
  height: '80%',
  width: '60%',
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
  fontFamily: 'Oleo Script'
};
//end of stylistic settings

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
  var out = [<IngredField n={0} qty={""} unit={""} ingr={""} onChange={props.onChange} q={'Qty'} u={'Unit'} i={'Ingredient'} />];
  for (var i = 1; i < ingrArr.length; i++){
    var ingr = ingrArr[i];
    out.push(<IngredField n={i} qty={ingr[0]} unit={ingr[1]} ingr={ingr[2]} onChange={props.onChange} />);
  }
                       
  return <div>{out}</div>;
}

//Instruction fields
const InstructionFields = (props) => {
  var jsxArr = props.instr.map((ins, i) => <div>{i+1+"."} <input className="instr" id={"instr"+i} type='text' name='instructions' onChange={props.onChange} defaultValue={ins}></input></div>);
                               
  return <div><h5>Instructions: </h5><div>{jsxArr}</div></div>;
}

//Recipe By field                               
const RecipeByField = (props) => {
    return <div style={detailsStyle}>Recipe by: <input id="src" type="text" name="src" onChange={props.onChange} defaultValue={props.src} /></div>;
  }
 //End of fields
 
  
//Page to add new recipe info or edit existing, stores all info entered by user
class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    if (props.allInfo == undefined) {
      this.state = { //initialize empty recipe
        allInfo: {
          name: "",
          ingr: [["", "", ""], 
                 ["", "", ""], 
                 ["", "", ""], 
                 ["", "", ""]],
          instr: ["", "", ""],
          src: ""
        } 
      }; 
    } else {
      this.state = { allInfo: props.allInfo };
    }
    this.addIngrLine = this.addIngrLine.bind(this);
    this.addInstrLine = this.addInstrLine.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    var newInfo = this.state.allInfo;
    var id = e.target.id;
    //console.log(e.target.id);
    
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
    
    this.setState({ allInfo: newInfo });
    console.log(this.state.allInfo);

  }
  
  addIngrLine() {
    var shouldAdd = true;
    var ingrArr = this.state.allInfo.ingr;
    for (var i = 0; i < ingrArr.length; i++){
      for (var j = 0; j < 3; j++){
        if (ingrArr[i][j] == ""){shouldAdd = false; break; }
      }
    }
    if (!shouldAdd) { alert("Please fill all fields before adding new ingredient.")}
    else {
      var currIngr = this.state.allInfo.ingr;
      currIngr.push(["", "", ""]);
      var newState = this.state.allInfo;
      newState.ingr = currIngr;
      this.setState({ allInfo: newState });
    }
  }
  
  addInstrLine() {
    var shouldAdd = true;
    var instrArr = this.state.allInfo.instr;
    for (var i = 0; i < instrArr.length; i++){
      if (instrArr[i] == ""){shouldAdd = false; break;}
    }
    if (!shouldAdd) { alert("Please fill all fields before adding new step."); }
    else {
      var currInstr = this.state.allInfo.instr;
      currInstr.push("");
      var newState = this.state.allInfo;
      newState.instr = currInstr;
      this.setState({ allInfo: newState });
    }
  }
  
  render() {
    return (<div>
        <Header onClick={this.props.goHome} />
        <div style={viewRecipeStyle}>
          <RecipeNameField name={this.state.allInfo.name} onChange={this.handleChange}/>
          <div style={detailsStyle}>
            <h5>Ingredients:</h5>
            <IngredientFields ingr={this.state.allInfo.ingr} onChange={this.handleChange}/>
            <div className='add' id='addNewIngr' onClick={this.addIngrLine}>Add ingredient</div>
          </div>
          <div style={detailsStyle}>
            <InstructionFields instr={this.state.allInfo.instr} onChange={this.handleChange} />
            <div className='add' id='addNewInstr' onClick={this.addInstrLine}>Add step</div>
          </div>
          <RecipeByField onChange={this.handleChange} src={this.state.allInfo.src} />
        </div>
      </div>);
  }
}
//End of add new recipe code


//Code for main page/recipe pages begins here
//Recipe view upon clicking recipe entry tab  
class ViewRecipe extends React.Component {
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

    var out = (<div style={viewRecipeStyle}>
        <div style={recipeHeadingStyle}><h4>{this.props.name}</h4></div>
        <Ingredients ingr={this.props.ingr} />
        <Instructions instr={this.props.instr} />
        <div style={detailsStyle}>Recipe by: {this.props.src}</div>
      </div>);
    return (<div>
        <Header onClick={this.props.goHome}/>
        {out}
      </div>);
  }
}

//Recipe entry tab in main page
class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { backColor: 'white'};
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    var name = this.props.allInfo.name;
    var ingr = this.props.allInfo.ingr;
    var instr = this.props.allInfo.instr;
    var src = this.props.allInfo.src;

    var out = <ViewRecipe goHome={this.props.goHome} name={name} ingr={ingr} instr={instr} src={src} />;
    
    ReactDOM.render(out, document.getElementById('stuff'));
  }
  
  handleHover() {
    var backColor = this.state.backColor == 'white' ? '#DFE2DB' : 'white';
    recipeEntryStyle.backgroundColor = backColor;
    this.setState({ backColor: backColor });
  }
  
  render() {
    return <div id='hoverable' style={recipeEntryStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} onClick={this.handleClick}>{this.props.allInfo.name}</div>;
  }
}

//Add new recipe tab
class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'color': '' };
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleHover() {
    var color = newRecipeStyle.backgroundColor == '#FFF056' ? 'white' : '#FFF056';
    newRecipeStyle.backgroundColor = color;
    this.setState({ 'color': color });
  }
  
  handleClick() {
    newRecipeStyle.backgroundColor = '#FFF056';
    ReactDOM.render(<AddRecipe goHome={this.props.goHome}/>, document.getElementById('stuff'));
  }
  
  render() {
    return <div id='hoverable' style={newRecipeStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} onClick={this.handleClick}>Add new recipe</div>;
  }
}

const testRecipe = {
  name: "Asam Pedas Ikan Pari",
  ingr: [["500", "g", "Ikan Pari"], ["2", "cups", "Water"], ["1", "tbsp", "Asam Jawa"]],
  instr: ["Do this.", "Then do that.", "Then finally, do this."],
  src: "My mother"
}

//displays main page, stores all info
class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "recipes": [testRecipe] };
    this.goHome = this.goHome.bind(this);
  }
  
  goHome() {
    ReactDOM.render(<RecipeList />, document.getElementById('stuff'));
  }
  
  render() {
    var outArray = [];
    for (var i = 0; i < this.state.recipes.length; i++){
      var currRecipe = this.state.recipes[i];
      var currRecipeJSX = <RecipeEntry allInfo={currRecipe} goHome={this.goHome}/>;
      outArray.push(currRecipeJSX);
    }
    outArray.push(<NewRecipe goHome={this.goHome}/>);
    
    return (<div>
        <Header onClick={this.goHome} />
        <div>{outArray}</div>
      </div>);
  }
}
  
ReactDOM.render(<RecipeList />, document.getElementById('stuff'));
