export default function Tabs( {children, buttons, ButtonsContainer = "menu"} ) {
//   const ButtonsContainer = buttonsContainer || 'div';
  return <>
    {/* <menu> */}
    <ButtonsContainer>
        {buttons}
    </ButtonsContainer>
    {/* </menu> */}
    {children}
    </>
}


