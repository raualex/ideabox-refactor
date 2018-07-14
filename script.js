var titleInput = $('.idea-title');
var bodyInput = $('.idea-body');
var saveBtn = $('.save');
var deleteBtn = $('.delete-button');
var ideaContainer = $('.idea-container');
var qualityArray = ['swill', 'probable', 'genius'];
var qualityOutput = $('.quality-value');


function addIdea() {
  var ideaCard = `<article role="article" aria-label="Saved Idea Card">
    
          <h2>${titleInput.val()}</h2>
          
          <button type="button" class="delete-button" onclick="deleteIdea(event)"></button>

          <p class="idea-text">${bodyInput.val()}</p>
         
          <button type="button" class="vote-button upvote" onclick="upvote(event)"></button>
    
          <button type="button" class="vote-button downvote" onclick="downvote(event)"></button>
          
          <div>

          <p class="quality">quality:</p>

          <p class="quality-value" id="qv">swill</p>
          
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
  console.log($('#qv').val());
};

function downvote(event) {
  event.preventDefault();

};

saveBtn.on('click', function(event) {
  event.preventDefault();
  addIdea();
  clearInputs();
});










