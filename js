//stylistic elements

//for NewRecipe slot
var newRecipeStyle = {
  paddingTop: 20,
  height: 70,
  width: '80%',
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
  width: '80%',
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
  height: '60%',
  width: '80%',
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

class ViewRecipe extends React.Component {
  render() {
    var out = (<div style={viewRecipeStyle}>
        <div style={detailsStyle}><h4>{this.props.name}</h4></div>
        <Ingredients ingr={this.props.ingr} />
        <Instructions instr={this.props.instr} />
      </div>);
    return out;
  }
}

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

    var out = <ViewRecipe name={name} ingr={ingr} instr={instr} src={src}/>;
    //var out = <h1>Hi</h1>;
    
    ReactDOM.render(out, document.getElementById('stuff'));
  }
  
  handleHover() {
    var backColor = this.state.backColor == 'white' ? '#DFE2DB' : 'white';
    recipeEntryStyle.backgroundColor = backColor;
    this.setState({ backColor: backColor });
  }
  
  render() {
    return <div style={recipeEntryStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} onClick={this.handleClick}>{this.props.allInfo.name}</div>;
  }
}
//name, ingr, instr, src

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'color': '' };
    this.handleHover = this.handleHover.bind(this);
  }
  
  handleHover() {
    var color = newRecipeStyle.backgroundColor == '#FFF056' ? 'white' : '#FFF056';
    newRecipeStyle.backgroundColor = color;
    this.setState({ 'color': color });
  }
  
  handleClick() {
    //Go to page for recipe insertion
  }
  
  render() {
    return <div style={newRecipeStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>Add new recipe</div>;
  }
}

const testRecipe = {
  name: "Asam Pedas Ikan Pari",
  ingr: [["500", "g", "Ikan Pari"], ["2", "cups", "Water"]],
  instr: ["Do this.", "Then do that."],
  src: "My mother."
}

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "recipes": [testRecipe] };
  }
  
  render() {
    var outArray = [];
    for (var i = 0; i < this.state.recipes.length; i++){
      var currRecipe = this.state.recipes[i];
      var currRecipeJSX = <RecipeEntry allInfo={currRecipe}/>;
      outArray.push(currRecipeJSX);
    }
    outArray.push(<NewRecipe />);
    return <div>{outArray}</div>;
  }
}
//name, ingr, instr, src
ReactDOM.render(<RecipeList />, document.getElementById('stuff'));
