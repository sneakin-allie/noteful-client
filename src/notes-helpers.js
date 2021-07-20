export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => Number(folder.id) === Number(folder_id))

export const findNote = (notes=[], note_id) => {
  return notes.find(note => Number(note.id) === Number(note_id))
}
  
export const getNotesForFolder = (notes=[], folder_id) => (
  (!folder_id)
    ? notes
    : notes.filter(note => Number(note.folder_id) === Number(folder_id))
)

export const countNotesForFolder = (notes=[], folderId) => {

  return notes.filter(note => Number(note.folder_id) === Number(folderId)).length
}
  