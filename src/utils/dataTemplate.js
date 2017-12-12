export function getDataTemplate() {
    return ({
      'toDo': [],
      'inProgress': [],
      'done': []
    });
  }

  export function toDoDataTemplate() {
    return ({
      'title': '',
      'desc': '',
      'priority': '',
      'list': 'toDo'
    })
  }