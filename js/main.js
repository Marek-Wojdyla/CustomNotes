const addBtn = document.querySelector('.add');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteNotebtn = document.getElementsByClassName('.delete-note');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

const notePanel = document.querySelector('.note-panel');
const noteArea = document.querySelector('.note-area');
const selectCategory = document.querySelector('#category');
const textArea = document.querySelector('#text');
const errorMessage = document.querySelector('.error');

let selectedValue;
let cardId = 0;

const showPanel = () => {
	notePanel.style.visibility = 'visible';

	cancelBtn.addEventListener('click', () => {
		notePanel.style.visibility = 'hidden';
		errorMessage.style.visibility = 'hidden';
		textArea.value = '';
		selectCategory.selectedIndex = 0;
	});
};

const saveNote = () => {
	if (
		textArea.value !== '' &&
		selectCategory.options[selectCategory.selectedIndex].value !== '0'
	) {
		createNote();
		errorMessage.style.visibility = 'hidden';
		notePanel.style.visibility = 'hidden';
	} else {
		errorMessage.style.visibility = 'visible';
	}
};

const createNote = () => {
	//tworzę zmienna która będzie przechowywać dynamicznie utworzonego diva
	const newNote = document.createElement('div');
	//następnie dodaje mu klasę note
	newNote.classList.add('note');
	// oraz przypisuje mu id 0
	newNote.setAttribute('id', cardId);

	newNote.innerHTML = `
    <div class="note-header">
		<h3 class="note-title">${selectedValue}</h3>
		<button class="delete-note" onclick="deleteNote(${cardId})">
			<i class="fa-solid fa-xmark"></i>
		</button>
	</div>
	<div class="note-body">
		${textArea.value}
	</div>
    `;

	//dodaje nowo utworzony element div do rodzica który przechowuje wszystkie notatki czyli noteArea
	noteArea.appendChild(newNote);
	//przy każdym kolejnym dodaniu  nowego elementu div zwiększamy id o 1
	cardId++;
	textArea.value = '';
	selectCategory.selectedIndex = 0;
	checkCategory(newNote);
};

//tworzę funckję która będzie pobierała wartość opcji w select która została kliknięta
const selectValue = () => {
	selectedValue = selectCategory.options[selectCategory.selectedIndex].text;
};

selectValue();

const checkCategory = (note) => {
	switch (selectedValue) {
		case 'Zakupy':
			note.style.backgroundColor = '#f37373';
			break;
		case 'Praca':
			note.style.backgroundColor = '#4ceb4c';
			break;
		case 'Inne':
			note.style.backgroundColor = '#4c4cf7';
			note.style.color = '#fff';
			
	}
};

//tworze funckję która usuwa pojedyńczą notatkę
const deleteNote = (id) => {
	// w tym miejscu przypisuje do zmiennej elementy z id
	const noteToDelete = document.getElementById(id);
	//następnie odwołujemy się do pojemnika na wszystkie notatki i usuwamy z niej notatkę
	noteArea.removeChild(noteToDelete);
};

const deleteAllNotes = () => {
	noteArea.textContent = '';
};

addBtn.addEventListener('click', showPanel);
saveBtn.addEventListener('click', saveNote);
deleteAllBtn.addEventListener('click', deleteAllNotes);
