Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Converts from degrees to radians.
Math.toRadians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
};

// Converts from radians to degrees.
Math.getAngle = function(pointOne, pointTwo) {
    var deltaY = pointTwo.y - pointOne.y;
    var deltaX = pointTwo.x - pointOne.x;

    return Math.atan2(deltaY, deltaX);
};

module.exports = {
    math: {
        //This function generates floating-point between two numbers low (inclusive) and high (exclusive)([low, high))
        random: function random(low, high) {
            return Math.random() * (high - low) + low;
        },
        //This function generates random integer between two numbers low (inclusive) and high (exclusive) ([low, high))
        randomInt: function(low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        },
        //This function generates random integer between two numbers low (inclusive) and high (inclusive) ([low, high])
        randomIntInc: function(low, high) {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }
    },
    time: {
        getDateTimeText: function() {
            var date = new Date();

            var hour = date.getHours();
            hour = (hour < 10 ? "0" : "") + hour;

            var min = date.getMinutes();
            min = (min < 10 ? "0" : "") + min;

            var sec = date.getSeconds();
            sec = (sec < 10 ? "0" : "") + sec;

            var year = date.getFullYear();

            var month = date.getMonth() + 1;
            month = (month < 10 ? "0" : "") + month;

            var day = date.getDate();
            day = (day < 10 ? "0" : "") + day;

            return year + "." + month + "." + day + " " + hour + ":" + min + ":" + sec;
        }
    },
    timerMechanics: {
        executeAfterSeconds: function(seconds, executeFunction) {
            if (executeFunction != null) {
                setTimeout(function() {
                    executeFunction();
                }, seconds * 1000);
            }
        },
        executeByIntervalFromSeconds: function(serverProcessFrequency, totalElapsedTimeFromSeconds, frequency, functionToProcess) {
            var mod = totalElapsedTimeFromSeconds % frequency;
            if (functionToProcess != null && mod < serverProcessFrequency) {
                functionToProcess();
            }
        }
    }
};