const Img = document.getElementById('img');
const Fname = document.getElementById('fname');
const Lname = document.getElementById('lname');
const Email = document.getElementById('email');
const Gender = document.getElementById('gender');
const Job = document.getElementById('job');
const Address = document.getElementById('address');
const Btn = document.getElementById('btn');

let loaderWrapper = document.createElement('div');
loaderWrapper.classList.add('loader-wrapper');

let loader = document.createElement('div');
loader.classList.add('loader');
loaderWrapper.appendChild(loader);

function setLoader(){
  document.body.appendChild(loaderWrapper);
}

function removeLoader(){
  document.body.removeChild(loaderWrapper);
}

Btn.addEventListener("click", genUser);

async function getUser(){
  setLoader();
  try{
    let response = await fetch(`https://random-data-api.com/api/users/random_user?size=1`);
    removeLoader();
    let data = response.json();
    console.log(data);
    return data;
  }
  catch(err){
    console.log("Error occured while generating random users", err);
  }
  removeLoader();
}

function setUser(url, fname, lname, email, gender, job, address){
  Img.setAttribute("src", url);
  Fname.innerText = fname;
  Lname.innerText = lname;
  Email.innerText = email;
  Gender.innerText = gender;
  Job.innerText = job;
  Address.innerText = address;
}

async function genUser(){
  getUser().then((data) => {
    const {avatar, first_name, last_name, email, gender, employment, address: addObj} = data[0];

    const job = employment.title;

    const {street_name,street_address,city,state,country,zip_code} = addObj;
    const addList = [street_name,street_address,city,state,country,zip_code];
    const address = addList.join(", ");

    setUser(avatar,first_name,last_name,email,gender,job,address);
  }).catch(err => {
    console.log(err);
  })
}
genUser();



