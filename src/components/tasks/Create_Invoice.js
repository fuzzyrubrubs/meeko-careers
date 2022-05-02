import React, { useState } from 'react';
import master from '../../styles/components/tasks/tasks.module.scss';
import { form_header } from '../../tools/global_components';
import Check_box from '../inputs/Check_Box';
import Number_Input from '../inputs/Number_Input';
import Text_Input_Alt from '../inputs/Text_Input_Alt';
import Button_Main from '../items/Button_Main';


function Create_Invoice (props) {
    const data = props.data;
    const [name, set_name] = useState("Anna Taylor");
    const [address, set_address] = useState("59 Kinglands Road, E137N");
    const [tax, set_tax] = useState("1123 1231 1245");
    const [amount, set_amount] = useState("342");
    const [bank, set_bank] = useState("342");
    const [account, set_account] = useState("342");
    const [code, set_code] = useState("342");

    return (
        <main className={master.main}>
            <h2>Create Invoice</h2>
            {form_header("Your name", "FIll in your full name")}
            <Text_Input_Alt value={name} input={set_name}>Name</Text_Input_Alt>
            {form_header("Your address", "FIll in your full address")}
            <Text_Input_Alt value={address} input={set_address}>Address</Text_Input_Alt>
            {form_header("Your tax number", "FIll in your tax number")}
            <Text_Input_Alt value={tax} input={set_tax}>Tax Number</Text_Input_Alt>
            {form_header("Amount", "Fill in the amount in GBP")}
            <Number_Input value={amount} input={set_amount}>Amount</Number_Input>
            {form_header("Bank information", "Fill in your account details")}
            <Text_Input_Alt value={bank} input={set_bank}>Bank</Text_Input_Alt>
            <Text_Input_Alt value={account} input={set_account}>Account Number</Text_Input_Alt>
            <Text_Input_Alt value={code} input={set_code}>Sort Code</Text_Input_Alt>
            <Check_box>Save details</Check_box>
            <Button_Main>Send</Button_Main>
        </main>
    );
};

export default Create_Invoice;