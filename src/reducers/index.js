const initialState = {
   menu: [],
   loading: true,
   error: false,
   items: [],
   total: 0         // элементы которые пользователь положил в корзину
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false

            }
        case 'MENU_REQUESTED' : // идет запрос к базе данных на меню
        
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            }
        case 'MENU_ERROR': 
            return {
                ...state,
                error: true
            }
        case 'ITEM_ADD_TO_CART': //      здесь в items нужно положить какой то элемент  который 
//                                       уже есть в menu, вычислить его по тому id который пришел в этот action вытащить от туда
//                                       сформировать новый объект и 
//                                       поместить в items для дальнейшего использования в cartTable
            
            const id = action.payload;
            const item = state.menu.find(item => item.id === id );  // ищем тот самый элемент в меню
            
            const itemFromItems = state.items.find(item => item.id === id) //есть ли в items наша покупка?, объект записываем в itemItems
           
            if (itemFromItems){   // если нашли то - true 
               
                const itemFromItemsIndex = state.items.findIndex(item => item.id === id); // определяем индекс этого продукта в items
               
                const newItemFromItems = { // создаем новый объект продукта с новым количеством

                    title: itemFromItems.title,
                    price: itemFromItems.price,
                    url: itemFromItems.url,
                    id: itemFromItems.id,
                    numberOf: itemFromItems.numberOf + 1
                }
                let sum = newItemFromItems.price;
                state.items.forEach(item =>sum += (item.price*item.numberOf));
               
                return {                // формируем новый объект state
                    ...state, // state свойства остальные
                    items: [ // массив формируем из элементов до и после ,а между ними перезаписываем наш продукт с новым количеством
                        ...state.items.slice(0, itemFromItemsIndex),
                        newItemFromItems,
                        ...state.items.slice(itemFromItemsIndex + 1)
                    ],
                    total: sum
                }
            } else { // если itemFromItems - undefined
                const newItem = {     // создаем новый продукт в  корзине

                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    numberOf: 1     // ставим количество 1 шт
                };
                let sum = newItem.price;
                state.items.forEach(item => {sum += (item.price*item.numberOf)})
                return {
                    ...state,  // весь state кроме items
                    items: [
                        ...state.items,  
                        newItem       //  и добавляем новый продукт
                    ],
                    total: sum
                };
            }
           
           
           
           
          
           
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);

            const forDeleteTotal = state.items[itemIndex]; // - объект который будем удалять запишем в forDeleteTotal

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                total: state.total - (forDeleteTotal.price*forDeleteTotal.numberOf) // вычитаем из общей суммы - сумму удаленных продуктов
            } 
        default:
                 return state;
    }

}
export default reducer;