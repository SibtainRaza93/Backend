const validator = require("validator")
function validUser(data){
const mandatoryField = ["firstName", "emailId", "password"];

const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

if(!IsAllowed){
    throw new Error("Fields are missing")
}
//Password
if(!validator.isEmail(data.emailId)){
    throw new Error("Email are not correct");
}
if(!validator.isStrongPassword(data.password)){
    throw new Error("Password week please make strong")
}

}

module.exports = validUser;