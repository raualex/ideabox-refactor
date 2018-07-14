var titleInput = $('.idea-title');
var bodyInput = $('.idea-body');
var saveBtn = $('.save');
var deleteBtn = $('.delete-button');
var ideaContainer = $('.idea-container');


function addIdea() {
  var ideaCard = `<article role="article" aria-label="Saved Idea Card">
    
          <h2>${titleInput.val()}</h2>
          
          <input type="image" src="delete.svg" alt="Delete Button" class="delete-button" onclick="deleteIdea(event)">
    
          <p class="idea-text">${bodyInput.val()}</p>
    
          <input type="image" src="upvote.svg" alt="Upvote Button" class="vote-button">
    
          <input type="image" src="downvote.svg" alt="Downvote Button" class="vote-button">
    
          <p class="quality">quality:</p>

          <p class="quality-value">swill</p>
   
        </article>`

      if (titleInput.val().length < 1 || bodyInput.val().length < 1) {
    
  } else ideaContainer.append(ideaCard);
}

 function deleteIdea(event) {
  event.preventDefault();
  var ideaTarget = event.target.parentNode;
  ideaTarget.parentNode.removeChild(ideaTarget);
};

function clearInputs() {
  titleInput.val('');
  bodyInput.val('');
};

saveBtn.on('click', function(event) {
  event.preventDefault();
  addIdea();
  clearInputs();
});

// testing hover functionality

$('img.delete-button')
 .mouseenter(function() {
  console.log('enter');
    $(this).attr('src','delete-hover.svg');
  });

$('img.delete-button')
 .mouseleave(function() {
  console.log('leave');
  $(this).attr('src','delete.svg');
 });

 //  $("#delete-button").on({
 //   mouseenter: function(){

 // $(this).attr('src','delete-hover.svg');
 //  },
 //  mouseleave: function(){

 // $(this).attr('src','delete.svg');
 //  }
 //  });







