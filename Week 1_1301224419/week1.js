document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
  
    // Add task
    addBtn.addEventListener('click', () => {
      const taskText = todoInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        todoInput.value = '';
      }
    });
  
    // Add task on pressing Enter
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addBtn.click();
      }
    });
  
    // Function to add a new task
    function addTask(taskText) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
  
      // Add event listeners for edit and delete buttons
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');
  
      deleteBtn.addEventListener('click', () => {
        li.remove();
      });
  
      editBtn.addEventListener('click', () => {
        const newText = prompt('Edit your task:', taskText);
        if (newText !== null && newText.trim() !== '') {
          li.querySelector('span').textContent = newText.trim();
        }
      });
    }
  });