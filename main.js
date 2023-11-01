const header = document.getElementById("header");
const body = document.getElementById("body");



for(let i=65; i<=90; i++){
    let char = String.fromCharCode(i);
    const bold = document.createElement("b");
    bold.innerText = char;
    header.appendChild(bold);
}

function createAndAppendRow(rowNumber){
const row = document.createElement("div");
row.className="row";

for(let i=64; i<=90; i++){
    if(i==64){
        const b = document.createElement("b");
        b.innerText=rowNumber;
        row.appendChild(b);
    }
    else{
        const cell = document.createElement("div");
        cell.id=String.fromCharCode(i)+rowNumber;
        cell.contentEditable = "true";
        cell.addEventListener("focus",onCellFocus);
        row.appendChild(cell);
    }
}
body.appendChild(row);
}


for(let i=1; i<=100; i++){
    createAndAppendRow(i);
}

const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedButton = document.getElementById("underlined");
let activeCell = null;


// const defaultOptionsState ={
//     fontFamily: "",
//     isBoldSelected:false,
//     isItalicSelected:false,
//     isUnderLineSelected:false,
//     textAlign:"left",
//     textColor:"#000",
//     backgroundColor:"#fff",
//     fontSize:14,
// };

// const activeOptionsState ={
//     fontFamily: "",
//     isBoldSelected:false,
//     isItalicSelected:false,
//     isUnderLineSelected:false,
//     textAlign:"left",
//     textColor:"#000",
//     backgroundColor:"#fff",
//     fontSize:14,
// };

let activeOptionsState;


function toggleButtonStyle(button, isSelected){
    if(isSelected){
        button.classList.add("active-option");
    }
    else{
        button.classList.remove("active-option");
    }
}

function highLightOptionButtonsOnFocus(){

    toggleButtonStyle(boldButton, activeOptionsState.isBoldSelected);
    
    // if(activeOptionsState.isBoldSelected){
    //         boldButton.classList.add("active-option");
    //     }
    //     else{
    //         boldButton.classList.remove("active-option");
    //     }
    toggleButtonStyle(italicButton,activeOptionsState.isBoldSelected);
    
    // if(activeOptionsState.isItalicSelected){
    //         italicButton.classList.add("active-option");
    //     }
    //     else{
    //         italicButton.classList.remove("active-option");
    //     }

    toggleButtonStyle(underlinedButton,activeOptionsState.isUnderLineSelected);
        // if(activeOptionsState.isUnderLineSelected){
        //     underlinedButton.classList.add("active-option");
        // }
        // else{
        //     underlinedButton.classList.remove("active-option");
        // }
        highlightTextAlignButtons(activeOptionsState.textAlign);
    }


function onCellFocus(e){

    if(activeCell && activeCell.id ===e.target.id){
        return;
    }
    activeCell=e.target;
    activeCellElement.innerText=e.target.id;
    const computedStyle = getComputedStyle(activeCell);

    activeOptionsState ={
        fontFamily: computedStyle.fontFamily,
        isBoldSelected: computedStyle.fontWeight==="600",
        isItalicSelected: computedStyle.fontStyle==="italic",
        isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
        textAlign: computedStyle.textAlign,
        textColor: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        fontSize: computedStyle.fontSize,
    };
}


function onClickBold(boldButton){
    boldButton.classList.toggle("active-option");
    if(activeCell){
        // activeOptionsState
        if(activeOptionsState.isBoldSelected===false){
            activeCell.style.fontWeight="600";
            // activeOptionsState.isBoldSelected=true;
        }
        else{
            activeCell.style.fontWeight="400";
            // activeOptionsState.isBoldSelected=false;
        }
        activeOptionsState.isBoldSelected=!activeOptionsState.isBoldSelected;
    }
}



function onClickItalic(italicButton){
    italicButton.classList.toggle("active-option");
    if(activeCell){
        if(activeOptionsState.isItalicSelected){
            activeCell.style.fontStyle="normal";
            // activeOptionsState.isItalicSelected=false;
        }
        else{
            activeCell.style.fontStyle="italic";
            // activeOptionsState.isItalicSelected=true;
        }
        activeOptionsState.isItalicSelected=!activeOptionsState.isItalicSelected;
    }
}


function onClickUnderline(underlinedButton){
    underlinedButton.classList.toggle("active-option");
    if(activeCell){
        if(activeOptionsState.isUnderLineSelected){
            activeCell.style.textDecoration="none";
        }
        else{
            activeCell.style.textDecoration="underline";
        }
        activeOptionsState.isUnderLineSelected=!activeOptionsState.isUnderLineSelected;
    }
}



function highlightTextAlignButtons(textAlignValue){
    // const textAlignElements = document.getElementsByClassName("text-align");

    for(let i=0; i<textAlignElements.length; i++){
        if(textAlignElements[i].getAttribute("data-value")=== textAlignValue){
            textAlignElements[i].classList.add("active-option");
        }
        else{
            textAlignElements[i].classList.remove("active-option");
        }
    }
}


function onClickTextAlign(textAlignButton){
    let selectedValue = textAlignButton.getAttribute("data-value");
    highlightTextAlignButtons(selectedValue);

    if(activeCell){
        activeCell.style.textAlign = selectedValue;
        activeOptionsState.textAlign= selectedValue;
    }
}


function onChangeTextColor(textColorInput){
    let selectedColor = textColorInput.value;
    if(activeCell){
        activeCell.style.color=selectedColor;
        activeOptionsState.color=selectedColor;
    }
}

function onChangeBackgroundColor(textColorInput){
    let selectedColor = textColorInput.value;
    if(activeCell){
        activeCell.style.backgroundColor=selectedColor;
        activeOptionsState.backgroundColor=selectedColor;
    }
}

// lectur 2 done.

