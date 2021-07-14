export const findFolder = (folders=[], folderId) =>
  folders.find(folder => Number(folder.id) === Number(folderId))

export const findNote = (notes=[], noteId) => {
  return notes.find(note => Number(note.id) === Number(noteId))
}
  

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => Number(note.folderId) === Number(folderId))
)

export const countNotesForFolder = (notes=[], folderId) => {

  return notes.filter(note => Number(note.folder_id) === Number(folderId)).length
}
  