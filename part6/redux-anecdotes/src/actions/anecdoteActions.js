export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const addAnecdotes = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { content },
  }
}
