 export const groupedBasket = (basket) => basket.reduce((acc, item) => {
    const existingItem = acc.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1; // Incrementar la cantidad si ya existe
      existingItem.ids.push(item.id); // Guardar todos los IDs para eliminarlos si es necesario
    } else {
      acc.push({ ...item, quantity: 1, ids: [item.id] }); // Nuevo elemento con cantidad 1
    }
     console.log(acc);
     console.log("hola etoy pasando aquí")
    return acc;
  }, []);

