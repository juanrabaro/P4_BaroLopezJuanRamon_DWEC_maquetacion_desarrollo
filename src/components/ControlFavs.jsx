/*
export function addFavourite(id, localStorageName, user, breedsList, setListFavs, uploadFav, listFavs) {
  // user is registered so save the data to localStorage
  if ( user ) {
    if ( localStorageName === "breedsFavs" ) {
      const newBreedList = breedsList.filter((breed) => {
        return breed === breedsList[id]
      })  
      const newFav = newBreedList[0]
      setListFavs([...listFavs, newFav])
      uploadFav([...listFavs, newFav], "breedsFavs")
      return
    }

    const newListFav = filteredList.filter((fact) => {
      return fact === factsList[id]
    })
    const newFav = newListFav[0]
    uploadFav([...listFavs, newFav], "factsFavs")
    setListFavs([...listFavs, newFav])
  }

  // not registered so enable for 2 sec the message
  setNotRegistered(true)
  if (hideMessage.current) {
    clearTimeout(hideMessage.current)
  }
  hideMessage.current = setTimeout(() => {
    setNotRegistered(false)
  }, 2000)
}

export function deleteFavourite(object, localStorageName) {
  if ( localStorageName === "breedsFavs" ) {
    const newBreedList = listFavs.filter((item) => {
      return item.id !== object.id
    })
    setListFavs(newBreedList)
    uploadFav(newBreedList, "breedsFavs")
    return
  }

  const newListFav = listFavs.filter((item) => {
      return item.id !== object.id
  })
  setListFavs(newListFav)
  uploadFav(newListFav, "factsFavs")

}
*/
