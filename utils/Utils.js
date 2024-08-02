//------------------------- IMPORT -------------------------
import axios from 'axios';
import _ from 'lodash';

//------------------------- CONSTANT -------------------------
const epsilon = 0.0000001;

//------------------------- FUNCTIONS -------------------------
//-------------------------
export function isEqualWithEpsilon(a, b, isEpsilonUsed = true) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("function isEqualWithEpsilon(a, b, isEpsilonUsed): a or b is not a number");
    }

    if (isEpsilonUsed) {
        return Math.abs(a - b) < epsilon;
    } else {
        return a === b;
    }
}

//-------------------------
export function multiTenOfDecimal(percentageList) {
    let result = 1;

    for (const number of percentageList) {
        if (number !== 0 && !isEqualWithEpsilon(number * result, Math.floor(number * result))) {
            do {
                result *= 10;
            } while (!isEqualWithEpsilon(number * result, Math.floor(number * result)));
        }
    }
    return result;
}

export function roundUpDecimal(inputNumber, roundUp = 3) {
    return Math.round(inputNumber * Math.pow(10, roundUp)) / Math.pow(10, roundUp);
}

//-------------------------
export function sumOfArray(inputArray) {
    return inputArray.reduce((sum, data) => sum + data);
}

export function shuffleArray(inputArray) {
    for (let i = inputArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
    }

    return inputArray;
}

//-------------------------
export function radiansOfCircle() {
    return 2 * Math.PI;
}

export function convertRadiansToDegree(radian) {
    return radian * (180 / Math.PI);
}

export function convertDegreeToRadians(degree) {
    return (degree / 180) * Math.PI;
}

//-------------------------
export function createBlobFromUrl(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.blob();
            })
            .then(blob => {
                resolve(blob);
            })
            .catch(error => {
                console.error('Failed to load blob', error);
                reject(error);
            });
    });
}

export async function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export function createBase64FromSource(source) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!source.includes(';base64,')) {
                if (source.startsWith("public/")) {
                    source = source.substring("public/".length);
                }
                console.log("***** Source: " + source);
                const blob = await createBlobFromUrl(source);
                const base64 = await convertBlobToBase64(blob);
                console.log("***** Base64: " + base64);
                resolve(base64);
            } else {
                console.log("***** Base64: " + source);
                resolve(source);
            }
        } catch (error) {
            console.error('Failed to convert', error);
            reject(error);
        }
    });
}

//-------------------------
export async function fetchDataFromApi(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Error ${error.response.status}: ${error.response.statusText}`);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error in request setup:', error.message);
        }
        console.error('Error config:', error.config);

        throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
}

//-------------------------
export function isPressed(beginTouchTime, endTouchTime) {
    if (Math.abs(endTouchTime - beginTouchTime) >= 500) {
        return false;
    } else {
        return true;
    }
}