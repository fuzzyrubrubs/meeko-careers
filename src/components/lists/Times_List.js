import React from 'react';
import styles from '../../styles/components/lists/Lists.module.scss';
import Time_Selector from '../items/Time_Selector';

function Times_List(props) {
    const array = props.array;

    const list = props.list.map((item, index) => <Time_Selector data={item} action={() => props.selector(index)} selected={index === props.selected ? true : false} />);
    const array_list = props.list.map((item, index) => <Time_Selector data={item} action={() => props.selector(index)} selected={props.selected.includes(index) ?  true : false} />);
    return (
        <div className={styles.dates}>
           {array ? array_list : list}
        </div>
    )
};

export default Times_List;


