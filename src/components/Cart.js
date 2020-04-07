import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreItemArray } from './reducers/index';
import { removeItem } from '../actions';
import { clearCart } from '../actions';
import { updateQuantities } from '../actions';
import { Icon } from 'react-icons-kit'
import { trashO } from 'react-icons-kit/fa/trashO'
import Button from './Button';

const Taxes = {
    'Select A Province': null,
    'Alberta': '5',
    'British Columbia': '12',
    'Manitoba': '12',
    'New Bruinswick': '15',
    'Newfoundland/Labrador': '15',
    'Northwest Territories': '5',
    'Nova Scotia': '15',
    'Nunavut': '5',
    'Ontario': '13',
    'PEI': '15',
    'Quebec': '14.975',
    'Saskatchewan': '11',
    'Yukon': '5',
}




const Cart = () => {

    const storeItems = useSelector(getStoreItemArray);
    const [province, setProvince] = useState(null);
    let [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    //as storeItems changes, the total get recounted and updated in state. 
    useEffect(() => {
        let sum = 0;
        //loop to calculate total every re-render
        storeItems.forEach((item) => {
            sum += item.total * item.quantity

            //
        })

        //total price will be set. 
        setTotal(Math.floor(sum * 100) / 100)
    }, [storeItems])


    return (<Wrapper>
        <HeaderWrapper>
            <Title>Your Cart</Title>
            <StyledNumber>#{storeItems.length} - Items</StyledNumber>
            <EmptyButton onClick={() => dispatch(clearCart())}>
                Empty Cart
            </EmptyButton>
            <select onChange={(e) => setProvince(e.target.value)}>
                {Object.keys(Taxes).map(province => {
                    return (
                        <option>
                            {province}
                        </option>

                    )
                })}
            </select>
        </HeaderWrapper>
        <AllItemWrap>
            {/* For each item... */}
            {storeItems.map((item, index) => {
                return <ItemWrapper key={item.id}>
                    {/* Cart items Component */}
                    {item.title}
                    <CancelButton onClick={() => dispatch(removeItem(item.id))}>
                        <Icon size={25} style={{ color: 'pink', marginBottom: '10px' }} icon={trashO}></Icon>
                    </CancelButton>
                    <QuantityWrapper>
                        <span>Quantity</span>
                        <StyledInput onChange={(e) => dispatch(updateQuantities({
                            value: e.target.value >= 0 ? e.target.value : ' ',
                            id: item.id
                        }))
                        } value={item.quantity} type="text" placeholder="#">
                        </StyledInput>
                    </QuantityWrapper>
                </ItemWrapper>
            }
            )}
        </AllItemWrap>


        <PurchaseWrapper>
            <Total>
                SubTotal: {total}
            </Total>
            <PurchaseButton>
                Purchase
                </PurchaseButton>
        </PurchaseWrapper>
        {province !== null && total !== 0 && <Total>
            Sales Tax:  {`${Taxes[province]}%`}: <div>Total: {Math.floor((total * (Taxes[province] / 100) + total) * 100) / 100}</div>
        </Total>}

    </Wrapper>
    )


}


export default Cart;

const Wrapper = styled.div`
width: auto;
color: white;
font-size: 24px;
`
const HeaderWrapper = styled.div`
margin-bottom: 20px;
font-size: 30px;
text-align: center;
`
const AllItemWrap = styled.div`
height: 50vh;
`
const Title = styled.div`
`
const StyledNumber = styled.div`
`

const ItemWrapper = styled.div`
border: dashed white 0.5px;
padding: 10px 10px;
opacity: 1;
transition: 0.5 all;
width: 100%;
&:hover {
    opacity: 0.9;   
}
`

const PurchaseWrapper = styled.div`
display: flex;
margin-top: 40px;
font-size: 30px;
justify-content: space-between;
border-top: dashed black 1px;



`
const Total = styled.div`
`
const PurchaseButton = styled.button`
background-color: red;
border-radius: 25px;
font-size: 30px;
margin: 10px;
padding: 10px 10px;
outline: none;
transition: 0.5s all ;
&:hover {
    cursor: pointer;
    color: white;
    background-color: #F2C1E5;

}

`
const QuantityWrapper = styled.div`
background-color: rgb(47,22,50);
display: flex;
justify-content: space-between;
`
const StyledInput = styled.input`
width: 30px;
font-size: 20px;

`
const CancelButton = styled.button`
background-color: transparent;
border: none;
outline: none;
&:hover {
    cursor: pointer;
    transform: scale(1.1,1.1);
}
`
const EmptyButton = styled(Button)`
background-color: black;
color: white;
margin-top: 10px;
&:hover {
    transform: scale(0.9,0.9);


}
`