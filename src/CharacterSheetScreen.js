import React from 'react'
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';



class CharacterSheetScreen extends React.Component {
    constructor(props) {
        super() 
        this.state = {
            characterScreen: "hahaha"

        }
    }

    savePDF = () => {

        const input = document.getElementById('print-wrapper');
            const pdf = new jsPDF('1', 'mm', [158.75, 158.75]);
            if (pdf) {
              domtoimage.toPng(input)
                .then(imgData => {
                  pdf.addImage(imgData, 'PNG', 0, 0);
                  pdf.save('download.pdf');
                });
            }
        };

    render()    {

        return (

            <div className="character-sheet-con">

            <h3 className="header-default">Character Sheet</h3>

            </div>

        )
    }

}

export default CharacterSheetScreen
