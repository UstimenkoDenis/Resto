const initialState = {
   menu: [],
   loading: true,
   error: false,
   items: [],
   total: 0        

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false

            }
        case 'MENU_REQUESTED' : 
        
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
        case 'ITEM_ADD_TO_CART': 
            const id = action.payload;
            const item = state.menu.find(item => item.id === id );              
            const itemFromItems = state.items.find(item => item.id === id) 
           
            if (itemFromItems){                  
                const itemFromItemsIndex = state.items.findIndex(item => item.id === id);                
                const newItemFromItems = {
                    title: itemFromItems.title,
                    price: itemFromItems.price,
                    url: itemFromItems.url,
                    id: itemFromItems.id,
                    numberOf: itemFromItems.numberOf + 1
                }
                let sum = newItemFromItems.price;
                state.items.forEach(item =>sum += (item.price*item.numberOf));
               
                return {                
                    ...state, 
                    items: [ 
                        ...state.items.slice(0, itemFromItemsIndex),
                        newItemFromItems,
                        ...state.items.slice(itemFromItemsIndex + 1)
                    ],
                    total: sum
                }
            } else { 
                const newItem = {    
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    numberOf: 1     
                };
                let sum = newItem.price;
                state.items.forEach(item => {sum += (item.price*item.numberOf)})
                return {
                    ...state,  
                    items: [
                        ...state.items,  
                        newItem       
                    ],
                    total: sum
                };
            }          
           
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const forDeleteTotal = state.items[itemIndex]; 

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                total: state.total - (forDeleteTotal.price*forDeleteTotal.numberOf)
            } 
        default:
                 return state;
    }

}
export default reducer;
