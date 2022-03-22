import React, { useState } from 'react';
import Text_Input from '../../../components/inputs/Text_Input';


function Join_Company () {
    const [query, set_query] = useState("");

    return (
        <section>
            <h1>Search for your company</h1>
            <Text_Input value={query} input={set_query}>Search</Text_Input>
        </section>
    )
}

export default Join_Company;