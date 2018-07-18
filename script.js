var bodyInput = $('.idea-body');
var deleteBtn = $('.delete-button');
var editTitle = $('.title-edit');
var editBody = $('.idea-text');
var ideaContainer = $('.idea-container');
var qualityArray = ['swill', 'probable', 'genius'];
var saveBtn = $('.save');
var titleInput = $('.idea-title');

$(window).on('load', retrieveIdea);

saveBtn.on('click', function(event) {
  event.preventDefault();
  var constrTitle = titleInput.val();
  var constrBody = bodyInput.val();
  var idea = new Idea(constrTitle, constrBody);
  addIdea(idea);
  if (titleInput.val().length >= 1 && bodyInput.val().length >= 1) {
    storeIdea(idea);
  }
  clearInputs();
});

function Idea(constrTitle, constrBody) {
  this.id = Date.now();
  this.title = constrTitle;
  this.body = constrBody;
  this.quality = qualityArray[0]
};

function storeIdea(idea) {
  var ideaToStore = idea;
  var stringifiedIdea = JSON.stringify(ideaToStore);
  localStorage.setItem(ideaToStore.id, stringifiedIdea);
};

function retrieveIdea() {
  for (var i = 0; i < localStorage.length; i++) {
   var retrievedIdea = localStorage.getItem(localStorage.key(i));
   var parsedIdea = JSON.parse(retrievedIdea);
   addIdea(parsedIdea, true); 
  };
};

function addIdea(idea, onload) {
  var ideaCard = `<article role="article" aria-label="Saved Idea Card" class="parentIdeaCard" data-unid="${idea.id}">
    
          <h2 class="title-edit" contenteditable='true'>${idea.title}</h2>
          
          <button type="button" class="delete-button" onclick="deleteIdea(event)"></button>

          <p class="idea-text" contenteditable='true'>${idea.body}</p>
         
          <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
    
          <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
          
          <div>

          <p class="quality">quality:</p>

          <p class="quality-value">${idea.quality}</p>
          
          </div>

        </article>`

  if ((titleInput.val().length >= 1 && bodyInput.val().length >= 1) || onload) {
    ideaContainer.append(ideaCard)
  };
};

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
  var retrieveIdeaUp = localStorage.getItem($(event.target).parent().data("unid"));
  var parsedIdeaUp = JSON.parse(retrieveIdeaUp);
 
 if ($(qualityOutput).html() == swillU) {
   $(qualityOutput).html(probableU);
   parsedIdeaUp.quality = probableU;
 } else if ($(qualityOutput).html() == probableU) {
   $(qualityOutput).html(geniusU);
   parsedIdeaUp.quality = geniusU;
 }
   
  var ideaUp = parsedIdeaUp
  var stringIdeaUp = JSON.stringify(ideaUp);
  localStorage.setItem(ideaUp.id, stringIdeaUp);
};

function downvote(event) {
  event.preventDefault();
  var qualityOutput = $(event.target.parentNode).find('.quality-value').get(0)
  var swillD = qualityArray[0];
  var probableD = qualityArray[1];
  var geniusD = qualityArray[2];
  var retrieveIdeaDown = localStorage.getItem($(event.target).parent().data("unid"));
  var parsedIdeaDown = JSON.parse(retrieveIdeaDown);

 if ($(qualityOutput).html() == geniusD) {
  $(qualityOutput).html(probableD);
  parsedIdeaDown.quality = probableD;
 } else if ($(qualityOutput).html() == probableD) {
  $(qualityOutput).html(swillD);
  parsedIdeaDown.quality = swillD;
 } 

  var ideaDown = parsedIdeaDown
  var stringIdeaDown = JSON.stringify(ideaDown);
  localStorage.setItem(ideaDown.id, stringIdeaDown);
};

