var titleInput = $('.idea-title');
var bodyInput = $('.idea-body');
var saveBtn = $('.save');
var deleteBtn = $('.delete-button');
var ideaContainer = $('.idea-container');
var qualityArray = ['swill', 'probable', 'genius'];

saveBtn.on('click', function(event) {
  event.preventDefault();
  var constrTitle = titleInput.val();
  var constrBody = bodyInput.val();
  var idea = new Idea(constrTitle, constrBody);
  addIdea(idea);
  clearInputs();
  storeIdea(idea);
});

// $(window).on('load', retrieveIdea);

function Idea(constrTitle, constrBody) {
  this.id = Date.now();
  this.title = constrTitle;
  this.body = constrBody;
  this.quality = qualityArray[0]
  console.log(this.id, this.title, this.body, this.quality);
}

function storeIdea(idea) {
  var ideaToStore = idea;
  var stringifiedIdea = JSON.stringify(ideaToStore);
  localStorage.setItem(ideaToStore.id, stringifiedIdea);
};

// function retrieveIdea() {
//   for (var i = 0; i < localStorage.length; i++) {
//    var retrievedIdea = localStorage.getItem(localStorage.key(i));
//    var parsedIdea = JSON.parse(retrievedIdea);
//    addIdea(parsedIdea.title); 
//   }
// };

function addIdea(idea) {
  var ideaCard = `<article role="article" aria-label="Saved Idea Card" data-unid="${idea.id}">
    
          <h2 contenteditable='true'>${idea.title}</h2>
          
          <button type="button" class="delete-button" onclick="deleteIdea(event)"></button>

          <p class="idea-text" contenteditable='true'>${idea.body}</p>
         
          <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
    
          <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
          
          <div>

          <p class="quality">quality:</p>

          <p class="quality-value">${idea.quality}</p>
          
          </div>

        </article>`

      if (titleInput.val().length < 1 || bodyInput.val().length < 1) {
    
  } else ideaContainer.append(ideaCard);
}

 function deleteIdea(event) {
  event.preventDefault();
  var ideaTarget = event.target.parentNode;
  var ideaD = $(event.target).parent().data("unid")
  ideaTarget.parentNode.removeChild(ideaTarget);
  localStorage.removeItem(ideaD);
};

function clearInputs() {
  titleInput.val('');
  bodyInput.val('');
};

function upvote(event) {
  event.preventDefault();
 var qualityOutput = $(event.target.parentNode).find('.quality-value').get(0)
 var swillU = qualityArray[0];
 var probableU = qualityArray[1];
 var geniusU = qualityArray[2];
 
 if ($(qualityOutput).html() == swillU) {
  $(qualityOutput).html(probableU);
 } else if ($(qualityOutput).html() == probableU) {
  $(qualityOutput).html(geniusU);
 }
};

function downvote(event) {
  event.preventDefault();
 var qualityOutput = $(event.target.parentNode).find('.quality-value').get(0)
 var swillD = qualityArray[0];
 var probableD = qualityArray[1];
 var geniusD = qualityArray[2];

 if ($(qualityOutput).html() == geniusD) {
  $(qualityOutput).html(probableD);
 } else if ($(qualityOutput).html() == probableD) {
  $(qualityOutput).html(swillD);
 } 
};












