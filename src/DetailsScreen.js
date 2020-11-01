import React, { Component } from 'react'
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';



class DetailsScreen extends React.Component {
    constructor(props) {
        super() 
        this.state = {

        }
    }

    savePDF() {

        // const input = document.getElementById('print-wrapper');
        // const pdf = new jsPDF("1", "mm", "A4");
        // if (pdf) {
        // html2canvas(input, {
        //     useCORS: true
        // })
        // .then(canvas => {
        //     const imgData = canvas.toDataURL('image/png');

        //     var width = pdf.internal.pageSize.getWidth();
        //     var height = pdf.internal.pageSize.getHeight();     

        //     console.log(imgData); //Maybe blank, maybe full image, maybe half of image
        //     pdf.addImage(imgData, 'PNG', 0, 0);
        //     pdf.save('newCharacter.pdf');
        // });

        // }

        const input = document.getElementById('print-wrapper');
            const pdf = new jsPDF('1', 'mm', [158.75, 158.75]);
            if (pdf) {
              domtoimage.toPng(input)
                .then(imgData => {
                  pdf.addImage(imgData, 'PNG', 0, 0);
                  pdf.save('download.pdf');
                });
            }
    }

    render() {
        


        return (

            <div id="print-wrapper">

            <h3>BUTTON EXPRIMENTS</h3>

            <button onClick={this.savePDF}>IMAGE PDF</button>

            
            <h3 className="header-default">Character Details</h3>

            </div>
            )


    }
}

export default DetailsScreen