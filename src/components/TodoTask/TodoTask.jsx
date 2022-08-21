import React, { useState } from 'react';
import './TodoTask.scss';

function TodoTask({ task }) {
  console.log(task);
  return <li>{task.name}</li>;
}

export default TodoTask;
