const initialState = {
   menu: [],
   loading: true,
   error: false,
   items: []         // элементы которые пользователь положил в карзину
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
            const item = state.menu.find(item => item.id === id );  // ищем тот самый элемент 
            const newItem = {

                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ]
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]// формируем новый массив из элементов до  того элемента который нужно удалить (с индексом itemIndex) и  элементов после
            } // таким образом сохраним принципы иммутабельности
        default:
                 return state;
    }

}
export default reducer;