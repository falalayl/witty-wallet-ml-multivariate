var fs = require('fs');
var csv = require('fast-csv');
var path = require('path');

//const SLR = require('ml-regression').SLR;
const MLR = require('ml-regression-multivariate-linear');

var link = path.join(__dirname, './asd.csv');

let X = [];
let y = [];
let regressionModel;

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var x = fs.createReadStream(link);

function readCSV(stream) {
    csv
        .fromStream(stream, {
            headers: true,
            ignoreEmpty: true
        })
        .on('data', function (data) {
            X.push([parseFloat(data['TV']), parseFloat(data['radio'])]);
            y.push([parseFloat(data['sales'])]);
            // console.log(data);
        })
        .on('end', function () {
            /*console.log('+++++++++++++++ENDED+++++++++++++++');
            console.log('X Data: ', x);
            console.log('Y Data: ', y);
            performRegression();*/
            //console.log(X)

            performRegression();
        });
};

readCSV(x);

function performRegression(){
    regressionModel = new MLR(X, y);
    predictOutput();
}


function predictOutput(){
    let pred = [];
    
    rl.question('Enter X for prediction: ', (answer1) => {
        rl.question('Enter second value of X for prediction: ', (answer2) => {
            pred.push(parseFloat(answer1), parseFloat(answer2));
            console.log(pred);
            console.log(regressionModel.predict(pred));

            predictOutput();
        });
        
    });
    //rl.close();
    
    
    //console.log(regressionModel.predict([a, b]));
    
    //predictOutput();
}