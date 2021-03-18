export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id == folderId)

export const findNote = (notes=[], noteId) => {
  console.log('notes:', notes)
  console.log('noteId:', noteId)
  return notes.find(note => note.id == noteId)
}
  

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId == folderId)
)

export const countNotesForFolder = (notes=[], folderId) => {

  return notes.filter(note => note.folder_id == folderId).length
}
  