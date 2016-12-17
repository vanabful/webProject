function updateCard(card){
    const $card = $(`.bottom-container .card[data-item-id=${card.id}]`);
    $card.replaceWith(Mustache.render($("#card-template").html(), card));
}

$(document).ready(function(){  
  dogs.forEach(dog => createAndInsertCard(dog));
  
  function createAndInsertCard(card){
    const cardTemplate = $("#card-template").html();
    const cardHtml = Mustache.render(cardTemplate, card);
    
    $(".bottom-container").append(cardHtml);
  }
  
  $(".bottom-container").on("click", ".card .delete-button", e =>{
    const deleteButton = e.currentTarget;
    if(confirm("Delete?")){
      const $card = $(deleteButton).parent(".card");
      $card.fadeOut(() => $card.remove());
    }
  });
  
  $("#add-newCard-button").on("click", e =>{
    const imagePath = prompt("Enter image path:", "images/labrador1.jpg");
    if(!imagePath) {return;}
    
    const cardTitle = prompt("Enter name of a dog", "Bonko");
    if(!cardTitle) {return;}
    
    createAndInsertCard({
      cardImageURL: imagePath,
      dogName: cardTitle
    });
  });
});