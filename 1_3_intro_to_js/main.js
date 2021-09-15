const label = document.getElementById("label");
const input = document.getElementById("name-input");
const submit = document.getElementById("name-submit");

var age = 0;

const nameInfo = {
    name: "",
    age: "0",
}

function updateName() {
    nameInfo.name = input.value;
    label.innerText = "Thank you, " + nameInfo.name + ". Made a mistake? Change your name here:";
    submit.innerText = "Change"
    updateInfo()
}

function increaseAge() {
    age += 1
    nameInfo.age = age;
    updateInfo()
}

function decreaseAge() {
    age -= 1
    nameInfo.age = age;
    updateInfo()
}

function updateInfo(){
    document.getElementById("printInfo").innerHTML= "Your Name: " + nameInfo.name + "<br/> Age:" + nameInfo.age
}
