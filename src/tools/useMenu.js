import { useContext, useEffect } from 'react';
import { MenuContext } from '../contexts/Menu.context';


function useMenu (props) {
    const menu = props.menu;
    const title = props.title;
    const { set_options, set_selected, set_title } = useContext(MenuContext);

    useEffect(() => {
        set_options(menu);
        set_title(title);
        return () => { 
            set_options([]);
            set_selected(0);
            set_title("");
        };
    }, []);
    
}

export default useMenu;