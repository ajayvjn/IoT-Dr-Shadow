// Sample Lambda code to setup Alexa.

var https = require('https');

/**
 * 
 * 
 * @param {any} event 
 * @param {any} context 
 */
exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        switch (event.request.type) {
            case "LaunchRequest":
                console.log("LAUNCH REQUEST");
                break;
            case "IntentRequest":
                console.log("INTENT REQUEST");
                switch (event.request.intent.name) {
                    case "GetHealthProblem":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Hi. You are doing fine today. Your heart rate is 80 beats per minute, blood pressure is 120 by 80 and body temprature is 98.6 degrees Fahrenheit. Have a great day`, true),
                                {}
                            )
                        );
                        break;
                    case "GetHeartRate":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Your vital stats are not normal. Do you want me to consult a doctor for you? I can book an appointment for you and send your medical history to your nearest hospital.`, true),
                                {}
                            )
                        );
                        break;
                    default:
                        context.fall('INVALID INTENT NAME: ${event.request.intent.name}')

                }
                break;
            case "SessionEndedRequest":
                console.log("SESSION ENDED REQUEST");
                break;
            default:
                context.fall('INVALID REQUEST TYPE: ${event.request.type}')
        }


    } catch (error) { context.fail(`Exception: ${error}`) }
};

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
}