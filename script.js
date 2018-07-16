var titleInput = $('.idea-title');
var bodyInput = $('.idea-body');
var saveBtn = $('.save');
var deleteBtn = $('.delete-button');
var ideaContainer = $('.idea-container');
var qualityArray = ['swill', 'probable', 'genius'];


function Idea(title, body, quality) {
  $(this).title = title;
  $(this).body = body;
  if (quality === undefined) {
    $(this).quality = 'swill'
  } else $(this).quality = quality
}

function addIdea() {
  var ideaCard = `<article role="article" aria-label="Saved Idea Card">
    
          <h2 contenteditable='true'>${titleInput.val()}</h2>
          
          <button type="button" class="delete-button" onclick="deleteIdea(event)"></button>

          <p class="idea-text" contenteditable='true'>${bodyInput.val()}</p>
         
          <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
    
          <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
          
          <div>

          <p class="quality">quality:</p>

          <p class="quality-value">${qualityArray[0]}</p>
          
          </div>

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

saveBtn.on('click', function(event) {
  event.preventDefault();
  addIdea();
  clearInputs();
});










