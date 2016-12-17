$(document).ready(function(){
  
    let currentDog;

    dogs.forEach(dog => {
      const image = new Image();
      image.src = dog.mainImageURL;
    });

    createAndInsertDog(dogs[0]);

   function createAndInsertDog(dog){
      const sliderTemplate = $("#slider-template").html();
      const sliderHtml = Mustache.render(sliderTemplate, dog);
      const $slider = $(sliderHtml);

      $("#main-content-container").empty().append($slider);
      selectStar(dog.grade);

      currentDog = dog;
    }


    $(".bottom-container .card .more-button").click(function(){
       const $card = $(this).parent();
       const index = $(".bottom-container .card").index($card);

       createAndInsertDog(dogs[index]);

    });

   const $slides=$(".bottom-container > .card");

   $(".main-container").on("click", "#edit-button", e =>{

      const nameOfDog = prompt("Enter name of the dog:", currentDog.dogName);
      if(!nameOfDog) {return;}
      const dogGender = prompt("Enter gender of the dog:", currentDog.gender);
      if(!dogGender) {return;}
      const dogBreed = prompt("Enter breed of the dog:", currentDog.breed);
      if(!dogBreed) {return;}
      const dogBirth = prompt("Enter birth of the dog:", currentDog.dateOfBirth);
      if(!dogBirth) {return;}
      const dogDescription = prompt("Enter birth of the dog:", currentDog.description);
      if(!dogDescription) {return;}

      currentDog.dogName = nameOfDog;
      currentDog.gender = dogGender;
      currentDog.breed = dogBreed;
      currentDog.dateOfBirth = dogBirth;
      currentDog.description = dogDescription;

     createAndInsertDog(currentDog);
     updateCard(currentDog);

    });

     $(".main-container").on("click",".right", (e)=>{
        let currentindex = dogs.indexOf(currentDog);

        currentindex++;

        if(currentindex >= dogs.length)
            { currentindex = 0;}

         createAndInsertDog(dogs[currentindex]);
      });

      $(".main-container").on("click", ".left", e =>{
          let currentindex = dogs.indexOf(currentDog);

          currentindex--;

          if(currentindex < 0)
              { currentindex = dogs.length - 1; }

          createAndInsertDog(dogs[currentindex]);
      });

    $(".main-container").on("click", ".stars-container .star-icon", e => {
      const $star = $(e.currentTarget);
      const $stars = $star.parents(".main-container").find(".star-icon");
      const index = $stars.index($star);

      currentDog.grade = index + 1;

      $stars.removeClass("selected-star");

      selectStar(currentDog.grade);

     });

  function selectStar(starNumber){
      const $stars = $(".main-container .stars-container .star-icon");
      for(let i = 0; i < starNumber; i++){
        $stars.eq(i).addClass("selected-star");
      }
    }

  });
  