particlesJS('particles-js', {
    particles:  {
        "number": {
          "value": 400,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#fff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 10,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 500,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "bottom-right",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 480.4073854628725,
            "rotateY": 720.6110781943087
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "remove"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 4,
            "duration": 0.3,
            "opacity": 1,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
});



let userValue = document.querySelector(".input")
let mainContainer = document.querySelector(".mainContainer")
let userName;
function Main(){
    let promise = fetch(`https://api.github.com/users/${userName}`);
    

    promise.then((response)=>{
        if(response.status !== 200){
            mainContainer.innerHTML="<h2>Saurabh<h2/>"
            throw new Error("No such user found");
        }
        return response.json();
    }).then((responseData)=>{

        mainContainer.innerHTML="";


        const userContainer = document.createElement('div');
        userContainer.classList.add("userContainer");
        mainContainer.appendChild(userContainer);

        const profilePicContainer = document.createElement('div');
        profilePicContainer.classList.add("profilePicCOntainer")
        
        const profilePic = document.createElement('img');
        profilePic.src=responseData.avatar_url;
        profilePic.classList.add('imgConfig');
        profilePicContainer.appendChild(profilePic);

        const profile_Data = document.createElement("div");
        profile_Data.classList.add('profile_Data');

        const profile_name = document.createElement('h1');
        profile_name.innerText=(`${responseData.name}`)
        const profile_username = document.createElement('h4');
        profile_username.innerText=`@${responseData.login}`;
        const creationDate = document.createElement('h5');
        creationDate.innerText = `Joined At ${responseData.created_at}`;
        const bio = document.createElement('p');
        bio.innerText=`${responseData.bio}`

        
        profile_Data.append(profile_name);
        profile_Data.append(profile_username);
        profile_Data.append(creationDate);
        profile_Data.append(bio);
        // profile_Data.innerHTML=`<h1>${responseData.name}<h1/>`;
        

        userContainer.appendChild(profilePicContainer);
        userContainer.appendChild(profile_Data);

        // USER DATA SECTION

        const UserData = document.createElement('div');
        UserData.classList.add('UserData');
        UserData.innerHTML = `<h4>Contains User Data<h4/>`;

        mainContainer.append(UserData);

        // Repo Section

        let repositories = document.createElement("div");
        repositories.classList.add("repositories");
        mainContainer.append(repositories)

        let promiseRepo = fetch(`https://api.github.com/users/${userName}/repos`)

        promiseRepo.then((responsee)=>{
            
            return responsee.json();
        }).then((RepoData)=>{
            let repoContainer = []
            for( repo of RepoData){
                repoContainer.push(repo.name);
            }
            
            // console.log(repoContainer);
            for(let index = 0; index<repoContainer.length; index++ ){
                let repoHolder = document.createElement("div");
                
                let rep0 = document.createElement('img');
                rep0.classList.add("repoConfig");
                rep0.src=`https://github-readme-stats.vercel.app/api/pin/?username=${userName}&repo=${repoContainer[index]}&cache_seconds=86400&theme=gruvbox_light` ;
                
                repoHolder.classList.add("repoHolder");
                repoHolder.appendChild(rep0);
                repositories.append(repoHolder);
            }
    });
})
}


function onClick(){
    userName = userValue.value.trim();
   if(userName==""){
    userName="Saurabh209"
    console.log('DOne');
    Main();
   }else{
    Main();
    console.log('done dpn');
   }
}

const button = document.querySelector(".button");

button.addEventListener("click",onClick);