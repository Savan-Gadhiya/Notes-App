console.log('This is a magic notes');

// Initalized Or Declared all value before program start 
let AddBtn = document.getElementById('addBtn');
AddBtn.addEventListener('click',SaveNotes);

let notesTitleFromLocal = localStorage.getItem('NoteTitle');
let notesTextFromLocal = localStorage.getItem('NoteText');
let noteTitleFromHTML = document.getElementById('NoteTitle');
let noteTextFromHTML = document.getElementById('NoteTxt');

let noteTitleObj;
let noteTextObj;

// Display Note when page referash
ShowNotes();
// IF click on addnote btn than onclick event occ
function SaveNotes(){
    noteTitleFromHTML = document.getElementById('NoteTitle');
    noteTextFromHTML = document.getElementById('NoteTxt');

    if(noteTitleFromHTML.value.length ==0 || noteTextFromHTML.value.length==0){
        let html = `<div class="alert alert-danger"     role="alert" id = 'AlertBox'>
                Title and Note Both are Need to add note!
            </div>`
        let ele = document.getElementsByClassName('ForAlert')[0];
        ele.innerHTML = html;
        let AlertBox = document.getElementById('AlertBox');
        // Title per click kare tayare alert Box remove karava
        noteTitleFromHTML.addEventListener('focus',function(){
            AlertBox.style.display = 'none';
        });
    }
    else{
        if(notesTitleFromLocal == null && notesTextFromLocal==null){
            noteTitleObj=[];noteTextObj = [];
        }
        else{
            noteTitleObj = JSON.parse(notesTitleFromLocal);
            noteTextObj = JSON.parse(notesTextFromLocal);
        }
        
        noteTitleObj.push(noteTitleFromHTML.value);
        noteTextObj.push(noteTextFromHTML.value);
        localStorage.setItem('NoteTitle',JSON.stringify(noteTitleObj));
        localStorage.setItem('NoteText',JSON.stringify(noteTextObj));
        noteTitleFromHTML.value = "";// when note add then clear a title and note file
        noteTextFromHTML.value = "";
        ShowNotes();
    }
}

// Funcation that shows a note

function ShowNotes(){
    let html="";
    let AddNotesSelect = document.getElementById('notes');
    notesTitleFromLocal = localStorage.getItem('NoteTitle');
    notesTextFromLocal = localStorage.getItem('NoteText');
    if(notesTitleFromLocal == null && notesTextFromLocal==null){
        noteTitleObj=[];noteTextObj = [];
    }
    else{
        noteTitleObj = JSON.parse(notesTitleFromLocal);
        noteTextObj = JSON.parse(notesTextFromLocal);
    }
    // let noteTitleArray = JSON.parse(notesTitleFromLocal);
    // let noteTextArray = JSON.parse(notesTextFromLocal);
    if(noteTextObj.length==0 && noteTitleObj.length == 0){
        html += 'Nathing to show! Add Note section to Add new notes';
    }
    else{
        let noteTitleArray = noteTitleObj;
        let noteTextArray = noteTextObj;
        for(let i=0; i < noteTitleArray.length ;i++){
            html += 
            `
            <div class="card mx-2 my-2 NoteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${noteTitleArray[i]}</h5>
                    <p class="card-text" id="Note-text${i}">${noteTextArray[i]}</p>
                    <button id="${i}" onclick="DeleteNote(this.id)" href="#" class="btn btn-primary">Delete Notes</button>
                </div>
            </div>
            `
        }
    }
    AddNotesSelect.innerHTML = html;
}

// Delete Notes
function DeleteNote(index){ // we give id as index and pass id when onclick event occ on delete button
    // In delete note some probelm it delete other note
    notesTitleFromLocal = localStorage.getItem('NoteTitle');
    notesTextFromLocal = localStorage.getItem('NoteText');
    if(notesTitleFromLocal == null && notesTextFromLocal==null){
        noteTitleObj=[];noteTextObj = [];
    }
    else{
        noteTitleObj = JSON.parse(notesTitleFromLocal);
        noteTextObj = JSON.parse(notesTextFromLocal);
    }
    console.log(noteTextObj.length,noteTextObj.length);
    console.log('You delete a',index,'Note','Note is: ',noteTitleObj[index],noteTextObj[index]);
    noteTitleObj.splice(index,1);
    noteTextObj.splice(index,1);
    localStorage.setItem('NoteTitle',JSON.stringify(noteTitleObj));
    localStorage.setItem('NoteText',JSON.stringify(noteTextObj));
    ShowNotes();
}

let searchBtn = document.getElementById('search');
let searchTxt = document.getElementById('searchTxt'); 
searchTxt.addEventListener('input',Search);

function Search(){
    // let text = searchTxt.value.toLowerCase();
    // notesTitleFromLocal = localStorage.getItem('NoteTitle');
    // notesTextFromLocal = localStorage.getItem('NoteText');
    // if(notesTitleFromLocal == null && notesTextFromLocal == null){
    //     noteTitleObj=[];noteTextObj = [];
    // }
    // else{
    //     noteTitleObj = JSON.parse(notesTitleFromLocal);
    //     noteTextObj = JSON.parse(notesTextFromLocal);
    // }
    let TextTosearch = searchTxt.value.toLowerCase();//Case ingnore kari ne match karava mate badhane lowercase ma convert kariya

    let NoteCards = document.getElementsByClassName('NoteCard');
    Array.from(NoteCards).forEach(function(element){
        let title = element.getElementsByClassName('card-title')[0].innerText.toLowerCase();
        let text = element.getElementsByClassName('card-text')[0].innerText.toLowerCase();

        if(title.includes(TextTosearch) || text.includes(TextTosearch)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
}

