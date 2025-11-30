// export default function TabButton(props) {
//   return <li><button>{props.children}</button></li>
// }

export default function TabButton({ children, onSelect, isSelected }) {
  // document.querySelectorAll('button').forEach(btn => {
  //   btn.classList.remove('active');
  // });
  // this.classList.add('active');
  
  // function handleClick() {
  //   console.log('Hello World');
  // }
  console.log('TabButton Rendered');
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>{children}</button>
    </li>
  );
}

// export default function TabButton({ label }) {
//   return (
//     <li>
//       <button>{label}</button>
//     </li>
//   );
// }