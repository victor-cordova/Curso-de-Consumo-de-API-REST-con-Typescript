// const [sincronized, setSincronized] = React.useState(true);
// const [toDos, setToDos] = React.useState(initialValue);
// const [loading, setLoading] = React.useState(true); //Por default este estado empezará
// //cargando, por ende se le coloca como true.
// const [error, setError] = React.useState(false); //Por default será false, a menos que
// //aparezca un error y cuando eso pase contendrá el error.

class LocalStorage {

  saveRandomImage = (img: string) => {
    localStorage.setItem("random-image", img);
  }
}

// React.useEffect( () => {
//   setTimeout( () => {
//     try {
//       const localStorageToDos = localStorage.getItem(itemName);
//       let localStorageToDosParsed;

//       if (!localStorageToDos) {
//         localStorage.setItem(itemName, JSON.stringify([]));
//         localStorageToDosParsed = [];
//       }
//       else {
//         localStorageToDosParsed = JSON.parse(localStorageToDos);
//       }
//       setLoading(false);
//       setToDos(localStorageToDosParsed);
//       setSincronized(true);
//     } catch (error) {
//       setError(error);
//     }

//   }, 1000);
// }, [sincronized]);

// const saveToDos = (updatedToDos) => { //Se creo esta funcion para cuando se quiera hacer
//   //en la lista de toDos solo se llame a esta función. Además, se encarga de guardar la data
//   //dentro del localStorage.
//   try {
//     const updatedToDosStringify = JSON.stringify(updatedToDos)
//     localStorage.setItem(itemName, updatedToDosStringify);
//     setToDos(updatedToDos);
//   } catch (error) {
//     setError(error);
//   }
// }

// const sincronizeToDos = () => {
//   setSincronized(false);
//   setLoading(true);
// }
