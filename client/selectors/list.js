import { createSelector } from 'reselect';

const todosSelector = state => state.list.todos;

export const completedTodosSelector = createSelector(
  todosSelector,
  todos => todos.filter(t => t.completed)
);

export const doingTodosSelector = createSelector(
  todosSelector,
  todos => todos.filter(t => !t.completed)
);
