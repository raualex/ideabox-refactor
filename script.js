var bodyInput = $('.idea-body');
var deleteBtn = $('.delete-button');
var editTitle = $('.title-edit');
var editBody = $('.idea-text');
var ideaContainer = $('.idea-container');
var qualityArray = ['swill', 'probable', 'genius'];
var saveBtn = $('.save');
var titleInput = $('.idea-title');

$(window).on('load', retrieveIdea);
saveBtn.on('click', logIdea);

function Idea(constrTitle, constrBody) {
  this.id = Date.now();
  this.title = constrTitle;
  this.body = constrBody;
  this.quality = qualityArray[0]
};

function logIdea(event) {
  event.preventDefault();
  var constrTitle = titleInput.val();
  var constrBody = bodyInput.val();
  var idea = new Idea(constrTitle, constrBody);
  if (titleInput.val().length >= 1 && bodyInput.val().length >= 1) {
    addIdea(idea);
    storeIdea(idea);
  }
  clearInputs();
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
         
          <button type="button" class="vote-button upvote" onclick="vote(event)"></button>
    
          <button type="button" class="vote-button downvote" onclick="vote(event)"></button>
          
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

function vote(event) {
  event.preventDefault();
  var qualityOutput = $(event.target.parentNode).find('.quality-value').get(0)
  var qualityValue = qualityOutput.innerText
  var qualityIndex = qualityArray.indexOf(qualityValue)
  var retrieveIdea = localStorage.getItem($(event.target).parent().data("unid"));
  var parsedIdea = JSON.parse(retrieveIdea);
  if ((event.target).className === 'vote-button upvote') {
   incrementIndex(parsedIdea, qualityOutput, qualityIndex);
  } else {
    deincrementIndex(parsedIdea, qualityOutput, qualityIndex);
  }
};

 function incrementIndex(idea, output, index) {
  if (index !== 2) {
    index++
    $(output).html(qualityArray[index]);
    saveNewQuality(idea, qualityArray[index])
  } else {
    return
  }
};

 function deincrementIndex(idea, output, index) {
  if (index !== 0) {
    index--
    $(output).html(qualityArray[index]);
    saveNewQuality(idea, qualityArray[index])
  } else {
    return
  }
};

function saveNewQuality(idea, index) {
  idea.quality = index;
  var stringIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringIdea);
};
