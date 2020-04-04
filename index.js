let data = require('./data-base.json');

function formatNumber(num) {
    return Number.parseInt(num * 10000) / 10000;
}

function populate(data) {
    const  result = { ...data };

    result.symptoms = data.symptoms.map(symptom => {
        return {
            a: symptom.a,
            b: symptom.b,
            c: data.n1 - symptom.a,
            d: data.n2 - symptom.b,
        };
    });

    return result;
}

function calculateTruth(data) {
    const  result = { ...data };

    result.symptoms = data.symptoms.map(symptom => {
        return {
            ...symptom,
            P1: symptom.a / data.n1,
            P2: symptom.b / data.n2,
            P3: symptom.c / data.n1,
            P4: symptom.d / data.n2
        };
    });

    return result;
}

function apriori(data) {
    const  result = { ...data, oH: data.n1 / data.n2 };


    return result;
}

function calculateEnough(data) {
    const  result = { ...data };

    result.symptoms = data.symptoms.map(symptom => {
        return {
            ...symptom,
            D: symptom.P1 / symptom.P2
        };
    });

    return result;
}

function calculateNeed(data) {
    const  result = { ...data };

    result.symptoms = data.symptoms.map(symptom => {
        return {
            ...symptom,
            N: symptom.P3 / symptom.P4
        };
    });

    return result;
}

function ifAllTrue(data) {
    const minD = Math.min.apply(Math, data.symptoms.map(s => s.D));
    const minN = Math.min.apply(Math, data.symptoms.map(s => s.N));

    const  result = {
        ...data,
        ifTrue: data.oH * minD,
        ifFalse: data.oH * minN,
    };

    return result;
}


data = populate(data);
data = apriori(data);
data = calculateTruth(data);
data = calculateEnough(data);
data = calculateNeed(data);
data = ifAllTrue(data);

const formattedData = {
    ...data,
    symptoms: data.symptoms.map(symptom => {
        return {
            P1: formatNumber(symptom.P1),
            P2: formatNumber(symptom.P2),
            P3: formatNumber(symptom.P3),
            P4: formatNumber(symptom.P4),
            D: formatNumber(symptom.D),
            N: formatNumber(symptom.N),
        }
    })
}

console.log('O(H):', formatNumber(data.oH));
console.log('True:', formatNumber(data.ifTrue));
console.log('False:', formatNumber(data.ifFalse));
console.table(formattedData.symptoms);
git