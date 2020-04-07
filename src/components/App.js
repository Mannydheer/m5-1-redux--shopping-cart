import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import ItemGrid from './ItemGrid';
import GlobalStyles from './GlobalStyles';
import Cart from './Cart';

const App = () => {
  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <ItemGridWrapper>
        <ItemGrid />
      </ItemGridWrapper>
      <CartWrapper>
        <Cart></Cart>
      </CartWrapper>

      <GlobalStyles />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;

  grid-template-areas: 
"header header sidebar"
 "main main sidebar";

 @media only screen and (max-width: 1200px) {
  grid-template-areas: 
"header"
 "main"
 "sidebar";
}


`;

const Header = styled.header`
  grid-area: header;
  padding: 32px 64px;
`;

const ItemGridWrapper = styled.main`
/* display: flex; */
/* flex-grow: 3;
flex-basis: 50px; */

  grid-area: main;
  padding: 16px 64px;
`;

const CartWrapper = styled.div`
  grid-area: sidebar;
  border-left: 3px dashed #ff406e;
  padding-left: 8px;
  background-color:rgb(64,31,67);
  height: 100%;
  width: 100%;


`;

export default App;
